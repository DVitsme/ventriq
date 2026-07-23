---
name: ventriq-stack
description: Use when writing, reviewing, planning, or scaffolding ANY code for the Ventriq website — Next.js 16 + shadcn/ui + Tailwind CSS v4 + Supabase + Resend. Loads stack conventions, brand-token wiring, package decisions, and non-negotiables (SSR, a11y, no default-shadcn look).
---

# Ventriq Stack Conventions

**Stack:** Next.js 16 (App Router, React 19) · TypeScript · Tailwind v4 · shadcn/ui · Supabase (`@supabase/ssr` auth pattern) · Resend + react-email · pnpm. Package decisions + rationale: `docs/findings/11-stack-and-packages.md`. Phase 1 = marketing site; architecture must survive growth into the full webapp (portal, dashboards, simulator).

## Architecture rules

1. **Server Components by default**; `"use client"` only for interactivity (forms, motion, countdown, carousel). No client-side data fetching for page content.
2. **Server Actions** for all form submissions (Mastermind application, contact, newsletter) — zod schema validated at the boundary, shared with react-hook-form on the client.
3. **Server-rendered HTML is a hard requirement** — the competition teardown found bots receiving empty shells/error pages on SPA sites (anti-pattern #4). Every marketing page must render full content without JS.
4. Supabase: RLS on from day one; anon key only in the browser; service-role key server-only via validated env (`@t3-oss/env-nextjs`).
5. Email: react-email templates rendered through Resend; **Summit confirmation includes an .ics attachment** and the Founders After Hours pointer (the show-up levers from the summit report). Luma sends its own confirmations/reminders (email + SMS) — our Resend layer adds the 24h/3h/day-of cadence, don't duplicate Luma's.
6. Keep third parties at the edge (updated Jul 10, meeting 2): **Luma** (registration — FREE ticket as of Jul 23, PWYW dropped; event = "Forge The Future" at https://luma.com/lp9z8iav; checkout is embeddable, has an API), **Skool** (community — paid tiers $39/$89–99, platform TBC), **Stripe** (future payments only) are links/embeds, not deep integrations, in phase 1. **Eventbrite is OUT. There is NO donate surface anywhere** — the word "donate" is banned site-wide until entity + 1023 + MD fundraising filing clear (`docs/copy/06-donate.md` park banner governs); do not scaffold /donate, donation components, or Stripe donation flows.

## Brand wiring (do this before building pages)

- Import tokens from `docs/brand/ventriq-tokens.css` into Tailwind v4 `@theme`: midnight `#101B2D` · cream `#F1ECDF` · ink `#0B0F16` · gold `#C9A24C` · accent `#C15A2C` (one-line swap to teal `#22B0A0` — accent is UNRATIFIED; keep it a single variable).
- Fonts via `next/font`: **Space Grotesk** (brand) + display-serif counterpoint (Fraunces / Instrument Serif — decide in design phase). Subset; `display: swap`.
- **Restyle shadcn before use** — radius, shadows, borders, type scale to brand. The default shadcn look is a recognized "AI site" tell. Ratio discipline: ~90% midnight/cream/ink; gold is recognition, not decoration; accent only on interactive elements.
- Brand motif: the **gold hairline / corridor line** (1px construction lines, dimension ticks) as SVG/CSS — bespoke, never icon-set decoration. Logos in `docs/brand/logos/` (reconstructions — swap for Justin's originals when delivered).

## SEO & sharing (per competition research)

- Metadata API per page: title = promise + name (never "Home | Ventriq"); meta description written as conversion copy.
- **Event JSON-LD (schema-dts) on the Summit page** — this is how we own the "Forge The Future" SERP (v1.2: event renamed; VirtualLocation + OnlineEventAttendanceMode — the Luma listing itself mis-declares offline mode, do not copy it).
- `sitemap.ts` + `robots.ts`; canonical URLs; **branded OG image per page** via `next/og`.
- Nonprofit trust: 501(c)(3) + EIN in footer *once confirmed* (never claim tax-deductibility before Justin's determination letter — legal flag in doc 10).

## Non-negotiables

- **a11y:** semantic landmarks, one h1/page, visible focus states, WCAG AA contrast (test gold-on-midnight and gold-on-cream — gold fails AA for body text; use it for display/graphic elements, not paragraphs), `prefers-reduced-motion` honored by every animation, alt text with intent.
- **Performance:** next/image everywhere, no layout shift on font swap, countdown/motion client islands kept tiny. Lighthouse ≥95 on marketing pages.
- **Motion:** one signature move (e.g., corridor-line draw-in on section entry) used consistently; micro-interactions ≤200ms; nothing autoplays loudly.
- All copy through the `ventriq-voice` skill; design decisions against `docs/competition/website-teardowns.md` §synthesis (IA, blueprints, 11 anti-patterns).
