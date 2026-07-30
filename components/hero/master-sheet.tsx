/** THE MASTER SHEET — Wave 2's hero scene (plan: docs/plans/summit-aug-1/07-wave-2-hero.md).
 *
 *  One enormous technical drawing, cropped off every edge: a monumental
 *  drafted threshold standing at the vanishing point, corridor rays passing
 *  THROUGH it (the way in), a survey grid receding to the horizon, isolines
 *  and camouflaged survey marks in the upper field that only light finds —
 *  the H1 argued in motion.
 *
 *  Server component. BASE STATE IS THE FINISHED DRAWING — no-JS, crawlers,
 *  and reduced-motion all get the complete monumental sheet (inverted
 *  JS-gating law). The client driver only adds life.
 *
 *  Layer/plane contract (parallax runs on the HTML wrappers, never inside
 *  the SVGs — SVG-internal transform compositing is engine-inconsistent):
 *    .ms-plane-a  background — grid, isolines, glyph field, rulers
 *    .ms-plane-b  middle     — corridor rays + glint twins + tick field
 *    .ms-plane-c  foreground — the threshold, callouts, title block, strike
 *    .ms-atmo-1/2 plus-lighter gold atmosphere (siblings of the planes:
 *                 blend layers must never sit inside a transformed rig)
 *  Driver hooks: .ms-ray-hot (traveling glints) · .ms-struct-plan (dashed
 *  construction twin, entrance only) · .ms-struct (solid) · .ms-redraft
 *  (re-draftable lines) · .ms-callout-label (fact cycler) · #ms-tminus
 *  (clock) · .ms-strike (shockwave group) · .ms-spark (fragments) ·
 *  .ms-lens (cursor reveal, driver-rendered) · .ms-glyphs (camouflage
 *  field — geometric marks only, NEVER text: axe contrast-walks real text
 *  even inside aria-hidden).
 *
 *  Contrast law: every frame must hold AA under the copy column — the
 *  atmosphere carries a mask cutout over the left 40% and no scene stroke
 *  under the column exceeds 30% opacity. Heat (#C15A2C) appears only in
 *  strike sparks: <5% of frame, sub-second, never repeating ≥3/s.
 */

const VP = { x: 1060, y: 330 }; // vanishing point — inside the gate opening

/* Corridor rays: frame-edge origins → vp (the approved motif, densified). */
const RAY_EDGES: [number, number][] = [
  [0, 0], [180, 0], [420, 0], [700, 0], [1000, 0], [1300, 0],
  [1440, 90], [1440, 620],
  [1180, 810], [900, 810], [620, 810], [360, 810], [120, 810],
  [0, 700], [0, 420], [0, 170],
];

/* Ground-plane horizontals: perspective-accelerated spacing below horizon. */
const GROUND_YS = [342, 352, 365, 382, 404, 432, 468, 514, 572, 644, 730];

/* Ground rays: vp → bottom-edge fan (the receding floor). */
const FLOOR_XS = [-260, -80, 100, 280, 460, 640, 820, 1000, 1180, 1360, 1540, 1700];

/* Camouflaged survey marks (upper field) — geometric only. [x, y, kind] */
const GLYPHS: [number, number, number][] = [
  [140, 96, 0], [332, 178, 1], [468, 64, 2], [610, 210, 0], [742, 120, 1],
  [878, 58, 2], [236, 262, 2], [520, 288, 1], [706, 268, 0], [908, 232, 1],
  [1024, 96, 0], [86, 198, 1], [1330, 560, 2], [1240, 700, 0],
];

function Glyph({ x, y, kind }: { x: number; y: number; kind: number }) {
  if (kind === 0)
    return (
      <g className="ms-glyph" transform={`translate(${x} ${y})`}>
        <line x1="-5" y1="0" x2="5" y2="0" />
        <line x1="0" y1="-5" x2="0" y2="5" />
      </g>
    );
  if (kind === 1)
    return (
      <g className="ms-glyph" transform={`translate(${x} ${y})`}>
        <circle r="3.4" />
        <line x1="-7" y1="0" x2="-4" y2="0" />
        <line x1="4" y1="0" x2="7" y2="0" />
      </g>
    );
  return (
    <g className="ms-glyph" transform={`translate(${x} ${y})`}>
      <rect x="-4" y="-4" width="8" height="8" transform="rotate(45)" />
      <line x1="0" y1="-8" x2="0" y2="-5" />
    </g>
  );
}

