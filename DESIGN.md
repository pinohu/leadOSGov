# DESIGN.md — LeadOS-Gov (sitbid.com)

> **Inherits from**: `DYNASTY-DESIGN.md` (read that first)  
> **Base sources**: Vercel layout system + Stripe color palette  
> **Product identity**: Government procurement meets fintech precision — the authority of a federal agency, the clarity of a Stripe checkout

---

## 1. Visual Theme & Atmosphere

LeadOS-Gov is a government SaaS platform that converts public sector leads into actionable intelligence. The design must project institutional authority without bureaucratic weight. Think: the precision of a well-engineered dashboard, the trust of a government seal, the payment-grade confidence of Stripe.

The page surface is a near-pure white (`#FFFFFF`) with `#171717` text — Vercel's gallery-like emptiness — but every CTA and payment surface borrows Stripe's deep violet-purple (`#635BFF`), signaling fintech trustworthiness. Headlines use Geist Sans with aggressive negative letter-spacing (−1.5px to −2.4px at display sizes), creating the compressed, engineered feel of infrastructure software. The shadow-as-border technique replaces all traditional CSS borders — `box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.08)` — keeping the interface clean and professional.

Government context means zero tolerance for ambiguity: every state (pending, approved, expired, verified, admin-only) must be immediately legible. The status badge system from DYNASTY-DESIGN.md is the authority — never use color alone.

**Key Characteristics:**
- Vercel precision grid: near-white canvas, `#171717` text, gallery-like whitespace
- Stripe purple (`#635BFF`) as the primary CTA and payment-surface color
- Geist Sans with extreme negative letter-spacing at display sizes (−2.4px at 48px)
- Geist Mono for data tables, API references, bid IDs, and technical labels
- Shadow-as-border technique: `0px 0px 0px 1px rgba(0,0,0,0.08)` replaces CSS borders
- Deep navy headings (`#061B31`) for institutional authority — not pure black
- Dynasty Gold (`#C9A84C`) for premium tier markers and trust badges
- Status badge system across all bid/lead states

---

## 2. Color Palette & Roles

### Primary Surfaces
- **Page White** (`#FFFFFF`): Page background, card surfaces — the gallery canvas
- **Near White** (`#FAFAFA`): Subtle surface tint, inner card backgrounds, table rows
- **Slate Surface** (`#F6F9FC`): Section alternation, form backgrounds — Stripe-borrowed
- **Gov Black** (`#0A0A0A`): Headings on light surfaces
- **Gov Near-Black** (`#171717`): Primary body text — Vercel's slightly warm dark

### Brand & Interactive
- **Gov Purple** (`#635BFF`): Primary CTA, active nav states, payment elements, focus rings
- **Gov Purple Hover** (`#4434D4`): Darker purple on hover/pressed states
- **Gov Purple Light** (`#EEF0FF`): Badge backgrounds, tinted surfaces for selected states
- **Gov Purple Text** (`#3730A3`): Purple text on light backgrounds
- **Gov Navy** (`#061B31`): Stripe-borrowed deep heading color — institutional authority
- **Gov Blue** (`#0A72EF`): Informational links, secondary actions

### Status System (from DYNASTY-DESIGN.md)
- **Verified** (`#15BE53` / bg `rgba(21,190,83,0.15)` / text `#108C3D`)
- **Pending** (`#FFA500` / bg `rgba(255,165,0,0.12)` / text `#8B5A00`)
- **Expired** (`#E53E3E` / bg `rgba(229,62,62,0.12)` / text `#B53333`)
- **Draft** (`#64748B` / bg `rgba(100,116,139,0.12)` / text `#475569`)
- **Admin** (`#7928CA` / bg `rgba(121,40,202,0.12)` / text `#6B21A8`)

### Dynasty Premium Markers
- **Dynasty Gold** (`#C9A84C`): Premium tier badges, verified agency markers
- **Gold Surface** (`#F0D99A`): Gold badge backgrounds
- **Gold Text** (`#8B6E2A`): Gold text on light backgrounds

### Neutrals
- **Gray 900** (`#0A0A0A`): Headings, heavy emphasis
- **Gray 700** (`#171717`): Primary body text
- **Gray 600** (`#4D4D4D`): Secondary text, descriptions
- **Gray 500** (`#64748B`): Tertiary text, metadata, table secondary cols
- **Gray 200** (`#E2E8F0`): Borders, dividers, table lines
- **Gray 100** (`#F1F5F9`): Row hover states, subtle backgrounds

