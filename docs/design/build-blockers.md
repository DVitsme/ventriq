# Build blockers — what's waiting, on whom, and why

**State as of: July 29, 2026** (post-commit `2d898d0`).
**What this is:** every design item from the July 23 review that can NOT be
built today, grouped by what it waits on. Companion to
[`build-queue.md`](./build-queue.md) — the ranked list of what CAN be built.
Intent per item: [`07-23-2026-design-change-brief.md`](./07-23-2026-design-change-brief.md).
Full meeting record: [`../meetings/07-23-2026-meeting-3-outcomes.md`](../meetings/07-23-2026-meeting-3-outcomes.md).

**Rules for using this file:**
1. An item leaves this file **only** by moving into `build-queue.md` with a
   rank. Never delete a row — strike it through with the unblock date, so the
   history of what waited on what survives.
2. Each row names its **entry zone**: where in the queue it lands when freed
   (by effort). Priority can override zone — the flip cards say so explicitly.
3. Re-check the **Derrick group** every session: those are minutes-each
   decisions from the person in the chair, and he answers fast when asked
   directly (the Skool override on Jul 29 took one message).

---

> **Jul 29 update — the speaker blockers partially cleared.** Justin's
> `Speakers.tsv` delivers **complete night-by-night assignments for 29 people**,
> which was the data gating A2 (agenda face thumbnails). But images did not
> arrive: **8 have headshot + bio, 13 have only the Instagram promo graphic**
> (explicitly not usable), **7 are still "Outreach," 1 is blank**. So A1
> (speaker flip cards) stays blocked — 8 usable portraits out of 29 can't build
> a wall. **The blocker split rather than cleared.** Full readiness table:
> `docs/plans/summit-aug-1/01-phase-1-research.md` §4.
>
> Also note: **two speakers are already homepage testimonials** — Margo Burley
> ("Margo B., Artvantage") and Calvin Royster ("Calvin R., Encore") — so the
> outstanding testimonial-permissions ask (A3) can ride along with speaker
> outreach he's already doing.
>
> **And bios arrived from an unexpected place.** Justin's Kit broadcast of
> Jul 23 (`docs/notes-from-justin/7-29/$30M raised….eml`) carries **five
> speaker bios already sent to his list** — Jerone Anthony Tyler, Cedric
> Powell, Theodore Savage, Tiffany Bethea, Jeffrey Scruggs — each with the
> credential and proof line he chose. **Already public, so cleared for the
> site by definition.** Transcribed in
> `docs/plans/summit-aug-1/01-phase-1-research.md` §10.1. Images are still
> missing; the email's assets are composed graphics on Kit's CDN, not raw
> portraits.

## Group A — blocked on Justin (external)

**⚠️ The single unblock for most of this group is the consolidated asset email
Derrick owed Justin on Jul 24** (call, 1:27:34) — still unsent as of Jul 29,
tracked 🔴 in `TODO.md`. Justin's own asset commitment ("next 24, 48 hours,"
1:25:32) is now 5 days past. Send the email before chasing any single row
below; `TODO-JUSTIN.md` is effectively its content and `client-email-voice`
is the tool.

### A1 · Speaker flip cards — §4.4
- **Waits on:** headshots (raw photos, not IG graphics) + bios.
- **Unblock:** the asset email lands them. A roster Google Doc was shared
  on-call (43:17, comment access) — verify it's in Drive; headshot file was to
  follow.
- **Entry zone:** ~1-day effort (rank 14–16 zone) — **but priority overrides
  zone: `/summit` is the client's stated #1 page; when assets land this jumps
  to the top of the queue.**
- **Partial start available NOW:** prototype the flip mechanics + a11y pattern
  on the 15 placeholder tiles (`app/summit/page.tsx` ≈237–255): button
  semantics, `aria-expanded`, back face hidden from AT until flipped,
  reduced-motion cross-fade instead of 3D rotate, **sheet/expand on mobile —
  never tap-to-flip**. The single most a11y-fragile item in the brief; 100/100
  is enforced by `e2e/a11y.spec.ts`. Design bar: cards a speaker would
  screenshot and post (§1.5).

### A2 · Agenda face thumbnails — §4.5a
- **Waits on:** who-speaks-which-night assignments + the same headshots.
- **Unblock:** same asset email.
- **Entry zone:** pairs with queue item 12 (agenda colour) — do as one pass.
- **Notes:** squares desktop / circles mobile (Derrick's deliberate
  inconsistency — honour it); **no plus-toggle** (Justin explicitly rejected
  burying the lead); faces must survive all three row states including dimmed
  replay.

