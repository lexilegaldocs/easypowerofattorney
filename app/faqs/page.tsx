export default function FAQs() {
  const faqs = [
    ["Is Easy Power of Attorney legal?", "We prepare your information in line with OPG sections. You must print, sign with witnesses and register with the OPG. If unsure, consult a Solicitor."],
    ["What types do you support?", "LP1F (Property & Financial) and LP1H (Health & Welfare)."],
    ["What’s the OPG fee?", "Typically £82 per LPA. Reductions/exemptions may apply. Fees can change — always check GOV.UK."],
    ["Do you store my data?", "We only store it if you choose to save for later or complete purchase. See Privacy for details."],
  ];
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold">FAQs</h1>
      <div className="mt-6 space-y-4">
        {faqs.map(([q,a]) => (
          <details key={q} className="card p-5">
            <summary className="font-semibold cursor-pointer">{q}</summary>
            <p className="mt-2 text-slate-700">{a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
