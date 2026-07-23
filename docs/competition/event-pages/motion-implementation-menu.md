# Motion Implementation Menu — Ventriq Event Pages

**Stack:** Next.js 16 (App Router, React 19.2) · Tailwind v4 (+ tw-animate-css via shadcn) · `motion` (framer-motion successor) · solo dev
**Targets:** Lighthouse ≥95 · full `prefers-reduced-motion` · server-rendered copy · midnight navy #101B2D + gold #C9A24C 1px corridor lines, drafting numerals, staged type
**Researched:** 2026-07-09 (docs/changelogs verified live; version claims tagged)

## TL;DR

1. **Stay on `motion` + CSS. Don't add GSAP** — unless the design locks on responsive multi-line *line-mask* reveals; then GSAP (100% free since Apr 2025, SplitText included) earns its ~30 kB. Word-level staging needs no library beyond a 12-line splitter.
2. **Split text = hand-roll at word level** in a client component (client components still SSR → SEO safe): `aria-label` on the heading, `aria-hidden` spans inside. Same ARIA strategy Motion+ and GSAP use.
3. **Scroll-linked = motion's `useScroll`** — it's the only library that rides the browser's native `ScrollTimeline` (hardware-accelerated) where available, with JS fallback. Use **CSS `animation-timeline: view()`** only as progressive enhancement — Firefox 152 (Jun 2026) still flags it.
4. **Bundle discipline:** `LazyMotion` + `m` = ~6 kB initial, `domAnimation` +15 kB (~21 kB total) vs 34 kB full `motion` component. `layout` morphs need `domMax` (+25 kB) — avoid; crossfade instead.
5. **Reduced motion = one wrapper:** `<MotionConfig reducedMotion="user">` at the root client boundary auto-strips transform/layout animations but keeps opacity — every motion scene degrades to fades for free. Pair with one global CSS media block for CSS-driven effects.
6. **Countdown:** render a fixed-width placeholder server-side, start ticking in `useEffect` — zero hydration mismatch, zero CLS (`tabular-nums` + fixed cells). Count-up stats: `@number-flow/react` (MIT, respects reduced-motion by default) + `useInView`.
7. **Atmosphere is ~free:** grain = one static SVG `feTurbulence` data-URI tile at 3–5% opacity (rasterized once; also kills navy gradient banding). Gold light = layered radial gradients + `mask-image`. Zero JS, zero Lighthouse cost. Never animate the filter.
8. **View Transitions:** browser API is Baseline (Firefox 144, Oct 2025) but Next's integration is still `experimental.viewTransition` in 16.2 — ship as pure enhancement (no support/flag issue = instant swap, nothing breaks).
9. **Lighthouse killers** on pages like these: non-composited animations (Lighthouse audits for it), long tasks >50 ms, hydrating one giant client tree. Counters: transform/opacity only, many small client islands, `next/dynamic` below-fold scenes, `content-visibility: auto` per section.
10. **Re-triggering entrances per navigation:** put page scenes under `template.tsx` (re-mounts each nav); `layout.tsx` persists (header never re-animates).

---

## Implementation menu

Effort: **S** ≤ ½ day · **M** ≈ 1 day · **L** = multi-day. All sketches assume `m` components under `LazyMotion`.

### 1. Staged hero type (word-level rise, masked per word)
**Rec:** hand-rolled word split + variants/`staggerChildren` · **Effort: S**
```tsx
"use client";
const parent = { show: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } } };
const word = { hidden: { y: "110%" }, show: { y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
<m.h1 aria-label={text} initial="hidden" animate="show" variants={parent}>
  {text.split(" ").map((w, i) => (
    <span key={i} aria-hidden className="inline-block overflow-clip align-bottom">
      <m.span className="inline-block" variants={word}>{w}&nbsp;</m.span>
    </span>))}
</m.h1>
```
**Perf/a11y:** transform-only; `aria-label` = single accessible name, spans hidden from SR (the Motion+/GSAP strategy). Words re-wrap responsively with no re-split machinery — the reason to prefer words over lines. **RM:** `reducedMotion="user"` strips the `y`; add `hidden:{opacity:0}` so it fades.

