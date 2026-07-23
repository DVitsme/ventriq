# Design update-handoff — bringing claude.ai/design current (Jul 23)

The designed system (`design/claude-design-export (2)/`) is **two revisions behind** the copy deck: it still shows the pre-meeting-2 world (hidden FAH, free-then-PWYW confusion, Eventbrite, Donate everywhere) *and* predates the Forge The Future launch. This file is the complete correction package: paste the prompts below, **in order**, into the same claude.ai/design project. Conventions follow the export's own `docs/how-to-request-updates.md` (file + frame ID + section label; copy verbatim; state names; explicit system-change declarations).

## Files to attach (all paths from the project root)

Binary assets are staged in **`design/update-handoff-uploads/`** so nothing points at temp folders. Attach the ⭐ set with Prompt 1 and KEEP IN PROJECT KNOWLEDGE for the whole run; add the per-prompt extras when you reach them. One item **replaces** stale project knowledge — do that explicitly.

| Attach | File | Why |
|---|---|---|
| ⭐ Prompt 1, keep | `copy/00-global.md` | v1.2 chrome law: nav, announcement states, footer, button inventory, emails |
| ⭐ Prompt 1, keep | `copy/01-home.md` | v1.2 Home: three doors, proof band, sponsor-only S7 |
| ⭐ Prompt 1, keep | `copy/02-summit.md` | v1.2 Summit: Forge The Future name, real agenda, free, 90-minute language |
| ⭐ Prompt 1, keep | `copy/03-founders-after-hours.md` | v1.1 FAH: paid two-tier membership section, FAQ, platform chips |
| ⭐ Prompt 1, keep | `copy/08-event-motion-copy.md` | v1.2 motion layer: ticker string, hero states A–E, scene numerals, countdown labels |
| ⭐ Prompt 1, keep | `findings/12-forge-the-future-launch-intel.md` | Ground truth for every fact the prompts assert (Luma listing, roster, recon) |
| ⭐ Prompt 1, **replace project knowledge** | `design/ventriq-design-system-brief.md` | The brief was amended (v1.1 microcopy: "Save your seat" example, donate ban) — the copy uploaded in Phase 0 is STALE; upload this one and say "replace the earlier brief" |
| Prompt 2 | `design/update-handoff-uploads/luma-cover-flyer.png` | Justin's own launch artwork (1200×1200): name lockup, tagline, serif-display reference for the Prompt-6 ruling |
| Prompt 2 | `design/update-handoff-uploads/luma-listing-fullpage.png` | The live Luma page, full-length — what registrants actually see |
| Prompt 2 | `design/update-handoff-uploads/speaker-collage-promo.png` | The ~13-headshot collage — scale reference for the 15–30+ speaker wall |
| Prompt 2 | `design/update-handoff-uploads/speaker-card-robin-haynes.png` · `speaker-card-tiffany-bethea.png` · `speaker-card-jeffrey-scruggs.png` | Three on-token speaker cards — the revealed-card reference (photo treatment, name/title hierarchy) |

Do NOT attach: the other 16 speaker PNGs (three suffice as reference; the full set is for the build, not the canvas), `06-donate.md` (page is parked — Prompt 5 removes routes to it), `04`/`05`/`07` (unchanged this round; already in project knowledge from the original run), and anything from `design/claude-design-export (2)/` (the designer already holds those canvases).

---

## The fact delta (why every prompt below exists)

| In the design today | Reality (Jul 23) |
|---|---|
| "The Ventriq Summit" | **Forge The Future Virtual Summit** — Ventriq is the presenter; nav label stays "The Summit" |
| Free (v1 files) | **Free — confirmed** (the interim PWYW plan died before launch; ignore it entirely) |
| Aug 10–21 · Mon/Tue/Thu/Fri · Wednesdays off · "one hour a day" | **Aug 10–20 · Mon–Thu · Fri–Sun off · 90-minute sessions, 6:30–8:00 PM ET** |
| `[TOPIC-n]` placeholders | **8 real night titles** (in `02-summit.md` §S5, verbatim) |
| 8 speaker frames, "Eight builders…" | **15 speakers announced, "30+" promised** — wall must scale; count language = "thirty-plus" |
| Ticker: "A ROOM WORTH GETTING INTO…" | **"FORGED TOGETHER · BUILT TO LAST · AUG 10–20 · FREE · EIGHT NIGHTS ·"** (his own tagline) |
| Ticketing: Eventbrite, "no card" | **Luma** — "Registration runs on Luma — about a minute, free." |
| FAH hidden from nav/footer; "Join free on Skool" | **FAH public + PAID**: $39/mo digital · $[89–99]/mo in-person; CTA "Join Founders After Hours" |
| Donate in nav, footer, Home S7; Donate page live | **"Donate" is a banned word** — single-button nav, sponsor-only S7, Donate page parked |
| Countdown targets Aug 10 (unchanged) | Unchanged ✓ |

---

## PROMPT 1 — Global chrome sweep (all files)

