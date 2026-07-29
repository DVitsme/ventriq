# Phase 2 — Tier 1: credibility leaks currently public

**Justin's framing:** *"Today — credibility leaks currently visible to the
public."*
**When:** today (Jul 29) · **Status:** 🟥 not started · **Items:** 5
**Prev:** [`01-phase-1-research.md`](./01-phase-1-research.md) ·
**Next:** [`03-phase-3-tier-2.md`](./03-phase-3-tier-2.md) ·
**Index:** [`00-README.md`](./00-README.md)

Everything here is verified live on `ventriq.io` as of Jul 29 (Phase 1 §7).
None of it needs a decision, an asset, or a design pass. It is internal build
scaffolding that a visitor can read right now.

> **Ordering note.** Justin's brief lists placeholders first and the footer
> legal note second. **This file leads with the footer note** — it is the only
> item that publishes an internal *instruction to ourselves* about legal
> exposure, which is a different category of bad than a visible `[SPEAKERS]`
> chip. Each item still carries its position in his list so nothing is lost.

---

## T1·1 — Footer: the internal legal note is rendering publicly
`brief §15` · `brief Tier 1, item 2` · tag: **`JUSTIN + AUDIT`**

- [ ] **Remove the EIN redline chip from the footer**

**Locator:** `components/footer.tsx:58–62` · grep anchor: `EIN — add when issued`

`CURRENTLY ON THE PAGE`
> *"© 2026 Ventriq. A nonprofit organization. EIN — add when issued; no
> deductibility language until determination letter"*

`REPLACE WITH`
> **"© 2026 Ventriq. All rights reserved."**

**Why it's first:** the brief calls this out specifically — *"The second half
of the current line is an internal instruction that is live and public."* It
is a `RedlineChip`, so it renders as a visible dashed-border chip, not
invisible markup. Anyone reading the footer sees us telling ourselves what we
are not yet allowed to claim.

**Done when:** the copyright line reads exactly the replacement, the
`RedlineChip` import is dropped from `footer.tsx` if now unused, and
`curl -s https://ventriq.io/summit | grep EIN` returns nothing.

**Gotcha:** this line also carries the nonprofit claim — T1·3 covers that, but
the single replacement above resolves both halves at once. Do not do them as
two edits.

---

## T1·2 — Remove every visible placeholder
`brief §08, §09, §12` · `brief Tier 1, item 1` · tag: **`COPY AUDIT`**

- [ ] **`ANNOUNCE-DATE` ×2**

**Locators:** `app/summit/page.tsx:144` (FAQ answer) · `:229` (speakers
section) · grep anchor: `ANNOUNCE-DATE`

The brief: *"Replace with a real date, or cut the sentence entirely until
there is one. **A visible placeholder costs more than a missing date.**"*

