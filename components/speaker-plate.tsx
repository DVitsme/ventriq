"use client";

import { useEffect, useState } from "react";

/** The speaker plate + THE FLIP — Justin's marquee ask from the Jul 23 call
 *  ("the flip would go crazy"). Spec + sources:
 *  docs/plans/summit-aug-1/06-phase-5-research.md §3–§4.
 *
 *  Jul 29 (late): upgraded from 5 text plates to the full 21-speaker roster
 *  with real headshots (16 of 21; the rest run the initials type-ground, so
 *  photo and no-photo plates are siblings and roster waves never look like
 *  gaps). Two additions at Derrick's direction:
 *  — HOVER-TO-FLIP for mouse users. Jul 29, later that night: rebuilt as JS
 *    driving the SAME
 *    state as the chip (pointerenter/leave gated on pointerType === "mouse").
 *    The original pure-CSS :hover path was a second state machine and it
 *    shipped a real bug: under prefers-reduced-motion its rotateY(180deg)
 *    outranked the PRM block's transform:none, leaving hover a blank card
 *    (Chromium backface-culls) or mirrored text (Firefox). One state means
 *    the choreography can't fork again — and the chip label + aria-expanded
 *    now tell the truth during a hover flip. pointerType, not the
 *    (hover)/(pointer) media queries: those misreport on touchscreen laptops
 *    (Firefox bug 1735765) and Wayland; per-event type is ground truth. The
 *    gate also keeps taps sane — touch fires pointerenter before click, so
 *    an ungated handler would double-toggle every tap.
 *  — Reduced-motion users now SEE the flip as a 180ms opacity crossfade
 *    (Derrick: "the animation should be seen even on reduced motion").
 *    Opacity-only is the vestibular-safe animation class, so this honors the
 *    ask without breaking the PRM law: no rotation, no translation, ever.
 *
 *  Load-bearing decisions (unchanged): per-card perspective · grid-area face
 *  stacking · explicit rotateY(0) front (Firefox 1201471) · radius on the
 *  FACES (grouping properties flatten preserve-3d — the duotone `filter`
 *  therefore lives on the <img>, never the 3D wrapper) · away face hidden
 *  with `visibility` (backface-visibility is visual-only; `inert` doesn't
 *  survive this React build) · one persistent <button> outside the rotating
 *  wrapper · no `scale` anywhere (rasterization blur).
 *
 *  Content model: the FRONT is the poster (photo/initials, name, title); the
 *  BACK carries the bio line + role. Bios are card-length lines derived from
 *  the full bios in docs/notes-from-justin/7-29/FORGE THE FUTURE SPEAKER
 *  BIOS.md — the full texts are preserved there for a future /speakers page.
 *  No-JS users get the complete name/title/photo layer; bios are the
 *  enhancement layer. */
export type Speaker = {
  name: string;
  title: string;
  /** Card-length credential line (back face). Empty = bio not yet delivered. */
  bio: string;
  role: string;
  initials: string;
  sheet: string; // "S-01" — drafting sheet number
  /** Slug into /speakers/<img>.webp (640×800). Absent = initials plate. */
  img?: string;
};

