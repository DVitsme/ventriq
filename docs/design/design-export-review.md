# Design-export review — my working memory

**Reviewed 2026-07-10** by Claude (Derrick's CLI instance). Subject: `design/claude-design-export (2)/` — the full export of the claude.ai/design build Derrick ran from `claude-design-prompts.md`. This file is the authority on **what the design phase produced, what it got right, what's missing, and what the build must do differently**. I verified everything below myself (method at the bottom) — nothing here is taken on the design tool's word alone.

> **Update, later on 7/10:** the Mastermind page has since been designed and delivered as `Ventriq Mastermind (standalone).html` — original gap #1 is closed. See §4a for the audit; §4/§10 amended.

> **v2 EXPORT, Jul 23 — `claude-ai-design-v2/Ventriq Homepage Hero/` supersedes the v1 export as design of record.** Derrick ran the 6-prompt update handoff; I gate-checked it (static + rendered): **all six prompts landed.** Verified: Forge The Future naming + "forged together · built to last" ticker + Aug 10–20 + 6:30–8:00 PM ET + 8/8/90/2 count-up + free restored (Summit); three-door Home with $39 FAH numeral + three-line convergence diagram; FAH "Two ways to hold a seat." membership cards ($39 / $[89–99]+chip) + HRPB on-ramp; single-button nav + FAH in nav + Instagram footer link on all 9 canvases; Donate strings exist ONLY inside the parked Donate file; zero off-palette hexes (1,831 token hits); no serif crept in; "free to join" survives only in Style Foundation's archived 2a/2b frames (historical, correct). Mastermind is now a proper canvas (`Ventriq Mastermind.dc.html`). **The export also contains `handoff_ventriq_nextjs/` — a complete build handoff (build-spec, components, motion-spec, acceptance checklist, copy-source at v1.2, design-refs) that explicitly overrides the ventriq-stack skill where launch facts changed and RATIFIES the orange accent.** Build from that folder; this review's §7 build contract still applies (JS-gating inversion, countdown island, state machines).

---

## 1 · What the export is

- **8 `.dc.html` canvas files** (root, duplicated byte-identical in `design_handoff_ventriq_website/design-refs/`): Style Foundation (phase-1 archive), Global System, Home, Summit, Founders After Hours, About, Donate, Contact. Each holds **27 labeled frames total** (desktop 1440 / mobile 390 / state variants, gold ID badges `1a`–`1f`).
- Files open directly in a browser with `support.js` beside them (a generated dc-runtime that hydrates `<x-dc>` templates with `window.React`). Inline styles throughout; Space Grotesk 400/500/600 via Google Fonts; grain + select-chevron as inline data-URIs.
- **`design_handoff_ventriq_website/`** is the handoff package written *for me*: `README.md` (excellent — tokens, per-page layout specs with measurements, state-machine list), `docs/decisions-log.md` (phase history incl. corrections), `docs/motion-spec.md`, `docs/how-to-request-updates.md` (prompt conventions for round-trips), `copy-source/` (byte-identical copies of our copy deck + both skills + the brief), `assets/` (2 SVGs), `screenshots/` (only `home-desktop.jpg` — their capture pipeline died).
- **`uploads/`** = everything Derrick uploaded. All 8 copy files byte-identical to repo `copy/` (no staleness). Both skills (`SKILL.md` = human-copy, `SKILL-3d95190a.md` = ventriq-voice). SVGs are my `brand/logos/` reconstructions (byte-diff is only DOM re-serialization `/>`→`></path>`). Comp screenshots from `competition/`.
- **My full frame captures live in `design/design-review-screenshots/`** (27 PNGs, all frames desktop+mobile+states) — I rendered them with Playwright + system Chrome because the export shipped without captures.

**Frame map:** Home 1a/1b · Summit 1a (State A) / 1b mobile / 1c hero State C / 1d hero State E · FAH 1a/1b/1c ([N] tally swap) · About 1a/1b · Donate 1a/1b · Contact 1a/1c thank-you/1b · Global System 1a announcement ×3 / 1b canonical footer / 1c footer mobile / 1d form states / 1e/1f 404 · Style Foundation 1a/1b/1c specimens + 2a/2b (archived pre-FAH-removal homepage v1 — historical only).

---

## 2 · Verdict in one paragraph

The design phase **worked**. Seven of eight planned surfaces exist at high fidelity, the locked token system held with literally zero strays, copy-is-law held with zero unsanctioned rewrites, every compliance/blocker placeholder survived as a visible redline chip, and the signature drafting-line language is executed consistently and (per my counterfactual read) ownably. The two real problems are **a missing page (the Mastermind — the revenue MVP)** and **a client-decision side effect (FAH hidden from nav) that expires Aug 22 and has left the copy deck behind the design**. Everything else is build-notes, not defects.

---

## 3 · What was done well (verified, not vibes)

- **Token discipline is perfect.** Across ~480 KB of markup exactly 7 hex colors exist: the 5 locked (`#101B2D` `#F1ECDF` `#0B0F16` `#C9A24C` `#C15A2C`) + 2 documented derived shades (`#BB9440` gold hover, `#AF5026` on-cream link for AA). rgba/oklch bases are all cream/ink/gold/midnight (+1 orange error-bg); oklch only in the photo-grade gradients. `border-radius: 2px` ×266 (one stray 1px). **Only box-shadows are focus rings.** No Inter, no italics, no `text-transform: uppercase` (real `font-variant: small-caps` instead), no backdrop-filter, no "Learn More"/"Submit"/"Get Started" anywhere.
- **Copy fidelity: zero unsanctioned rewrites.** I fuzzy-matched every rendered sentence from all frames against the deck corpus; every flag resolved to either a frame label, a verbatim deck line, or the documented client-ordered FAH-removal set. The ⚠️ audio-verify quotes carry visible warning chips *in the design itself* ("You got to serve the people first." on Donate; "accountability masked in community" on FAH). Attribution formats exact ("— Justin Shaw, AFRO, 2023").
- **The blocker chips are a feature.** `[TIME ET]`, `[ANNOUNCE-DATE]`, `[COUNSEL-REVIEW]`, `[EIN — no deductibility language until determination letter]`, `[TITHE — README #4]`, `[VERIFY REAL COSTS]`, `[STATS — his self-authored receipts]`, `[MISSION — Justin to ratify]`, `[ADVISORS — TBD]`, `[MIC title by name — Justin's call]`, `[TESTIMONIAL PERMISSIONS]` all render as dashed redline chips. The design cannot silently ship an unresolved legal/content decision — these map 1:1 to the meeting-questions blockers.
- **Layout laws honored everywhere I looked:** asymmetric 5/7 heroes; threshold cards varied and staggered (never 3 identical); testimonials as ruled columns *not* cards; donors dark, one per page, near footer, never touching a hero; numbered markers only where sequence is real (steps, agenda days — role doors on FAH correctly unnumbered); sentence case universal.
- **The drafting-line signature reads as claimed** and is page-differentiated: corridor rays (Home/Summit), the labeled convergence diagram → doorway (Home S4 — genuinely good), tally strokes in fives with jitter + one incomplete group (FAH), monogram V-draw (About), dead-end line (404 — "This corridor doesn't go anywhere." lands). The mobile proof band turning into a **vertical dimension rail with ticks and an arrowhead** is an elegant unprompted adaptation.
- **State machines designed, not forked:** Summit hero A/C/E framed with B/D deferred to `copy/08`; agenda row states shown inline as an annotated strip; announcement bar ×3; speaker pending→revealed pair; FAH 0→[N] swap; form default/focus/error/success + Turnstile line, all in-voice.
- **Voltage calibration feels right in captures:** Home reads composed; Summit gets grandeur from scale + the ticker + light field without billboard countdown (countdown is small-caps meta, exactly the Vercel-Ship treatment we specced); FAH is the warmest; About is a cream reading page.
- **Phase-7 self-audit was real:** phase-1 orange primaries → gold correction is actually applied in the Style Foundation file (verified visually); drift documentation matches file state.
- **Docs quality:** README layout specs carry measurements (rule widths, stagger offsets, chip anatomy); `how-to-request-updates.md` gives exact update-prompt conventions (file + frame ID + `data-screen-label`, copy verbatim, state names, "we are changing the system" escalation phrase). Honest overall.

---

## 4 · Gaps (ranked)

1. ~~**The Mastermind page does not exist.**~~ **CLOSED 7/10 (later same day)** — delivered as `Ventriq Mastermind (standalone).html`. Full audit in **§4a** below. (Original finding, for the record: Phase 5 never ran, `04-mastermind.md` never uploaded, no frames — while nav/Home/nav-CTA state machine all referenced the page and cohort 2 is the revenue MVP.)
2. **Summit hero States B (announced) and D (between sessions) are unframed** — A/C/E only. `copy/08-event-motion-copy.md` fully specifies B/D, so the build implements them from copy; flag: nobody has *seen* them, so review them at build time against the A/C/E component.
3. **Page footers are non-canonical by design:** they omit the Founder Digest field and the Contact link. Global System **1b is the build target** (README/decisions log say so explicitly). Don't copy page-frame footers.
4. **No mobile state-variant frames** (e.g. State C mobile, FAH [N] mobile) and the style-foundation frames have empty `data-screen-label`s — trivial, but don't go hunting for them.
5. **Their screenshots folder is empty** (pipeline died) — solved: my captures in `design/design-review-screenshots/`.

## 4a · The Mastermind page (added later 7/10 — audited same as the rest)

**File:** `design/claude-design-export (2)/Ventriq Mastermind (standalone).html` — note the **different format**: a self-unpacking "bundled page" (dc-runtime + resources inlined, JS-required, shows a V-monogram thumbnail while unpacking; `title` is "Bundled Page"). Same canvas idiom inside: **3 frames** — `1a` desktop 1440 (**investment Variant A, "tweakable"**), `1b` mobile 390, `1c` S4 investment-row **Variant B swap** ("Discussed at acceptance — your acceptance letter arrives with the investment invoice and a window to commit."), also exposed as a Tweaks prop. My captures: `design/design-review-screenshots/ventriq-mastermind--1{a,b,c}-*.png`.

**Verdict: the gap is closed at the same quality bar as the other pages.**
- **Copy fidelity: zero lines without a deck match** (same fuzzy-match method). All qualification rules, pillar copy (Collaboration/Acceleration/Escalation triad), steps, letter, FAQ (8 items incl. "Is this the IAMJS mastermind?", "When is cohort 3?"), and final CTA "Declare it. Track it. Build it." are deck-true.
- **Tokens hold.** Off-palette hits in my first audit (`#B00020`, `#F0EEE6`, backdrop-filter, a salmon shimmer gradient, ui-monospace) all traced to the **bundler/runtime's own chrome** (skeleton-shimmer + print styles + error-pill CSS), not the page. Page-level: palette-only, 2px radii, no shadows, small-caps eyebrows, reduced-motion block present, native `<details>` FAQ, nav renders with The Mastermind in active-gold.
- **Phase-5 requirements delivered:** real scarcity in the eyebrow (`cohort 2 · September–December 2026 · 10 seats`); H1 `The room for what comes after the plan.`; one CTA; **S4 spec sheet as a drafted artifact** (small-caps ruled rows LENGTH/SESSIONS/COHORT/BETWEEN SESSIONS/GRADUATION/INVESTMENT, gold ticks, tabular figures); three pillars under a **drawn tick-line diagram** (the room / the scoreboard / the systems); application steps 1–4 as earned numerals with the honest rejection line (FAH fallback); letter with ⚠️-chipped pull-quote ("We're not here to make you feel good; we're here to forge founders who can scale the thing." — *paraphrased, verify before setting*); voltage ~3, composed.
- **Judgment calls it made that I endorse:** dropped the "15–100% revenue" cohort-1 claim as "unprintably wide" with an annotation chip explaining why; investment renders `$[INVESTMENT]` in gold + "Partial scholarships exist — ask in your application." + `[README #3 — Justin's call]` chip.
- **Its placeholders (add to the round-trip list):** `[APP-DEADLINE]` · `[DECISION-DATE]` · `[COHORT-DATES]` · `$[INVESTMENT]` + Variant A/B pick · measured cohort-1 outcomes · the ⚠️ pull-quote verification · `[PHOTO: Justin Shaw]`.
- **Nits:** page footer follows the (non-canonical) page-footer pattern — canonical Global System 1b still wins in build; the standalone's runtime CSS would pollute a naive static audit (grep the *rendered page content*, not the bundle); file lives at export root only (not mirrored into `design-refs/`).

## 5 · Flaws & nits (all small, all verified)

- **Straight quotes everywhere** (`&quot;` / `'`) — *inherited from our own copy deck*, faithfully reproduced. Space Grotesk renders them slanted so they pass casually, but display pull-quotes ("What do you like?", "The board doesn't lie.") deserve real `“ ” ’`. Decide once at build: typographic quotes site-wide (my recommendation) and patch the deck to match.
- **Contact select has no placeholder option** — renders pre-selected "The Summit". Build: add a disabled placeholder ("Pick one" in voice) or default to "Something else". (Option list itself is deck-true.)
- **`Ventriq Contact.dc.html` contains zero animations and zero reduced-motion block** while docs claim "every effect… already wired in every file." Harmless (nothing moves on Contact — docs overstate; motion-spec even says Contact = "hero fades only" which is also wrong, it's static). Trust the files over the docs on micro-claims.
- **Announcement bar on 390px wraps to two lines** with the dismiss × floating mid-wrap (README promises "one line"). Minor mobile chrome polish for build.
- **Hero corridor rays pass under the sub-copy** on Home/Summit at 1440 — acceptable atmosphere, but watch legibility with real photography/backgrounds.
- Gold-per-viewport sits at the budget ceiling in heroes (~5 counting the line system as one) — fine now; any addition (e.g. a gold badge in the announcement bar) breaks the budget.

## 6 · The FAH-hidden decision — ~~the one live wire~~ **SUPERSEDED (meeting 2, later 7/10): Justin reversed it — "start talking about it now." FAH is public again AND became a paid membership ($39/$89–99). The copy deck is updated (v1.1); the DESIGN still shows the hidden-FAH chrome + free-FAH copy and needs the restore + paid-tier round-trip (or gets rebuilt directly in code from deck v1.1). The Aug-22 announcement wire below is defused. Historical record follows:**

Mid-design, **by client instruction ("for now")**, Founders After Hours was removed from nav + all footers. The FAH *page* is fully designed and body-copy mentions remain (Summit replays/FAQ, About mission + final CTA button, Contact select + quick routes, 404 links, Donate chapter card). Design-side rewrites this caused on Home (all documented in decisions-log, all in-voice): "Two ways in." (was "Three ways in."), S4 "One structure. Two doors." + new body ("The Summit opens the door. The Mastermind is the work behind it. …"), donor body drops the chapter clause, proof band Baltimore fact → "rooted here, built to travel".

Consequences I have to manage:
- **Our `copy/` deck is now behind the design** on those Home lines (deck still has the three-door versions). The design-side rewrites are good but were authored by the tool, not the deck — port them into `copy/01-home.md` as a "FAH-hidden variant" (or restore, pending Justin).
- **The decision self-expires Aug 22:** the post-summit announcement-bar state says "Missed the Summit? Every replay lives in **Founders After Hours →**" and the post-summit nav CTA becomes FAH-related. Justin must decide FAH's public visibility **before the Summit ends** or the chrome contradicts the instruction. (It also means FAH is an orphan page until then — fine for SEO-soft-launch, but note it.)
- Restore path is scripted in `how-to-request-updates.md`: "restore Founders After Hours to nav/footer across all pages" + homepage door/diagram/copy restore from `01-home.md`.

## 7 · Build implications (for the Next.js phase — read before scaffolding)

- **Prototype JS-gating must be inverted in production.** Scroll-triggered content (Summit corridor-scene numerals + captions, manifesto lighting, FAH run-of-show text + tally beats, About monogram) renders **invisible/zero until hydration+scroll** in the prototypes (mustache-templated opacity via dc-runtime — e.g. run-of-show text is `opacity: {{ rosTA }}`). In production: content visible by default, animation as progressive enhancement (IntersectionObserver), `prefers-reduced-motion` → complete states. Never ship text whose visibility requires JS.
- The `.dc.html` inline-style + React-runtime format is **reference only** — recreate in Tailwind v4 tokens/components; don't port markup. `support.js` is not a production dependency.
- Countdown `T-[D]D.[H]H.[M]M` = client island; everything else on those pages can stay RSC.
- Implement the **7 state machines** (list in handoff README §State machines) as components + a calendar/config switch, not page forks: Summit hero A–E, announcement bar, nav primary CTA (Register → Apply Mastermind Aug 22+ → Join FAH), speaker pending/revealed, agenda rows upcoming/today/replay, FAH tally 0/[N], form states.
- **Canonical footer = Global System 1b** (with Digest + Contact link).
- Line draws: SVG `pathLength=1` dasharray/dashoffset per motion-spec (durations there); easing `cubic-bezier(0.23,1,0.32,1)`; exits faster than entrances; FAQ = native `<details>` with 45° `+`.
- Photography grade formula (README §Design tokens → Photography): warm→navy duotone gradient + `rgba(16,27,45,…)` overlay + SVG turbulence grain — apply to *all* real photos to unify sources; placeholders label every slot with subject.
- A11y floor already modeled: focus rings (gold/cream by ground), `aria-label`s on icon buttons, `aria-hidden` ticker duplicate, `AF5026` on-cream links. Keep AA when swapping real content in; gold stays display-only.
- Smart quotes: run copy through a curly-quote pass at build (see §5).

## 8 · How to round-trip changes to the design (Derrick drives)

Use `docs/how-to-request-updates.md` conventions: name **file + frame ID + section label**, give final copy verbatim, name states not screens, declare "we are changing the system" for any locked-token change, list resolved placeholders as `[X] → value`. Highest-value updates to send once the Justin meeting resolves them: `[TIME ET]`, `[ANNOUNCE-DATE]` + 8 speaker cards, `[APP-OPEN DATE]`, `[EVENTBRITE-URL]`, `[SKOOL-URL]`, `[EMAIL]`, Baltimore founding-night date, verified impact $ equivalents, mission ratification, EIN/501(c)(3) language, testimonial permissions, the two ⚠️ quotes, accent ratification (orange stands per current system), Mastermind investment display A/B.

## 9 · Verification log (how I know)

Playwright + system Chrome rendered all 8 files (`file://`, fonts awaited, animations forced to end-state); 27 frames element-screenshotted → `design/design-review-screenshots/`; tall pages sliced and visually reviewed frame by frame. Static audit: exhaustive hex/rgba/oklch/radius/shadow/font-family/`!important`/gradient census per file; refusal-catalog pattern greps. Copy: `diff` of uploads + copy-source vs repo (byte-identical ×8); rendered `innerText` of every frame extracted and fuzzy-matched vs deck corpus; all flags manually resolved. Phase plan cross-checked against `claude-design-prompts.md` (Phase 5 never run; tool inserted its own phase 3 = skills+FAH rewrite; everything else delivered). SVG diffs inspected (serialization-only). Contact animation count: 0. dc-runtime `{{ }}` gating confirmed in source (`rosTA` etc.).

## 10 · Standing next actions

1. ~~Design the Mastermind page~~ **Done 7/10** (§4a). Remaining Mastermind items: Justin picks investment Variant A vs B + the amount, `[APP-DEADLINE]`/`[DECISION-DATE]`/`[COHORT-DATES]`, cohort-1 measured outcomes, verify the forge-founders quote.
2. Port the sanctioned Home rewrites into `copy/` (v1.1) + record the FAH-visibility decision with its **Aug 22 deadline**.
3. Feed meeting-resolved placeholders back via §8; then a final design consistency pass.
4. Build phase: scaffold per `findings/11` + `ventriq-stack` skill, using §7 above as the contract; recreate pages desktop-first from the frames, mobile from the `1b`s.
5. Swap reconstructed SVGs for Justin's originals when delivered (assets in the export are still my reconstructions, round-tripped).