⚠️ **Blocked on [O2](./01-phase-1-research.md#8--open-questions--do-not-resolve-these-alone) — Justin owes the date.** The brief authorises the fallback:
if no date arrives, **cut the sentence**. Do not invent one (`AGENTS.md`
hard rule: never invent bracketed-token values).

- [ ] **The `SPEAKERS` chip beside all eight session titles**

**Locator:** `app/summit/page.tsx:284` · grep anchor: `RedlineChip onCream>SPEAKERS`
One JSX line, rendered 8× by the agenda map.

⚠️ **Interacts with the Jul 23 call.** That chip is the placeholder for the
agenda face thumbnails ([design brief §4.5a](../../design/07-23-2026-design-change-brief.md)).
Night assignments now exist (Phase 1 §4) but only 8 of 29 headshots do.
**Remove the chip now; build the faces in the design queue when images land.**
An empty row reads better than a redline chip.

- [ ] **The 15 `speaker 01–15` placeholder tiles**

**Locator:** `app/summit/page.tsx:237–255` · grep anchor: `length: 15`

`[OURS]` **Naive greps miss these.** The label is JSX —
`speaker {String(i + 1).padStart(2, "0")}` — so React SSR emits
`speaker <!-- -->01` with an HTML comment separator between the two text
nodes. `grep 'speaker 01'` against the live HTML returns **zero** even though
the tiles are plainly visible. Verify by eye or grep for `length: 15` in
source, not by string-matching the rendered page.

⚠️ **This is the whole speaker section.** Removing the tiles leaves the
section with a heading and a paragraph and nothing else. See
[Phase 5 T4·2](./05-phase-5-tier-4.md) — the brief wants the grid rebuilt to
"look deliberate at six, twelve, and seventeen". **Decide before deleting:**
hide the section until real names exist, or ship the 8 confirmed headshots.
Do not leave 15 anonymous silhouettes.

**Done when:** no `RedlineChip` renders anywhere on `/summit`, and the
speakers section contains either real people or nothing.

---

## T1·3 — Remove all nonprofit language sitewide
`brief §17` · `brief Tier 1, item 3` · tag: **`JUSTIN`**

- [ ] **Sweep `/summit` (5 instances, itemised in brief §02, §13, §15)**
- [ ] **Sweep the named pages: `/about` · `/founders-after-hours` · `/mastermind` · `/contact`**

**Locators:** full grep-verified inventory in
[`../../meetings/07-23-2026-meeting-3-outcomes.md`](../../meetings/07-23-2026-meeting-3-outcomes.md) §4.1 — ~20 instances across `app/layout.tsx`,
`app/page.tsx` (incl. JSON-LD `Organization.description`),
`app/mastermind/page.tsx`, `app/founders-after-hours/page.tsx`,
`components/footer.tsx`, and the copy decks.

**Overlap:** this is already 🔴 in `TODO.md` from the Jul 23 call. **The brief
escalates it and adds two things we didn't have:**

1. **A named page list** (above) rather than "wherever it appears".
2. **A broader ban:** *"No tax-deductibility language, no 501(c)(3) reference,
   no EIN placeholder, and **no grant or donation framing anywhere on the
   site**."* That last clause reaches further than the existing donate hold —
   it rules out *grant* framing too, which touches sponsor copy (T1 item in
   [Phase 4 §13](./04-phase-4-tier-3.md)).

⚠️ **Do not blanket-replace.** "Nonprofit builders" and "nonprofits doing the
real work" describe the *audience* and stay. Only Ventriq's self-description
changes. Note that the brief separately **cuts** the "Nonprofit builders"
audience row — but that is a different change, in
[Phase 4 §10](./04-phase-4-tier-3.md), for a different reason.

**Footer identity line** — `components/footer.tsx:17–19` · grep anchor:
`is a nonprofit equipping founders`

`CURRENTLY ON THE PAGE`
> *"Ventriq (ven-TREEK) is a nonprofit equipping founders with capital,
> programming, and council — rooted in Baltimore, built to travel."*

`REPLACE WITH`
> **"Ventriq (ven-TREEK) equips entrepreneurs with capital, programming, and
> council — rooted in Baltimore, built to travel."**

⚠️ **Two conflicts on this one line.** (a) It uses *entrepreneurs*, which is
the subject of **[O1](./01-phase-1-research.md#8--open-questions--do-not-resolve-these-alone)** — the brief scopes that swap to the "Who this is for"
block only, yet writes it into the footer itself. Flagged, not resolved.
(b) ⚠️ **It keeps `ven-TREEK`, and that is an error in Justin's brief.**
Derrick confirmed Jul 29 that the Jul 23 decision to kill the respelling stands
([outcomes doc D2](../../meetings/07-23-2026-meeting-3-outcomes.md)) — he was
in the room. **Strip `(ven-TREEK)` when applying this block**, so the line
reads:

`APPLY INSTEAD`
> **"Ventriq equips entrepreneurs with capital, programming, and council —
> rooted in Baltimore, built to travel."**

This is the one place in this plan where we deliberately depart from the
brief's verbatim copy, and it is on Derrick's explicit instruction. Justin also
needs to correct it in his own brief and email templates — it's on his list.

**Done when:** Ventriq is described as mission-driven or by what it does, never
as a nonprofit; no EIN, 501(c)(3), deductibility, grant or donation framing
survives on any page.

---

## T1·4 — Standardize the event name
`brief §17` · `brief Tier 1, item 4` · tag: **`JUSTIN`**

- [ ] **"Forge The Future" → "Forge The Future Summit"** in the title tag, both
  meta descriptions, the top banner, and the hero eyebrow.

**Locators:**
| What | Path | Grep anchor |
|---|---|---|
| Title tag | `app/summit/page.tsx:11` | `Forge The Future — Ventriq` |
| Meta description | `app/summit/page.tsx:13` | `Eight nights, two weeks —` |
| OG/Twitter description | `app/summit/page.tsx:32` | `presented by Ventriq` |
| Top banner | `components/announcement-bar.tsx` | `Forge The Future` |
| Hero eyebrow | `app/summit/page.tsx:116` | `forge the future · aug 10–20` |

`TITLE TAG`
> **"Forge The Future Summit — Ventriq's free virtual founder summit, Aug 10–20"**

`META DESCRIPTION, OG AND TWITTER`
> **"Eight nights, two weeks — brand, PR, sales, technology, capital, exit.
> Every session ends with a move you can make the next morning. Free, virtual,
> live on Zoom."**

⚠️ **The hero eyebrow is also being restructured** by the VIRTUAL display line
in [Phase 3 T2·5](./03-phase-3-tier-2.md) — the brief reduces the eyebrow to
"the date range alone". **Sequence these two together** or the eyebrow gets
written twice.

⚠️ **Regenerate OG cards** after the title changes — `scripts/og-generate.mjs`
carries its own summit string (grep anchor: `Eight nights. Two weeks. Free.`).
The brief doesn't mention it; `[OURS]`.

**Not our task, per the brief:** *"the speaker graphics, partner toolkit email,
Instagram captions and announcement email campaign currently all read **The
Forge Summit**. Those are the assets that now change, not the site."* Worth
passing to Justin — it's a distribution-wide error we can flag but not fix.

**Done when:** every public reference to the event includes the word "Summit",
and the OG images regenerate to match.

---

## T1·5 — Correct the speaker count
`brief §08, §12` · `brief Tier 1, item 5` · tag: **`COPY AUDIT`**

- [ ] **"Thirty-plus" → "Seventeen-plus", both instances**

**Locators:** `app/summit/page.tsx:230` (speakers section) · `:144` (FAQ) ·
grep anchor: `Thirty-plus`

`BOTH INSTANCES`
> **"Seventeen-plus builders, operators, and funders — no professional
> motivators."**

The brief: *"Overclaiming by thirteen is a credibility risk that buys nothing
— seventeen operators is already the strongest asset on the page."*

**Reconciliation** (Phase 1 §3.2): the speakers TSV names 29 people, 21 with
some confirmation status, 8 with headshot + bio. **17+ is Justin's own number
and the conservative one.** Use it.

**Keep this line intact.** The brief is explicit: *"Keep the line about
professional motivators — it is the sharpest line in the section and the
clearest signal that this roster was curated rather than assembled. Whatever
the grid becomes, that line survives."*

**Done when:** no "thirty-plus" survives anywhere, and the FAQ answer's count
matches the speakers section.

---

## Verification for the whole phase

```
curl -s https://ventriq.io/summit | grep -Ei 'EIN|ANNOUNCE-DATE|thirty-plus'   # → empty
curl -s https://ventriq.io/summit | grep -c 'SPEAKERS'                          # → 0
grep -rniE "is a nonprofit|A nonprofit organization" app/ components/            # → empty
```

Then redeploy: **`pnpm run deploy`** (pushing to master does not build — see
[`00-README.md`](./00-README.md) rule 6).
