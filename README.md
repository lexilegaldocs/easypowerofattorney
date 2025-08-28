# Easy Power of Attorney

Create a Lasting Power of Attorney information pack (LP1F/LP1H) in plain English for **£7.99**.  
Built with Next.js, Stripe, Supabase (DB + Storage), and pdf-lib.

> **Important:** We provide a document preparation service. We do **not** provide legal advice.  
> You must print, sign in the correct order with witnesses/certificate provider, and register with the OPG.

---

## Features

- Step‑by‑step form for LP1F/LP1H with clear helper text
- Stripe Checkout £7.99 (GBP)
- PDF pack generation (pdf-lib)
- Email delivery via Resend (optional)
- Supabase storage for public download url
- Tailwind UI, mobile friendly

## Quick start

1. **Clone & install**
   ```bash
   npm i
   npm run dev
   ```

2. **Set env vars** (`.env.local`):
   ```bash
# Base URL of your deployed Next.js app (e.g. https://easy-lpa.vercel.app)
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx_or_test_key
# optional if you add webhooks
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Supabase (create a free project, create table + storage per README)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyxxx

# Resend (optional for emailing PDFs)
RESEND_API_KEY=re_xxx

   ```

3. **Supabase setup (free)**  
   - Create a project → copy URL + anon key into `.env.local`  
   - SQL (create `submissions` table):
     ```sql
     create table if not exists submissions (
       id uuid primary key default gen_random_uuid(),
       form jsonb not null,
       status text not null default 'created',
       download_url text,
       created_at timestamp with time zone default now()
     );
     ```
   - Storage bucket: create **docs** bucket, public.

4. **Stripe**  
   - Create account (free), get **Secret key**.  
   - No product setup needed (we pass price_data directly).  

5. **Resend (optional)**  
   - Add `RESEND_API_KEY` if you want automatic email delivery.

6. **Run locally**
   ```bash
   npm run dev
   ```

7. **Deploy (Vercel — free)**  
   - Connect repo → set env vars in Vercel → Deploy.

## OPG Guidance & Compliance

- This project generates a clean **LPA information pack** aligned to the sections used by the OPG (LP1F/LP1H).  
- It does **not** include the official OPG forms. Users must print and sign in the correct order and submit to the OPG.  
- Add links to the official forms and guide on GOV.UK:
  - Make a lasting power of attorney: https://www.gov.uk/power-of-attorney  
  - Avoiding common errors guide: https://www.gov.uk/government/publications/avoiding-errors-when-completing-a-lasting-power-of-attorney-form/avoiding-errors-when-completing-a-lasting-power-of-attorney-form  

> **Note on fees:** The OPG registration fee is typically **£82** per LPA (subject to change and reductions/exemptions). Check GOV.UK for the latest. (Generated 2025-08-27).

## Roadmap (nice‑to‑haves)

- Use the **official LP1F/LP1H PDF** as a background template and write to form coordinates
- Add saved accounts + return later
- Webhooks for robust fulfilment
- Accessibility polish + translations
- Built‑in AI hints per question

## Licence

Copyright © 2025 Easy Power of Attorney.


## Official PDF form filling

- Download the latest **LP1F** and **LP1H** forms from GOV.UK and place them here: `public/templates/LP1F.pdf` and `public/templates/LP1H.pdf`.
- The code will try to fill those templates directly. If not present, it falls back to the summary pack.
- Adjust coordinates in `lib/coords.ts` after a quick visual test (values provided are starter positions and may need nudging).
- 

