# Ventriq — agent guide

Next.js 16 marketing site for Ventriq (Baltimore nonprofit for founders). App code lives at the repo root (`app/`, `public/`); all project intelligence lives in `docs/`.

## PROGRESS.md — the client-facing work log (root)

**Standing rule: when meaningful work completes, add it to `PROGRESS.md` in the same turn** — newest-first under today's date, plain language a non-technical client (Justin) can read ("set up hosting," "fixed email so it doesn't go to spam"), one line per accomplishment. It is the source for client updates; exhaustive but never jargon-heavy.

## TODO-JUSTIN.md — the client's task list (root)

**Standing rule: anything only Justin can do goes in `TODO-JUSTIN.md`, not TODO.md** — plain language, why-it-matters + time estimate per item, urgency tiers, ✅ log when he completes things. Update it the same turn a Justin-dependency appears or resolves; it doubles as the "here's where we need you" half of client updates (PROGRESS.md is the "here's what's done" half).

## TODO.md — the living skipped/deferred list (root)

**Standing rule: whenever a task is raised but not fully handled** — flagged to the user, deferred, partially done, or blocked on someone else — **add it to `TODO.md` in the same turn**, under the right level (🔴 time-sensitive / 🟠 important / 🟡 watch), with the date, why it matters, and the exact unblock condition. When an item completes, move it to the ✅ Done log with the date — never silently delete. Check TODO.md at the start of substantive sessions; surface anything 🔴 that has gone stale.

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
