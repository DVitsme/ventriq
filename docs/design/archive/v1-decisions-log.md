# Decisions log — Ventriq design phases

Chronological record of what was built, what changed, and why. Read alongside README.md.

## Phase 1 — Style foundation (`Ventriq Style Foundation.dc.html`, frames 1a–1c)
- Established: corridor construction lines (computed rays + dimension ticks + vanishing-point crosshair), gold-ruled small-caps eyebrow, threshold card (gold top rule + drafting numeral), drafting meta row with tabular numerals, asymmetric section rule with directional marker, pull-quote treatment, field focus = gold ring.
- Primary buttons were **burnt orange** in this phase (superseded — see Phase 7 corrections).

## Phase 2 — Homepage v1 (same file, frames 2a–2b)
- Full 8-section homepage per `01-home.md` + global chrome per `00-global.md`.
- **System decision: primary buttons = solid gold + ink** (from 00-global nav spec: Donate gold-outline + primary solid gold). Orange demoted to text links/accents.
- On-cream link color `#AF5026` introduced for AA contrast (orange `#C15A2C` stays on midnight).
- Bracketed production notes rendered as dashed **redline chips** — visible, deliberate.
- Data viz decisions: proof band = dimension string (not stat banner); S4 = drawn corridor diagram; voices = ruled columns (cards appear once per page only).

## Phase 3 — Copy-rules layer + homepage rewrite (`Ventriq Home.dc.html`)
- `human-copy` + `ventriq-voice` skills installed as overriding law for all future copy work.
- **Founders After Hours removed from the homepage "for now"** (client instruction): nav → 3 links, FAH door removed ("Two ways in."), S4 rewritten ("The Summit opens the door. The Mastermind is the work behind it."), donor body drops the chapter clause, proof-band Baltimore fact reuses "rooted here, built to travel".
- FAH stays hidden in nav/footer on ALL later pages for chrome consistency; FAH mentions inside Summit/About body copy retained (copy files are final).
- Old combined file kept as archive.

## Phase 4 — Summit page (`Ventriq Summit.dc.html`)
- Voltage 4–5. Hero state machine A/C/E designed (B/D specified in 08 file, not framed).
- Merged S2 numerals band INTO the corridor-draw scene (avoids the same figures appearing twice).
- Ticker = the page's one festival gesture; countdown = drafting metadata (Vercel Ship treatment), kept bracketed — no fake live clock.
- Scroll-triggered effects built with paused-CSS-animation gating (works under canvas panning + reduced motion).
- Fix applied post-verification: mobile scene given fixed 380px height matching its viewBox; caption beats moved into flow.

## Phase 5 — Founders After Hours (`Ventriq Founders After Hours.dc.html`)
- Voltage 4, warmest page. Tally strokes (groups of five, jittered, one incomplete) = the one gesture; **no corridor rays, no ticker** on this page — per-page line-system variants keep pages distinct.
- Run-of-show assembles on scroll (rule draws → text follows).
- Zero-on-purpose counter as brand statement; `[N]` live state framed as swap (1c).
- Skool handoff sentence placed verbatim under every join CTA.

## Phase 6 — About / Donate / Contact
- About: the ONE cream-led page; monogram V-draw is its signature; both pull-quotes sourced from the copy's own lines (no new copy).
- Donate: form above the fold, presets as selectable thresholds, working monthly toggle, live submit label; outcomes-not-need register; `#sponsor` anchor for the corporate lane.
- Contact: simplest page; select needs a drawn affordance (fixed — gold chevron data-URI); invented eyebrow labels ("contact", "message sent") were flagged as a no-new-copy violation and removed — gold rule only.

## Phase 7 — Global system + consistency sweep (`Ventriq Global System.dc.html`)
- Announcement bar ×3 states; canonical footer WITH newsletter; form default/focus/error/success + Turnstile line; 404 with the dead-end line.
- **Corrections applied to Phase-1 file**: all orange primaries → solid gold + ink, hover `#BB9440`, focus rings on gold buttons → cream.
- Error state defined for the first time: `#C15A2C` border/ring, `#AF5026` message text (no new colors).
- Documented rules: link color by ground; gold ≤5/viewport with multi-line drawings counted as one system; shadows = none (focus rings only); radius = 2px everywhere.
- Known intentional gap: page footers omit the Digest field (Home has it as S8) — canonical footer (Global System 1b) is the build target.

## Standing constraints for ANY future change
1. Copy files are final; placeholders stay bracketed; new microcopy only when unavoidable and only through the two skill files (they override everything).
2. One signature motion per page; one festival gesture max on event pages; reduced-motion fallbacks always.
3. The refusal catalog in `copy-source/ventriq-design-system-brief.md` §"refusal catalog" is binding (no centered hero + pill + two buttons, no icon-card triplets, no left-border strips, no gradients/glass/emoji, no Title Case, no "Learn More"…).
4. Counterfactual check before shipping: if a section would appear for any similar nonprofit brief, redesign it and say what changed.
5. Donors never touch a hero; one dark donor section per page max, near the footer.
6. Numbered markers only where sequence is real.
