# Madi-Tota™ — Experience Freeze v1.0 · Build, Deploy & Handover

Status: **FROZEN.** No further visual changes without written CEO/COO authorisation.
This is a non-live prototype. Mock data only. No real payments, no real employee
data collection, no regulated activity.

## 1. Build & deploy

Requirements: Node.js 20+ (or Bun 1.1+), npm or bun.

```bash
npm install          # or: bun install
npm run dev          # local dev server on http://localhost:8080
npm run build        # production build -> dist/
npm run preview      # serve the production build locally
npm run lint         # eslint
npx vitest run       # unit tests (fee engine, accrual)
```

Deployment: the output in `dist/` is a static SPA. Host on any static host
(Lovable publish, Netlify, Vercel, S3 + CloudFront, Nginx). Configure a SPA
fallback so all unknown paths rewrite to `/index.html`.

GitHub export: use the Lovable editor — **GitHub → Connect / Export to GitHub**.
The exported repository is the source of truth for CTO handover.

## 2. Environment variables (names only — never commit values)

The frozen prototype runs with **no** environment variables. The names below are
reserved for the production build and must be supplied by the deploying team.

| Name | Purpose |
| --- | --- |
| `VITE_APP_STAGE` | `prototype` \| `staging` \| `production` — drives stage badges |
| `VITE_SUPABASE_URL` | Backend project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public anon key (publishable) |
| `VITE_POSTHOG_KEY` | Product analytics public key |
| `VITE_POSTHOG_HOST` | Analytics host |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side only — never exposed to the client |
| `RESEND_API_KEY` | Transactional email (server-side only) |
| `TWILIO_ACCOUNT_SID` | OTP / messaging (server-side only) |
| `TWILIO_AUTH_TOKEN` | OTP / messaging (server-side only) |
| `TWILIO_MESSAGING_SERVICE_SID` | OTP sender configuration |

No secret values appear in this repository.

## 3. Asset inventory

Brand and imagery (`public/brand/`):

- `madi-tota-lockup.webp` — official M-mark lockup (favicon, OG, loading, founder hero)
- `mark.png` — icon-only mark
- `workforce-sectors.webp` — workforce hero
- `workers-map.webp`, `household-workers.webp` — supporting imagery
- `vertical-clinic.webp`, `vertical-logistics.webp`, `vertical-retail.webp` —
  future-vertical concepts. Caption mandatory: “Illustrative concept — future vertical”.
- Founder portrait — used in Founder Letter, Founder Story, credibility bar.
- `utlwala-tactical-systems-lockup.png` (canonical, CEO-provided) +
  `utlwala-tactical-systems-lockup.webp` (optimised twin, used in-page) — Utlwala
  parent-company gold shield emblem. Placements: Utlwala Vision section (72–96px,
  dark panel) and footer (40–48px), per CTO Directive 010-A §2A. Alt text
  (verbatim): “Utlwala Tactical Systems — gold shield emblem. African Systems.
  Global Standard.” Never used at hero size; never replaces or resizes the
  Madi-Tota lockup; never watermarked; tagline never cropped.
- `bpo-call-centre.webp` (optimised, ≤300KB; source kept at
  `source/bpo-call-centre-source.webp`) — BPO/call-centre workforce photo.
  Placement: lead image, Employers section only, 16:9 crop, per CTO Directive
  010-A §2B. Caption (verbatim): “BPO & CX workforces — our pilot segment.
  Shift-based, WhatsApp/USSD-native.” Alt text (verbatim): “South African BPO
  and call-centre agents wearing headsets at workstations with performance
  dashboards.” No text overlays, no filters, no use outside this section.

Any image slot without an approved asset renders
“[PHOTO PENDING — CEO approval required]” /
“[PHOTOGRAPHY COMMISSION PENDING — CEO approval]”.

## 4. Governed logic modules (do not fork)

- `src/lib/fees.ts` — the single fee engine. Fee = round(A × r); You receive = A − Fee;
  Payroll recovery = A. Integer cents. CHILL 5.8%, ZAP 11.1%, cap 20%.
- `src/lib/governance.ts` — doctrine line, regulatory statement, agreement version,
  consent record model, prototype hash.
- `src/lib/accrual.ts`, `src/lib/accessWindow.ts` — earned-wage accrual and the
  payday-relative access window (fails closed when dates are unknown).
- `src/lib/vas.ts` — VAS/airtime pricing, deliberately separate from the EWA engine.
  Labelled “Separate commercial model — pending policy approval.”

Locked doctrine, rendered wherever money is shown:
“The fee is deducted before disbursement. Payroll recovery equals the worker's
requested amount.”

Only permitted regulatory sentence:
“Madi-Tota is designed around access to earned wages rather than conventional
credit. Regulatory classification remains subject to independent legal counsel
opinion.”

## 5. Key routes

`/` home · `/app` app prototype · `/investor-demo` ten-beat guided tour ·
`/compliance` trust & compliance centre · `/privacy` POPIA notice ·
`/pilot` pilot interest list.
