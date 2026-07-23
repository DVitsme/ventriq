# 08 — Event motion copy (the WOW layer)

Layers onto `02-summit.md` and `03-founders-after-hours.md` — **base page copy stays intact** (meaning + SEO live there). This file adds what animated, high-production event pages need: staged beats, state-machine copy, scene captions, ticker strings, countdown labels. Evidence: `competition/event-pages/` (3 reports). Motion techniques: `motion-implementation-menu.md`.

**Global event-page rules (from the research):**
- Voltage **4–5 of 10** — "a gala invitation with a festival heartbeat." Midnight is the room; gold is the engraving.
- **One festival gesture per page.** Summit takes the gold ticker; Founders After Hours takes the tally-draw. Never both on one page.
- **Countdown is drafting metadata, never a billboard** (the Vercel Ship treatment: monospace, in the hero meta row).
- The Summit page is a **state machine** — hero, agenda, and announcement bar flip together through the states below.
- Every effect ships with its reduced-motion fade fallback; copy below works motionless too.

---

## SUMMIT — hero state machine

**State A · Pre-announcement (now → lineup reveal)**
- Eyebrow: `FORGE THE FUTURE · AUG 10–20, 2026 · VIRTUAL · FREE`
- H1, two beats: **[Not just education.]** → **[Implementation.]** *(beat 2 lands as the corridor rule draws beneath it)*
- Sub, two staged lines: "Eight nights across two weeks — one session a night, ninety minutes each." / "Each one pointed at something you can do the next morning."
- Meta row (monospace, tabular): `AUG 10–20 · 6:30–8:00 PM ET · ZOOM · FREE · T-[D]D.[H]H.[M]M`
- Countdown label: **Doors open in**
- CTA: **Save your free seat**

**State B · Lineup announced** — as A, sub line 2 becomes: "The lineup is live — meet the speakers below."

**State C · Live night (a session night, Aug 10–20)**
- Eyebrow: `TONIGHT · NIGHT [n] OF 8`
- H1: **[NIGHT-TITLE]** *(the night's title takes the headline slot — e.g. "The Rainmaker's Craft")*
- Sub: "[night subtitle] — live at 6:30 PM ET."
- CTA: **Join live** · secondary line: "Registered? Your link is in your inbox."
- Countdown label: **Live in** → during the session: **LIVE NOW**

**State D · Between sessions (Fri–Sun, between the two weeks)**
- Eyebrow: `BETWEEN SESSIONS`
- H1: **Go build.**
- Sub: "Next up: [NIGHT-TITLE], [DAY] at 6:30 PM ET. This week's replays are already in the community."
- CTAs: **Catch the replays** · **Save your free seat** (if not registered)

**State E · Post-event (after Aug 20)**
- Eyebrow: `FORGE THE FUTURE · AUGUST 2026`
- H1: **The room keeps what you missed.**
- Sub: "All eight sessions live in Founders After Hours — replays, office hours, and the founders who showed up. Membership from $39/month."
- CTA: **Join Founders After Hours**

## SUMMIT — the ticker (the page's one festival gesture)

Gold marquee, tracked small caps, `motion-safe` only, aria-hidden duplicates:

`FORGED TOGETHER · BUILT TO LAST · AUG 10–20 · FREE · EIGHT NIGHTS ·` *(repeats)*

Provenance (v1.2): **he coined his own** — "Forged together. Built to last." is the event's official tagline (Luma listing + every speaker graphic), which answers the v1.0 flag exactly as hoped. It takes the ticker. "A room worth getting into" retires to available-inventory (still his line; usable elsewhere if a surface needs it).

## SUMMIT — manifesto scene (the Stripe-Sessions dim-to-lit paragraph)

One paragraph, scroll-lit word by word (dim gold → cream), between the shape-of-it band and the lineup:

> Every August, the stages get bigger and the badges get pricier. This is the other thing. Eight nights in the summer. Ninety minutes at a time. People who've built, telling you exactly how — and a room that keeps the receipts. The resources are out there. For two weeks, they're not camouflaged.

## SUMMIT — corridor draw scene (the signature differentiator)

Converging gold lines draw toward the vanishing point while the numerals count up (8 nights · 8 sessions · 90 minutes · 2 weeks — v1.2: "90" replaces the old "1"; it's the best count-up of the set). Caption beats, one per line-draw:

**[Eight nights.]** → **[One door.]** → **[Walk through.]**

## SUMMIT — component states

- **Speaker cards, pending:** drafting-frame silhouette · `SPEAKER [nn]` · "Announced [ANNOUNCE-DATE]" · CTA: **Get the announcement** *(v1.2: wall scales to 15–30+ speakers, grouped by night once mapped — not 8 fixed frames)*
- **Speaker cards, revealed:** photo · name · title, company · chip: `NIGHT 0[n] — AUG [dd]`
- **Agenda rows:** upcoming → date numeral + night title + speakers; tonight → gold rule + `TONIGHT · JOIN LIVE 6:30 PM ET`; past → chip: `REPLAY IN THE COMMUNITY →`
- **Registration hand-off microcopy (under CTA):** "Registration runs on Luma — about a minute, free."

---

## FOUNDERS AFTER HOURS — motion layer

- **Hero beats:** **[Come do the work.]** → **[We'll count it.]** — tally strokes draw in behind beat 2 (groups of five, gold). The tally-draw is this page's one festival gesture; no ticker here.
- **Counter (NumberFlow, scroll-triggered):** states already in `03` §S5 — zero-on-purpose pre-launch; live count after.
- **Run-of-show reveal:** each time-row's rule draws, then its text fades in (staggered top to bottom) — the schedule *assembles* like a drawing.
- **Tally scene caption beats:** **[Calls made.]** → **[Emails sent.]** → **[Wins counted.]**

---

**Copy verdict (the question this file answers):** the base deck holds — no rewrites. The event pages needed this added layer because animation consumes copy in *beats and states*, not paragraphs: short lines that land one at a time, headlines that change with the calendar, and strings built to repeat. Everything above obeys the voice system (the manifesto's "camouflaged" callback is the Home hero's own word; "Go build" is the established refrain; device budgets unchanged on the base pages).
