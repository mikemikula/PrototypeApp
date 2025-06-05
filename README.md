# Salesforce Consultancy Lead Generation Site

A modern, responsive marketing site with lead generation capabilities for a Salesforce consultancy. Built with Next.js 15, TypeScript, Tailwind CSS v4, and Prisma.

![image](https://github.com/user-attachments/assets/f14349cc-c4aa-40e9-a76d-ff0fed2fd6ef)
![image](https://github.com/user-attachments/assets/6ae4419f-ee69-42bd-a451-20f769d0d2d1)

## Features

- 🎯 **Lead Generation Form**: Captures visitor details and syncs to Salesforce
- 🚀 **Modern Tech Stack**: Next.js 15 with App Router, TypeScript strict mode
- 🎨 **Responsive Design**: Tailwind CSS v4 with mobile-first approach
- 🗄️ **Database Integration**: PostgreSQL with Prisma ORM
- 🔒 **Rate Limited API**: 100 requests per IP per minute
- ✅ **Form Validation**: React Hook Form + Zod schema validation
- 🔄 **Salesforce Sync**: OAuth2 integration with retry logic
- 📊 **Observability**: Error logging and performance monitoring

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL 15 + Prisma 5
- **Package Manager**: pnpm
- **Forms**: React Hook Form + Zod
- **Testing**: Jest + Playwright
- **CI/CD**: Husky + lint-staged

## Prerequisites

- Node.js 18+
- pnpm 8+
- PostgreSQL 15+
- Salesforce Developer Account

## Quick Start

1. **Clone and install dependencies**:

   ```bash
   git clone <repository-url>
   cd sf-consultancy-leadgen
   pnpm install
   ```

2. **Set up environment variables**:

   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Set up database**:

   ```bash
   pnpm db:push
   pnpm db:generate
   ```

4. **Run development server**:

   ```bash
   pnpm dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm verify` - Run all checks (type-check, lint, test)
- `pnpm test` - Run unit tests
- `pnpm test:e2e` - Run end-to-end tests
- `pnpm db:studio` - Open Prisma Studio

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Home page
│   └── api/leads/route.ts  # Lead submission API
├── components/
│   ├── Hero/Hero.tsx       # Marketing hero section
│   └── LeadForm/           # Lead capture form
├── lib/
│   ├── prisma.ts          # Database client
│   ├── salesforce.ts      # Salesforce integration
│   └── validators/        # Zod schemas
└── types/index.d.ts       # Global types
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- **DATABASE_URL**: PostgreSQL connection string
- **SALESFORCE\_\***: Salesforce OAuth2 credentials
- **RATE*LIMIT*\***: API rate limiting configuration

## Deployment

1. **Verify everything works**:

   ```bash
   pnpm verify
   ```

2. **Build for production**:

   ```bash
   pnpm build
   ```

3. **Deploy to your platform** (Vercel, Railway, etc.)

## Success Metrics

- API P95 latency < 250ms
- Form submission error rate < 0.1%
- WCAG 2.2 AA accessibility compliance
- LCP < 1.8s on 4G networks

## License

Private - All rights reserved
