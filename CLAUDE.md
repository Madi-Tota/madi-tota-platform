# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Madi-Tota is a **non-live, investor-facing prototype** for an earned-wage-access (EWA) product in South Africa, built for Utlwala Tactical System (Pty) Ltd. It is a client-only Vite/React marketing + demo site — there is no backend, no real authentication, and no persisted data. Every "transaction" (USSD, WhatsApp, PWA, web) is simulated in-browser using shared calculation logic.

The project originates from and is still edited via **Lovable.dev** (see `lovable-tagger` / `@lovable.dev/vite-plugin-*` in `vite.config.ts` and the `lovable.app` URLs in `index.html`), so changes made here can also show up as Lovable edits and vice versa.

Because this is a prototype for regulatory/investor review, compliance framing is a first-class concern, not an afterthought — see "Compliance and governance conventions" below before changing any copy involving money, consent, or data collection.

## Commands

Package manager: **npm** is authoritative (`package-lock.json` is committed). A `bun.lockb` also exists in the repo but is not actively maintained — don't regenerate/commit bun-specific changes unless asked.

```bash
npm install            # install dependencies
npm run dev            # start Vite dev server on :8080
npm run build           # production build
npm run build:dev       # build in development mode (unminified, with Lovable component tagger)
npm run preview          # preview a production build
npm run lint             # eslint over the whole repo
npm run test              # run the vitest suite once (CI mode)
npm run test:watch         # run vitest in watch mode
```

Running a single test file or test case (vitest):

```bash
npx vitest run src/test/accrual.test.ts
npx vitest run -t "reference case"
```

There is no separate typecheck script; TypeScript checking happens as part of `vite build` (via `tsc -b` referenced project config) — run `npm run build` if you need to verify types without a full lint pass. `tsconfig` has `strict: false`, `noImplicitAny: false`, `strictNullChecks: false` — this is intentionally loose (Lovable/shadcn default), don't tighten it project-wide as a side effect of an unrelated change.

## Architecture

### Stack
Vite + React 18 + TypeScript, React Router (`BrowserRouter`), TanStack Query (provider is wired up in `App.tsx` but there is no real data-fetching yet — everything is static/mock), Tailwind CSS + shadcn/ui (Radix primitives), `react-i18next` for translations, `react-hook-form`/`zod` deps are present for future form validation. Path alias `@` → `./src` (defined in `tsconfig*.json` and `vite.config.ts`, and mirrored in `components.json` for the shadcn CLI).

### Routing and layout
All routes are declared flatly in `src/App.tsx`, nested under a single `<Layout>` (`src/components/Layout.tsx`) that renders `Header`, a persistent "SIMULATED DATA — non-live prototype" banner, `<Outlet/>`, and `Footer`. New pages go in `src/pages/` and get one line in `App.tsx`; add new routes **above** the catch-all `*` → `NotFound` route.

`src/pages/` corresponds to top-level audiences/sections (Employees, Employers, Household, Learn, MoneyWise, Support, Pilot, FieldAgent, Compliance, AppPrototype, legal pages, etc.). `src/components/sections/` holds long-form landing-page sections used mainly by `Home.tsx`. `src/components/ui/` is the shadcn/ui-generated primitive library — treat these as generated components; prefer composing them rather than hand-editing, and use `npx shadcn@latest add <component>` to add new ones (it will honor `components.json`).

### The governed calculation modules (`src/lib/`) — read before touching money/fee/access logic

Several `src/lib/*.ts` files are explicitly called out in their own header comments as the **single source of truth** for a piece of product logic, tied to internal decision/amendment references (`DEC-008`, `DEC-012`, `AMENDMENT A1`, etc.). These are shared across every channel simulator (web, USSD, WhatsApp, PWA, employer portal) and tests assert against them directly:

