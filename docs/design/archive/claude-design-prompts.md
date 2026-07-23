# claude.ai/design — Phased Prompt Package

> **⚠️ Historical (Jul 10):** the design phase ran (export + review: `design/design-export-review.md`) and meeting 2 then changed copy facts baked into these prompts (Eventbrite→Luma, free→pay-what-you-want, FAH public + paid, no Donate). **Do not re-run prompts verbatim** — the `copy/` deck v1.1 governs; use the export's `how-to-request-updates.md` conventions for any design round-trips.

Built July 9, 2026. Seven phases, each with: **files to upload → the prompt (paste verbatim) → accept-when checklist → recovery nudges.** All paths relative to the project root (`~/Clients/Justin/ventriq/`).

## How to run this

1. **One project/conversation for the whole build** so the design system carries. If claude.ai supports project file uploads, load the Phase 1 files there once; otherwise attach per-phase.
   - **Do Phase 0 below first** — one-time account + project setup (skills, custom instructions, the system brief). You're on the Max plan, so custom skills are supported.
2. **Don't advance until a phase is accepted.** Each phase builds on the last; drift compounds.
3. **Gate check between phases:** screenshot the output and (optionally) bring it back to me — I'll review against the brand system, the 11 anti-patterns, and the tell catalogs.
4. SVG note: upload the two logo SVGs if the tool accepts them; `proof-sheet.png` carries all nine marks either way.
5. Placeholders like `[SPEAKER-1]` are intentional — the prompts tell the tool to keep them. Don't let it invent speakers, stats, or prices.

---

## PHASE 0 — One-time setup (before any prompting)

**1 · Upload the skills** (claude.ai → Settings → Capabilities → Skills → upload .zip, then toggle each ON). From `design/skills-for-claude-ai/`:

| Zip | What it enforces | Upload now? |
|---|---|---|
| `ventriq-design.zip` | The brand's design direction — architect's-line rules, palette ratios, voltage map, event-page budget | ✅ |
| `design-tells.zip` | The 2026 refusal catalog — the 16 visual tells that mark a design as AI-made | ✅ |
| `ventriq-voice.zip` | Justin's voice system — protects copy tone if the tool ever writes a label | ✅ |
| `human-copy.zip` | Anti-AI writing rules — ban list, density budgets, specificity | ✅ |
| `ventriq-stack.zip` | Next.js/shadcn code conventions | ⏸ Not for design — upload later when design turns into code |

Skills auto-trigger by relevance; the custom instructions below also name them explicitly so they stay active on every turn.

**2 · Create one claude.ai Project** for the whole build. Into its **custom instructions**, paste: the **DESIGN TOKENS** block and the **REFUSE** block from the Phase 1 prompt, plus this line:

> Always apply the ventriq-design, design-tells, ventriq-voice, and human-copy skills when designing or writing anything in this project. Copy provided in attached files is final — never rewrite it; keep [BRACKETED] placeholders exactly as written.

**3 · Upload `design/ventriq-design-system-brief.md` to the project knowledge** — the standing authority every phase references.

**Defense in depth, by design:** the same rules now live in three layers — skills (always-on behavior), custom instructions (persistent per-project), and the phase prompts (per-turn). If any one layer isn't honored by the /design surface, the others still hold.

---

## PHASE 1 — Design DNA (the style foundation)

**Goal:** lock the visual language before any full page: hero concept + core components.

**Upload:**
- `design/ventriq-design-system-brief.md` (keep in project knowledge for ALL phases)
- `brand/proof-sheet.png` (all 9 logo variants on cream/white/midnight)
- `brand/logos/ventriq-wordmark-color.svg` + `brand/logos/ventriq-monogram-duo.svg` (if SVG accepted)
- `competition/screenshots/hampton.png` · `competition/screenshots/halcyon.png` · `competition/screenshots/events/stripe-sessions-2026-preevent.png`

**PROMPT — paste verbatim:**

