/** THE SPEAKER WALL — the summit hero's subject (plan: docs/plans/summit-aug-1/08-wave-2b-speaker-wall.md).
 *
 *  Eight duotone speaker plates pinned to the drafting sheet — the
 *  operators' room. Same system as the homepage Master Sheet (chrome,
 *  chip, PRM twin, watchdogs), different subject: people.
 *
 *  Server component; the ENTIRE wall is decorative — one aria-hidden
 *  wrapper, alt="" everywhere, zero focusables (the flip roster below is
 *  the canonical, accessible speaker record; the subnav already links it).
 *  Art-direction law: rotation 0°, no overlap, two sizes only, corner
 *  registration ticks + cream/13 hairline, captions BELOW the plate,
 *  gold-toned develop only. Duotone is BAKED into these thumbs
 *  (public/speakers/hero/, sharp grayscale pass) — zero steady-state CSS
 *  filters, per the GSAP lab's frame profiling; runtime warmth is overlay
 *  opacity, never filter.
 *
 *  Driver hooks: .sw-plate (positioning shell) · .sw-drift (idle lissajous,
 *  will-change) · .sw-card (field lean + hover lift) · .sw-veil (midnight,
 *  .25 rest) · .sw-warm (gold color-blend, 0 rest — CSS var --warm drives
 *  the field) · .sw-frame rect (hover draw) · .sw-cap (visibility-parked
 *  caption; featured's is visible at rest) · .sw-lead-dash/.sw-lead-solid
 *  (the featured leader: dashed=planned, solid=built) · .sw-glow (PRM
 *  attention breathe) · data-featured · data-flip (gaze mirrored inward).
 */

type WallPlate = {
  slug: string;
  name: string;
  credential: string;
  roleLine?: string;
  sheet: string;
  /** desktop position, % of the field */
  x: number;
  y: number;
  featured?: boolean;
  /** mirror so the gaze reads toward the copy column */
  flip?: boolean;
  /** bottom-row plates float their caption above (section clips below) */
  capTop?: boolean;
};

/* Hosts first (their verbatim role strings — no invented dates), then the
   credential picks. Margo Burr sits out pending the Burr/Burley confirm. */
const WALL: WallPlate[] = [
  { slug: "tiffany-bethea", name: "Tiffany Bethea", credential: "Baltimore City Chamber of Commerce", sheet: "s-04", x: 2, y: 2 },
  { slug: "darren-willoughby", name: "Darren Willoughby", credential: "Brand & business strategist", roleLine: "hosting the art of desire", sheet: "s-02", x: 0, y: 36, featured: true },
  { slug: "keisha-bradley", name: "Keisha Bradley", credential: "CEO, The PR Alliance", sheet: "s-05", x: 34, y: 0, flip: true },
  { slug: "gilbryonna-shaw", name: "Gilbryonna Shaw", credential: "Founder, Nü Momish", roleLine: "hosting the rainmaker’s craft", sheet: "s-06", x: 35, y: 34 },
  { slug: "timothy-robertson", name: "Timothy Robertson", credential: "Founder, STATUS International", sheet: "s-03", x: 34, y: 68, capTop: true },
  { slug: "quintel-harcum", name: "Quintel Harcum", credential: "Founder, QS Studio", roleLine: "hosting the modern advantage", sheet: "s-09", x: 70, y: 6, flip: true },
  { slug: "jerone-anthony-tyler", name: "Jerone Anthony Tyler", credential: "Founder, Posteridy.ai", roleLine: "hosting capital & command", sheet: "s-12", x: 69, y: 40, flip: true },
  { slug: "lyndsae-peele", name: "Lyndsae’ Peele", credential: "Kiva U.S.", sheet: "s-14", x: 71, y: 72, flip: true, capTop: true },
];

function Ticks() {
  /* museum corner mounts — ticks only, never a full ticked border */
  const t = "absolute h-[10px] w-[10px] text-gold/55";
  return (
    <>
      <svg aria-hidden className={`${t} -left-px -top-px`} viewBox="0 0 10 10" fill="none"><path d="M0 4 V0 H4" stroke="currentColor" /></svg>
      <svg aria-hidden className={`${t} -right-px -top-px`} viewBox="0 0 10 10" fill="none"><path d="M6 0 H10 V4" stroke="currentColor" /></svg>
      <svg aria-hidden className={`${t} -left-px -bottom-px`} viewBox="0 0 10 10" fill="none"><path d="M0 6 V10 H4" stroke="currentColor" /></svg>
      <svg aria-hidden className={`${t} -right-px -bottom-px`} viewBox="0 0 10 10" fill="none"><path d="M6 10 H10 V6" stroke="currentColor" /></svg>
    </>
  );
}