> System-wide chrome update across every page frame — the copy files attached are v1.2 and are law.
>
> 1. **Nav (every frame):** links become `The Summit · Founders After Hours · The Mastermind · About`. Remove the gold-outline **Donate** button everywhere — nav has ONE button, the time-aware primary (`Register for the Summit` until Aug 20). This is a system change: single-button nav, declared intentionally.
> 2. **Announcement bar, all three states** (`Ventriq Global System.dc.html` 1a + every page frame): Pre: `Forge The Future · free · virtual · Aug 10–20 — Save your seat →` · During: `Forge The Future is live — tonight: [NIGHT-TITLE], 6:30 PM ET →` · Post: `Missed the summit? Every replay lives in Founders After Hours →`. Keep it one line at 390px — tighten to `Forge The Future · Aug 10–20 — Save your seat →` on mobile rather than wrapping (the current mobile frames wrap to two lines with the × floating mid-wrap; fix that).
> 3. **Footer:** adopt the canonical footer (Global System 1b, WITH the Founder Digest field + Contact link) on EVERY page frame — the per-page footers were documented as non-canonical; make 1b the only footer. Add **Founders After Hours** to the Programs column. Remove **Donate** from Pages. Add one small-links item: Instagram → @ventriqofficial.
> 4. **Buttons:** per `00-global.md` inventory — `Save your free seat` returns; `Join free on Skool` is retired; FAH CTAs read `Join Founders After Hours`.
> Scope: system-wide (all 9 files). Placeholders resolved: [TIME ET] → 6:30–8:00 PM ET · [LUMA-URL] → luma.com/lp9z8iav. Constraints touched: single-button nav (approved) · canonical footer adoption (approved).

**Accept when:** no frame anywhere shows Donate, Eventbrite, Aug 10–21, or a two-line announcement bar.

## PROMPT 2 — Summit page → Forge The Future (`Ventriq Summit.dc.html`, all frames)

> Update the Summit page to the launched event. `02-summit.md` v1.2 is law; the attached Luma flyer is the client's own launch artwork (its serif headline is discussed below — do NOT adopt it yet).
>
> 1. **Hero (1a State A):** eyebrow `FORGE THE FUTURE · A VENTRIQ SUMMIT · AUG 10–20 · VIRTUAL · FREE`. H1 unchanged ("Not just education. Implementation."). Sub per v1.2 ("Eight nights across two weeks — one session a night, ninety minutes each…"). CTA `Save your free seat`. Trust row + meta row per v1.2 (`AUG 10–20 · 6:30–8:00 PM ET · ZOOM · FREE · T-…`).
> 2. **Ticker:** `FORGED TOGETHER · BUILT TO LAST · AUG 10–20 · FREE · EIGHT NIGHTS ·` — same treatment, new string.
> 3. **Corridor-draw scene:** numerals count **8 · 8 · 90 · 2** (nights · sessions · minutes · weeks); caption beats `[Eight nights.] → [One door.] → [Walk through.]`.
> 4. **Agenda "Two weeks, mapped":** Mon–Thu rows with the REAL night titles from `02-summit.md` §S5 (The Weight and the Vision … The End of the Beginning), `[SPEAKERS]` chips per row; footer line "All sessions 6:30–8:00 PM ET. Fridays through Sundays are yours — go build with the week." No off-day rows inside the week; the off-block is Fri–Sun between weeks.
> 5. **Speaker wall:** redesign from 8 fixed frames to a **scalable 15–30+ wall** — smaller cards, denser grid, grouped-by-night headers once mapping exists; pending state shows the drafting-frame silhouettes with `SPEAKER [nn]`; keep one revealed-card sample. Section intro: "Thirty-plus builders, operators, and funders — no professional motivators."
> 6. **Hero states C/D/E** (1c/1d): per `08-event-motion-copy.md` v1.2 — C is TONIGHT · NIGHT [n] OF 8 with the night title as H1, live at 6:30 PM ET; D eyebrow BETWEEN SESSIONS (Fri–Sun), H1 "Go build."; E unchanged except eyebrow `FORGE THE FUTURE · AUGUST 2026`.
> 7. **Steps + FAQ:** per v1.2 (step 1 Luma/free; step 2 Mon–Thu nights; FAQ "What does it cost?" = free).
> Scope: this file + announcement/nav via Prompt 1. Placeholders resolved: night titles (verbatim), time. Still bracketed: [SPEAKERS], [ANNOUNCE-DATE].

**Accept when:** the page reads as *Forge The Future presented by Ventriq*; the agenda shows real titles Mon–Thu; the wall visibly scales past eight; nothing says "hour."

## PROMPT 3 — Founders After Hours → paid membership (`Ventriq Founders After Hours.dc.html`)

