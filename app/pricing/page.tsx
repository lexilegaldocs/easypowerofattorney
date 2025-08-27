import { BRAND_PRICE } from "@/lib/utils";

export default function Pricing() {
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold">Simple pricing</h1>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="card p-6">
          <h2 className="text-xl font-semibold">Easy Power of Attorney Pack</h2>
          <p className="mt-2 text-4xl font-bold">£{BRAND_PRICE}</p>
          <ul className="mt-4 text-slate-700 space-y-2 list-disc pl-6">
            <li>LP1F or LP1H</li>
            <li>Email delivery</li>
            <li>Signing checklist</li>
            <li>OPG registration guidance</li>
          </ul>
        </div>
        <div className="card p-6 md:col-span-2">
          <h3 className="font-semibold">Compare</h3>
          <p className="text-slate-700 mt-2">Competitors often charge £82–£150+ just for preparation (OPG fees extra). Our £7.99 is unbeatable value.</p>
        </div>
      </div>
    </div>
  );
}
