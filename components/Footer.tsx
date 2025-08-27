import Link from "next/link";
export default function Footer() {
  return (
    <footer className="mt-20 border-t">
      <div className="containered py-10 text-sm text-slate-600">
        <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Easy Power of Attorney. Document preparation only – not legal advice.</p>
          <nav className="flex gap-6">
            <Link className="link" href="/legal/disclaimer">Disclaimer</Link>
            <Link className="link" href="/legal/privacy">Privacy</Link>
            <Link className="link" href="/legal/terms">Terms</Link>
            <Link className="link" href="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