- `src/lib/fees.ts` — the fee/quote engine (`quote()`, `PRODUCT_RATES` for CHILL 5.8% / ZAP 11.1%, `confirmationLine()`, `CONSENT_STATEMENT`, `remainingCapacity()`). All money is handled in integer cents internally (`toCents`/`fromCents`) to avoid float drift, converted to Rand only for display. The fee is **never** added to payroll recovery — recovery always equals the requested amount, not the net paid out.
- `src/lib/fee-schedule.ts` — re-exports `fees.ts` and adds display-formatted constants (`FEE_SCHEDULE`, `FEE_LABELS`). Components should generally import from here (or `fees.ts` directly) rather than restating a rate.
- `src/lib/accrual.ts` — the earned-wage accrual formula (`earned = (net / workingDays) * daysWorked`, capped at 20% of net pay minus prior draws). Has a canonical reference case (R12,000 salary / 22 working days / 14 worked / R500 prior draws → R1,900 available) that is asserted in `src/test/accrual.test.ts`; treat that number as a regression guardrail if you touch this file.
- `src/lib/accessWindow.ts` — when the draw-access window is open (opens 7 days after payday, closes 5 days before the next payday), for both a generic pay-cycle model and an employer-configured (`lastPayday`/`nextPayday`) model. The employer-configured version **fails closed** (access denied) when payday dates are unknown or unparsable — preserve that behavior if you modify it.
- `src/lib/vas.ts` — value-added-services (airtime/data/electricity) pricing. Deliberately **isolated** from the EWA/accrual engine — no VAS value may be derived from or applied to a wage-access quote, and vice versa.
- `src/lib/brand.ts` — central brand/content constants: copy, contact routing (`CONTACTS`), nav links, compliance strings (`COMPLIANCE`), simulated-data defaults used by every simulator (`SIM_SALARY`, `SIM_WORKING_DAYS`, etc.).

**Rule of thumb inherited from the code's own comments:** never hardcode a fee percentage, a Rand amount, or a cap anywhere in a component — import it from these modules. If you need a new constant used in more than one place, it likely belongs in `brand.ts` or alongside the related `lib` module, not inline in JSX.

### Compliance and governance conventions

This is explicitly a **non-live prototype using mock data only** — no real payments, no real payroll/ID data, no regulated activity, no claim of regulatory approval. This is enforced in the UI in a few consistent ways that should be preserved when adding similar features:
- The global banner in `Layout.tsx` and the `SimBadge` component mark simulated data everywhere it appears.
- `DrawConfirmation` shows four governed figures (amount, fee, net received, payroll recovery) identically across every channel, gated by an **unticked-by-default** consent checkbox — no tick, no transaction.
- `ProtoForm` never actually stores/transmits submitted data (it's a demo) and always shows `COMPLIANCE.formWarning` ("do not submit salary, ID number or payroll documents...") plus a POPIA consent checkbox.
- Copy referencing regulatory status, deductions, or POPIA is centralized in `COMPLIANCE` in `brand.ts` — reuse those strings rather than writing new compliance copy inline.

### Channel simulators

`src/components/UssdSimulator.tsx`, `WhatsAppDemo.tsx`, and the PWA-style `src/pages/AppPrototype.tsx` each re-implement a different channel's UI chrome (USSD menu, WhatsApp chat bubbles, app screens) but all call into the same `src/lib/fees.ts` / `accrual.ts` engine for numbers — when changing draw/fee behavior, update the shared `lib` module rather than patching a channel's local copy.

### i18n

`src/i18n/index.ts` configures `i18next` with `react-i18next` and browser language detection (localStorage → navigator, cached under `madi-tota.language`). `SUPPORTED_LANGUAGES` lists all 12 official-SA-relevant languages, but only `en`, `zu`, `xh`, `af`, `nso` (`PILOT_LANGUAGES`) currently ship translation JSON under `src/i18n/locales/`; the rest fall back to English. Non-English copy is expected to be marked "TRANSLATION PENDING HUMAN VERIFICATION" rather than presented as verified — don't ship machine-translated strings as if they were final copy.

### Testing

Vitest + `jsdom` + `@testing-library/*`, configured in `vitest.config.ts` (setup file `src/test/setup.ts`, which stubs `window.matchMedia`). Tests live under `src/test/` and match `src/**/*.{test,spec}.{ts,tsx}`. Coverage today is thin (`accrual.test.ts` covers the fee/accrual engine's key invariants — the reference case, the negative-availability floor, and the 20% cap — plus one placeholder `example.test.ts`); when adding logic to a governed `lib` module, add/extend cases in the same style (reference numbers asserted exactly, edge cases asserted as bounds).