> FAH is public again AND a paid membership. `03-founders-after-hours.md` (v1.1) is law.
>
> 1. Hero: eyebrow `A VENTRIQ COMMUNITY · BALTIMORE FIRST` (no "free to join"); CTA `Join Founders After Hours` + meta line `From $39/month · cancel anytime` with its dashed `[POLICY — confirm]` chip.
> 2. **NEW section after "Why it works": Membership** — two threshold cards, gold top rules, drafting numerals **$39** and **$[89–99]** (redline chip on the second): Digital vs In person, contents per §S5 of the copy file, including "Fifteen to twenty-five founders max, on purpose. Baltimore first; your city when it opens." Under-card line: the How to Run a Profitable Business free-on-ramp sentence with its `[HRPB]` chip.
> 3. Replace every `Join free on Skool` button; the handoff sentence becomes the v1.1 platform-neutral version with the `[PLATFORM — Skool TBC]` chip.
> 4. FAQ: swap in "What does it cost?" and "Why isn't it free?" per the copy file; update "I'm not in Baltimore."
> 5. Tally, run-of-show, chapters, hero gesture: unchanged.
> Scope: this file (+ chrome via Prompt 1). Constraints: cards stay the one-card-moment; pricing numerals are real numbers, not decorations.

**Accept when:** the page sells a membership without apologizing for the price, and no "free"/"Skool" claim survives outside a chip.

## PROMPT 4 — Home restore + facts (`Ventriq Home.dc.html`)

> Restore the three-door homepage per `01-home.md` v1.2 (FAH is public again — this reverses the "hidden for now" instruction):
>
> 1. **S3 "Three ways in."** — Door 1 **Forge The Future** *(the Summit)*: "Eight nights. Two weeks. Ninety minutes a night." meta `Aug 10–20 · virtual · free` → `Save your free seat`. Door 2 **Founders After Hours** with meta `Baltimore first · membership from $39/mo` → `Join Founders After Hours` (drafting numeral: **$39**). Door 3 Mastermind unchanged.
> 2. **S4** back to "One structure. Three doors." with the original three-line convergence diagram (Summit + FAH + Mastermind labels) and the v1.0 body ("Come for a session. Stay for the room. Build for the decade…").
> 3. **Proof band:** `Aug 10–20 — Forge The Future, Ventriq's first summit · 8 nights, 90 minutes each · Baltimore — first Founders After Hours chapter · 10 seats — Mastermind cohort 2, September`.
> 4. **Hero:** CTA `Register for the Summit`; quiet link `Or step into the community → Founders After Hours`.
> 5. **S7** becomes sponsors-only per v1.1: heading "Put a name behind the builders," one gold button `Sponsor the Summit` + quiet link `Talk partnerships →` — no Donate, no tithe line on this page.
> Scope: this file (+ chrome via Prompt 1). This supersedes the Phase-3 FAH-removal instruction — declared intentionally.

**Accept when:** three doors, real numbers on each, zero donate language, diagram has three converging lines again.

## PROMPT 5 — Retire the Donate surfaces

> `Ventriq Donate.dc.html` is PARKED (legal: no donate language until filings clear). Do not delete the file — mark its frame labels `PARKED — do not build` and remove every route to it: nav (done in Prompt 1), footers (done), Home S7 (done in Prompt 4), Summit sponsor CTA now points to Contact with the Sponsorship subject preselected. On `Ventriq Contact.dc.html`, add a default placeholder option to the "What's this about?" select ("Pick one") so The Summit isn't silently preselected — and confirm the select still lists Sponsorship & partnerships.

**Accept when:** no clickable path to Donate exists in any frame; Contact's select has a placeholder state.

## PROMPT 6 — Consistency + past-mistake pass (system-wide)

> Final sweep, same spirit as the original Phase 7:
> 1. Gold budget recount per viewport after these changes (the nav lost a gold-outline button — heroes may now be under budget; do not add gold to compensate).
> 2. Confirm reduced-motion coverage note stands for any NEW animation added in this round.
> 3. **Typography ruling (system decision, declared):** the client's launch artwork uses a warm serif display for "Forge The Future." The SITE stays **Space Grotesk-only**; the serif enters only inside imported artwork (flyer images, IG embeds). Do not introduce a serif display face into any frame. If the client later asks for the serif on the Summit hero, that is a system amendment to discuss, not a silent adoption.
> 4. The two off-palette promo graphics (pink megaphone / red SPEAKER ALERT stickers) are IG-only — never reference their style in web frames.
> 5. List everything that drifted and show corrections (as Phase 7 did).

**Accept when:** the drift list is empty or corrected, and no serif crept in.

---

## Sequencing note for Derrick

You're also building the MVP directly in code from the copy deck — that remains the primary path (deck v1.2 + `design-export-review.md` §7 build contract). Run this handoff when you want the design canvases current for reference/screenshots; Prompts 1–4 are the load-bearing ones, 5–6 are hygiene. The Mastermind page needs **no changes** in this round (only its chrome via Prompt 1). About/Contact change only via Prompts 1 and 5.

**Open items that will trigger the NEXT design round:** speaker→night mapping + original headshots (wall goes revealed), [ANNOUNCE-DATE], FAH in-person price + policy confirms, Skool confirmation, Ventriq-Ventures/About holds, and Justin's answers on the §4 ops flags in `findings/12`.
