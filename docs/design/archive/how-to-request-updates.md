# How to request updates to this design

The designer on the other side (Claude, in the design tool) holds these files as `.dc.html` canvases and will apply your changes there. Write update prompts so they land precisely.

## Reference things by their real names
- **File**: e.g. `Ventriq Summit.dc.html`
- **Frame ID**: the gold badge on the canvas — `1a` (desktop), `1b` (mobile), `1c`/`1d` (state variants). Frame contents are listed per file in README.md.
- **Section**: use the `data-screen-label` names (e.g. `Home S3 · two doors`, `Summit S5 · day by day`) or the copy-file section numbers (S1–S10).
- **Copy source**: name the `.md` file + section when copy changes (e.g. "02-summit.md S4, step 2 body").

## When copy changes
- Provide the exact final wording — the designer will not paraphrase or "improve" it. Copy files are treated as law.
- If a bracketed placeholder is now resolved, say so explicitly: `[TIME ET] → "1:00 PM ET"` — the designer will replace the chip with real text everywhere it appears (hero meta rows, agenda footers, FAQ, email spec).
- New copy must already have passed your side's `ventriq-voice` + `human-copy` checks (both files are in `copy-source/`). Flag any intentional device spends (couplet/triad/em-dash budgets are per page).

## When design changes
- Say which token/rule changes globally vs. one-off. Locked tokens (colors, Space Grotesk, 2px radius, gold budget, sentence case) need an explicit "we are changing the system" statement, or the designer will push back.
- State machine updates (Summit hero A–E, announcement bar, nav CTA, agenda rows, tally, speaker reveal) should name the state, not just describe a screen.
- If FAH visibility changes (it's currently hidden from nav/footers "for now"), say "restore Founders After Hours to nav/footer across all pages" — it's a chrome-wide flip, plus the homepage door/diagram/copy restore from `01-home.md`.

## Useful update-prompt skeleton
```
Update <file> — <frame id / section label>.
Change: <what, exactly — final copy verbatim, or measurements/behavior>.
Scope: <this page only | system-wide (list affected files)>.
Placeholders resolved: <[X] → value, …> (or "none").
Constraints touched: <none | e.g. "adds a second motion moment — approved">.
```

## What NOT to ask for
- Rewrites of final copy, new sections without copy, or filler content — the designer refuses filler by rule.
- Anything in the refusal catalog (`ventriq-design-system-brief.md`) unless the brief itself is being amended.

## Launch-blocking placeholders (highest-value updates to send back)
[TIME ET] · [ANNOUNCE-DATE] + the 8 speaker cards (photo/name/title/company/topic/day) · [APP-OPEN DATE] · [EVENTBRITE-URL] · [SKOOL-URL] · [EMAIL] · [FORM/EMAIL] · Baltimore founding-night [DATE] · verified impact equivalents + $[X] · mission ratification + counsel wording · EIN/501(c)(3) language · testimonial permissions + the two ⚠️ audio-verify quotes · advisor roster · real photography (the navy grade spec is in README → Design tokens).
