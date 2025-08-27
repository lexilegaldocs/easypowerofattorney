import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Easy Power of Attorney — OPG‑aligned LPA pack for £7.99",
  description: "Create your Lasting Power of Attorney (LP1F or LP1H) info pack in plain English for just £7.99 — with step‑by‑step guidance and email delivery.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <Header />
        <main className="containered">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