> You are designing the visual system for **Ventriq** (pronounced ven-TREEK) — a new nonprofit that equips founders — small business owners, startups, and nonprofits, with a focus on underrepresented builders — with capital, programming, and council. Baltimore-rooted. The brand concept everything derives from: **venture + corridor** — two lines converging to a vanishing point, reading as a V, a corridor, and a threshold ("a room worth getting into"). The identity is "an architect's line, not an accelerator's rocket."
>
> **DESIGN TOKENS (locked — do not invent alternatives):**
> - Midnight `#101B2D` — the dominant ground; the brand is wrapped in navy
> - Cream `#F1ECDF` — the light reading field (never the dominant identity)
> - Ink `#0B0F16` — text on cream · Gold `#C9A24C` — the signature: hairline rules, corridor lines, key numerals, focus states; rare enough to stay expensive; display/graphic use only (it fails contrast for body text)
> - Burnt orange `#C15A2C` — interactive accent only (buttons/links), used sparingly
> - Type: **Space Grotesk** — SemiBold/Medium display vs Regular body at extreme size jumps (≥3× display:body); tracked small-caps eyebrows in gold with a hairline rule; tabular "drafting" numerals. No serif-italic accent words. No Inter anywhere. Sharp radii (2–4px).
>
> **THE SIGNATURE ELEMENT:** a drafted gold hairline system with drafting semantics — 1px lines carrying dimension ticks and section markers, converging toward vanishing points like construction lines on an architect's drawing. Asymmetric and directional. NEVER uniform newspaper column rules — if it reads "broadsheet," it's wrong; it should read "drafting table."
>
> **REFUSE (these mark a design as AI-generated):** centered hero with pill badge + two buttons; three identical icon-top cards; colored left-border strips; purple/indigo gradients; gradient text; glassmorphism/backdrop-blur; emoji as icons; uniform radius + padding everywhere; the default-shadcn look; stat banners as filler; ALL-CAPS everything; bounce easing; stock-photo energy. Also refuse the three "tasteful AI defaults": a cream+serif+terracotta page; near-black+acid-green; generic hairline broadsheet.
>
> **References attached:** Hampton — match its composure and page grammar, not its palette. Stripe Sessions — the event-grandeur benchmark (type + light + rules at scale). Halcyon — cream/black editorial rhythm and line motifs. Voltage for marketing pages: 3/10, composed.
>
> **TASK — a style foundation, not a full page:**
> 1. The homepage hero concept: midnight ground, asymmetric left-aligned (roughly 5/7), gold corridor lines converging toward a vanishing point behind the type. Use exactly this copy — eyebrow: `ven-TREEK · a nonprofit for founders` · H1: `The resources are out there. They're just camouflaged.` · sub: `Ventriq points the way in: capital, programming, and council for small business owners, startups, and nonprofits doing the real work — every serious founder welcome, with a focus on the builders the old models overlook.` · primary button: `Register for the Summit — free` · quiet text link: `Or back the builders → Donate`.
> 2. Core components in the same frame: primary + outline buttons; the gold-ruled small-caps eyebrow; one "threshold card" (a program card with a gold top rule and a drafting number); the drafting meta row (`AUG 10–21 · [TIME ET] · ZOOM · $0`); a section rule with dimension ticks; a pull-quote treatment; one form field with its focus state.
> 3. Desktop-first, plus one mobile view of the hero.
>
> Before you build: review your plan — if any part of it would appear for ANY similar nonprofit or startup brief, revise that part and say what you changed. The corridor concept must be visible in the bones, not pasted on. Sentence case everywhere. Use only the copy given; keep `[BRACKETED]` placeholders exactly as written; write no new copy. Apply the ventriq-design, design-tells, ventriq-voice, and human-copy skills throughout.

**Accept when:** the corridor lines have drafting semantics (ticks, convergence — not decoration); midnight dominates; gold appears ≤ a handful of times; the hero is asymmetric; type contrast is extreme; nothing on the refusal list appears; it looks like nothing you've seen this month.

**If it misses:** see Standing Nudges below — most-used here: N1 (drafting semantics), N2 (gold rarity), N5 (counterfactual redo).

---

## PHASE 2 — Home

**Goal:** the full homepage in the locked system.

**Upload:** `copy/01-home.md` · `copy/00-global.md` · `competition/screenshots/digitalundivided.png` (dual-audience hero CTAs) · `competition/screenshots/camelback.png` (paired Donate/Apply nav)

**PROMPT:**

