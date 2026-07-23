# 00 — Global copy (nav, footer, system microcopy)

> **v1.1 (meeting 2, Jul 10):** Donate button/link REMOVED site-wide ("donate" is a banned word until entity + MD filing — outcomes D3/D9); FAH public in nav; Summit is pay-what-you-want on **Luma** (not Eventbrite); FAH is a paid membership. Full decision log: `copy/README.md` §v1.1.

## Navigation

*Layout: wordmark left; ≤5 text links; ONE button right (primary solid gold, time-aware).*

**Links:** The Summit · Founders After Hours · The Mastermind · About
**Button (time-aware primary):**
- Until Aug 21: **Register for the Summit**
- Aug 22 – Sept cohort close: **Apply for the Mastermind**
- After: **Join Founders After Hours**

*(The gold-outline `Donate` button returns to this slot when filings clear — see `06-donate.md` park banner.)*

## Announcement bar (dismissible, one line)

- Pre-summit: **Forge The Future · free · virtual · Aug 10–20 — Save your seat →**
- During: **Forge The Future is live — tonight: [NIGHT-TITLE], 6:30 PM ET →**
- After: **Missed the summit? Every replay lives in Founders After Hours →**

## Footer

*Layout: midnight ground; four columns — mission, pages, programs, contact; legal line under a gold hairline.*

**Mission line:** Ventriq (ven-TREEK) is a nonprofit equipping founders with capital, programming, and council — rooted in Baltimore, built to travel.
**Contact:** [EMAIL] · Baltimore, MD
**Newsletter (one field):**
- Heading: The Founder Digest
- Line: One useful email a week — what's working, what's funding, what's next.
- Button: **Send it to me**
- Microcopy: No spam. Unsubscribe anytime.
**Legal line:** © 2026 Ventriq. A nonprofit organization. `[EIN — add when issued; NO deductibility language until determination letter — see README law #3]`
**Small links:** Privacy · Contact · Press kit

## Button & CTA inventory (say what happens)

- Register for the Summit
- Save your seat
- Join Founders After Hours
- Join live (summit live-day)
- Start your application
- Read Justin's story
- Sponsor the Summit
- Send it to me (newsletter)
- Get the speaker announcement
- Raise your hand (chapter interest)

*(Retired for now: "— free" suffixes, "Join free on Skool," "Back the builders"/"Donate" — the last two return with the Donate page.)*

Never: "Learn More" / "Submit" / "Get Started" / "Discover".

## Forms

**Labels:** Your name · Your email · What's this about? · Your message
**Validation, in voice:**
- Empty required: "We need this one."
- Bad email: "That email doesn't look right — one more look?"
- Message too short: "Give us a sentence or two more to work with."
**Success states:**
- Newsletter: "You're on the list. First Digest lands this week."
- Contact: "Got it. A real person reads every one — expect a reply within two business days."
- Summit registration (post-Luma return): "You're in. Check your inbox — your calendar invite is waiting."
**Spam shield note:** Turnstile widget label: "One quick check — no puzzles, promise."

## 404

**H1:** This corridor doesn't go anywhere.
**Body:** The site is new and still being built — if something you needed is missing, tell us and we'll fix it.
**Links:** Home · The Summit · Founders After Hours · [EMAIL]

## Meta patterns

- Title = promise + name, ≤60 chars, sentence case after the brand. Never "Home | Ventriq."
- Description = conversion copy, ≤155 chars, one concrete fact (date, number, place) each.
- OG image: branded per page (next/og) — page name + one line + the corridor mark.

## Transactional email: Summit registration confirmation

*(Resend + react-email; .ics attached — this email is a show-up lever, not a receipt.)*

**Subject:** You're in — Forge The Future, Aug 10–20
**Body (short):**
You've got a seat. Here's how to use it well:

1. **Add it to your calendar** — the invite's attached. Sessions run 6:30–8:00 PM ET, Monday through Thursday, for two weeks.
2. **Keep the room after the room** — every replay lands in Founders After Hours 24 hours after each session, along with the speakers' office hours. Membership from $39/month: [SKOOL-URL] `[PLATFORM — Skool TBC]`
3. **Come with something to build.** Every session ends with a move you can make the same afternoon.

See you August 10.
— Justin & the Ventriq team

**Reminder cadence (Luma auto email reminders + our 24h/3h/day-of via Resend — note: Luma SMS can't fire, no phone collected; see findings/12 §4):** day-of subject: "We're live tonight — [NIGHT-TITLE], 6:30 PM ET"
