# Salesforce Consultancy – Home Page PRD (MVP)

## 1. Purpose

Deliver a **single-page marketing site** with an embedded **lead-generation form** that:

1. Persists submissions to PostgreSQL via Prisma.
2. Provides immediate UX feedback (success / error).

> Out of scope: CMS, blog, testimonial slider, advanced analytics, multi-lang.

## 2. Success Criteria

| KPI                        | Target       |
| -------------------------- | ------------ |
| API P95 latency            | < 250 ms     |
| Form submission error rate | < 0.1 %      |
| Deployment frequency       | ≥ 1 per week |

## 3. Core User Flows

1. Visitor lands on `/` and sees hero + form.
2. Visitor submits valid details.
3. API validates & writes to DB.
4. UI shows confirmation; errors logged to Sentry.

## 4. Functional Requirements

### 4.1 Frontend (Next.js 15 + TS + Tailwind v4)

- Hero section (placeholder copy & CTA).
- Lead form fields: fullName, company, email, phone (opt), projectBudget, message (opt).
- Form validation with Zod & react-hook-form.
- Disable submit until valid; show loading & toast.

### 4.2 Backend

- **Route**: `POST /api/leads`
- **Validation**: shared Zod schema.
- **DB**: Persist using Prisma model `Lead` (see §6).
- Return 201 JSON `{id: string}` on success.

### 4.3 Observability

- Log all errors + stack traces to Sentry.
- Log API performance to Vercel Analytics.

## 5. Non-Functional Requirements

1. **Accessibility**: WCAG 2.2 AA (semantic HTML, keyboard nav).
2. **Security**: Rate-limit 100 req/IP/min; env vars for secrets; OWASP headers.
3. **Performance**: LCP < 1.8 s on 4G; ship only critical CSS.
4. **Testing**: Unit (Jest) for utils; e2e (Playwright) for form happy path.

## 6. Data Model (Prisma)

```prisma
model Lead {
  id            String   @id @default(cuid())
  fullName      String
  company       String
  email         String   @unique
  phone         String?
  projectBudget String
  message       String?
  salesforceId  String?
  createdAt     DateTime @default(now())
}
```

## 7. Tech Stack & Tooling

- **Next.js 15** (App Router, Server Actions)
- **TypeScript** – `strict`.
- **Tailwind CSS v4** – utility-first, BEM class names.
- **Prisma 5** + **PostgreSQL 15**.
- **pnpm** workspaces; run `pnpm verify` in CI.
- **ESLint + Prettier**, Husky pre-commit hook.

## 8. Project Milestones

| Week | Deliverable                           |
| ---- | ------------------------------------- |
| 1    | Repo setup, DB schema, CI/CD pipeline |
| 2    | Frontend form + validation            |
| 3    | Backend API + DB integration          |
| 4    | Tests & prod deploy                   |

# File Tree – Salesforce Consultancy MVP

The paths are relative to the repository root (`PrototypeApp/`).

```text
PrototypeApp/
├─ .env.example                      # Environment variable template
├─ .eslintrc.json                    # ESLint configuration
├─ .gitignore                        # Ignore rules (node_modules, .next, etc.)
├─ .prettierrc                       # Prettier formatting rules
├─ jest.config.ts                    # Jest unit-test config
├─ playwright.config.ts              # Playwright e2e config
├─ next.config.mjs                   # Next.js runtime configuration
├─ postcss.config.js                 # Tailwind / PostCSS plugins
├─ tailwind.config.ts                # Tailwind v4 config
├─ tsconfig.json                     # TypeScript compiler options
├─ pnpm-workspace.yaml               # pnpm workspace definition
├─ package.json                      # Root manifest (scripts, deps)
├─ README.md                         # Project overview & setup
├─ prd.md                            # Product requirements document
├─ file-tree.md                      # <— this file
│
├─ prisma/
│  ├─ schema.prisma                  # Data-model & datasource definition
│  └─ seed.ts                        # Seed script (optional placeholder)
│
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx                  # Root layout (includes <html>, <body>)
│  │  ├─ globals.css                 # Import Tailwind base/components/utilities
│  │  └─ page.tsx                    # Home page with Hero + LeadForm
│  │
│  │  └─ api/
│  │     └─ leads/
│  │        └─ route.ts              # POST handler for /api/leads (server action)
│  │
│  ├─ components/
│  │  ├─ Hero/
│  │  │  └─ Hero.tsx                 # Marketing hero section
│  │  └─ LeadForm/
│  │     ├─ LeadForm.tsx             # Controlled form component
│  │     └─ useLeadForm.ts           # Client-side hook (react-hook-form logic)
│  │
│  ├─ lib/
│  │  ├─ prisma.ts                   # Prisma singleton client
│  │  └─ validators/
│  │     └─ leadSchema.ts            # Zod schema + type exports
│  │
│  └─ types/
│     └─ index.d.ts                  # Global TypeScript types (if needed)
│
├─ public/
│  └─ images/                        # Static marketing assets
│
├─ tests/
│  ├─ unit/
│  │  └─ leadSchema.test.ts          # Unit test for validation logic
│  └─ e2e/
│     └─ lead-form.spec.ts           # Playwright happy-path test
│
└─ .husky/
   └─ pre-commit                     # Lint-staged & tests gate
```

> Note: Adjust or extend paths as the project evolves (e.g., add CI workflow under `.github/`).