> Continue in the established Ventriq system (midnight `#101B2D` / cream `#F1ECDF` / ink `#0B0F16` / gold `#C9A24C` signature / orange `#C15A2C` interactive; Space Grotesk; drafted gold hairlines with ticks; sharp radii; sentence case; the refusal list from before still applies).
>
> **Build the full homepage** from the attached `01-home.md` — it is copy + wireframe in one: sections in order, final copy, and a one-line layout intent per section in italics. Follow it exactly: the copy is final, the placeholders stay bracketed, and no section is added or removed.
>
> Specifics to honor:
> - **Nav** (from `00-global.md`): wordmark left; The Summit · Founders After Hours · The Mastermind · About; right side: `Donate` (gold outline) + `Register for the Summit` (solid gold) — the paired-buttons convention in the attached digitalundivided/Camelback references.
> - **S3 Three doors** is the page's one card moment — three *thresholds* with gold top rules and meaningful drafting numbers (their start dates), varied in width or height. Not three identical icon cards.
> - **S4** is the signature section: a drawn gold line-diagram showing Summit → Founders After Hours → Mastermind converging on a doorway.
> - **S7** is the ONE dark donor section (Halcyon pattern) — donors never touch the hero.
> - Photography placeholders: real-founder photography, warm, navy-tinted grade — represent as treated placeholder blocks, never stock-style imagery.
> - Desktop + mobile.
>
> Counterfactual check before building, as before.

**Accept when:** section order matches `01-home.md`; the three doors vary; the S4 diagram exists and derives from the logo geometry; one dark donor section only; mobile holds the asymmetry without breaking.

---

## PHASE 3 — The Summit page (the WOW page)

**Goal:** the animated event page — "a gala invitation with a festival heartbeat" (voltage 4–5/10).

**Upload:** `copy/02-summit.md` · `copy/08-event-motion-copy.md` · `competition/screenshots/events/stripe-sessions-2026-preevent.png` · `competition/screenshots/events/vercel-ship-sf-2026.png` (countdown-as-metadata) · `competition/screenshots/events/wip-workoholics-2026.png` (drafted grandeur) · `competition/screenshots/events/afrotechconference.png` (speaker-wall energy) · `competition/screenshots/events/blackambition.png` (the register) · `competition/screenshots/events/mobile-stripe-sessions.png`

**PROMPT:**

> Continue in the Ventriq system. **Build the Summit page** from `02-summit.md` (base copy + section order — final, not to be rewritten) layered with `08-event-motion-copy.md` (the motion copy: staged beats, hero states, ticker, scene captions).
>
> This page gets a bigger boldness budget than the rest of the site — voltage 4–5 of 10: **a gala invitation with a festival heartbeat.** Grandeur comes from type, light, and drawn lines at scale — never gradients, particles, or gloss. References attached: Stripe Sessions (structure + dim-to-lit manifesto), Vercel Ship (countdown as monospace drafting metadata in the hero meta row — copy this treatment, never a billboard countdown), WIP (drafted grandeur on a budget: giant date numerals, plotter marks, grain), AfroTech (speaker-wall energy, at lower voltage), Black Ambition (the confidence register).
>
> Requirements:
> 1. **Hero = State A** from `08` (pre-announcement), with the H1 designed as two staged beats — `Not just education.` / `Implementation.` — the corridor rule drawing under beat two. Show the staging as 2–3 frames or describe it inline if the tool is static.
> 2. **The ticker** — this page's one festival gesture: a slow gold marquee, tracked small caps: `A ROOM WORTH GETTING INTO · AUG 10–21 · FREE · ONE HOUR A DAY ·`
> 3. **The manifesto moment**: the `08` paragraph styled as the scroll-lit centerpiece (dim gold → cream), Stripe-Sessions style.
> 4. **The corridor-draw scene**: converging gold lines with the count-up numerals (8 · 8 · 1 · 2 · $0) and the three caption beats from `08`.
> 5. **Speaker wall in PENDING state**: drafting-frame silhouettes, `SPEAKER 01…08`, "Announced [ANNOUNCE-DATE]", CTA `Get the speaker announcement`. Design it so revealed cards (photo/name/title/day chip) are an obvious swap.
> 6. **Agenda** as the two-week map from `02`, with the three row states (upcoming / TODAY·JOIN LIVE / REPLAY IN THE COMMUNITY) shown.
> 7. Atmosphere: subtle film grain + a gold light field on midnight — light, not gradient-decoration.
> 8. Design the hero so States C ("TODAY · SESSION n OF 8") and E (replay mode) from `08` are clearly the same component with swapped content — show State C as a small variant frame.
> 9. Desktop + mobile. Registration CTA microcopy: "Ticketing runs on Eventbrite — about 60 seconds, no card."
>
> Keep every `[PLACEHOLDER]`. No new copy. Counterfactual check first.

**Accept when:** it reads gala-grand, not funnel-loud; the countdown sits in the meta row; exactly one ticker; the corridor scene is unmistakably ours; pending speaker cards look intentional (not unfinished); the live-day variant exists; mobile keeps the drama without horizontal scroll.

---

## PHASE 4 — Founders After Hours

**Goal:** the community page — warm, kinetic through the tally motif.

