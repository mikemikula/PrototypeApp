# PRD Implementation Checklist

This checklist guides an AI agent through building the Salesforce Consultancy marketing site described in `prd.md`.  Complete items **in order**; mark each as done (`[x]`) once fully implemented **and** verified via `pnpm verify`.

> Conventions
> 1. All commands use **pnpm**.
> 2. Use `@/` alias imports and index barrel files.
> 3. Adhere to SOLID, DRY, SoC and other user rules.
> 4. Update this file immediately after completing each task.

---

## 0 — Repository Bootstrap
- [ ] `/package.json` – Initialize PNPM workspace root with Next.js 15, TypeScript **strict**, Tailwind v4, Prisma 5. Add `dev`, `build`, `start`, `verify` scripts.
- [ ] `/pnpm-workspace.yaml` – Define workspace packages (root only for now).
- [ ] `/.gitignore` – Ignore common Node, Next.js, and env files.
- [ ] `/.env.example` – Template env vars for PostgreSQL (database: `sf_consultancy_leadgen_v2`) and Salesforce credentials. Include `DATABASE_URL=postgresql://user:pass@localhost:5432/sf_consultancy_leadgen_v2`.
- [ ] `/README.md` – High-level setup + run instructions.

## 1 — Tooling & Config
- [ ] `/tsconfig.json` – Strict TS config with path alias `@/*`.
- [ ] `/next.config.mjs` – Enable App Router, TypeScript, Tailwind, and experimental settings as needed.
- [ ] `/tailwind.config.ts` – Tailwind v4 preset with content paths `src/**/*.{ts,tsx}`.
- [ ] `/postcss.config.js` – Tailwind + Autoprefixer.
- [ ] `/.eslintrc.json` + `/.prettierrc` – Lint & format rules per user guidelines.
- [ ] `/.husky/pre-commit` – Lint-staged + `pnpm verify` gate.

## 2 — Database
- [ ] `/prisma/schema.prisma` – Add `Lead` model per PRD §6.  Configure PostgreSQL datasource & generator.
- [ ] `/prisma/seed.ts` – Optional seed script placeholder.
- [ ] `/src/lib/prisma.ts` – Prisma singleton client (fail-fast on errors).

## 3 — Global App Shell
- [ ] `/src/app/globals.css` – Import Tailwind base/components/utilities.
- [ ] `/src/app/layout.tsx` – Root `<html>` & `<body>` with metadata, global providers.

## 4 — Home Page & Components
- [ ] `/src/components/Hero/Hero.tsx` – Marketing hero section (BEM classes).
- [ ] `/src/components/LeadForm/useLeadForm.ts` – `react-hook-form` logic with Zod validation.
- [ ] `/src/components/LeadForm/LeadForm.tsx` – Controlled form UI (disable until valid, loading state).
- [ ] `/src/app/page.tsx` – Assemble `Hero` + `LeadForm`.

## 5 — Validation Logic
- [ ] `/src/lib/validators/leadSchema.ts` – Zod schema export & TS types.

## 6 — API Layer
- [ ] `/src/app/api/leads/route.ts` – `POST /api/leads` handler: validate, persist to DB, call Salesforce, return `201 {id}`.  Include 100 req/IP/min rate-limit & error handling.
- [ ] `/src/lib/salesforce.ts` – OAuth2 client-credentials helper with 3× retry + exp-backoff.

---

✔ **End of checklist** – Update this file continually until all items are complete. 