### 2. Line-mask reveal (whole lines rise from behind a rule)
**Rec:** only if design demands it — needs line *measurement*: GSAP SplitText (`type:"lines", mask:"lines", autoSplit:true` re-splits on font-load/resize) or Motion+ `splitText` (0.7 kB, £299 membership) · **Effort: M** (incl. `document.fonts.ready` gating)
**Perf/a11y:** both ship the aria-label/aria-hidden pattern built in. **RM:** wrap trigger in `useReducedMotion()` → plain fade. *Default recommendation: fake it with effect 1 — per-word masks read as line reveals at display sizes.*

### 3. Corridor lines draw on load (gold hairlines converge into the hero)
**Rec:** inline SVG + motion `pathLength` · **Effort: S–M** (M = drawing the geometry)
```tsx
<svg viewBox="0 0 1440 640" aria-hidden className="absolute inset-0 h-full w-full">
  {PATHS.map((d, i) => (
    <m.path key={i} d={d} stroke="var(--gold)" strokeWidth={1} fill="none"
      vectorEffect="non-scaling-stroke"
      initial={{ pathLength: 0, opacity: 0.9 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1.4, delay: 0.2 + i * 0.12, ease: "easeInOut" }} />))}
</svg>
```
**Perf/a11y:** stroke-dash is paint (not composited) — fine for 1px hairlines, but stagger starts and keep ≤ ~8 simultaneous paths; `vector-effect` keeps 1px crisp. `aria-hidden` — pure decoration. **RM:** lines render fully drawn (`initial={false}` when `useReducedMotion()`).

### 4. Scroll-drawn corridor spine (line draws down the page as you scroll)
**Rec:** `useScroll` + `pathLength` (hardware-accelerated via native ScrollTimeline where supported) · **Effort: M**
```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
const pathLength = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });
<m.path d={SPINE} style={{ pathLength }} stroke="var(--gold)" strokeWidth={1} fill="none" />
```
CSS-only enhancement for simple cases: `@supports (animation-timeline: view()) { .spine { animation: draw linear both; animation-timeline: view(); animation-range: entry 20% cover 60%; } }` — but with Firefox unshipped you need the JS path anyway, so motion is the primary.
**Perf/a11y:** scroll-*linked* (not triggered) → ScrollTimeline offloads it in Chromium/Safari 26.4+. **RM:** spine static at full length.

### 5. Count-up drafting numerals ($ raised, founders, seats)
**Rec:** `@number-flow/react` (MIT, v0.5.x, Intl.NumberFormat + WAAPI, dependency-free) triggered by `useInView` · **Effort: S**
```tsx
const ref = useRef(null);
const inView = useInView(ref, { once: true, margin: "-20% 0px" });
<span ref={ref} className="tabular-nums">
  <NumberFlow value={inView ? 250000 : 0} format={{ style: "currency", currency: "USD", notation: "compact" }} />
</span>
```
**Perf/a11y:** digit-roll runs on WAAPI; `font-variant-numeric: tabular-nums` (Tailwind `tabular-nums`) stops width jitter. **RM:** built in — `respectMotionPreference` defaults true → number just updates.

### 6. Numeral scramble/decode (drafting-table "plotting" digits, e.g. section indices `01 → 04`)
**Rec:** hand-rolled 15-line interval that settles chars left→right; Motion+ `ScrambleText` if bought · **Effort: S**
```tsx
useEffect(() => { if (!inView || reduced) { setOut(final); return; }
  let f = 0; const id = setInterval(() => {
    setOut(final.split("").map((c, i) => (i < f / 3 ? c : CHARS[(Math.random() * CHARS.length) | 0])).join(""));
    if (f++ > final.length * 3) { setOut(final); clearInterval(id); } }, 40);
  return () => clearInterval(id); }, [inView]);
```
**Perf/a11y:** wrap in `aria-hidden` + sibling `sr-only` final value — SRs must never hear the scramble. Monospace/`tabular-nums` to avoid reflow. **RM:** snap to final (shown in sketch).