### Shadows (Vercel technique)
- **Ring Border**: `rgba(0,0,0,0.08) 0px 0px 0px 1px`
- **Card Stack**: `rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 4px, rgba(0,0,0,0.04) 0px 8px 8px -8px`
- **Elevated**: `rgba(50,50,93,0.15) 0px 30px 45px -30px, rgba(0,0,0,0.08) 0px 18px 36px -18px`
- **Focus**: `0 0 0 2px #635BFF`

---

## 3. Typography Rules

### Font Stack
- **Display / Headlines**: `Geist`, fallback: `Inter, -apple-system, sans-serif`
- **Body / UI**: `Inter`, fallback: `-apple-system, system-ui, sans-serif`
- **Code / Data / IDs**: `Geist Mono`, fallback: `ui-monospace, SFMono-Regular, monospace`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|---|
| Hero Display | Geist | 48px | 600 | 1.05 | −2.4px | Page heroes, major section titles |
| Section Heading | Geist | 36px | 600 | 1.10 | −1.5px | Dashboard section headers |
| Card Title Large | Geist | 28px | 600 | 1.15 | −0.8px | Featured card headings |
| Card Title | Geist | 22px | 600 | 1.20 | −0.4px | Standard card titles |
| Sub-heading | Geist | 18px | 500 | 1.30 | −0.2px | Table headers, panel labels |
| Body Large | Inter | 18px | 400 | 1.60 | normal | Hero descriptions, intro text |
| Body | Inter | 16px | 400 | 1.50 | normal | Standard reading text |
| Body Emphasis | Inter | 16px | 500 | 1.50 | normal | Labels, emphasized text |
| Body Strong | Inter | 16px | 600 | 1.50 | −0.2px | Active states, callouts |
| Nav / Button | Inter | 14px | 500 | 1.43 | normal | Navigation, button labels |
| Caption | Inter | 13px | 400 | 1.40 | normal | Metadata, timestamps |
| Badge | Inter | 12px | 500 | 1.00 | 0.1px | Status badges, tags |
| Data ID | Geist Mono | 13px | 500 | 1.40 | normal | Bid IDs, reference numbers, API keys |
| Table Data | Geist Mono | 14px | 400 | 1.50 | normal | Numeric table cells, amounts |
| Code Block | Geist Mono | 14px | 400 | 1.60 | normal | API endpoints, code samples |

### Principles
- Display Geist at 48px always uses −2.4px letter-spacing — the engineered compression signals infrastructure
- Inter handles all user-facing prose — it's readable under stress (bidding deadlines, compliance reviews)
- Geist Mono for any reference number, dollar amount in tables, or API-related value — signals precision
- NEVER use Geist Mono for paragraph text — strictly for data and code contexts

---

## 4. Component Stylings

### Buttons

**Primary — Gov Purple**
- Background: `#635BFF`
- Text: `#FFFFFF`
- Padding: `10px 20px`
- Radius: `6px`
- Font: Inter 14px weight 500
- Hover: `#4434D4`
- Focus: `box-shadow: 0 0 0 2px #635BFF, 0 0 0 4px rgba(99,91,255,0.3)`
- Use: "Submit Bid", "Upgrade Plan", "Connect Account"

**Secondary — White Ring**
- Background: `#FFFFFF`
- Text: `#171717`
- Padding: `10px 20px`
- Radius: `6px`
- Shadow: `rgba(0,0,0,0.08) 0px 0px 0px 1px`
- Hover: background `#FAFAFA`
- Use: "View Details", "Export", "Cancel"

**Destructive**
- Background: `rgba(229,62,62,0.08)`
- Text: `#B53333`
- Border: `1px solid rgba(229,62,62,0.3)`
- Radius: `6px`
- Use: "Delete", "Revoke", "Remove"

**Premium CTA — Dynasty Gold**
- Background: `#C9A84C`
- Text: `#FFFFFF`
- Radius: `6px`
- Shadow: `rgba(201,168,76,0.3) 0px 4px 12px`
- Use: "Upgrade to Pro", "Unlock Premium Leads"

### Cards & Containers

**Standard Card**
- Background: `#FFFFFF`
- Shadow: `rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 4px`
- Radius: `8px`
- Padding: `24px`

**Dashboard Panel**
- Background: `#FFFFFF`
- Shadow: `rgba(0,0,0,0.08) 0px 0px 0px 1px`
- Radius: `8px`
- Header: `16px` bold, border-bottom `rgba(0,0,0,0.08) 0px 0px 0px 1px`

