'use client';
import { useState } from "react";
import { LPAFormSchema, type LPAForm } from "@/lib/validation";
import { BRAND_PRICE } from "@/lib/utils";

export default function Start() {
  const [form, setForm] = useState<LPAForm>({
    type: "LP1F",
    donor: { firstName: "", lastName: "", dob: "", address: "", email: "", phone: "" },
    attorneys: [{ firstName: "", lastName: "", dob: "", address: "", email: "", phone: "" }],
    replacementAttorneys: [],
    decisions: { howAttorneysAct: "jointAndSeveral", lifeSustainingTreatment: "donor", preferences: "", instructions: "" },
    peopleToNotify: [],
    certificateProvider: { name: "", address: "", statement: "" },
    correspondent: { name: "", address: "", email: "" }
  });
  const [error, setError] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  function update(path: string, value: any) {
    setForm(prev => {
      const copy: any = JSON.parse(JSON.stringify(prev));
      const parts = path.split(".");
      let cur = copy;
      for (let i=0;i<parts.length-1;i++) cur = cur[parts[i]];
      cur[parts[parts.length-1]] = value;
      return copy;
    });
  }

  const addAttorney = () => setForm(prev => ({ ...prev, attorneys: [...prev.attorneys, { firstName: "", lastName: "", dob: "", address: "", email: "", phone: "" }] }));
  const addReplacement = () => setForm(prev => ({ ...prev, replacementAttorneys: [...(prev.replacementAttorneys||[]), { firstName: "", lastName: "", dob: "", address: "", email: "", phone: "" }] }));

  async function goToCheckout() {
    setError("");
    const parsed = LPAFormSchema.safeParse(form);
    if (!parsed.success) { setError("Please complete the required fields."); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form }),
      });
      const json = await res.json();
      if (json.url) window.location.href = json.url;
      else setError(json.error || "Unable to start checkout.");
    } catch (e:any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold">Start your LPA</h1>
      <p className="text-slate-700 mt-2">Answer in plain English. You can add multiple attorneys and replacements.</p>

      <div className="card p-6 mt-6 space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <label className="space-y-1">
            <span className="text-sm font-medium">LPA Type</span>
            <select value={form.type} onChange={e=>update("type", e.target.value)} className="w-full border rounded-xl p-3">
              <option value="LP1F">LP1F — Property & Financial Affairs</option>
              <option value="LP1H">LP1H — Health & Welfare</option>
            </select>
          </label>
        </div>

        <h2 className="text-xl font-semibold">Donor</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input placeholder="First name" className="border rounded-xl p-3" value={form.donor.firstName} onChange={e=>update("donor.firstName", e.target.value)}/>
          <input placeholder="Last name" className="border rounded-xl p-3" value={form.donor.lastName} onChange={e=>update("donor.lastName", e.target.value)}/>
          <input placeholder="Date of birth (DD/MM/YYYY)" className="border rounded-xl p-3" value={form.donor.dob} onChange={e=>update("donor.dob", e.target.value)}/>
          <input placeholder="Address" className="border rounded-xl p-3" value={form.donor.address} onChange={e=>update("donor.address", e.target.value)}/>
          <input placeholder="Email (optional)" className="border rounded-xl p-3" value={form.donor.email} onChange={e=>update("donor.email", e.target.value)}/>
          <input placeholder="Phone (optional)" className="border rounded-xl p-3" value={form.donor.phone} onChange={e=>update("donor.phone", e.target.value)}/>
        </div>

        <h2 className="text-xl font-semibold">Attorneys</h2>
        {form.attorneys.map((a, i) => (
          <div key={i} className="grid md:grid-cols-2 gap-4">
            <input placeholder="First name" className="border rounded-xl p-3" value={a.firstName} onChange={e=>update(`attorneys.${i}.firstName`, e.target.value)}/>
            <input placeholder="Last name" className="border rounded-xl p-3" value={a.lastName} onChange={e=>update(`attorneys.${i}.lastName`, e.target.value)}/>
            <input placeholder="Date of birth" className="border rounded-xl p-3" value={a.dob} onChange={e=>update(`attorneys.${i}.dob`, e.target.value)}/>
            <input placeholder="Address" className="border rounded-xl p-3" value={a.address} onChange={e=>update(`attorneys.${i}.address`, e.target.value)}/>
            <input placeholder="Email (optional)" className="border rounded-xl p-3" value={a.email||""} onChange={e=>update(`attorneys.${i}.email`, e.target.value)}/>
            <input placeholder="Phone (optional)" className="border rounded-xl p-3" value={a.phone||""} onChange={e=>update(`attorneys.${i}.phone`, e.target.value)}/>
          </div>
        ))}
        <button type="button" onClick={addAttorney} className="link">+ Add another attorney</button>

        <h2 className="text-xl font-semibold">Replacement attorneys</h2>
        {(form.replacementAttorneys||[]).map((a, i) => (
          <div key={i} className="grid md:grid-cols-2 gap-4">
            <input placeholder="First name" className="border rounded-xl p-3" value={a.firstName} onChange={e=>update(`replacementAttorneys.${i}.firstName`, e.target.value)}/>
            <input placeholder="Last name" className="border rounded-xl p-3" value={a.lastName} onChange={e=>update(`replacementAttorneys.${i}.lastName`, e.target.value)}/>
            <input placeholder="Date of birth" className="border rounded-xl p-3" value={a.dob} onChange={e=>update(`replacementAttorneys.${i}.dob`, e.target.value)}/>
            <input placeholder="Address" className="border rounded-xl p-3" value={a.address} onChange={e=>update(`replacementAttorneys.${i}.address`, e.target.value)}/>
          </div>
        ))}
        <button type="button" onClick={addReplacement} className="link">+ Add replacement attorney</button>

        <h2 className="text-xl font-semibold">Decisions & preferences</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="space-y-1">
            <span className="text-sm font-medium">How should attorneys act?</span>
            <select className="w-full border rounded-xl p-3" value={form.decisions.howAttorneysAct} onChange={e=>update("decisions.howAttorneysAct", e.target.value)}>
              <option value="jointAndSeveral">Jointly and severally (recommended for flexibility)</option>
              <option value="joint">Joint (all must agree on every decision)</option>
            </select>
          </label>
          {form.type==="LP1H" && (
            <label className="space-y-1">
              <span className="text-sm font-medium">Life‑sustaining treatment</span>
              <select className="w-full border rounded-xl p-3" value={form.decisions.lifeSustainingTreatment} onChange={e=>update("decisions.lifeSustainingTreatment", e.target.value)}>
                <option value="donor">Donor to decide (if possible)</option>
                <option value="attorneys">Attorneys to decide</option>
              </select>
            </label>
          )}
        </div>
        <textarea placeholder="Preferences (optional)" className="border rounded-xl p-3 w-full" rows={3} value={form.decisions.preferences} onChange={e=>update("decisions.preferences", e.target.value)} />
        <textarea placeholder="Instructions (optional)" className="border rounded-xl p-3 w-full" rows={3} value={form.decisions.instructions} onChange={e=>update("decisions.instructions", e.target.value)} />

        <h2 className="text-xl font-semibold">Certificate provider</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input placeholder="Name" className="border rounded-xl p-3" value={form.certificateProvider.name} onChange={e=>update("certificateProvider.name", e.target.value)}/>
          <input placeholder="Address" className="border rounded-xl p-3" value={form.certificateProvider.address} onChange={e=>update("certificateProvider.address", e.target.value)}/>
        </div>

        <h2 className="text-xl font-semibold">Correspondent (OPG contact)</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input placeholder="Name" className="border rounded-xl p-3" value={form.correspondent?.name||""} onChange={e=>update("correspondent.name", e.target.value)}/>
          <input placeholder="Address" className="border rounded-xl p-3" value={form.correspondent?.address||""} onChange={e=>update("correspondent.address", e.target.value)}/>
          <input placeholder="Email" className="border rounded-xl p-3" value={form.correspondent?.email||""} onChange={e=>update("correspondent.email", e.target.value)}/>
        </div>

        {error && <p className="text-red-600">{error}</p>}
        <button disabled={saving} onClick={goToCheckout} className="btn">{saving? "Preparing…" : `Pay £7.99 & Download`}</button>
        <p className="text-xs text-slate-500">You’ll be redirected to Stripe Checkout. On success, you’ll receive your pack by email and can download it.</p>
      </div>
    </div>
  );
}