**Upload:** `copy/03-founders-after-hours.md` · `copy/08-event-motion-copy.md` · `competition/screenshots/1millioncups.png` (role-card doors) · `competition/screenshots/creativemornings.png` (cadence + scale line) · `competition/screenshots/events/investfest.png` (belonging energy)

**PROMPT:**

> Continue in the Ventriq system. **Build the Founders After Hours page** from `03-founders-after-hours.md` + the FAH section of `08-event-motion-copy.md`. Voltage 4/10 — warmer and more human than the Summit page; this is the belonging page.
>
> Requirements:
> 1. Hero beats: `Come do the work.` / `We'll count it.` — with **gold tally strokes (groups of five) drawing in** behind beat two. The tally-draw is this page's one festival gesture — no ticker here.
> 2. **S2 three doors** as role-based entry cards (the attached 1 Million Cups pattern): Join the room / Show up / Bring your challenge.
> 3. **S3 the run-of-show** is the signature section: a ruled schedule (7:00 / 7:15 / 8:15 / 8:30) where each row's rule draws and its text follows — the night assembling like a drawing.
> 4. **S5 the tally counter**: big gold drafting numerals; show the pre-launch state ("The first board goes up this fall in Baltimore. The count starts at zero — on purpose.") with the live-count state as a variant.
> 5. Photography: real founders working — laptops, phones, the board — warm, navy grade. This page has the most people in it.
> 6. Skool handoff honesty: the "two minutes, free Skool account" line stays visible near every join CTA.
> 7. Desktop + mobile. Counterfactual check first; no new copy; placeholders stay.

**Accept when:** it feels like a room you want to be in; the tally motif carries the page; the run-of-show reads as the centerpiece; role cards don't collapse into identical icon-cards.

---

## PHASE 5 — The Mastermind

**Goal:** the premium application page — selective-but-open.

**Upload:** `copy/04-mastermind.md` · `competition/screenshots/hampton.png`

**PROMPT:**

> Continue in the Ventriq system. **Build the Mastermind page** from `04-mastermind.md`. Voltage 3/10 — this is the most composed page on the site: Hampton's page grammar (attached) at our palette, with one difference of soul: **selective, not exclusive.** Hampton gates on wealth and hides everything; we state criteria and process plainly.
>
> Requirements:
> 1. Hero: eyebrow carries the real scarcity (`cohort 2 · September–December 2026 · 10 seats`); H1 `The room for what comes after the plan.`; one CTA.
> 2. **S4 "The format, stated plainly"** is the signature section: a drafted spec sheet — ruled rows, tabular figures, gold ticks — the transparency block as a designed artifact. Use investment Variant A layout (a stated amount) with Variant B as an alternate frame.
> 3. S3 three pillars sit under a small drawn line-diagram (the room / the scoreboard / the systems).
> 4. **S6 application steps** as drafting-numbered stages with dates — a real sequence, so numbers are earned.
> 5. The founder letter (S7) gets the pull-quote treatment from the system.
> 6. FAQ as ruled accordion rows. Desktop + mobile. No new copy; placeholders stay; counterfactual check first.

**Accept when:** it feels like an acceptance letter you want to earn; the spec sheet reads as craft, not a table; nothing smells like a funnel.

---

## PHASE 6 — About · Donate · Contact

**Goal:** the three quieter pages in one pass.

**Upload:** `copy/05-about.md` · `copy/06-donate.md` · `copy/07-contact.md` · `competition/screenshots/halcyon.png` (donor section + editorial rhythm) · `competition/screenshots/events/blackambition.png` (manifesto register)

**PROMPT:**

