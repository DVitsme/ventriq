# Ventriq → Next.js 16 build handoff

**Mission:** build a 1:1 live Next.js 16 copy of the designed Ventriq site from this folder alone — every page, every state, no further design input needed. The design canvases are the pixel truth; the copy files are the word truth; `docs/` maps between them and the stack.

## Read order

1. This README (fidelity contract, placeholder policy)
2. `copy-source/ventriq-design-system-brief.md` — tokens, laws, refusal catalog (binding)
3. `docs/build-spec.md` — stack wiring, routes, chrome logic, per-page section maps, state machines, forms, SEO
4. `docs/components.md` — shared component inventory
5. `docs/motion-spec.md` — exact timings/easings + reduced-motion fallbacks
6. `docs/acceptance-checklist.md` — run per page before calling it done
7. `copy-source/00…08` — the copy, verbatim law. `12-forge-the-future-launch-intel.md` = ground truth for every launch fact (Luma listing, roster, dates)
8. `design-refs/*.dc.html` — open directly in a browser (keep `support.js` beside them). Each file is a canvas of labeled frames: gold badges `1a` (desktop 1440), `1b` (mobile 390), `1c/1d/2a` (state variants). `data-screen-label` attributes name every section. Measure anything ambiguous from these — they are the design of record (v1.2, Jul 23: Forge The Future launched, FAH paid + public, Donate parked)

## Fidelity contract

- **1:1 means the design-refs, not approximately.** Colors, type sizes, spacing, rules, tick marks, stagger order, breakpoint behavior — recreate what the frames show at 1440 and 390, fluid between (the refs are fixed-width snapshots; interpolate with the grid/gutter rules in build-spec §layout).
- **Copy is law.** Never paraphrase, "improve," or add copy. Source every string from `copy-source/` (the canvases match them; if you ever find a mismatch, the copy file wins and flag it).
- **Photography:** every image in the refs is a treated placeholder (navy-grade gradient + grain + `[PHOTO: …]` label). Build the `PhotoGrade` treatment (recipe in build-spec §images) and keep the labeled placeholder blocks until real photography arrives. Never stock imagery.
- **Placeholders stay visible.** `[BRACKETED]` strings render as dashed redline chips (`RedlineChip` component) — they are deliberate pre-launch annotations, not bugs. Central registry: build-spec §placeholders. Resolve only when real values land.

## Where this overrides the ventriq-stack skill (the skill predates launch — these are ratified design/copy decisions)

1. **Registration = Luma** (`https://luma.com/lp9z8iav`), not Eventbrite.
2. **No serif display face anywhere.** The skill's "Fraunces/Instrument Serif counterpoint" was decided against: the site is Space Grotesk-only (400/500/600). The client's flyer serif lives only inside imported artwork.
3. **Accent is ratified:** burnt orange `#C15A2C` on midnight, darkened `#AF5026` on cream (AA). No teal swap.
4. **Donate is parked.** No /donate route, no Stripe, no donate language site-wide (legal hold). Sponsor CTAs route to /contact with the Sponsorship subject preselected.
5. **Skool is unconfirmed** — every Skool mention ships with its `[PLATFORM — Skool TBC]` chip; FAH join CTA points at `[SKOOL-URL]` placeholder.
6. Nav is **single-button** (time-aware primary); the Donate outline button returns only when filings clear.

Everything else in the ventriq-stack skill stands: Next.js 16 App Router + React 19, TypeScript, Tailwind v4 `@theme` tokens, restyled shadcn, Server Components by default, Server Actions + zod for forms, Supabase (RLS on), Resend + react-email, `@t3-oss/env-nextjs`, pnpm, SSR'd content everywhere, Lighthouse ≥95.

## Launch facts (from `12-…-launch-intel.md` — never contradict)

Event: **Forge The Future Virtual Summit** ("Forge The Future" display; Ventriq is the presenter; nav label stays "The Summit") · tagline **"Forged together. Built to last."** · **Aug 10–13 + 17–20** (Mon–Thu ×2 weeks, Fri–Sun 14–16 dark) · **6:30–8:00 PM ET**, 90-minute sessions · **free** · Zoom · host account "Ventriq Official" · IG **@ventriqofficial** · 8 real night titles (in 02-summit §S5 and the agenda frames) · 15 speakers delivered, "30+" promised — wall scales, names withheld until `[ANNOUNCE-DATE]` + original headshots.
