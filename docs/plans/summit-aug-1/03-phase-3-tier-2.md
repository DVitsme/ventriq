# Phase 3 — Tier 2: structural, requires build time

**Justin's framing:** *"By August 1 — structural, requires build time."*
**When:** by Aug 1 · **Status:** 🟥 not started · **Items:** 7
**Prev:** [`02-phase-2-tier-1.md`](./02-phase-2-tier-1.md) ·
**Next:** [`04-phase-4-tier-3.md`](./04-phase-4-tier-3.md) ·
**Index:** [`00-README.md`](./00-README.md)

These need engineering, not just copy. Justin's order is preserved; the mobile
CTA bar is first because he ranks it first.

⚠️ **Design-system gate.** Everything here is visual. Load the `ventriq-design`
skill and the [design brief §10 constraints](../../design/07-23-2026-design-change-brief.md)
before starting. The Aug 1 pressure does not suspend AA contrast or the
100/100 accessibility floor `e2e/a11y.spec.ts` enforces. Two items below
(T2·1, T2·7) are the most likely in this whole plan to break it.

---

## T2·1 — Persistent mobile CTA bar
`brief §02` · tag: **`COPY AUDIT`** · **Justin: "the highest-return structural change in the brief"**

- [ ] **Build a fixed bottom bar carrying the CTA, following the reader the full length of the page**

The brief, verbatim:

> *"Assume the majority of traffic is a phone, arriving from an Instagram bio
> link, scrolling one-handed. A fixed bottom bar carrying the CTA should follow
> the reader the entire length of the page. **This is the highest-return
> structural change in the brief** and it belongs in Tier 2."*

**Locator:** new component; mounts on `app/summit/page.tsx`. Nothing to
replace.

`[OURS]` **There is no fixed or sticky element anywhere on this site today** —
verified Jul 29 (Phase 1 §7). Not the nav, not the announcement bar, nothing.
This is a new pattern for the system, so it needs deciding rather than
copying: what it looks like on midnight vs cream sections, whether it hides
while the hero CTA is on screen, and how it coexists with the announcement bar
at the top.

