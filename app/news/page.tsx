export default function News() {
  const items = [
    {
      title: "How to make and register an LPA",
      source: "GOV.UK",
      href: "https://www.gov.uk/power-of-attorney",
    },
    {
      title: "Avoiding common errors when completing an LPA",
      source: "Office of the Public Guardian",
      href: "https://www.gov.uk/government/publications/avoiding-errors-when-completing-a-lasting-power-of-attorney-form/avoiding-errors-when-completing-a-lasting-power-of-attorney-form",
    },
    {
      title: "Age UK: Setting up an LPA",
      source: "Age UK",
      href: "https://www.ageuk.org.uk/information-advice/money-legal/legal-issues/power-of-attorney/",
    }
  ];
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold">Why LPAs matter</h1>
      <p className="text-slate-700 mt-2">Recent guidance and explainers from official sources and UK charities.</p>
      <div className="mt-6 grid gap-4">
        {items.map((it) => (
          <a key={it.href} href={it.href} target="_blank" className="card p-5 hover:shadow">
            <h3 className="font-semibold">{it.title}</h3>
            <p className="text-sm text-slate-600">{it.source}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