export function SpeakerPlate({ s, index }: { s: Speaker; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const backId = `speaker-bio-${index}`;

  // WCAG 1.4.13: hover-revealed content must be dismissable without moving
  // the pointer — Esc restores the poster face. Mounted only while flipped.
  useEffect(() => {
    if (!flipped) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFlipped(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [flipped]);

  return (
    <article
      aria-label={s.name}
      className={`vq-in relative md:hover:z-20 ${flipped ? "z-20" : ""}`}
      style={{ ["--vqd" as string]: `${Math.min(index, 6) * 60}ms` }}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setFlipped(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setFlipped(false);
      }}
    >
      <div className="vq-scene h-full">
        <div className="vq-faces h-full" data-flipped={flipped || undefined}>
          {/* FRONT — the poster. */}
          <div className="vq-face vq-face-front flex flex-col rounded-[2px] border border-cream/13 bg-midnight p-6 pb-16">
            <PlateTicks />
            <p className="text-xs tracking-[0.18em] text-gold [font-variant:small-caps] [font-variant-numeric:tabular-nums]">
              {s.sheet} <span className="text-cream/60">/ 21+</span>
            </p>
            {s.img ? (
              /* Portrait, unified by the midnight/cream duotone (grayscale on
                 the img + a color-blend veil). Sized+lazy: below-fold, zero
                 LCP/CLS cost. Filter on the img is safe — grouping-property
                 flattening only bites on the preserve-3d wrapper. */
              <div className="relative mt-4 aspect-[4/5] overflow-hidden rounded-[2px]">
                {/* Plain <img> is deliberate: next/image needs Cloudflare Image
                    Transformations, which is a dashboard toggle still unset
                    (TODO 🔴). These are pre-sized 640×800 webps (13–71KB),
                    lazy, below the fold — there is nothing left to optimize. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/speakers/${s.img}.webp`}
                  alt=""
                  width={640}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="vq-duotone h-full w-full object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-midnight/25 mix-blend-color" />
              </div>
            ) : (
              /* Initials type-ground — the no-photo sibling. Rendered via CSS
                 content (globals .vq-initials::after): it is a watermark at
                 deliberate 1.19:1, and axe's color-contrast rule evaluates
                 real text nodes even inside aria-hidden — pseudo-element
                 content it does not. Decorative paint, painted decoratively. */
              <div
                aria-hidden
                data-initials={s.initials}
                className="vq-initials pointer-events-none relative mt-4 aspect-[4/5] overflow-hidden rounded-[2px] border border-cream/[0.07]"
              />
            )}
            <div className="relative mt-4">
              <h3 className="text-lg font-semibold leading-snug md:text-xl">{s.name}</h3>
              {s.title && <p className="mt-1 text-sm text-gold">{s.title}</p>}
            </div>
          </div>

          {/* BACK — the drawing notes. */}
          <div id={backId} className={`vq-face vq-face-back flex flex-col rounded-[2px] border bg-midnight p-6 pb-16 ${s.role ? "border-t-2 border-gold/50 border-t-gold" : "border-gold/50"}`}>
            <PlateTicks />
            {s.role ? (
              <p className="text-xs tracking-[0.18em] text-gold [font-variant:small-caps]">{s.role}</p>
            ) : (
              <p className="text-xs tracking-[0.18em] text-cream/60 [font-variant:small-caps]">forge the future summit</p>
            )}
            <blockquote className="mt-5 text-[16px] font-medium leading-relaxed text-cream md:text-[17px]">
              {s.bio || `${s.name} joins the eight-night lineup — full bio landing with the next revision.`}
            </blockquote>
            <div className="mt-auto flex items-end justify-between gap-4 pt-6">
              <p className="text-sm text-cream/60">{s.name}</p>
              <p aria-hidden className="text-xs tracking-[0.18em] text-gold/70 [font-variant:small-caps] [font-variant-numeric:tabular-nums]">
                {s.sheet}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The one persistent trigger — outside the rotating wrapper. */}
      <button
        type="button"
        aria-expanded={flipped}
        aria-controls={backId}
        onClick={() => setFlipped((f) => !f)}
        className="absolute bottom-4 left-6 z-10 rounded-[2px] border border-gold/60 px-3.5 py-2 text-xs tracking-[0.14em] text-gold [font-variant:small-caps] hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
      >
        {flipped ? "back" : "bio"}
        <span className="sr-only">, {s.name}</span>
      </button>
    </article>
  );
}

/** Gold registration ticks — the drafting corner marks. */
function PlateTicks() {
  return (
    <>
      <svg aria-hidden className="absolute left-1.5 top-1.5 h-3 w-3" fill="none" viewBox="0 0 12 12">
        <path d="M0 4 V0 H4" stroke="#C9A24C" strokeWidth="1" />
      </svg>
      <svg aria-hidden className="absolute bottom-1.5 right-1.5 h-3 w-3" fill="none" viewBox="0 0 12 12">
        <path d="M12 8 V12 H8" stroke="#C9A24C" strokeWidth="1" />
      </svg>
    </>
  );
}
