import Link from "next/link";
import { BRAND_PRICE } from "@/lib/utils";

export default function Home() {
  return (
    <div className="py-12">
      <section className="grid md:grid-cols-2 gap-10 items-center mt-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Create your Lasting Power of Attorney for <span className="text-brand">£{BRAND_PRICE}</span>
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            Plain‑English questions. AI guidance when you need it. Instantly download your LPA information pack
            and receive it by email. Fully aligned with Office of the Public Guardian (OPG) sections.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/start" className="btn">Start my LPA</Link>
            <Link href="/how-it-works" className="link">See how it works</Link>
          </div>
          <p className="mt-6 badge">Only £7.99 — unbeatable value</p>
          <ul className="mt-6 list-disc pl-6 text-slate-700 space-y-2">
            <li>Choose LP1F (Property & Financial) or LP1H (Health & Welfare)</li>
            <li>Step‑by‑step guidance to avoid common errors</li>
            <li>Download + email delivery of your LPA pack</li>
            <li>Registration instructions for the OPG</li>
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold text-lg">Why act now?</h3>
          <ol className="mt-3 space-y-2 text-slate-700">
            <li>• OPG registration fees apply (typically £82 per LPA; fee changes may occur).</li>
            <li>• Without an LPA, loved ones may face delays and costs to make decisions.</li>
            <li>• Make decisions about life‑sustaining treatment (LP1H) in advance.</li>
          </ol>
          <div className="mt-4">
            <Link href="/news" className="link">See headlines about why LPAs matter →</Link>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">How it works</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {[
            ["Answer simple questions", "We guide you in plain English with helpful tips."],
            ["Pay just £7.99", "Secure Stripe checkout. Apple/Google Pay supported."],
            ["Download & email", "Get your LPA pack instantly and signing checklist."],
          ].map(([title, body], i) => (
            <div key={i} className="card p-6">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-slate-700 mt-2">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="card p-6">
          <h2 className="text-2xl font-bold">Important</h2>
          <p className="mt-2 text-slate-700">
            Easy Power of Attorney provides a document preparation service and does not provide legal advice.
            If you are unsure whether an LPA is suitable for your needs, please consult a Solicitor.
          </p>
        </div>
      </section>
    </div>
  );
}