**Stat Card**
- Background: `#FFFFFF`
- Shadow: ring
- Radius: `8px`
- Metric: `32px Geist weight 600, −1.0px tracking`
- Label: `13px Inter weight 500, #64748B`

**Gov Data Table**
- Header: `#FAFAFA` background, `13px Inter weight 600, #64748B uppercase`
- Row: `#FFFFFF` default, `#F6F9FC` on hover
- Row border: `rgba(0,0,0,0.06) 0px 0px 0px 1px`
- Cell text: `14px Inter` for labels, `13px Geist Mono` for IDs/amounts
- Radius: `8px` on container

### Status Badges

```
Pill shape: 9999px radius
Padding: 2px 8px
Font: 12px Inter weight 500
Pattern: {status}-bg background, {status}-text color, 1px solid {status} at 30% opacity
```

| Badge | Background | Text | Border |
|---|---|---|---|
| Verified | `rgba(21,190,83,0.15)` | `#108C3D` | `rgba(21,190,83,0.3)` |
| Pending | `rgba(255,165,0,0.12)` | `#8B5A00` | `rgba(255,165,0,0.3)` |
| Expired | `rgba(229,62,62,0.12)` | `#B53333` | `rgba(229,62,62,0.3)` |
| Draft | `rgba(100,116,139,0.12)` | `#475569` | `rgba(100,116,139,0.3)` |
| Admin | `rgba(121,40,202,0.12)` | `#6B21A8` | `rgba(121,40,202,0.3)` |
| Premium | `#F0D99A` | `#8B6E2A` | `rgba(201,168,76,0.4)` |

### Forms & Inputs

- Background: `#FFFFFF`
- Border: `rgba(0,0,0,0.08) 0px 0px 0px 1px` (shadow technique)
- Radius: `6px`
- Padding: `10px 14px`
- Font: `16px Inter`
- Placeholder: `#94A3B8`
- Focus: border `#635BFF`, shadow `0 0 0 2px rgba(99,91,255,0.15)`
- Error: border `#E53E3E`, shadow `0 0 0 2px rgba(229,62,62,0.15)`
- Label: `13px Inter weight 500, #4D4D4D`
- Helper text: `12px Inter, #64748B`

### Navigation

**Top Nav (Marketing)**
- Background: `#FFFFFF`, sticky
- Shadow-border bottom: `rgba(0,0,0,0.08) 0px 0px 0px 1px`
- Logo: Geist wordmark, `#0A0A0A`
- Links: `14px Inter weight 500, #171717`
- Active: `#635BFF`
- CTA: Gov Purple button, right-aligned

**Sidebar Nav (Dashboard)**
- Background: `#FAFAFA`
- Width: `240px`
- Border-right: `rgba(0,0,0,0.08) 0px 0px 0px 1px`
- Nav item: `14px Inter weight 500, #64748B`
- Active item: `#635BFF` text, `rgba(99,91,255,0.08)` background, left border `3px solid #635BFF`
- Section headers: `11px Inter weight 600, #94A3B8, uppercase, tracking 0.5px`

---

## 5. Layout Principles

### Page Structures

**Marketing / Landing Pages**
- Max-width: `1200px`, centered
- Hero: centered single-column, `128px` top padding desktop
- Feature sections: 2–3 column card grids
- Section spacing: `96px` desktop, `64px` mobile

**SaaS Dashboard**
- Top nav: `56px` height
- Sidebar: `240px` fixed, collapsible on mobile
- Content area: fluid, `24px` padding
- Panel grid: 12-column, `24px` gaps
- Stat row: 4-column on desktop, 2-column on tablet, 1-column on mobile

**Data Tables**
- Sticky header, scrollable body
- Row height: `52px` standard, `44px` compact
- Column min-width: `120px`
- Horizontal scroll on mobile with sticky first column

### Whitespace Philosophy
- Gallery spacing between sections — 96px on desktop
- Cards breathe at 24px internal padding — never cramped
- Table density is acceptable; surround tables with 32px+ breathing room

---

