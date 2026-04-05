# CLAUDE.md — LeadOS-Gov (sitbid.com)

This file configures Claude Code's behavior for the LeadOS-Gov project.
Read this file completely before writing any code.

---

## Project Overview

**LeadOS-Gov** is a Next.js 14 App Router government SaaS platform for public sector lead management.

- **Stack**: Next.js 14, Clerk (auth), Neon Postgres (`leados_gov` DB), Drizzle ORM, Inngest, Stripe, shadcn/ui
- **Hosting**: Vercel (project: `prj_MrCHRfSE1tdtaLy7Niwr7D4DlJ8c`)
- **Domain**: sitbid.com

---

## Design Rules (MANDATORY)

**Before generating any UI component, page, or layout, read `DESIGN.md` in this project root.**

The DESIGN.md is the single source of truth for all visual decisions. The rules below reinforce it:

### Colors
- Primary CTA: `#635BFF` (Gov Purple) — for all primary action buttons
- Heading color: `#061B31` (Gov Navy) — not pure black
- Body text: `#171717` — Vercel's near-black
- Background: `#FFFFFF` (page), `#FAFAFA` (surfaces), `#F6F9FC` (alt sections)
- Premium marker: `#C9A84C` (Dynasty Gold) — one per page maximum
- NEVER use green in LeadOS-Gov — green belongs to PA CROP

### Typography
- Headlines (display/hero): Geist font, weight 600, negative letter-spacing
- Body + UI: Inter font
- Data/IDs/amounts: Geist Mono
- Never mix fonts within a semantic context

### Borders & Shadows
- **Never use CSS `border` on cards** — use shadow-as-border: `box-shadow: rgba(0,0,0,0.08) 0px 0px 0px 1px`
- Card elevation: `rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 4px`
- Focus ring: `box-shadow: 0 0 0 2px #635BFF`

### Components
- Button radius: `6px` (rectangular, not pill — pills are for badges only)
- Status badges: always `9999px` pill + labeled text + semantic color (never color alone)
- Cards: `8px` radius, `24px` padding
- Inputs: `6px` radius, ring shadow technique, `#635BFF` focus

### States (Required on every component)
Every interactive component must have all of these implemented:
1. Default
2. Hover
3. Focus (with `#635BFF` ring)
4. Active/Pressed
5. Disabled
6. Loading (skeleton or spinner)

---

## Architecture Rules

### File Conventions
- Page files: `app/(routes)/[route]/page.tsx`
- Components: `components/[domain]/[ComponentName].tsx`
- Server actions: `app/actions/[domain].ts`
- Database: `lib/db/schema/[table].ts` (Drizzle schema)
- API routes: `app/api/[resource]/route.ts`

### Component Rules
- Use shadcn/ui as the component base — customize via className, not by forking components
- All data-fetching components are Server Components unless they need interactivity
- Use `loading.tsx` for every route segment — never leave a route without a loading state
- Clerk middleware protects all `/dashboard` and `/admin` routes

### Database Rules
- All queries go through Drizzle — no raw SQL in components
- Neon connection string: use `DATABASE_URL` env variable
- Always use transactions for multi-table writes
- Add indexes for all foreign keys and frequently filtered columns

### Stripe Rules
- All payment UI must use Stripe Elements — never custom credit card inputs
- Webhook handler: `app/api/webhooks/stripe/route.ts`
- Test mode in development, live mode in production only

### Inngest Rules
- Background jobs live in `inngest/functions/[domain].ts`
- Use Inngest for: email sends, lead notifications, subscription renewals, report generation
- Never block a request for work that can be queued

---

## Code Quality Standards

- TypeScript strict mode — no `any` types
- All server actions return typed `{ success: boolean; data?: T; error?: string }`
- Zod validation on all form inputs and API request bodies
- Error boundaries on all page-level and dashboard components
- All API routes return proper HTTP status codes

---

## Testing Considerations

- Unit test all server actions (Jest)
- E2E test critical paths: auth flow, bid submission, Stripe checkout (Playwright)
- Test WCAG AA contrast on all new color combinations

---

## Common Patterns

### Data Table Pattern
```tsx
// Always use this pattern for tabular data
<DataTable
  columns={bidColumns}
  data={bids}
  searchKey="title"
  statusFilter={true}
/>
```

### Status Badge Pattern
```tsx
// Always use semantic status tokens from DESIGN.md
<StatusBadge status="pending" /> // renders with correct colors automatically
```

### Server Action Pattern
```tsx
"use server"
export async function createBid(data: BidFormData) {
  const validated = bidSchema.parse(data)
  // ... implementation
  return { success: true, data: bid }
}
```

---

## Environment Variables Required

```
DATABASE_URL=          # Neon Postgres
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
```

---

## Do Not

- Do not use `pages/` directory — this is App Router only
- Do not create client components unnecessarily — default to Server Components
- Do not write raw SQL — use Drizzle query builder
- Do not skip loading states — every async boundary needs one
- Do not use `useEffect` for data fetching — use Server Components or SWR
- Do not hardcode colors — always reference CSS variables or DESIGN.md tokens
- Do not use CSS `border` on cards — use the shadow-as-border technique
