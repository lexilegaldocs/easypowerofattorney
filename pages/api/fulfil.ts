import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getSupabase } from "@/lib/supabase";
import { generateLpaPack, generateLpaOfficial } from "@/lib/pdf";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2024-06-20" });
const resend = new Resend(process.env.RESEND_API_KEY || "");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sid = req.query.sid as string;
    const session_id = req.query.session_id as string;
    if (!sid || !session_id) return res.status(400).json({ error: "Missing params" });

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status !== "paid") return res.status(400).json({ error: "Payment not verified" });

    const supabase = getSupabase();
    const { data, error } = await supabase.from("submissions").select("*").eq("id", sid).single();
    if (error || !data) return res.status(404).json({ error: "Submission not found" });

    let pdfBytes: Uint8Array;
    try { pdfBytes = await generateLpaOfficial(data.form); } catch { pdfBytes = await generateLpaPack(data.form); }
    const fileName = `easy-lpa-${sid}.pdf`;
    const storage = supabase.storage.from("docs");
    // Ensure bucket 'docs' exists in Supabase project with public read
    await storage.upload(fileName, Buffer.from(pdfBytes), { contentType: "application/pdf", upsert: true });
    const { data: pub } = storage.getPublicUrl(fileName);
    const url = pub.publicUrl;

    await supabase.from("submissions").update({ status: "paid", download_url: url }).eq("id", sid);

    const recipient = data.form?.donor?.email || data.form?.correspondent?.email;
    if (recipient && process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "Easy Power of Attorney <noreply@easypowerofattorney.co.uk>",
        to: recipient,
        subject: "Your Easy Power of Attorney pack",
        text: `Thanks for your purchase. Download your pack here: ${url}`
      });
    }

    return res.status(200).json({ ok: true, url });
  } catch (e:any) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
