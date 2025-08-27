'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const nav = [
    { href: "/", label: "Home" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/start", label: "Start my LPA" },
    { href: "/pricing", label: "Pricing" },
    { href: "/faqs", label: "FAQs" },
  ];
  return (
    <header className="border-b bg-white/70 backdrop-blur supports-backdrop-blur sticky top-0 z-40">
      <div className="containered flex items-center gap-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Easy Power of Attorney logo" width={120} height={32} priority/>
        </Link>
        <nav className="ml-auto hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={
              "text-sm font-medium hover:text-brand " + (pathname===n.href?"text-brand":"text-slate-700")
            }>{n.label}</Link>
          ))}
          <Link href="/start" className="btn">Start now – £7.99</Link>
        </nav>
      </div>
    </header>
  )
}
