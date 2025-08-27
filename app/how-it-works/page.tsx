import Link from "next/link";

export default function HIW() {
  return (
    <div className="py-12 space-y-6">
      <h1 className="text-3xl font-bold">How Easy Power of Attorney works</h1>
      <ol className="list-decimal pl-6 space-y-3 text-slate-700">
        <li>Answer simple questions about the donor and attorneys.</li>
        <li>Choose how your attorneys act and, for LP1H, who decides on life‑sustaining treatment.</li>
        <li>We generate a clean LPA information pack aligned to OPG sections and a signing checklist.</li>
        <li>Pay £7.99 to download instantly and receive by email.</li>
        <li>Print, sign in the correct order with witnesses, and send to the Office of the Public Guardian to register.</li>
      </ol>
      <p className="text-slate-700">
        Learn more about LPAs on <a className="link" href="https://www.gov.uk/power-of-attorney" target="_blank">GOV.UK</a>.
      </p>
      <Link className="btn" href="/start">Start my LPA</Link>
    </div>
  );
}