### 7. Countdown to Aug 10 (SSR-safe)
**Rec:** placeholder-then-tick; never render `Date.now()` on the server · **Effort: S**
```tsx
"use client";
const TARGET = Date.parse("2026-08-10T09:00:00-04:00"); // constant → no mismatch
const [now, setNow] = useState<number | null>(null);
useEffect(() => { setNow(Date.now());
  const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
const t = now && Math.max(0, TARGET - now);
return <span role="timer" aria-live="off" className="tabular-nums">{t == null ? "‒‒:‒‒:‒‒" : fmt(t)}</span>;
```
**Perf/a11y:** server HTML shows same-width dashes (or the static date) → no hydration warning, no CLS; `suppressHydrationWarning` is the escape hatch, not the fix. `aria-live="off"` so it doesn't announce every second. Optional: feed digits into NumberFlow for the roll. **RM:** it's a clock — content, not motion; keep it (NumberFlow disables its roll automatically).

### 8. Ticker / marquee (speaker names, "AUG 10–21" strip)
**Rec:** CSS-only, duplicated track · **Effort: S**
```html
<div class="marquee overflow-hidden" role="marquee">
  <div class="track"><ul>…items…</ul><ul aria-hidden="true">…items…</ul></div></div>
```
```css
.track { display: flex; gap: 3rem; width: max-content; animation: tick 40s linear infinite; }
@keyframes tick { to { transform: translateX(-50%); } }
.marquee:hover .track, .marquee:focus-within .track { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) { .track { animation: none; } }
```
**Perf/a11y:** seam-free because the loop ends exactly one copy-width in (`-50%`); compositor-only; duplicate list `aria-hidden`; pause on hover *and* focus-within. **RM:** static row (first copy visible). Motion+ `Ticker` exists but is not worth £299 alone.

### 9. Scroll-triggered section reveals (site-wide default)
**Rec:** `whileInView`, opacity + ≤32px rise · **Effort: S**
```tsx
<m.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "0px 0px -18% 0px" }}
  transition={{ duration: 0.7, ease: "easeOut" }}>
```
**Best practice:** `once: true` (no exit-replay churn); negative bottom margin so it fires *before* full visibility (never a blank viewport); motion pools IntersectionObservers, so per-section cost ≈ zero. **RM:** transform stripped globally → pure fade.

### 10. Speaker grid stagger + touch-safe hover reveal
**Rec:** parent variants + `staggerChildren`; reveal via `:hover`/`:focus-within`, always-on for touch · **Effort: M**
```tsx
<m.ul initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}
  variants={{ show: { transition: { staggerChildren: 0.06 } } }}>
  {speakers.map(s => (
    <m.li key={s.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      className="group relative">…photo… 
      <div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
        pointer-coarse:opacity-100 transition-opacity">…role/talk…</div></m.li>))}
</m.ul>
```
**Perf/a11y:** cap visible stagger ≈ 0.06 s × ≤12 items (a 30-card grid staggered fully feels broken — stagger per row/viewport batch); hover content must also show on keyboard focus and be *always visible* on touch (`pointer-coarse:` in Tailwind v4.1+, else `@media (hover:none)`). Card = real `<a>`. **RM:** fade-only, no stagger delay change needed.

### 11. Pinned narrative scene ("two weeks, one hour a day" sequence)
**Rec:** `position: sticky` inside a tall section + `useScroll(target)` — never JS-pinning · **Effort: L**
```tsx
<section ref={ref} className="relative h-[300vh]">
  <div className="sticky top-0 flex h-screen items-center overflow-hidden">
    {/* layers styled from scrollYProgress via useTransform */}
  </div>
</section>
const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
```
**Perf/a11y:** sticky = native, zero scroll-jacking; all layer styles from `useTransform` (opacity/transform only). Budget **one** pinned scene per page. Content inside must be real DOM text (it is — SSR). **RM:** render the stages stacked statically (`useReducedMotion()` branch) — sticky+height collapse to `h-auto`.

