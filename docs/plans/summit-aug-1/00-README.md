# Summit revision — the Aug 1 push

**Created:** July 29, 2026 · **Hard deadline:** **August 1, 2026** (3 days)
**Trigger:** Justin delivered four files on the morning of Jul 29 —
`docs/notes-from-justin/7-29/`. The centrepiece is a formal 16-page revision
brief for `ventriq.io/summit`, prepared for Derrick, dated Jul 25, stating a
**LIVE DATE of August 1**. That deadline was not previously known to us.

---

## Why this exists as its own plan

We already have a design backlog from the Jul 23 call
(`docs/design/build-queue.md` + `build-blockers.md`). **This is not that.**
Justin's brief is a different, sharper instrument: 47 numbered changes across
17 sections of one page, with finished drop-in copy for 14 of them, ordered
into four tiers by his own priority. Its own words:

> *"Every copy replacement below is final and drop-in ready. Nothing here
> requires a writing pass."*

His reason for the deadline, from the brief:

> *"the summit page is receiving partner newsletter traffic in early August and
> takes priority over everything else."*

And a downstream gate that makes it real: **a paid-retargeting decision on
Aug 7** that gets made blind without conversion data by Aug 1.

**Where the two plans disagree, this one wins for `/summit`.** It is newer
(Jul 25 vs Jul 23), it is written rather than transcribed, and it is the
client's own audit of the built thing. The design brief still governs
everything it doesn't touch.

---

## Phase map

| Phase | File | Scope | When | Status |
|---|---|---|---|---|
| **1** | [`01-phase-1-research.md`](./01-phase-1-research.md) | Understanding: all four files read, reconciled against the live site, conflicts resolved, open questions isolated | Jul 29 | ✅ **complete** |
| **2** | [`02-phase-2-tier-1.md`](./02-phase-2-tier-1.md) | Credibility leaks currently public — internal scaffolding visible to visitors | **Today** | 🟥 not started |
| **3** | [`03-phase-3-tier-2.md`](./03-phase-3-tier-2.md) | Structural, needs build time — mobile CTA bar, analytics, RSVP button, VIRTUAL display line, discipline tags, sponsor move | **By Aug 1** | 🟥 not started |
| **4** | [`04-phase-4-tier-3.md`](./04-phase-4-tier-3.md) | 14 drop-in copy replacements, no engineering | By Aug 1 | 🟥 not started |
| **5** | [`05-phase-5-tier-4.md`](./05-phase-5-tier-4.md) | Improves the page, doesn't block launch | After Aug 1 | 🟥 not started |

Phases 2–5 are **Justin's own tiers**, kept in his order and his numbering.
Where we found something he didn't, it's marked `[OURS]` so the distinction
stays visible.

---

## Rules for working these files

1. **Copy is law.** Gold-box replacements in the brief are final. Paste them
   verbatim, em dashes and all. Do not improve them, do not paraphrase, do not
   "fix" the punctuation. If something looks wrong, ask — don't edit.
2. **Load `ventriq-design` and the brief's §10 constraints before any visual
   work.** The Aug 1 pressure does not suspend the design system, the AA
   contrast gates, or the 100/100 accessibility floor that `e2e/a11y.spec.ts`
   enforces.
3. **One open decision is explicitly reserved for Justin** — *founders* vs
   *entrepreneurs* sitewide. His brief says: *"Do not resolve it
   independently."* It is written the recommended way (scoped to one block).
   Leave it there.
4. **Do not change the summit dates.** A conflict surfaced Jul 29 and was
   resolved in favour of the live site — full reasoning in Phase 1 §3.1.
5. When a phase item ships, check it off **in that phase file** with the date
   and the commit. Keep `PROGRESS.md` updated the same turn (standing rule).
6. Deploys: **`pnpm run deploy`**. Pushing to master does *not* currently
   trigger a build — found Jul 29, logged in `TODO.md`.

---

## What Phase 1 established, in one paragraph

The brief is accurate — every claim in it was verified against the live site
and all of them hold. Five categories of internal scaffolding are publicly
visible right now, including an internal legal instruction rendered in the
footer. The site overclaims its speaker count by roughly 13. The summit-date
conflict between Justin's agenda file and Luma resolved in favour of Luma and
the site, so nothing changes there. The speaker roster arrived with complete
night-by-night assignments but only ~28% of usable headshots. And the brief
supersedes several decisions from the Jul 23 call — most notably it *replaces*
the "Will I be pitched?" FAQ rather than rewriting it, and it keeps Justin's
byline on one block rather than removing him everywhere.

---

## Source files

| File | What it is | Extracted in |
|---|---|---|
| `Forge-The-Future-Summit-Webpage-Brief.pdf` | 16pp · the revision brief · **the spine of this plan** | Phase 1 §2 |
| `The Forge The Future_ Summit - Speakers.tsv` | 29 people × 8 nights, with readiness status | Phase 1 §4 |
| `The Forge The Future_ Summit - Agenda.tsv` | internal run-of-show + new session copy | Phase 1 §5 |
| `the-foundry-one-pager.pdf` | 1pp · membership brand | Phase 1 §6 |
| `$30M raised…​.eml` | Kit broadcast sent Jul 23 · **5 publishable speaker bios** | Phase 1 §10 |

Related: [`../../design/07-23-2026-design-change-brief.md`](../../design/07-23-2026-design-change-brief.md) ·
[`../../design/build-queue.md`](../../design/build-queue.md) ·
[`../../meetings/07-23-2026-meeting-3-outcomes.md`](../../meetings/07-23-2026-meeting-3-outcomes.md)
