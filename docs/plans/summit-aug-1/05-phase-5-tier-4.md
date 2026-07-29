# Phase 5 — Tier 4: after launch

**Justin's framing:** *"After launch — improves the page, does not block it."*
**When:** after Aug 1 · **Status:** 🟥 not started · **Items:** 4
**Prev:** [`04-phase-4-tier-3.md`](./04-phase-4-tier-3.md) ·
**Index:** [`00-README.md`](./00-README.md)

Nothing here blocks the Aug 1 live date. But **T4·3 has an Aug 10 deadline of
its own** that is harder than Aug 1, because it can't be shipped during the
event it serves — read that one first.

After this phase, work returns to
[`../../design/build-queue.md`](../../design/build-queue.md), which holds the
Jul 23 backlog the brief didn't touch.

---

## T4·1 — Sticky anchor sub-navigation
`brief §16` · tag: **`COPY AUDIT`**

- [ ] **Slim persistent sub-nav: Schedule · Speakers · FAQ · Register**

Brief: *"The page is long; **a slim persistent sub-nav measurably reduces
mobile bounce.**"*

`SECTIONS, VERBATIM`
> **Schedule · Speakers · FAQ · Register**

**Locator:** new component on `app/summit/page.tsx`; anchor targets needed on
the "Two weeks, mapped" (`:260`), speakers (`:224`) and FAQ (`:374`) sections.

`[OURS]` **Nothing on this site is sticky or fixed today**, including the main
nav — verified Jul 29 (Phase 1 §7). So this and the mobile CTA bar
([Phase 3 T2·1](./03-phase-3-tier-2.md)) are the first two fixed elements the
system will carry.

⚠️ **Build them as one system, not two.** A fixed bottom bar plus a fixed
sub-nav plus the existing announcement bar is three chrome layers competing for
a 375px screen. Decide the stacking, the scroll behaviour and the combined
vertical budget once — ideally when T2·1 is built, even though this ships
later.

⚠️ **A11y:** anchor navs need `aria-current` handling and must not break
sequential focus order. Skip-link interaction matters — we pass 100/100 today.

---

## T4·2 — Rebuild the speaker grid to render at any count
`brief §08` · tag: **`COPY AUDIT`**

- [ ] **Grid looks deliberate at six, twelve, and seventeen — not assuming fifteen tiles**

Brief: *"**Names arrive in waves, not all at once.** The grid should look
deliberate at six, twelve, and seventeen — not assume fifteen tiles."*

**Locator:** `app/summit/page.tsx:237–255` · grep anchor: `length: 15`

**Current state:** a hardcoded `Array.from({ length: 15 })` of anonymous
silhouette tiles. [Phase 2 T1·2](./02-phase-2-tier-1.md) removes them as a
Tier 1 credibility leak, so **by the time this item runs the section is either
empty or holding real people.**

**What we now know that the brief doesn't** (Phase 1 §4): the roster is **29
named people**, of whom **8 have headshot + bio**, 13 have only an Instagram
promo graphic — explicitly not usable — and 8 are unconfirmed. Per-night counts
run 3 to 6. So the real render targets are **8 now, ~21 if the promo-graphic
group converts, 29 at full roster** — which is close enough to the brief's
"six, twelve, seventeen" instruction to satisfy it.

⚠️ **Interacts with two Jul 23 decisions still on the design queue:**
- **Speaker flip cards** ([design brief §4.4](../../design/07-23-2026-design-change-brief.md)) — front face, back bio, keyboard-operable, reduced-motion
  cross-fade, mobile sheet instead of flip. Still blocked on headshots.
- **Agenda face thumbnails** ([design brief §4.5a](../../design/07-23-2026-design-change-brief.md)) — squares on desktop, circles on mobile, no
  progressive disclosure.

**Design the grid and the flip together** — they are the same component.