### A3 · Testimonials carousel (replaces "One structure. Three doors.") — §3.3
- **Waits on:** quotes + **data points/production numbers** + photos +
  **permission to print names/companies** (Margo B., Calvin R., Sophia D. at
  minimum).
- **Unblock:** asset email. The `[TESTIMONIAL PERMISSIONS — README #5]` chip
  (`app/page.tsx` ≈288) stays until he blesses names.
- **Entry zone:** ~1-day (rank 14–16 zone).
- **Notes:** the card is **four fields** — quote · attribution · photo ·
  metric-as-drafting-annotation (not a KPI tile). **Q3 must be decided first
  or alongside** — `ConvergenceDiagram` is used in exactly one place, the
  section this deletes; see Group B.

### A4 · Upcoming Events section (home + FAH) — §3.5, §5.7
- **Waits on:** Justin's filtered events list — **public + FAH rows only** (he
  is filtering himself; the master schedule is deliberately private, Derrick
  declined the raw file on-call).
- **Unblock:** asset email.
- **Entry zone:** ~1-day; lands with/after queue 14 — it participates in the
  band-rhythm seam (**Q4**).
- **Notes:** architecture rec on file (outcomes doc): typed `lib/events.ts`
  array for v1 — shaped so a Supabase swap later is a data-source change, not
  a rewrite. **No CMS now.** Design register: printed programme / wall
  calendar, degrades gracefully to three rows.

### A5 · Registrant excitement voices on /summit — §4.7
- **Waits on:** Justin gathering "why I'm excited" quotes (text; video bonus)
  from registrants — his outreach email, which he also wants to use to collect
  headshots for the share card (47:34).
- **Unblock:** he sends that email and forwards results.
- **Entry zone:** ~half–1 day (rank 13–15 zone).
- **Notes:** a *different object* from A3 — anticipation, not outcomes; wall of
  notes, not featured quotes; must hold mixed text + short clips. Replaces the
  "Why Justin built it" block (satisfies the brand-without-a-face constraint).

### A6 · Homepage card numerals + price removal — §3.2
- **Waits on:** **Q1** — Justin is sleeping on it (his request).
- **Unblock:** put the three options to him in the asset email: chronological
  (`Aug`/`Ongoing`/`Sep`) · **quantity (`8 nights`/`Monthly`/`10 seats`) ←
  recommended** · no numerals.
- **Entry zone:** minutes–1 hr (rank 5–7 zone).
- **Notes:** replacement strings are longer than `$39` — expect to rebalance
  the card's type scale.

### A7 · Summit H1 rewrite — §4.1b
- **Waits on:** **Q2** — Justin sleeping on it.
- **Unblock:** his call on leading the title with "virtual."
- **Entry zone:** minutes (rank 1–3 zone).
- **Notes:** hard veto stands regardless of his answer: **no geo-narrowing**
  ("for people in Baltimore" is wrong — registrants are multi-state + intl, C4).

### A8 · Mastermind ethos section — §6.4
- **Waits on:** Justin's own words — *"I couldn't write this piece for you.
  You'll have to write this one yourself"* (Derrick, 12:50).
- **Unblock:** he writes it. Slot exists on the page; deliberately personal
  (the one §1.7 exception).
- **Entry zone:** minutes to place once received (rank 1–3 zone).