### 12. Parallax gold glow / line layers
**Rec:** `useScroll` + `useTransform`, decoration only · **Effort: S**
```tsx
const y = useTransform(scrollYProgress, [0, 1], [0, -120]); // slower than content
<m.div style={{ y }} aria-hidden className="absolute inset-0 bg-[radial-gradient(...)]" />
```
**Perf/a11y:** ScrollTimeline-accelerated; keep to 2–3 layers; never parallax body text. **RM:** `reducedMotion="user"` zeroes the transform automatically — exactly the motion-docs pattern.

### 13. Horizontal agenda strip (Days 1–10 scroll sideways)
**Rec:** tall-section sticky pattern (same skeleton as #11) with `x` transform — desktop only · **Effort: L**
```tsx
const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);
<m.div style={{ x }} className="flex w-max gap-8">…day cards…</m.div>
```
**App Router pitfalls:** on touch/small screens swap to native `overflow-x-auto` + `snap-x` (media-query the component — don't fight momentum scroll); back-navigation scroll restoration can land mid-scene (fine — it's just scroll position, but test it); in-page anchor `<Link scroll={false}>` when linking into the section; the section's real height (300vh) keeps the scrollbar honest. **RM:** vertical static list.

### 14. Sticky registration CTA that morphs to a corner pill
**Rec:** threshold toggle + crossfade (stays in `domAnimation`); reserve `layout` morphs for `domMax` budgets · **Effort: M**
```tsx
const { scrollY } = useScroll();
useMotionValueEvent(scrollY, "change", (y) => setDocked(y > 560));
<AnimatePresence>{docked && (
  <m.div initial={{ opacity: 0, y: 16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 16 }} className="fixed bottom-4 right-4 z-50">
    <Button className="rounded-full shadow-lg">Register — Free · Aug 10–21</Button>
  </m.div>)}</AnimatePresence>
```
**Perf/a11y:** the hero CTA stays in-flow (SSR, focusable); the pill is a *second* element — simpler and cheaper than a shared-layout morph (which requires `domMax` +25 kB). Respect safe-area insets on iOS. **RM:** instant appear/disappear (opacity kept).

### 15. Film grain (midnight sections)
**Rec:** static SVG `feTurbulence` tile as a data-URI background — generated once, never live-filtered · **Effort: S**
```css
.grain::after { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: .04;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E");
  background-size: 160px; mix-blend-mode: overlay; }
```
**Perf/a11y:** tile rasterizes once and repeats — near-zero cost; live `filter:` on large areas is the expensive variant (avoid, esp. mobile); `numOctaves` ≤ 3. Bonus: grain eliminates gradient banding on dark navy. **RM:** it's static — no fallback needed (never animate grain; "flicker" loops are a vestibular trigger and a paint bomb).

### 16. Gold light washes (atmosphere without WebGL)
**Rec:** layered radial gradients + `mask-image`; animate opacity only, sparingly · **Effort: S**
```css
.hero { background:
  radial-gradient(60% 45% at 72% 18%, rgb(201 162 76 / .14), transparent 70%),
  radial-gradient(120% 90% at 50% 115%, #0b1424, #101b2d); }
.beam { background: linear-gradient(105deg, transparent, rgb(201 162 76 / .22), transparent);
  mask-image: radial-gradient(55% 65% at 50% 40%, #000 30%, transparent); }
```
**Perf/a11y:** pure paint-once CSS — this is the "allowed" atmospheric gradient use (decorative light on a brand ground, not content). A slow opacity pulse (`animation: glow 9s ease-in-out infinite alternate`) is compositor-only if on its own layer. **RM:** kill the pulse in the global media block; static light stays.

### 17. View Transitions (Summit ⇄ speaker pages cinema) + `@starting-style` micro-entrances
**Rec:** Next `experimental.viewTransition` + React `<ViewTransition>`; treat as enhancement · **Effort: M**
```tsx
// next.config.ts → experimental: { viewTransition: true }
import { ViewTransition } from "react";
<ViewTransition name={`speaker-${s.id}`}><Image … /></ViewTransition> // grid page
<ViewTransition name={`speaker-${s.id}`}><Image fill … /></ViewTransition> // detail hero
```
```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(*), ::view-transition-new(*), ::view-transition-group(*) {
    animation-duration: 0s !important; } }
```
Anchor the site header (`view-transition-name: site-header` + `animation: none`) so only content slides. Firefox 144's first release lacks transition *types* → directional slides degrade to crossfade there — fine.
`@starting-style` (Baseline: Chrome/Edge 117+, Safari 17.5+, Firefox 129+) covers JS-free entrances for dialogs/popovers/late chips: `.chip { transition: opacity .5s, translate .5s; @starting-style { opacity: 0; translate: 0 8px; } }`. **RM:** the media block above; `@starting-style` bits get `transition: none`.

---

## The GSAP verdict

**Stay on motion + CSS for these two pages.** Rationale:

- **License is no longer the blocker** — GSAP has been 100% free incl. all Club plugins (SplitText, MorphSVG, ScrollTrigger…) for commercial use since Webflow's April 30, 2025 announcement / GSAP 3.13. So the question is purely engineering.
- **What SplitText would buy:** true *line* splitting with `autoSplit` (re-splits on font load + resize), built-in `mask` reveals, `smartWrap`, emoji/i18n-correct splitting, and its own aria handling. That matters for multi-line editorial paragraphs animating by line across breakpoints.
- **What it costs:** a second animation runtime (~24 kB core + SplitText, ~35 kB with ScrollTrigger), two mental models for one solo dev, and React 19 integration via `useGSAP` cleanup discipline. Motion already covers scroll (ScrollTimeline-accelerated — GSAP's ScrollTrigger is main-thread), stagger, in-view, springs.
- **The design brief is word/heading-scale staging, not per-line editorial cascades** → effect #1 (12 lines, 0 kB) covers it. If the art direction later locks on line-mask reveals: first choice **Motion+ splitText** (£299 one-time, 0.7 kB, stays in one ecosystem, MIT-licensed output); second choice GSAP core+SplitText *scoped to the two event pages via `next/dynamic`* so the rest of the site never pays for it.

## Browser support — scroll-driven CSS & friends (verified 2026-07)

| Feature | Chrome/Edge | Safari | Firefox | Verdict for this build |
|---|---|---|---|---|
| `animation-timeline: scroll()/view()`, `animation-range` | 115+ (Jul 2023) ✅ | 26.0 (Sep 2025) ✅; threaded/off-main-thread in 26.4 | ❌ behind `layout.css.scroll-driven-animations.enabled` as of FF 152 (Jun 2026); Nightly-on | Enhancement only (`@supports`); motion `useScroll` is the primary |
| Same-doc View Transitions | 111+ ✅ | 18+ ✅ | 144+ (Oct 2025) ✅ — no transition *types* yet | Baseline Newly Available; Next integration still experimental |
| `@starting-style` + `transition-behavior: allow-discrete` | 117+ ✅ | 17.5+ ✅ | 129+ ✅ | Safe to use (Baseline Aug 2024) |
| `content-visibility: auto` | 85+ ✅ | 18+ ✅ | 125+ ✅ | Safe for below-fold sections |

Firefox quirk when you do ship CSS scroll timelines: it requires a non-zero `animation-duration` (use `1ms`) once unflagged.

## Page-load orchestration recipe (App Router)

1. **Everything is server-rendered copy; animation lives in client leaves.** Client components still SSR — "client island" costs hydration JS, not SEO. Granularity: one island per *scene* (hero type, stats row, pinned scene), not per element and not one page-wide island.
2. **Root providers, once:** `<LazyMotion features={domAnimation} strict><MotionConfig reducedMotion="user">…` in a `providers.tsx` client component wrapped around `{children}` in the root layout. `strict` throws if anyone imports full `motion` and blows the 6+15 kB budget.
3. **Fonts before type choreography:** `next/font` self-hosts + auto-adjusts fallback metrics (no font CLS). Word-stagger (#1) is safe immediately; anything that *measures* lines waits on `document.fonts.ready` (GSAP `autoSplit` automates this).
4. **No-CLS discipline:** hide with `opacity`/`transform` only — never `display`/height; every animated element occupies final layout from first paint. Keep the hero H1 (LCP candidate) reveal starting immediately and ≤ ~800 ms total — LCP isn't credited while the element sits at `opacity: 0`.
5. **Choreograph with variants, not timeouts:** one `delayChildren`/`staggerChildren` tree per scene: corridor lines (0 s) → H1 words (0.35 s) → sub + CTA (0.9 s). CSS pieces sync via `animation-delay` on the same clock.
6. **`template.tsx` vs `layout.tsx`:** entrance choreography goes in each event page's `template.tsx` (re-mounts per navigation → replays); the nav/header lives in `layout.tsx` (persists → never re-animates, stays the View-Transition anchor).
7. **Below the fold:** `next/dynamic(() => import("./PinnedScene"))` for heavy scenes + `content-visibility: auto; contain-intrinsic-size: auto 800px;` on late sections + `viewport={{ once: true }}` everywhere.
8. **Budget ledger (min+gzip, motion.dev figures):** LazyMotion+`m` ≈ 6 kB + `domAnimation` ≈ 15 kB + NumberFlow (small, dependency-free) + 0 kB for marquee/grain/light/`@starting-style`. Skip `domMax` (+25 kB) by using crossfade CTA (#14). Watchdogs: Lighthouse "Avoid non-composited animations" audit, long tasks > 50 ms, INP < 200 ms.
9. **Reduced-motion architecture (one place, three layers):** (a) `MotionConfig reducedMotion="user"` → all motion scenes become fades automatically; (b) one global CSS block `@media (prefers-reduced-motion: reduce) { .track, .beam-pulse { animation: none; } ::view-transition-old(*), ::view-transition-new(*) { animation-duration: 0s !important; } }`; (c) `useReducedMotion()` in the three bespoke spots — scramble (#6) snaps, pinned scene (#11) unrolls static, drawn lines (#3/4) render complete. Nothing is *removed*: content is identical, only motion downgrades.

## Sources (accessed 2026-07-09)

- Motion docs — [scroll animations & ScrollTimeline claim](https://motion.dev/docs/react-scroll-animations) · [accessibility / `reducedMotion`](https://motion.dev/docs/react-accessibility) · [LazyMotion sizes](https://motion.dev/docs/react-lazy-motion) · [reduce bundle size](https://motion.dev/docs/react-reduce-bundle-size) · [splitText (Motion+)](https://motion.dev/docs/split-text) · [Motion+ £299](https://motion.dev/plus)
- GSAP — [3.13 release: all plugins free, SplitText rewrite/autoSplit/aria](https://gsap.com/blog/3-13/) (Apr 30 2025) · [Webflow: GSAP 100% free](https://webflow.com/blog/gsap-becomes-free) · [CSS-Tricks confirmation](https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/) (May 2025)
- Scroll-driven CSS — [MDN guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) · Safari 26 ship + Firefox 152 flag status: [dev.to state-of 2026 roundups](https://dev.to/nickbenksim/creating-complex-scroll-driven-animations-with-pure-css-in-2026-17l) (2026)
- View Transitions — [Next.js guide (v16.2.10, updated 2026-05-13)](https://nextjs.org/docs/app/guides/view-transitions) · [config flag = experimental](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition) · [web.dev: Baseline w/ Firefox 144](https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available) (Oct 2025) · [Next.js 16 release](https://nextjs.org/blog/next-16) (Oct 2025)
- Entry/perf — [web.dev: `@starting-style` Baseline](https://web.dev/blog/baseline-entry-animations) (Aug 2024) · [Lighthouse non-composited animations audit](https://developer.chrome.com/docs/lighthouse/performance/non-composited-animations) · [Next.js hydration-error doc](https://nextjs.org/docs/messages/react-hydration-error)
- Components — [NumberFlow](https://number-flow.barvian.me/) (v0.5.9, Apr 2025; `respectMotionPreference` default true) · [Ryan Mulligan: infinite CSS marquee](https://ryanmulligan.dev/blog/css-marquee/) · [CSS-Tricks: grainy gradients](https://css-tricks.com/grainy-gradients/) · [shadcn/ui Tailwind v4 → tw-animate-css](https://ui.shadcn.com/docs/tailwind-v4)