/** Ruler ticks along the top + left sheet edges. */
function Rulers() {
  const top = Array.from({ length: 36 }, (_, i) => 40 + i * 40);
  const left = Array.from({ length: 20 }, (_, i) => 40 + i * 40);
  return (
    <g stroke="#F1ECDF" strokeOpacity="0.14" strokeWidth="1">
      {top.map((x) => (
        <line key={`t${x}`} x1={x} y1="0" x2={x} y2={x % 200 === 0 ? 14 : 8} />
      ))}
      {left.map((y) => (
        <line key={`l${y}`} x1="0" y1={y} x2={y % 200 === 0 ? 14 : 8} y2={y} />
      ))}
    </g>
  );
}

/* ── Plane A · background ──────────────────────────────────────────────── */
function PlaneA() {
  return (
    <svg aria-hidden viewBox="0 0 1440 810" preserveAspectRatio="xMidYMid slice" className="h-full w-full" fill="none">
      <Rulers />
      {/* horizon */}
      <line x1="0" y1={VP.y} x2="1440" y2={VP.y} stroke="#F1ECDF" strokeOpacity="0.10" strokeWidth="0.75" />
      {/* receding floor */}
      <g className="ms-grid" stroke="#C9A24C" strokeOpacity="0.10" strokeWidth="0.75">
        {GROUND_YS.map((y) => (
          <line key={y} x1="0" y1={y} x2="1440" y2={y} />
        ))}
        {FLOOR_XS.map((x) => (
          <line key={x} x1={VP.x} y1={VP.y} x2={x} y2="810" />
        ))}
      </g>
      {/* isolines — two morph states crossfaded by the driver */}
      <g className="ms-detail hidden md:block">
        <g className="ms-iso ms-iso-a" stroke="#F1ECDF" strokeOpacity="0.07" strokeWidth="0.75">
          <path d="M0 118 C 240 92, 430 150, 700 122 S 1180 86, 1440 128" />
          <path d="M0 208 C 260 186, 470 238, 760 206 S 1220 172, 1440 214" />
          <path d="M0 286 C 300 268, 520 306, 820 280 S 1260 252, 1440 288" />
        </g>
        <g className="ms-iso ms-iso-b" stroke="#F1ECDF" strokeOpacity="0" strokeWidth="0.75">
          <path d="M0 132 C 250 112, 440 132, 710 108 S 1190 104, 1440 112" />
          <path d="M0 196 C 270 202, 480 218, 770 222 S 1230 188, 1440 200" />
          <path d="M0 296 C 290 280, 530 288, 830 296 S 1270 264, 1440 274" />
        </g>
        {/* the camouflage field — found by the lens and the sweeps */}
        <g className="ms-glyphs" stroke="#F1ECDF" strokeOpacity="0.05" strokeWidth="1">
          {GLYPHS.map(([x, y, k], i) => (
            <Glyph key={i} x={x} y={y} kind={k} />
          ))}
        </g>
      </g>
    </svg>
  );
}

/* ── Plane B · middle — the corridor ───────────────────────────────────── */
function PlaneB() {
  return (
    <svg aria-hidden viewBox="0 0 1440 810" preserveAspectRatio="xMidYMid slice" className="h-full w-full" fill="none">
      <g className="ms-rays" strokeWidth="0.75">
        {RAY_EDGES.map(([x, y], i) => (
          <line key={i} className="ms-ray" pathLength={1} x1={x} y1={y} x2={VP.x} y2={VP.y} stroke="#C9A24C" strokeOpacity="0.26" />
        ))}
      </g>
      {/* glint twins — short bright dash the driver sends down the wire */}
      <g strokeWidth="1.25" strokeLinecap="butt">
        {RAY_EDGES.filter((_, i) => i % 3 === 0).map(([x, y], i) => (
          <line
            key={i}
            className="ms-ray-hot"
            pathLength={1}
            x1={x}
            y1={y}
            x2={VP.x}
            y2={VP.y}
            stroke="#C9A24C"
            strokeOpacity="0"
            strokeDasharray="0.06 0.94"
            strokeDashoffset="0.06"
          />
        ))}
      </g>
      {/* survey ticks along the corridor */}
      <g stroke="#C9A24C" strokeOpacity="0.4" strokeWidth="1">
        <line x1="368" y1="216" x2="374" y2="228" />
        <line x1="704" y1="504" x2="712" y2="514" />
        <line x1="512" y1="592" x2="522" y2="600" />
        <line x1="880" y1="170" x2="887" y2="180" />
        <line x1="1236" y1="470" x2="1244" y2="461" />
      </g>
      {/* vp crosshair */}
      <g className="ms-vp">
        <circle cx={VP.x} cy={VP.y} r="2.2" fill="#C9A24C" />
        {[[-16, 0, -7, 0], [7, 0, 16, 0], [0, -16, 0, -7], [0, 7, 0, 16]].map(([a, b, c, d], i) => (
          <line key={i} x1={VP.x + a} y1={VP.y + b} x2={VP.x + c} y2={VP.y + d} stroke="#C9A24C" strokeWidth="1" strokeOpacity="0.8" />
        ))}
      </g>
    </svg>
  );
}