### A9 · Real photography in the PhotoGrade slots — G3
- **Waits on:** photos from Justin — the FAH triptych labels are the shot list
  ("the hour — laptops open" · "the calls — phones out" · "the board — wins
  tallied"); plus Mastermind portrait; homepage slot pending **Q8**.
- **Unblock:** phone photos in good light (standing ask on his list).
- **Entry zone:** ~half day per batch (rank 12–13 zone) — grade into the
  warm-navy world, don't drop in raw.

### A10 · Q&A video content — §4.8
- **Waits on:** **Q10** — only if it's to be real footage of Justin/a speaker.
- **Unblock:** his answer, OR route around him: the geometric fallback is
  queue item 19 and needs nothing from him.

### A11 · Marketing email *sending* — G6
- **Waits on:** a physical mailing address (CAN-SPAM footer) — on Justin's
  list, now blocking a promised deliverable.
- **Unblock:** one line from him (registered-agent address works).
- **Entry zone:** n/a — unblocks *use* of queue item 17, whose design work is
  already queued.

### A12 · Skool residual: retire the checkout chip + real screenshot — NEW Jul 29
- **What:** ~~Skool URL~~ — **no longer a blocker**: received Jul 29 and wired
  live same day at Derrick's direction (commit `2d898d0`), group still
  **free / "IAMJS Collective" / 1 member**, concern flagged. What remains:
  retire the `SKOOL CHECKOUT — pending group setup` chip
  (`app/founders-after-hours/page.tsx`, handoff sentence ≈237) and swap the
  `SCREENSHOT: the Skool space — when live` PhotoGrade (≈233) for a real
  capture of the configured space.
- **Waits on:** Justin setting the **$39/$99 tiers** in Skool and **locking the
  group name** (🔴 on his list). ⚠️ **A Skool rename changes the group URL and
  the live site links it since `2d898d0` — any rename requires a same-day
  site update or five join buttons die.** Ties into the "The Forge" membership
  rename question — one decision, made once.
- **Entry zone:** minutes (top of queue) the day he confirms.

### A13 · FAH tally-hour clarification — §5.4 / Q7
- **Waits on:** one line from Justin — what fills 7:15→8:15 (the tally had 15
  minutes in the old schedule, now an hour).
- **Non-blocking:** queue item 3 ships his stated times regardless. This row
  exists so the question doesn't get lost.

---

## Group B — blocked on Derrick (decisions, minutes each)

Seven questions, all answerable in one short conversation — batch them. He
turned the Skool wiring decision around in a single message on Jul 29; these
are the same shape. Recommendations are already on file; "decide" mostly means
"confirm or override."

| Q | Decision | Brief § | Recommendation on file | Unblocks |
|---|---|---|---|---|
| Q3 | Where does `ConvergenceDiagram` live when the carousel takes its slot? It's used in **exactly one place** — the section being deleted; the Mastermind drawing is a different diagram. | §3.3 | Relocate into the pain-point band (an incomplete structure is what that section is about) | A3, and de-risks queue 14 |
| Q4 | Homepage band rhythm — the 5→6→7→8 seam (three cream then two dark) | §3.7 | Events block cream; sponsors stay the single closing dark note | queue 14, A4 |
| Q5 | FAH "Three doors in" heading now that cards are nouns | §5.3 | Change it; ⚠️ "What's inside" collides with the digital-home eyebrow ≈219 — rename that or pick another | queue 6 (fully clean) |
| Q6 | Membership-card stagger: keep or drop? | §5.5 | Drop, **this pair only** — colour + offset is two emphasis mechanisms doing one job | queue 7 (fully clean) |
| Q8 | Homepage portrait slot after the Ventriq-centric rewrite | §3.4 | Room/Baltimore image (keeps the warm-grade anchor), not deletion | queue 13's photo half, A9's homepage slot |
| Q9 | Accept ScrollLit in place of "typewriter"? | §4.3 | Accept — lighting is the architectural metaphor | queue 4 closes |
| — | Countdown placement: hero ("doors open in" orphaned label) or stats band? | §4.1a | Hero — the label promises a live number and delivers text | queue 10 (fully clean) |

---

## Group C — blocked by sequencing (not by people)

### C1 · Full mobile pass — G7
- **Waits on:** everything above it — the order agreed on-call (1:10:23):
  copy → Justin's assets + pictures → videos/motion → **mobile last**, so
  mobile isn't fixed twice.
- **Sanctioned exception:** queue item 9 (the reported Mastermind crowding bug).
- **Pre-known mobile facts:** agenda thumbnails go circular (A2); speaker
  reveal is a sheet, not a flip, on touch (A1).

### C2 · Q&A geometric video — §4.8
- **Waits on:** queue item 18 (G1) existing — it inherits that system.
  Already ranked as queue 19; listed here so nobody starts it early.

### C3 · Band-rhythm execution — §3.7
- **Waits on:** **Q4** decided + queue 14 and A4 actually landing — it's the
  seam between them. Decide first, execute with the sections.

### C4 · G1 hero *sign-off* — perf-budget calibration
- **Waits on:** the production Lighthouse/PSI baseline + `lighthouserc.json`
  recalibration (🟠 in `TODO.md` since Jul 24 — the 250KB script budget is
  arithmetically impossible with gtag alone at 163KB).
- **Why it gates:** four video surfaces are proposed for the three
  most-trafficked pages against an uncalibrated budget — the brief calls this
  the highest-risk interaction it contains (§12.4). **Building G1 isn't
  blocked; declaring it shipped is** — sign-off needs before/after LCP numbers
  from PSI, not the dev box (workerd + Chrome on one machine swings 2×).