## 6. Depth & Elevation

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow | Page background |
| Ring | `rgba(0,0,0,0.08) 0px 0px 0px 1px` | Standard cards, inputs, panels |
| Card | Ring + `rgba(0,0,0,0.04) 0px 2px 4px` | Content cards |
| Full Card | Ring + `rgba(0,0,0,0.04) 0px 2px 4px + rgba(0,0,0,0.04) 0px 8px 8px -8px` | Featured panels |
| Stripe Elevated | `rgba(50,50,93,0.15) 0px 30px 45px -30px, rgba(0,0,0,0.08) 0px 18px 36px -18px` | Modals, popups |
| Focus | `0 0 0 2px #635BFF` | All interactive focus states |

---

## 7. Do's and Don'ts

### Do
- Use `#635BFF` (Gov Purple) for every primary CTA — consistency builds payment trust
- Apply Geist Mono to all bid IDs, reference numbers, dollar amounts in tables
- Use `#061B31` (Gov Navy) for hero headings — warmer and more authoritative than pure black
- Apply shadow-as-border (`0px 0px 0px 1px rgba(0,0,0,0.08)`) — never CSS `border` on cards
- Use dynasty-gold for premium tier markers only — it must feel earned
- Every status must have a labeled badge — color alone is never enough
- Apply negative letter-spacing at display sizes — −2.4px at 48px minimum
- Use 8px border radius on all interactive components — never sharp corners

### Don't
- Don't use Stripe's `sohne-var` font — use Geist/Inter (practical, available)
- Don't apply green to gov UI surfaces — green is reserved for PA CROP
- Don't use positive letter-spacing on display text
- Don't use pure black (`#000000`) for headings — use `#061B31` (Gov Navy) or `#0A0A0A`
- Don't skip disabled/loading states on any interactive element
- Don't use pill-shape (9999px) on primary action buttons — 6px radius for buttons, pills for badges only

---

## 8. Responsive Behavior

| Breakpoint | Width | Key Changes |
|---|---|---|
| Mobile | < 640px | Single column, hamburger nav, sidebar collapses to drawer |
| Tablet | 640–1024px | 2-column grids, condensed sidebar |
| Desktop | 1024–1280px | Full layout, expanded sidebar |
| Large Desktop | > 1280px | Full layout, generous margins |

**Dashboard Mobile Behavior**
- Sidebar: drawer overlay on mobile (not persistent)
- Stat cards: 2×2 grid on mobile
- Data tables: horizontal scroll with sticky first column
- Action buttons: full-width stacked on mobile

---

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: `#635BFF` (Gov Purple)
- CTA Hover: `#4434D4`
- Page Background: `#FFFFFF`
- Section Alt Background: `#F6F9FC`
- Heading: `#061B31` (hero/major) or `#0A0A0A` (body headings)
- Body Text: `#171717`
- Secondary Text: `#4D4D4D`
- Muted Text: `#64748B`
- Border: `rgba(0,0,0,0.08) 0px 0px 0px 1px`
- Premium: `#C9A84C` (Dynasty Gold)

### Example Component Prompts

- **"Hero"**: White background. Headline 48px Geist weight 600, line-height 1.05, letter-spacing −2.4px, color `#061B31`. Subtitle 18px Inter weight 400, line-height 1.60, color `#4D4D4D`. Primary CTA `#635BFF`, 6px radius, 10px 20px padding. Secondary CTA white with shadow-border.
- **"Bid Card"**: White card, shadow `rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 4px`, 8px radius. Title 22px Geist weight 600, −0.4px tracking. Bid ID in Geist Mono 13px. Status badge pill. CTA button bottom right.
- **"Stat Card"**: White, ring shadow, 8px radius. Metric 32px Geist weight 600, −1.0px tracking, `#0A0A0A`. Label 13px Inter weight 500, `#64748B`. Trend indicator with status color.
- **"Data Table"**: Container 8px radius, ring shadow. Header `#FAFAFA`, 13px Inter weight 600, `#64748B` uppercase. Row 52px height, hover `#F6F9FC`. ID column Geist Mono. Amount column Geist Mono, right-aligned.
- **"Status Badge"**: Use the badge table in Section 4. Always label + color — never color alone.

### Iteration Guide
1. Start every component with the shadow-as-border: `rgba(0,0,0,0.08) 0px 0px 0px 1px`
2. Gov Purple (`#635BFF`) for primary interactives — consistent with Stripe payment contexts
3. Geist for headings, Inter for body, Geist Mono for data/IDs — never mix within a context
4. Letter-spacing: −2.4px at 48px, −1.5px at 36px, −0.4px at 22px, normal at 16px
5. Status badge = always pill shape + labeled text + semantic color token
6. Dynasty Gold = premium tier only — one per page maximum
