# Ventriq — marketing site

Marketing website for **Ventriq** (ven-TREEK), a Baltimore-rooted nonprofit equipping founders with capital, programming, and council. First surface: **Forge The Future Virtual Summit** (Aug 10–20, 2026). Built by [DigitalDog](https://digitaldog.io).

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind v4 · shadcn/ui (restyled) · Supabase · Resend · pnpm. Conventions live in `.claude/skills/ventriq-stack`; agent rules in `AGENTS.md`.

## Development

App code is at the repo root (`app/`, `public/`). `pnpm install` → `pnpm dev` (http://localhost:3000) · `pnpm build` · `pnpm lint`.

## Start here (build)

Everything the build needs is in **`docs/build-handoff/`** — self-contained: README (fidelity contract), `docs/build-spec.md`, `docs/components.md`, `docs/motion-spec.md`, `docs/acceptance-checklist.md`, `copy-source/` (copy is law, v1.2), `design-refs/` (the design of record — open the `.dc.html` files in a browser with `support.js` beside them), `assets/`.

Supplementary build contract: `docs/design/design-export-review.md` §7 (invert prototype JS-gating, countdown = client island, the seven state machines).

## docs/ map

| Folder | What |
|---|---|
| `build-handoff/` | **The build package** (see above) |
| `copy/` | The copy deck, v1.2 — README has the changelog + open placeholder tokens |
| `brand/` | Palette, tokens CSS, reconstructed logo SVGs, usage sheet (originals still owed by client) |
| `findings/` | Discovery 01–12 (12 = Forge The Future launch intel — ground truth for event facts) |
| `design/` | Design-system brief, export review (QA record), `export-v2/` (full canvas export), `archive/` (v1 docs + historical prompt packages) |
| `competition/` | Competitive research + event-page motion research + reference screenshots |
| `meetings/` | Call transcripts, decisions, outcomes (see `07-10-2026-meeting-2-outcomes.md`) |
| `transcripts/` | Kickoff + source interviews (auto-captions — verify audio before quoting) |
| `assets/` | Client-delivered speaker graphics (19), photos |

## Status & guardrails (Jul 23, 2026)

- Event registration runs on Luma: https://luma.com/lp9z8iav (free). Site is the connector; launch target ~Aug 1.
- **"Donate"/"donation" are banned words site-wide** until entity + Maryland filings clear — the Donate page is parked (`docs/copy/06-donate.md` banner). No Stripe flows in v1.
- No tax-deductibility language anywhere until the 501(c)(3) determination letter exists.
- Bracketed `[TOKENS]` in copy render as visible redline chips by design — resolve only with real values (registry in `docs/build-handoff/docs/build-spec.md`).
