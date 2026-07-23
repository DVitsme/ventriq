# Acceptance checklist — run per page, no sign-off needed if all pass

**Copy**
- [ ] Every visible string diffs clean against its `copy-source/` file (S-section order too)
- [ ] All `[BRACKETED]` placeholders render as dashed RedlineChips; none invented, none silently resolved
- [ ] Zero banned words: donate/donation, Learn More/Submit/Get Started/Discover, Eventbrite, "one hour a day", "Aug 10–21", pay-what-you-want, "Join free on Skool"
- [ ] Sentence case everywhere (small-caps styled from lowercase source)

**Visual (compare at 1440 and 390 against the ref frames)**
- [ ] Only the 7 palette hexes + documented opacity steps; no new colors, no gradients beyond gold light + photo grade
- [ ] Space Grotesk only; no serif anywhere
- [ ] 2px radius; no box-shadows except focus rings; borders per spec
- [ ] Gold ≤5 appearances per viewport (line-drawing system counts once)
- [ ] Threshold cards varied (widths/staggers); no three-identical-cards, no icon-top cards, no left-border strips
- [ ] Photography = PhotoGrade placeholders with labels (until real assets); no stock, no amber IG glow

**Behavior**
- [ ] Announcement bar: 3 states by date, dismissible, one line at 390
- [ ] Nav: single time-aware button; active link gold; Summit CTAs → luma.com/lp9z8iav
- [ ] Summit hero states A/C/D/E render from one component off the calendar util (B = sub-line swap)
- [ ] Agenda rows flip upcoming/tonight/replay; speaker wall pending state; countdown island ticks in the meta row
- [ ] Forms: gold focus ring, in-voice errors, success states, Turnstile note; contact select opens on "Pick one"; `?topic=sponsorship` preselects
- [ ] /donate redirects to /contact?topic=sponsorship; no route, not in sitemap
- [ ] 404 is the corridor dead-end page

**Quality gates**
- [ ] View-source shows full content (SSR, no empty shell)
- [ ] `prefers-reduced-motion`: every animation degrades per motion-spec
- [ ] AA contrast (gold never body text); visible focus on all interactives; one h1; landmarks
- [ ] Lighthouse ≥95 mobile; no CLS on font swap; images via next/image
- [ ] /summit carries valid Event JSON-LD (OnlineEventAttendanceMode + VirtualLocation); per-page metadata + OG per copy-file headers; sitemap/robots present