/* ── Plane C · foreground — the threshold ──────────────────────────────── */

/** Gate geometry: front face spans x 936–1196, ground y=664, lintel y=96
 *  (cropped feel comes from the lintel cantilever running past the jamb
 *  and the jambs' extension lines exiting the frame). Double-line jambs =
 *  drafted wall thickness. The vp sits inside the opening. */
const GATE = {
  jL: 936, jR: 1196, top: 96, base: 664, wall: 16,
  lintelL: 868, lintelR: 1288,
};

function PlaneC() {
  const g = GATE;
  const struct = [
    /* jambs, outer + inner */
    `M${g.jL} ${g.base} V${g.top}`,
    `M${g.jL + g.wall} ${g.base} V${g.top + g.wall}`,
    `M${g.jR} ${g.base} V${g.top}`,
    `M${g.jR - g.wall} ${g.base} V${g.top + g.wall}`,
    /* lintel, cantilevered past both jambs */
    `M${g.lintelL} ${g.top} H${g.lintelR}`,
    `M${g.lintelL + 22} ${g.top + g.wall} H${g.lintelR - 22}`,
    /* threshold — the heaviest line on the sheet */
    `M${g.jL - 42} ${g.base} H${g.jR + 42}`,
  ];
  return (
    <svg aria-hidden viewBox="0 0 1440 810" preserveAspectRatio="xMidYMid slice" className="h-full w-full" fill="none">
      {/* dashed construction twin — entrance only (driver fades it through) */}
      <g className="ms-struct-plan" stroke="#C9A24C" strokeOpacity="0" strokeWidth="1" strokeDasharray="7 7">
        {struct.map((d, i) => (
          <path key={i} d={d} pathLength={1} />
        ))}
      </g>
      {/* the built thing */}
      <g className="ms-struct" stroke="#C9A24C" strokeWidth="1.5">
        {struct.slice(0, 6).map((d, i) => (
          <path key={i} className={i === 1 || i === 3 ? "ms-redraft" : undefined} d={d} pathLength={1} />
        ))}
        <path d={struct[6]} pathLength={1} strokeWidth="2.5" />
      </g>
      {/* construction geometry that stays dashed — the plan around the built */}
      <g className="ms-constr" stroke="#C9A24C" strokeOpacity="0.30" strokeWidth="0.75" strokeDasharray="5 6">
        <path className="ms-redraft" pathLength={1} d={`M${g.jL} ${g.top} L${VP.x} ${VP.y}`} />
        <path pathLength={1} d={`M${g.jR} ${g.base} L${VP.x} ${VP.y}`} />
        <path pathLength={1} d={`M${VP.x} 30 V790`} />
        {/* compass swing at the lintel corner */}
        <path className="ms-redraft" pathLength={1} d={`M${g.lintelL + 90} ${g.top} A90 90 0 0 0 ${g.lintelL} ${g.top + 90}`} />
      </g>
      {/* corner registration + hatch under the threshold */}
      <g stroke="#C9A24C" strokeOpacity="0.55" strokeWidth="1">
        {[[g.jL, g.top], [g.jR, g.top], [g.jL, g.base], [g.jR, g.base]].map(([x, y], i) => (
          <g key={i}>
            <line x1={x - 10} y1={y} x2={x - 4} y2={y} />
            <line x1={x + 4} y1={y} x2={x + 10} y2={y} />
            <line x1={x} y1={y - 10} x2={x} y2={y - 4} />
            <line x1={x} y1={y + 4} x2={x} y2={y + 10} />
          </g>
        ))}
      </g>
      <g stroke="#C9A24C" strokeOpacity="0.35" strokeWidth="1">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={g.jL - 34 + i * 36} y1={g.base + 12} x2={g.jL - 22 + i * 36} y2={g.base + 2} />
        ))}
      </g>
      {/* dimension callouts — labels cycle the honest facts. Interior
          dimension (inside the opening): the slice-crop eats ~55px top and
          bottom, so nothing critical lives above y=64. */}
      <g className="ms-detail hidden md:block">
        <g stroke="#C9A24C" strokeOpacity="0.5" strokeWidth="0.75">
          <line x1={g.jL + g.wall} y1={g.top + 44} x2={g.jR - g.wall} y2={g.top + 44} />
          <line x1={g.jL + g.wall} y1={g.top + 32} x2={g.jL + g.wall} y2={g.top + 56} />
          <line x1={g.jR - g.wall} y1={g.top + 32} x2={g.jR - g.wall} y2={g.top + 56} />
          <path d={`M${g.jL + g.wall} ${g.top + 44} l9 -4 v8 Z`} fill="#C9A24C" stroke="none" />
          <path d={`M${g.jR - g.wall} ${g.top + 44} l-9 -4 v8 Z`} fill="#C9A24C" stroke="none" />
        </g>
        <text className="ms-callout-label" x={(g.jL + g.jR) / 2} y={g.top + 36} textAnchor="middle" fill="#F1ECDF" fillOpacity="0.62" fontSize="13" letterSpacing="0.16em" style={{ fontVariant: "small-caps" }}>
          8 nights
        </text>
        <g stroke="#C9A24C" strokeOpacity="0.5" strokeWidth="0.75">
          <line x1={g.jR + 44} y1={g.top} x2={g.jR + 44} y2={g.base} />
          <line x1={g.jR + 38} y1={g.top} x2={g.jR + 50} y2={g.top} />
          <line x1={g.jR + 38} y1={g.base} x2={g.jR + 50} y2={g.base} />
        </g>
        <text className="ms-callout-label-2" x={g.jR + 58} y={(g.top + g.base) / 2} fill="#F1ECDF" fillOpacity="0.62" fontSize="13" letterSpacing="0.16em" style={{ fontVariant: "small-caps" }} transform={`rotate(90 ${g.jR + 58} ${(g.top + g.base) / 2})`}>
          free · virtual
        </text>
      </g>
      {/* title block — y≥64 keeps every row inside the slice-crop window */}
      <g className="ms-detail hidden md:block">
        {/* opaque ground: the block sits ON the sheet, masking the lintel
            lines running behind it — standard drafting title-block behavior */}
        <rect x="1128" y="64" width="286" height="86" rx="2" fill="#101B2D" stroke="#C9A24C" strokeOpacity="0.45" strokeWidth="1" />
        <line x1="1128" y1="92" x2="1414" y2="92" stroke="#C9A24C" strokeOpacity="0.3" strokeWidth="0.75" />
        <line x1="1128" y1="120" x2="1414" y2="120" stroke="#C9A24C" strokeOpacity="0.3" strokeWidth="0.75" />
        <text x="1142" y="83" fill="#F1ECDF" fillOpacity="0.62" fontSize="12" letterSpacing="0.18em" style={{ fontVariant: "small-caps" }}>
          ventriq · master sheet 01
        </text>
        <text x="1142" y="111" fill="#F1ECDF" fillOpacity="0.62" fontSize="12" letterSpacing="0.18em" style={{ fontVariant: "small-caps" }}>
          forge the future · aug 10–20
        </text>
        <text id="ms-tminus" x="1142" y="139" fill="#C9A24C" fillOpacity="0.9" fontSize="12" letterSpacing="0.18em" style={{ fontVariant: "small-caps", fontVariantNumeric: "tabular-nums" }}>
          doors · aug 10 · 6:30 pm et
        </text>
      </g>
      {/* strike rig — hidden until the driver fires it */}
      <g className="ms-strike" transform={`translate(${g.jL} ${g.base})`} opacity="0">
        {[14, 26, 40].map((r) => (
          <circle key={r} className="ms-strike-ring" r={r} pathLength={1} stroke="#C9A24C" strokeWidth="1" strokeDasharray="5 4" />
        ))}
        {[[-38, -52], [30, -64], [58, -30], [-60, -18], [44, -78], [-24, -84], [70, -52], [12, -40]].map(([dx, dy], i) => (
          <line key={i} className="ms-spark" x1="0" y1="0" x2={dx / 4} y2={dy / 4} stroke="#C15A2C" strokeWidth="1.5" strokeLinecap="butt" data-dx={dx} data-dy={dy} />
        ))}
      </g>
    </svg>
  );
}

/** The full stage: atmosphere + three parallax planes. The copy column and
 *  the driver (chip/lens) are the page's business — this is only the sheet. */
export function MasterSheet() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 [isolation:isolate]">
      {/* atmospheric gold light — the design system's sanctioned gradient.
          Masked off the copy column; transform-only animation (compositor). */}
      <div className="ms-atmo-1" />
      <div className="ms-atmo-2" />
      {/* three-layer separation of transform concerns: wrapper = pointer
          parallax (GSAP quickTo) · .ms-shift = mobile recentering (CSS —
          the slice-crop otherwise pushes the gate off a phone's frame) ·
          svg = ambient drift (GSAP). Nothing ever stomps anything. */}
      <div className="ms-plane-a absolute inset-0">
        <div className="ms-shift absolute inset-0">
          <PlaneA />
        </div>
      </div>
      <div className="ms-plane-b absolute inset-0">
        <div className="ms-shift absolute inset-0">
          <PlaneB />
        </div>
      </div>
      <div className="ms-plane-c absolute inset-0">
        <div className="ms-shift absolute inset-0">
          <PlaneC />
        </div>
      </div>
    </div>
  );
}