> Continue in the Ventriq system. **Build three pages** from the attached files, voltage 2–3/10 — editorial, warm, unhurried.
>
> **About (`05-about.md`):** cream-dominant reading page (the one place cream leads — it's the letter, not the lobby). The story section is editorial prose with dates as margin drafting numerals and two designed pull-quotes. **S3 "the name"** is the page's signature: the monogram's two lines converging to the vanishing point, drawn slowly, beside the ven-TREEK explanation. Mission block: midnight card, cream type, gold rule. Bio as ruled rows.
> **Donate (`06-donate.md`):** the giving form is embedded and above the fold (left copy / right form). Preset amounts as threshold cards; the per-program giving row; the "Skin in the game" trust block with a gold rule; the dark corporate-partner card at `#sponsor`. Nothing pleads — outcomes, not need. Reference: Halcyon's composed donor moment.
> **Contact (`07-contact.md`):** the simplest page on the site — short copy, one form, three ruled quick-route rows. No map, no office-hours theater.
>
> Desktop + mobile for each. No new copy; placeholders stay; counterfactual check first.

**Accept when:** About reads like a story you finish; Donate's form renders on-page above the fold; Contact takes under a minute to understand.

---

## PHASE 7 — System polish & states pass

**Goal:** the connective tissue — mobile audit, states, and consistency.

**Upload:** `copy/00-global.md` · `competition/screenshots/events/mobile-stripe-sessions.png` · `competition/screenshots/events/mobile-vercel-ship.png`

**PROMPT:**

> Final pass on the Ventriq system. From `00-global.md`, design the remaining pieces and audit consistency:
> 1. **Announcement bar** — all three states (pre-summit / live-day / post-summit), dismissible, one line.
> 2. **Footer** — midnight; four columns per the file; the legal line under a gold hairline; newsletter field with its microcopy.
> 3. **Form states** — a field in default / focus (gold ring) / error (with the in-voice error copy) / success. The Turnstile line.
> 4. **404** — "This corridor doesn't go anywhere." — make the corridor joke visual: a drawn line that stops.
> 5. **Mobile audit** — every page's hero at 390px: asymmetry preserved, tickers and tallies behaving, meta rows wrapping cleanly (references attached).
> 6. **Consistency sweep** — one radius, one border treatment, one shadow treatment (or none), gold usage count per viewport ≤ 5, sentence case everywhere, every button verb from the `00-global` inventory (never "Learn More"/"Submit").
> List anything that drifted from the system across the seven phases and show the corrected version.

**Accept when:** the 404 makes you smile; error states sound like Justin; nothing drifted.

---

## Standing recovery nudges (paste as follow-ups when a phase misses)

- **N1 — Drafting semantics:** "The lines read as decoration. Give them drafting semantics — dimension ticks, convergence toward a vanishing point, section markers — asymmetric and directional, like construction lines."
- **N2 — Gold rarity:** "Gold is doing too much. Keep it to the rules, one numeral moment, and the primary CTA — if gold is everywhere, it's nowhere."
- **N3 — Chanel rule:** "Remove one decorative element per section. Keep the signature, quiet everything else."
- **N4 — Voltage correction:** "This drifted toward [funnel-glossy / corporate-cold]. Target: a gala invitation with a festival heartbeat — warmth from photography and language, grandeur from type and light."
- **N5 — Counterfactual redo:** "Section [X] would appear on any similar brief. Rebuild it from the corridor/threshold concept — what would an architect's drawing of this content look like?"
- **N6 — Copy discipline:** "You rewrote copy in section [X]. Restore the attached copy exactly, including bracketed placeholders."
- **N7 — Card collapse:** "These cards became identical. Vary width, height, or internal structure — they're three different thresholds, not one component repeated."
- **N8 — Mobile drama:** "Mobile lost the composition. Keep the left-aligned asymmetry and the meta row; stack the drama vertically instead of shrinking it."

## Master upload manifest

| File | Used in phase |
|---|---|
| `design/ventriq-design-system-brief.md` | **Phase 0** → all (persistent project knowledge) |
| `design/skills-for-claude-ai/` — `ventriq-design.zip` · `design-tells.zip` · `ventriq-voice.zip` · `human-copy.zip` | **Phase 0** — account skills (Max plan); `ventriq-stack.zip` waits for the code phase |
| `brand/proof-sheet.png` + 2 logo SVGs | 1 |
| `competition/screenshots/hampton.png` | 1, 5 |
| `competition/screenshots/halcyon.png` | 1, 6 |
| `competition/screenshots/events/stripe-sessions-2026-preevent.png` | 1, 3 |
| `copy/00-global.md` | 2, 7 |
| `copy/01-home.md` | 2 |
| `competition/screenshots/digitalundivided.png` · `camelback.png` | 2 |
| `copy/02-summit.md` · `copy/08-event-motion-copy.md` | 3 (08 also in 4) |
| `events/vercel-ship-sf-2026.png` · `events/wip-workoholics-2026.png` · `events/afrotechconference.png` · `events/blackambition.png` · `events/mobile-stripe-sessions.png` | 3 (blackambition also 6; mobiles also 7) |
| `copy/03-founders-after-hours.md` | 4 |
| `competition/screenshots/1millioncups.png` · `creativemornings.png` · `events/investfest.png` | 4 |
| `copy/04-mastermind.md` | 5 |
| `copy/05-about.md` · `06-donate.md` · `07-contact.md` | 6 |
| `events/mobile-vercel-ship.png` | 7 |
