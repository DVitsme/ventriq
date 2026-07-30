"use client";

import { useState } from "react";

/** The speaker plate + THE FLIP — Justin's marquee ask from the Jul 23 call
 *  ("the flip would go crazy"), replacing Derrick's original pop-up plan.
 *  Full spec + sources: docs/plans/summit-aug-1/06-phase-5-research.md §3–§4.
 *
 *  The build decisions, each one load-bearing:
 *
 *  GEOMETRY — per-card `perspective` (a shared ancestor skews off-center
 *  cards toward one vanishing point); faces stacked with `grid-area: 1/1`
 *  (never absolute — the card must size to the taller face); front face
 *  carries an EXPLICIT `rotateY(0deg)` (Firefox bug 1201471); the 2px radius
 *  lives on the faces because overflow/opacity/filter/clip on the preserve-3d
 *  wrapper silently flattens the 3D in every engine (MDN grouping list).
 *  No `scale` anywhere in the flip — scale is what triggers rasterization
 *  text blur.
 *
 *  ACCESSIBILITY — `backface-visibility` is visual-only: the rotated-away
 *  face stays in the AT tree and tab order in every engine. The away face is
 *  therefore `visibility: hidden` at rest (CSS-timed: hides 500ms after the
 *  flip starts, shows instantly when returning — see globals.css .vq-face
 *  rules). Same `visibility` lesson as the mobile CTA bar: `inert` doesn't
 *  survive this React build, `visibility` does, and it removes focus + AT in
 *  one move while still transitioning. The trigger is ONE persistent
 *  <button> OUTSIDE the rotating wrapper (focus never unmounts mid-flip),
 *  with disclosure semantics (`aria-expanded`) — the APG-settled wiring; the
 *  Edwards/Vispero relabel pattern is the documented fallback if SR QA ever
 *  surfaces confusion. Never the whole card as a button (headings inside a
 *  button stop being headings, and backs will grow links once real bios land).
 *
 *  NO-JS / REDUCED MOTION — the FRONT face carries every fact we publish
 *  today (name, title, proof), so nothing is information-gated behind the
 *  flip; the back is arrangement, not exclusive content. Reduced motion gets
 *  an instant swap (rotation + visibility delays are gated behind
 *  no-preference in globals.css).
 *
 *  PHOTOS LATER — `.vq-plate-media` is the future portrait slot: today it
 *  renders the speaker's initials as type-ground (Laracon pattern — photo
 *  and no-photo plates are siblings, so roster waves never look like gaps);
 *  when a headshot lands it becomes an <img> with the midnight/cream duotone
 *  treatment. */
export type Speaker = {
  name: string;
  title: string;
  proof: string;
  role: string;
  initials: string;
  sheet: string; // "S-01" — drafting sheet number
  featured?: boolean;
};

export function SpeakerPlate({ s, index }: { s: Speaker; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const backId = `speaker-bio-${index}`;

  return (
    <article
      aria-label={s.name}
      className={`vq-in relative ${s.featured ? "md:col-span-3" : "md:col-span-2"} ${flipped ? "z-20" : ""}`}
      style={{ ["--vqd" as string]: `${Math.min(index, 6) * 60}ms` }}
    >
      <div className="vq-scene h-full">
        <div className="vq-faces h-full" data-flipped={flipped || undefined}>
          {/* FRONT — the poster. Carries all published facts. */}
          <div className="vq-face vq-face-front flex min-h-[290px] flex-col rounded-[2px] border border-cream/13 bg-midnight p-6 pb-16">
            <PlateTicks />
            <p className="text-xs tracking-[0.18em] text-gold [font-variant:small-caps] [font-variant-numeric:tabular-nums]">
              {s.sheet} <span className="text-cream/60">/ 17+</span>
            </p>
            {/* Type-as-ground initials — the future photo slot. */}
            <div aria-hidden className="vq-plate-media pointer-events-none absolute inset-x-0 bottom-10 select-none overflow-hidden text-right">
              <span className="block pr-4 text-[110px] font-semibold leading-none tracking-[-0.04em] text-cream/[0.07]">
                {s.initials}
              </span>
            </div>
            <div className="relative mt-auto pt-10">
              <h3 className="text-xl font-semibold leading-snug md:text-2xl">{s.name}</h3>
              <p className="mt-1 text-sm text-gold">{s.title}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-cream/78">{s.proof}</p>
            </div>
          </div>

          {/* BACK — the drawing notes. */}
          <div id={backId} className="vq-face vq-face-back flex min-h-[290px] flex-col rounded-[2px] border border-gold/50 bg-midnight p-6 pb-16">
            <PlateTicks />
            {s.role ? (
              <p className="text-xs tracking-[0.18em] text-gold [font-variant:small-caps]">{s.role}</p>
            ) : (
              <p className="text-xs tracking-[0.18em] text-cream/60 [font-variant:small-caps]">panelist · forge the future summit</p>
            )}
            <blockquote className="mt-5 text-lg font-medium leading-snug text-cream md:text-xl">
              {s.proof}
            </blockquote>
            <div className="mt-auto flex items-end justify-between pt-6">
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

/** Gold registration ticks — the drafting corner marks, carried over from the
 *  old placeholder tiles so the vocabulary survives the upgrade. */
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