function Plate({ p }: { p: WallPlate }) {
  return (
    <div
      className={`sw-plate group pointer-events-auto shrink-0 md:absolute ${p.featured ? "w-[152px] md:w-[228px]" : "w-[112px] md:w-[168px]"}`}
      style={{ left: `${p.x}%`, top: `${p.y}%` } as React.CSSProperties}
      data-featured={p.featured || undefined}
    >
      <div className="sw-drift">
        <div className="sw-card relative">
          <div className="sw-photo relative aspect-[4/5] overflow-hidden rounded-[2px] border border-cream/13 bg-midnight">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/speakers/hero/${p.slug}.webp`}
              alt=""
              width={384}
              height={480}
              decoding="async"
              className={`h-full w-full object-cover ${p.flip ? "-scale-x-100" : ""}`}
            />
            <div className="sw-veil absolute inset-0 bg-midnight opacity-55" />
            <div className="sw-warm absolute inset-0 bg-gold opacity-0 [mix-blend-mode:color]" />
            <div className="sw-glow absolute inset-0 bg-gold opacity-0 [mix-blend-mode:plus-lighter]" style={{ background: "radial-gradient(80% 60% at 50% 35%, rgb(201 162 76 / 0.22), transparent 75%)" }} />
            <svg aria-hidden className="sw-framewrap pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 125" preserveAspectRatio="none" fill="none">
              <rect className="sw-frame" x="1" y="1" width="98" height="123" stroke="#C9A24C" strokeWidth="1" strokeDasharray="442" strokeDashoffset="442" />
            </svg>
            <span className="absolute left-2 top-1.5 text-[10px] tracking-[0.18em] text-gold/80 [font-variant:small-caps]">{p.sheet}</span>
          </div>
          <Ticks />
          <div className={`sw-cap absolute left-0 w-full ${p.capTop ? "bottom-[calc(100%+10px)]" : "top-[calc(100%+10px)]"} ${p.featured ? "" : "sw-cap-hidden"}`}>
            <p className="text-[15px] font-semibold leading-tight text-cream md:text-[17px]">{p.name}</p>
            <p className="mt-0.5 text-[12px] leading-snug text-gold">{p.credential}</p>
            {p.roleLine && (
              <p className="mt-0.5 text-[10px] tracking-[0.18em] text-cream/60 [font-variant:small-caps]">{p.roleLine}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** The wall. Desktop: an absolute field on the hero's right — the copy
 *  column is an exclusion zone the plates never enter. Mobile: an in-flow
 *  contact strip below the copy (rotation 0, uniform size, scrollable). */
export function SpeakerWall() {
  return (
    <div aria-hidden className="sw-wall pointer-events-none relative z-0 md:absolute md:inset-y-0 md:left-[50%] md:right-0">
      {/* the sheet the plates are mounted on — linework passes BENEATH */}
      <svg aria-hidden className="absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 800 700" preserveAspectRatio="xMidYMid slice" fill="none">
        <path d="M-40 620 L840 90" stroke="#C9A24C" strokeOpacity="0.14" strokeWidth="0.75" strokeDasharray="5 7" />
        <path d="M-40 200 L840 430" stroke="#F1ECDF" strokeOpacity="0.05" strokeWidth="0.75" />
      </svg>
      {/* the featured leader: caption → corner tick. Dashed = planned;
          the driver crossfades to solid as the portrait develops. */}
      <svg aria-hidden className="sw-leader pointer-events-none absolute hidden md:block" style={{ left: "28.5%", top: "26%", width: "110px", height: "72px" }} viewBox="0 0 110 72" fill="none">
        <path className="sw-lead-dash" d="M6 68 L40 16 L104 16" stroke="#C9A24C" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="4 4" />
        <path className="sw-lead-solid" d="M6 68 L40 16 L104 16" stroke="#C9A24C" strokeWidth="1" opacity="0" />
      </svg>
      {/* plates: mobile = contact strip; desktop = pinned field */}
      <div className="sw-strip pointer-events-auto flex gap-4 overflow-x-auto px-5 pb-24 pt-2 md:contents md:overflow-visible md:p-0">
        {WALL.map((p) => (
          <Plate key={p.slug} p={p} />
        ))}
      </div>
      {/* sheet stamp */}
      <p className="absolute bottom-3 right-4 hidden text-[10px] tracking-[0.18em] text-cream/40 [font-variant:small-caps] md:block">
        sht 02 · the operators · 21 named
      </p>
    </div>
  );
}
