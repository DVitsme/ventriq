# Ventriq — agent guide

Next.js 16 marketing site for Ventriq (Baltimore nonprofit for founders). App code lives at the repo root (`app/`, `public/`); all project intelligence lives in `docs/`.

## Before writing code

1. **Load the project skills** (`.claude/skills/`): `ventriq-stack` (conventions, non-negotiables), `ventriq-design` (visual system), `ventriq-voice` (any user-facing words).
2. **The build source is `docs/build-handoff/`** — README (fidelity contract), `docs/build-spec.md`, `components.md`, `motion-spec.md`, `acceptance-checklist.md`, `copy-source/` (copy is LAW — never paraphrase), `design-refs/` (pixel truth; open .dc.html in a browser with support.js beside it).
3. Launch facts (dates, pricing, names) come only from `docs/findings/12-forge-the-future-launch-intel.md`. The event is "Forge The Future" (free, Aug 10–20, 6:30–8:00 PM ET, Luma: https://luma.com/lp9z8iav).

## Hard rules

- **No "donate"/"donation" language, routes, or components anywhere** (legal hold — see `docs/copy/06-donate.md` banner). Sponsor CTAs → /contact.
- No tax-deductibility claims. No fake scarcity. `[BRACKETED]` copy tokens render as visible redline chips — never invent values.
- Space Grotesk only (400/500/600), the 7 locked colors, 2px radius, no shadows except focus rings — full system in `docs/design/ventriq-design-system-brief.md` + its refusal catalog.
- Prototype JS-gating must be inverted in production: content visible by default, motion as enhancement, `prefers-reduced-motion` honored (see `docs/design/design-export-review.md` §7).
- pnpm, RSC-first, Server Actions + zod, SSR'd content, Lighthouse ≥95, AA contrast.