**Constraints:**
- Label comes from **[O4](./01-phase-1-research.md#8--open-questions--do-not-resolve-these-alone)** — see T2·1a below. Do not pick.
- Must not overlap the footer or trap content behind it — reserve space.
- Must be dismissible or non-blocking for keyboard and screen-reader users;
  a persistent bar that swallows focus order fails the a11y gate.
- Design system: 2px radius, no shadows, gold on midnight or ink on gold.
  **Not** a rounded floating pill — that's on the `design-tells` refusal list.

**Done when:** a phone user can reach registration from any scroll position,
`e2e/a11y.spec.ts` still passes on mobile viewports, and nothing is occluded
at 375px.

### T2·1a — Standardize the CTA label sitewide
`brief §01` · tag: **`COPY AUDIT`**

- [ ] **One label, all five places**

The brief: *"The page currently uses three different labels — Save your seat,
Register for the Summit, and Save your free seat. Repetition of one phrase is
what makes a button feel like a decision rather than a series of unrelated
links."*

`BUTTON LABEL, EVERYWHERE` — **recommended**
> **"Save My Free Seat"**

`FALLBACK`
> **"Save Your Free Seat"**

Brief's note: *"First person converts measurably better on buttons. If the more
formal register is preferred, Save Your Free Seat is the fallback — but then it
must be used in all five places too."*

⚠️ **[O4](./01-phase-1-research.md#8--open-questions--do-not-resolve-these-alone) — Derrick's call, not resolved here.** Both options are above; pick one
and apply it uniformly.

**Locators — 7 instances, 3 variants** (verified Jul 29):
| Current label | Path | Grep anchor |
|---|---|---|
| `Save your seat →` | `components/announcement-bar.tsx:51` | `Save your seat` |
| `Register for the Summit` | `app/page.tsx:150` | `Register for the Summit` |
| `Register for the Summit` | `app/about/page.tsx:358` | `Register for the Summit` |
| `Save your free seat` ×4 | `app/summit/page.tsx:89, 129, 210, 398` | `Save your free seat` |
| `Save your free seat` | `app/page.tsx:206` | `Save your free seat` |

⚠️ `app/about/page.tsx` is slated for deletion by the Jul 23 call
([design brief D21](../../design/07-23-2026-design-change-brief.md)) — that
instance may resolve itself.

⚠️ **Conflicts with the Jul 23 call.** The call decided the CTA becomes
*"Save your free **virtual** seat"* ([design brief D9](../../design/07-23-2026-design-change-brief.md)) to solve the same
"nobody knows it's virtual" problem. The brief solves it differently — with the
display line in T2·5 — and keeps the CTA short. **The brief is newer; go with
it.** But don't ship both, or the CTA gets long and the display line becomes
redundant.

---

## T2·2 — Analytics and conversion tracking live before the partner push
`brief §16` · tag: **`COPY AUDIT`**

- [ ] **Channel-level conversion data flowing by Aug 1**

The brief: *"Analytics and conversion tracking live before the partner push,
not during it. **There is a paid-retargeting decision gate on August 7.**
Without channel-level conversion data by August 1, that decision gets made
blind."*

`[OURS]` **What actually exists today** (verified Jul 29): four events wired
through `lib/analytics.ts` `track()` —

| Event | Where | Grep anchor |
|---|---|---|
| `sign_up` | `components/newsletter-form.tsx:35` | `track("sign_up"` |
| `generate_lead` | `components/contact-form.tsx:63` | `form_id: "contact"` |
| `generate_lead` | `components/chapter-form.tsx:53` | `form_id: "chapter"` |
| `luma_register_click` | `components/luma-register-button.tsx:53` | `luma_register_click` |

**There is no** scroll-depth, form-abandonment, CTA-attribution or funnel
instrumentation. `luma_register_click` fires with a `cta_location`, which is
the one piece of channel attribution we have — and it will be the signal the
Aug 7 decision rests on, so **the mobile CTA bar (T2·1) must pass its own
`cta_location`** or the highest-traffic button reports as untracked.

**Related but separate:** `TODO.md` carries a GA4 admin-config item (retention
2→14 months, key-event marking, channel groups, internal-traffic filter) and a
second item for the funnel events Derrick promised on the Jul 23 call. **The
key-event marking and channel groups are the parts that matter for Aug 7** —
without them the retargeting decision has no channel dimension to read.

**Done when:** registration clicks are attributable to channel in GA4, key
events are marked, and a UTM-tagged Instagram-bio link resolves correctly (that
tagged URL is itself an open `TODO.md` item).

---

## T2·3 — End-to-end Luma test with a real submission
`brief §16` · tag: **`COPY AUDIT`**

- [ ] **Register for real, including the referral-name field, and confirm it lands**

The brief: *"Including the referral-name field passing through correctly. **A
silent failure there costs the entire ambassador dataset, and it will not
announce itself.**"*

**Why it's structural, not QA:** the whole referral-attribution model depends
on that field, and nothing on the page currently tells anyone to fill it in —
which is what the ambassador prompt in
[Phase 4 §05](./04-phase-4-tier-3.md) fixes. Testing the field before adding
the prompt is the right order.

**Locator:** `components/luma-register-button.tsx` — the checkout overlay
(`data-luma-action="checkout"`, event id `evt-YckrsStrlGk0W6o`). UTMs
auto-forward from the page URL.

⚠️ **Also on Justin's list:** the Luma event still uses the typed word
"Virtual" rather than Luma's native virtual-event type, which is what generates
the managed join link. That's his fix, but it affects what a test submission
actually receives.

**Done when:** a real registration completes, the confirmation carries the
calendar invite, the referral name appears in the Luma export, and
`luma_register_click` shows in GA4 realtime.

---

## T2·4 — RSVP button beneath the schedule
`brief §09` · tag: **`JUSTIN`**

- [ ] **Add a register CTA directly under "Two weeks, mapped"**

The brief: *"Correct instinct and the right placement. Someone who has just
read all eight session titles has already decided — they should not have to
scroll to the bottom of the page to act on it."*

**Locator:** `app/summit/page.tsx:309–311` · grep anchor:
`All sessions 6:30–8:00 PM ET`

`CURRENTLY ON THE PAGE`
> *"All sessions 6:30–8:00 PM ET. Fridays through Sundays are yours — go build
> with the week."*

`LINE ABOVE THE BUTTON`
> **"All sessions 6:30–8:00 PM ET. One registration, and you choose the
> nights. Fridays through Sundays are yours — go build with the week."**

`BUTTON`
> **"Save My Free Seat"**

`MICROCOPY BELOW THE BUTTON`
> **"Free · virtual · one registration covers all eight nights"**

✅ **Agrees with the Jul 23 call** — Justin located this exact spot then:
*"under here, because this will be a decision point right here"*
([design brief §4.9](../../design/07-23-2026-design-change-brief.md)). Two
independent sources, same placement.

**Gotcha:** button label is subject to **O4** (T2·1a). Keep it consistent with
whatever wins.

**Done when:** the schedule section ends with a working registration CTA
carrying its own `cta_location` for attribution.

---

## T2·5 — Promote VIRTUAL to a display line
`brief §02` · tag: **`JUSTIN`**

- [ ] **New display line above the H1; reduce the eyebrow to the date range**

The brief: *"Today the word virtual lives in a lowercase eyebrow at roughly
12px, and again inside the scrolling marquee. **It is technically present and
functionally invisible.** Promote it to a display line directly above the H1 —
set large, in gold, with real letterspacing — then reduce the existing eyebrow
to the date range alone so the same fact is not stated twice."*

`NEW DISPLAY LINE ABOVE THE H1`
> **"A FREE VIRTUAL SUMMIT · AUG 10–20, 2026"**

**Locators:** `app/summit/page.tsx:116` (eyebrow — currently
`forge the future · aug 10–20, 2026 · virtual · free`) · `:117–120` (H1) ·
grep anchor: `forge the future · aug 10–20`

**Design direction, from the brief:** large · gold · real letterspacing.
This is the only place in the entire brief that gives a visual instruction with
a colour in it.

⚠️ **Contrast gate.** Gold `#c9a24c` on midnight is fine at display size, but
check the actual ratio at the chosen weight — and remember gold **cannot**
carry text on cream if this pattern gets reused elsewhere (design brief §10.2).

⚠️ **Sequence with [Phase 2 T1·4](./02-phase-2-tier-1.md)** — that item also
rewrites the eyebrow (adding "Summit" to the event name). Do them in one edit
or the eyebrow gets written twice with different intent.

⚠️ **Supersedes the Jul 23 approach.** The call proposed solving this in the
CTA text (D9); the brief solves it with hierarchy. Same problem, better answer
— the design brief itself argued *"repeating it a sixth time is not the fix.
Give it a different rank."* This is that.

**Done when:** "virtual" is legible at a glance on a 375px screen without
reading body copy, and the fact appears once in the hero, not twice.

---

## T2·6 — Discipline tags on all eight session titles
`brief §09` · tag: **`COPY AUDIT`**

- [ ] **Add a small uppercase discipline tag beside each night**

The brief: *"The session titles are beautiful and completely opaque to a cold
scanner. **The Rainmaker's Craft is elevated; it does not tell a stranger it is
a sales night.** A small uppercase tag alongside each title fixes this without
touching the titles — and it is what allows the three audience tiers to
self-select."*

`TAG EACH NIGHT` — full table, verbatim:

| Date | Session title | Discipline tag |
|---|---|---|
| Aug 10 | The Weight and the Vision | **LEADERSHIP** |
| Aug 11 | The Art of Desire | **BRAND** |
| Aug 12 | Renowned | **MARKETING & PR** |
| Aug 13 | The Rainmaker's Craft | **SALES** |
| Aug 17 | The Modern Advantage | **TECHNOLOGY & AI** |
| Aug 18 | Capital & Command | **FINANCE & FUNDING** |
| Aug 19 | The Endgame | **EXIT STRATEGY** |
| Aug 20 | The End of the Beginning | **THE FOUNDER'S REALITY** |

Rendered on the page as `Aug 10 · The Weight and the Vision — LEADERSHIP`.

**Locator:** `lib/agenda.ts:12–19` (the `NIGHTS` array — add a field) and
`app/summit/page.tsx:270–299` (the agenda row render) · grep anchor:
`title: "The Weight and the Vision"`

✅ **This table independently confirms the date resolution** in Phase 1 §3.1 —
Aug 19 Endgame, Aug 20 End of the Beginning. It is the third source that
outvoted the agenda TSV.

**Do not touch the titles.** The brief is explicit that the tag sits *alongside*
them.

⚠️ **The `[SPEAKERS]` chip currently occupies this row** and is removed in
[Phase 2 T1·2](./02-phase-2-tier-1.md). The tag can take its place — but note
the row also has to accommodate speaker face thumbnails later
([design brief §4.5a](../../design/07-23-2026-design-change-brief.md)), and
three live row states (upcoming / tonight / replay) via `agendaRowState`.
**Design the row once for all three occupants.**

**Done when:** a cold scanner can identify the sales night, the funding night
and the exit night without reading a description.

---

## T2·7 — Relocate the sponsor block below the FAQ
`brief §13` · tag: **`COPY AUDIT`**

- [ ] **Move the sponsor section to after the FAQ, before the final CTA**

The brief: *"It currently sits between the mission statement and the FAQ, which
means **a founder mid-decision hits a block that is not addressed to them and
loses momentum.** Funders scroll further and with more patience than founders
do. Place it after the FAQ and before the final call to action."*

**Locator, verified Jul 29:** Sponsors `app/summit/page.tsx:355` → FAQ `:373` →
Final CTA `:391`. Target order: FAQ → Sponsors → Final CTA.

**The reasoning behind it** (brief §01, the "fourth reader" callout):

> *"Sponsors, partners and funders read this page too. They are not here for
> curriculum — they are here to see who to back. That is what the sponsor block
> is for, and it is also why the block **must not interrupt founder conversion
> flow**."*

⚠️ **The sponsor copy also changes** — that's a Tier 3 item, in
[Phase 4 §13](./04-phase-4-tier-3.md), and it's tied to the for-profit
correction ("underwritten … foundations" → "sponsored … organizations").
**Move and rewrite in the same pass** — the block is being touched anyway.

⚠️ **Band rhythm.** Sponsors is a midnight section and the FAQ is cream.
Reordering changes the page's dark/light cadence, which the design system
treats as meaningful punctuation
([design brief §1.3](../../design/07-23-2026-design-change-brief.md)). Check
the new sequence by eye — this is the same class of problem as the homepage
band-rhythm seam (design brief §3.7).

**Done when:** a founder reads FAQ → CTA uninterrupted, and a funder still
finds the sponsor block on the way down.

---

## Phase gate

Before calling Tier 2 done: run `e2e/a11y.spec.ts` (the mobile CTA bar and the
relocated sections are both regression risks), check 375px by eye, and confirm
GA4 is receiving `luma_register_click` from every CTA including the new ones.

Deploy with **`pnpm run deploy`**.
