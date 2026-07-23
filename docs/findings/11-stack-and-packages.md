# 11 — Build Stack & Package Notes

Decided July 9, 2026. Versions/compatibility date-stamped — **verify at install time** (`pnpm outdated` culture, not pinned dogma).

## The stack (Derrick's call)

**Next.js 16** (App Router, React 19, Turbopack) · **TypeScript** · **Tailwind CSS v4** · **shadcn/ui** · **Supabase** (database, auth, storage) · **Resend** (email) · pnpm · deploy target: Vercel (assumed). Phase 1 is the marketing site; the same codebase scales into the full webapp (portal, dashboard, simulator) later — so choices below favor things that survive that growth.

## Packages to add (beyond stack defaults)

| Package | Job | Why this one |
|---|---|---|
| `@supabase/supabase-js` + `@supabase/ssr` | DB + auth wired for App Router | `@supabase/ssr` is the supported cookie-based SSR auth pattern |
| `react-email` + `@react-email/components` | Email templates for Resend | Branded confirmations in JSX; **Summit confirmation must carry an .ics calendar attachment** (+4–7 pts show-up, per summit report) |
| `react-hook-form` + `zod` + `@hookform/resolvers` | Forms + validation | shadcn Form primitives assume this trio; zod schemas reuse server-side in actions |
| `motion` | Micro-interactions, scroll reveals | The framer-motion successor; React-19-ready. One signature move, used with restraint |
| `@number-flow/react` | Animated numbers | The FAH tally counter + stats band deserve better than a jQuery-style odometer |
| `embla-carousel-react` | Testimonial/speaker rails | shadcn Carousel's base; light, no jank |
| `sonner` | Toasts | shadcn default |
| `date-fns` + `@date-fns/tz` | Countdown + timezones | Summit runs on ET; render times timezone-correct |
| `schema-dts` | Typed JSON-LD | **Event schema on the Summit page** is how we own the "Ventriq Summit" SERP (summit report) |
| `stripe` + `@stripe/stripe-js` | Donations | Embedded Checkout/Payment Element **on-page** — the teardown's donate rule (BGV's formless page is the anti-pattern) |
| `@marsidev/react-turnstile` | Form spam shield | Free Cloudflare Turnstile on application/contact forms |
| `@t3-oss/env-nextjs` | Env validation | Fails fast on missing Supabase/Resend/Stripe keys |
| `@vercel/analytics` + `@vercel/speed-insights` | Analytics | Zero-config, privacy-sane starting point |
| `prettier` + `prettier-plugin-tailwindcss` | Class sorting | Non-negotiable with Tailwind at scale |
| `eslint-config-next` + `eslint-plugin-jsx-a11y` | Lint + a11y | a11y violations caught at dev time |

**Built-ins to use, not packages:** `next/font` (Space Grotesk + display-serif pairing — see design note), `next/og` ImageResponse (**branded OG image per page** — big polish/share win), `sitemap.ts`/`robots.ts`, Metadata API, CSS `text-wrap: balance` for headlines.

**Optional / taste-gated:** `lenis` (smooth scroll — only if it serves the "architect's line" feel; never mandatory).

**Phase 2+ (note now, install later):** MDX blog (`velite` or `next-mdx-remote`), `posthog-js` (product analytics when the portal exists), `@upstash/ratelimit` + `@upstash/redis` (public API surfaces), `@playwright/test` (e2e), Skool/Eventbrite stay as links/embeds in phase 1 — no SDKs needed.

## Explicitly NOT adding (and why)

- **No template kits / premium themes** — the whole brief is originality; shadcn is scaffolding we restyle, not a look we adopt.
- **No AOS / animate.css** — `motion` covers it with intent.
- **No moment.js** (date-fns), **no Redux** (server-first; React state suffices), **no styled-components/emotion** (Tailwind v4 owns styling).
- **No icon sprawl** — lucide-react (shadcn default) for UI chrome only; brand moments get bespoke SVG (the gold hairline/corridor motif), not icon-set clip art.

## Design-system wiring notes

- Map `brand/ventriq-tokens.css` into Tailwind v4 `@theme` custom properties — midnight `#101B2D`, cream `#F1ECDF`, ink `#0B0F16`, gold `#C9A24C`, accent `#C15A2C` (swappable to teal `#22B0A0` in one line, per the unratified accent decision).
- **Do not ship the default shadcn look** (default radii, shadows, Inter-ish type, slate palette) — it's the most recognizable "AI site" tell of 2025–26. Restyle radius, borders, shadows, and type scale to the brand before building pages.
- Type pairing: **Space Grotesk** (brand, from the logo system) + a **display serif counterpoint** for editorial warmth — candidates: Fraunces, Instrument Serif (free analogs of Hampton's Financier Display × Neue Montreal pairing). Design decision to make in the claude.ai/design phase; flag, don't lock here.
- Photography over illustration; real people, one consistent treatment (see teardown design map).

## Agent toolkit installed (July 9)

**Personal skills** (`~/.claude/skills/` — serve all DigitalDog work): `frontend-design`, `canvas-design`, `algorithmic-art`, `webapp-testing`, `skill-creator` (official Anthropic, Apache-2.0) · `emil-design-eng` (motion craft, Emil Kowalski), `humanizer` (33 AI-writing tells), `next-best-practices` + `nextjs-seo` (App Router + SEO), `copywriting` (conversion structure) (community, MIT, injection-scanned) · `design-tells` + `human-copy` (custom — the 2026 tell catalogs distilled from research).

**Emil Kowalski full set added Jul 23** (github.com/emilkowalski/skills — `emil-design-eng` updated to upstream + 6 new): `review-animations` (craft-bar review of motion code; explicit-invoke only), `improve-animations` (read-only motion audit → prioritized implementation plans), `find-animation-opportunities` (where motion is missing/unwanted), `apple-design` (gesture/spring/materials/typography foundations), `animation-vocabulary` (name-that-effect glossary), `pick-ui-library` (curated per-task library picker; explicit-invoke only). Build-phase use: run `find-animation-opportunities` + `review-animations` against the Summit/FAH motion layer (`copy/08`) implementations; `pick-ui-library` cross-checks the package table above.
**Project skills** (`.claude/skills/`): `ventriq-voice` (Justin's voice system) · `ventriq-design` (brand application: architect's-line rules, palette ratios, divergence from AI-default looks) · `ventriq-stack` (code conventions).
**MCP notes (optional, not installed):** official **shadcn MCP** (component registry), **Chrome DevTools MCP** (visual verification), Next.js 16.3+ built-in `/_next/mcp` debug endpoint — and 16.3+ auto-generates `AGENTS.md` via `next dev`; prefer that over the staged next-best-practices copy if they ever conflict.
**Research artifacts:** `findings/_anthropic-design-guidance.md` (Anthropic's frontend-aesthetics guidance, verbatim) · anti-AI-tells research distilled into the `design-tells`/`human-copy` skills.

## Cross-references

Site scope & third-party tools: `05-tech-stack-and-tools.md` · design prescriptions & anti-patterns: `../competition/website-teardowns.md` · brand tokens: `../brand/ventriq-tokens.css` · stack conventions skill: `../.claude/skills/ventriq-stack/`