⚠️ **Also unresolved:** speaker name spellings and missing surnames
([O8](./01-phase-1-research.md#8--open-questions--do-not-resolve-these-alone))
— `Lydnsae Peele`, `Lake MItchell`, `Samantha` and `Nelle` cannot render
publicly as written.

---

## T4·3 — Founders After Hours section behind a toggle
`brief §16` · tag: **`COPY AUDIT`** · ⚠️ **deadline Aug 10, not "after launch"**

- [ ] **Build the section so it can be switched on without a deploy**

Brief: *"Build the Founders After Hours section behind a toggle **so it can be
switched on the moment it is named from the stage on Night 1, without a
deploy.**"*

**This is the mechanism for the membership rebrand.** Per
[Phase 1 §6.5](./01-phase-1-research.md), the working reading is:
**"Founders After Hours" is the current public name; "The Foundry" is the name
Justin announces live on Night 1 (Aug 10).** The brief describes the
pre-announcement state, the one-pager defines the post-announcement state, and
this toggle is how the site crosses between them mid-summit.

### What that makes true

1. **`lib/brand.ts` is now a requirement, not a nice-to-have.** A deploy-free
   name flip is only possible if the membership name lives in exactly one
   constant. It is currently rank 22 in
   [`../../design/build-queue.md`](../../design/build-queue.md) as a
   "cheap insurance" item. **Promote it — and build it before Aug 10, not
   after**, which means it belongs in Phase 3 or 4 even though its parent item
   sits here.
2. **The toggle is not just a section visibility flag.** If the name changes,
   the flip has to reach the nav label, the footer link, page metadata, OG
   cards and the copy decks — not just one section on `/summit`.
3. **The route question has a hard deadline.**
   `/founders-after-hours` → `/the-foundry` needs a 301, and a post-launch
   change resets the indexing we're about to earn from partner traffic.
   **[O13](./01-phase-1-research.md#8--open-questions--do-not-resolve-these-alone) — decide before Aug 10.**

### What The Foundry actually is, when it lands

From the one-pager (Phase 1 §6) — for the section this toggle reveals:

| | |
|---|---|
| Name | **THE FOUNDRY** · tagline **"Where founders do the work."** |
| Position | Ventriq → Forge The Future Summit → **The Foundry** → Founder After Hours → Mastermind (name TBD) |
| Tiers | **DIGITAL CORE $45/mo** · **POWER HOUR $99/mo** |
| Progression | ORE → EMBER → BLADE → TEMPERED → DAMASCUS |

⚠️ **Three open questions gate the content**, all Justin's:
**[O10](./01-phase-1-research.md#8--open-questions--do-not-resolve-these-alone)** (is Night 1 the reveal?) ·
**[O11](./01-phase-1-research.md#8--open-questions--do-not-resolve-these-alone)** ("Founder" or "Founders" After Hours?) ·
**[O12](./01-phase-1-research.md#8--open-questions--do-not-resolve-these-alone)** ($39 or $45?).

⚠️ **Do not adopt the one-pager's palette or typeface** (Poppins, `EMBER
#E4572E`, `MOLTEN #F2A43A`). Its own footnote defers: *"swap in the Ventriq
accents if they differ."* They differ. Space Grotesk and the seven locked
colours stand — Phase 1 §6.4.

---

## T4·4 — Mobile QA on the countdown timer and the marquee
`brief §16` · tag: **`COPY AUDIT`**

- [ ] **375px pass on both first-screen elements**

Brief: *"Both are the most common elements to break at **375px**, and both sit
in the first screen a phone user sees."*

**The marquee is real** — `app/summit/page.tsx:166–179`, grep anchor
`vq-marquee`. A 46s infinite CSS translate. QA it at 375px.

`[OURS]` ⚠️ **There is no countdown timer.** Justin's build note assumes one
exists. What the hero actually has is a small-caps label reading **"doors open
in"** (`app/summit/page.tsx:132`) followed by a **static date string** — a
countdown label with nothing attached to it.

This independently confirms the design brief's reading
([§4.1a](../../design/07-23-2026-design-change-brief.md)): a countdown was
asked for on the Jul 23 call (*"I want this to count down because I saw an
Eventbrite one time and I've loved it ever since"*), was never built, and its
orphaned label is still sitting in the hero.

**So this item is really two:**
- [ ] QA the marquee at 375px *(what he asked for)*
- [ ] **Build the countdown, or remove the orphaned label** *(what he actually
      needs)* — design direction in the design brief §4.1a: read as a
      *measurement*, not Eventbrite digit-tiles. Tabular numerals, hairline
      rule, small-caps units. Needs defined during-event and post-event states,
      and a reduced-motion behaviour.

⚠️ **Tell Justin the countdown doesn't exist** before he QAs the page against
his own brief and reports it as broken.

---

## Where to go next

Tier 4 done → return to
[`../../design/build-queue.md`](../../design/build-queue.md) for the Jul 23
backlog: the geometric video heroes, the homepage pain-point band, the
testimonials carousel, the Upcoming Events section, the FAH pillar renames and
the membership-card work. Blocked items and their unblock conditions are in
[`../../design/build-blockers.md`](../../design/build-blockers.md).
