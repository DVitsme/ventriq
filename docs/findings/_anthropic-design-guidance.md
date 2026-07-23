# Anthropic's Frontend Design Guidance (beyond the skills repo)

Compiled 2026-07-09 for the Ventriq build. Verbatim excerpts from official Anthropic sources.

## Sources

1. **Blog:** "Improving frontend design through Skills" — https://claude.com/blog/improving-frontend-design-through-skills
2. **Cookbook:** "Prompting for frontend aesthetics" — https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics
   (source notebook: https://github.com/anthropics/claude-cookbooks/blob/main/coding/prompting_for_frontend_aesthetics.ipynb)
3. **Plugin:** https://claude.com/plugins/frontend-design — ships `skills/frontend-design/SKILL.md` in the anthropics/claude-code repo. **Verified byte-identical to `skills/frontend-design/SKILL.md` in anthropics/skills** (the copy staged in this folder). Install: `/plugin marketplace add anthropics/skills` then `/plugin install example-skills@anthropic-agent-skills`, or from the claude-code marketplace: `/plugin install frontend-design@claude-code`.
4. **Repo:** https://github.com/anthropics/skills — README notes example skills are Apache-2.0 (doc skills are source-available only; not staged).

---

## 1. Why "AI slop" happens (blog, verbatim)

- Models predict based on statistical patterns in training data; "safe design choices–those that work universally and offend no one–dominate web training data." Without direction, Claude "samples from this high-probability center" — **distributional convergence**. The result is "immediately recognizable—and dismissible."
- Claude is highly steerable: tell it "avoid Inter and Roboto" or "use atmospheric backgrounds instead of solid colors, and results improve immediately." The catch: "the more specialized the task, the more context you need to provide" — Skills deliver that context on demand without permanent overhead.

## 2. The three prompting strategies (cookbook, verbatim)

1. **Guide specific design dimensions** — Direct Claude's attention to typography, color, motion, and backgrounds individually
2. **Reference design inspirations** — Suggest sources like IDE themes or cultural aesthetics without being overly prescriptive
3. **Call out common defaults** — Explicitly tell Claude to avoid its tendency toward generic choices

## 3. The distilled aesthetics prompt (cookbook, verbatim — append to CLAUDE.md / system prompt)

```
<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>
```

## 4. Typography-only isolated prompt (cookbook, verbatim)

```
<use_interesting_fonts>
Typography instantly signals quality. Avoid using boring, generic fonts.

**Never use:** Inter, Roboto, Open Sans, Lato, default system fonts

**Impact choices:**
- Code aesthetic: JetBrains Mono, Fira Code, Space Grotesk
- Editorial: Playfair Display, Crimson Pro, Fraunces
- Startup: Clash Display, Satoshi, Cabinet Grotesk
- Technical: IBM Plex family, Source Sans 3
- Distinctive: Bricolage Grotesque, Obviously, Newsreader

**Pairing principle:** High contrast = interesting. Display + monospace, serif + geometric sans, variable font across weights.

**Use extremes:** 100/200 weight vs 800/900, not 400 vs 600. Size jumps of 3x+, not 1.5x.

Pick one distinctive font, use it decisively. Load from Google Fonts. State your choice before coding.
</use_interesting_fonts>
```

Theme-constraint pattern (same cookbook): lock a named aesthetic in a tag, e.g. `<always_use_solarpunk_theme>` listing palette moods, shape language, texture, atmosphere, typography era — useful template for a `ventriq-brand` skill.

## 5. The frontend-design SKILL.md highlights (staged in full at ./frontend-design/)

- Role-frame: "design lead at a small studio... client has already rejected proposals that felt templated"; take **one real aesthetic risk you can justify**.
- Names the three current AI-slop clusters to refuse as defaults: (1) warm cream bg (~#F4F1EA) + high-contrast serif + terracotta accent; (2) near-black bg + single acid-green/vermilion accent; (3) broadsheet layout, hairline rules, zero border-radius, dense columns.
- Two-pass process: plan a compact token system (4–6 named hex colors; 2+ type roles; layout via ASCII wireframes; ONE signature element) → self-critique vs. the generic default → only then code.
- "Spend your boldness in one place"; quality floor without announcing it: responsive to mobile, visible keyboard focus, reduced motion respected. Chanel: remove one accessory.
- Structure is information: numbered markers (01/02/03) only if content is truly a sequence. Big-number hero + gradient accent = "the template answer."
- Copy is design material: active voice, name things by what users control, "Save changes" not "Submit," errors explain and never apologize, empty states invite action.

## 6. Blog's summary of the design dimensions (verbatim fragments)

- Typography: "Never use: Inter, Roboto, Open Sans, Lato, default system fonts"; extremes "100/200 weight vs 800/900, not 400 vs 600"; size jumps "3x+, not 1.5x."
- Color: "Dominant colors with sharp accents outperform timid, evenly-distributed palettes."
- Motion: "one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions."
- Backgrounds: "Create atmosphere and depth rather than defaulting to solid colors."
- web-artifacts-builder SKILL.md one-liner: "To avoid what is often referred to as 'AI slop', avoid using excessive centered layouts, purple gradients, uniform rounded corners, and Inter font."
