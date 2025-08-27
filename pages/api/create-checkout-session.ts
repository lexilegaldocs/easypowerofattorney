export const config = { runtime: 'nodejs' };
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { BRAND_PRICE_PENCE } from "@/lib/utils";
import { getSupabase } from "@/lib/supabase";
import { LPAFormSchema } from "@/lib/validation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2024-06-20" });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { form } = req.body;
    const parsed = LPAFormSchema.safeParse(form);
    if (!parsed.success) return res.status(400).json({ error: "Invalid form" });

    const supabase = getSupabase();
    const { data, error } = await supabase.from("submissions").insert({ form, status: "created" }).select().single();
    if (error) throw error;
    const sid = data.id;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            unit_amount: BRAND_PRICE_PENCE,
            product_data: { name: "Easy‑LPA Document Pack" },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?sid=${sid}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/start`,
    });

    return res.status(200).json({ url: session.url });
  } catch (e:any) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
