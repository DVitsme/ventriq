"use client";

/** THE SPEAKER WALL's conductor (plan: docs/plans/summit-aug-1/08-wave-2b-speaker-wall.md).
 *
 *  Same system as the homepage hero-driver — gates composite, pause chip
 *  (SHARED "vq-motion" key: pausing one hero pauses both), matchMedia
 *  twins, alive-flagged schedules, wall-clock watchdogs — with the GSAP
 *  lab's tested numbers:
 *  — proximity field: smoothstep R=260, push 12 toward cursor (leaning
 *    in), lag 0.35–0.62s by plate width, write-gated CSS-var warmth
 *  — focus interplay: FREEZE the field for a hovered plate, never zero it
 *    (zeroing slides the plate out from under the cursor → focus strobe);
 *    d > 1.4R janitor catches missed pointerleaves
 *  — idle: per-axis lissajous on coprime periods 8.9–19.3s, ±3–5px,
 *    rotation ±0.4° wrapper-only on the 4 largest; no depth-layered
 *    parallax (vestibular law)
 *  — entrance: random stagger (the wall waking — people, not a mechanism),
 *    transient img filter develop with clearProps (zero steady-state
 *    filters; the duotone is baked into the thumbs)
 *  — hover: lift −6px, frame dashoffset draw 0.4s, caption develop, two
 *    nearest neighbors ease 2px away; exits faster than entrances
 *  — PRM twin: opacity/color only — no lift, no drift, frame FADES,
 *    one-plate-at-a-time gold breathe (4.6s cycle, shuffled). */

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const R = 260;
const PUSH = 12;

type PlateRec = {
  root: HTMLElement;
  card: HTMLElement;
  img: HTMLElement | null;
  veil: HTMLElement | null;
  warm: HTMLElement | null;
  frame: SVGRectElement | null;
  cap: HTMLElement | null;
  featured: boolean;
  cx: number;
  cy: number;
  w: number;
  focused: boolean;
  rest: boolean;
  lastW: number;
  qx: ((v: number) => void) | null;
  qy: ((v: number) => void) | null;
  qw: ((v: number) => void) | null;
  neighbors: number[];
};

export function WallDriver() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const gates = useRef({ user: false, hidden: false, offscreen: false });

  const applyPlayState = () => {
    const section = rootRef.current?.closest("section");
    const frozen = gates.current.user || gates.current.hidden || gates.current.offscreen;
    gsap.globalTimeline.paused(frozen);
    section?.classList.toggle("ms-paused", frozen);
  };

  useGSAP(
    () => {
      const root = rootRef.current;
      const section = root?.closest("section");
      if (!root || !section) return;
      const q = gsap.utils.selector(section);

      const stored = typeof localStorage !== "undefined" && localStorage.getItem("vq-motion") === "off";
      if (stored) {
        gates.current.user = true;
        setUserPaused(true);
      }

      const onVis = () => {
        gates.current.hidden = document.visibilityState === "hidden";
        applyPlayState();
      };
      document.addEventListener("visibilitychange", onVis);
      const io = new IntersectionObserver(
        ([e]) => {
          gates.current.offscreen = e.intersectionRatio < 0.15;
          applyPlayState();
        },
        { threshold: [0, 0.15, 0.5] }
      );
      io.observe(section);

      /* plate registry */
      const plates: PlateRec[] = (q(".sw-plate") as HTMLElement[]).map((root) => ({
        root,
        card: root.querySelector(".sw-card") as HTMLElement,
        img: root.querySelector("img"),
        veil: root.querySelector(".sw-veil"),
        warm: root.querySelector(".sw-warm"),
        frame: root.querySelector(".sw-frame"),
        cap: root.querySelector(".sw-cap"),
        featured: root.hasAttribute("data-featured"),
        cx: 0, cy: 0, w: 0,
        focused: false, rest: true, lastW: 0,
        qx: null, qy: null, qw: null,
        neighbors: [],
      }));
      const leadDash = section.querySelector(".sw-lead-dash");
      const leadSolid = section.querySelector(".sw-lead-solid");

      const measure = () => {
        for (const p of plates) {
          const r = p.root.getBoundingClientRect(); // positioning shell — never transformed
          p.cx = r.left + r.width / 2 + window.scrollX * 0;
          p.cy = r.top + r.height / 2;
          p.w = r.width;
        }
        /* viewport-relative centers: refresh on scroll too (cheap, throttled) */
      };
      measure();
      let measureQueued = false;
      const queueMeasure = () => {
        if (measureQueued) return;
        measureQueued = true;
        setTimeout(() => {
          measureQueued = false;
          measure();
        }, 150);
      };
      window.addEventListener("resize", queueMeasure);
      window.addEventListener("scroll", queueMeasure, { passive: true });

      /* two nearest neighbors, precomputed */
      plates.forEach((p, i) => {
        p.neighbors = plates
          .map((o, j) => ({ j, d: Math.hypot(o.cx - p.cx, o.cy - p.cy) }))
          .filter((e) => e.j !== i)
          .sort((a, b) => a.d - b.d)
          .slice(0, 2)
          .map((e) => e.j);
      });

      const makeSchedule = (alive: { on: boolean }) => (fn: () => void, min: number, max: number) => {
        const loop = () => {
          if (!alive.on) return;
          fn();
          gsap.delayedCall(gsap.utils.random(min, max), loop);
        };
        gsap.delayedCall(gsap.utils.random(min, max) + 4, loop);
      };

      /* the develop — gold-toned, never full color (art-direction law) */
      const develop = (p: PlateRec, on: boolean, withMotion: boolean) => {
        const dur = on ? 0.45 : 0.3; // exits faster
        if (p.veil) gsap.to(p.veil, { opacity: on ? 0.18 : 0.55, duration: dur, ease: "power2.out" });
        if (p.warm) {
          if (on) gsap.to(p.warm, { opacity: 0.16, duration: dur, ease: "power2.out" });
          else gsap.to(p.warm, { opacity: 0, duration: dur, clearProps: "opacity" });
        }
        if (p.frame) {
          if (withMotion) gsap.to(p.frame, { strokeDashoffset: on ? 0 : 442, duration: on ? 0.4 : 0.3, ease: "power2.inOut" });
          else gsap.to(p.frame, { strokeDashoffset: 0, opacity: on ? 1 : 0, duration: 0.45 });
        }
        if (p.cap && !p.featured) gsap.to(p.cap, { autoAlpha: on ? 1 : 0, duration: 0.35, delay: on ? 0.12 : 0 });
        if (p.featured && leadDash && leadSolid) {
          gsap.to(leadSolid, { opacity: on ? 1 : 0, duration: dur });
          gsap.to(leadDash, { opacity: on ? 0 : 1, duration: dur });
        }
      };

      const smooth = (u: number) => u * u * (3 - 2 * u);

      const mm = gsap.matchMedia();

      /* ── full-motion branch ─────────────────────────────────────────── */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const alive = { on: true };
        const schedule = makeSchedule(alive);

        /* entrance — the wall wakes (random, not mechanical) */
        const enter = gsap.timeline();
        enter
          .from(q(".sw-plate"), {
            opacity: 0,
            y: 14,
            duration: 0.62,
            ease: "power2.out",
            stagger: { each: 0.07, from: "random" },
          }, 0.25)
          .fromTo(
            q(".sw-photo img"),
            { filter: "brightness(0.35) saturate(0.55)" },
            {
              filter: "brightness(1) saturate(1)",
              duration: 0.9,
              ease: "power1.out",
              stagger: { each: 0.07, from: "random" },
              clearProps: "filter",
            },
            0.4
          )
          .from(q(".sw-leader, .sw-wall > p"), { opacity: 0, duration: 0.5 }, 1.5)
          .add(() => measure(), 1.6);

        const watchdog = window.setTimeout(() => {
          if (enter.progress() < 1) enter.progress(1);
          measure();
        }, 8000);

        /* idle lissajous — coprime periods, wrapper rotation on largest 4 */
        (q(".sw-drift") as HTMLElement[]).forEach((el, i) => {
          const amp = 3 + (i % 3);
          gsap.to(el, { x: amp, duration: gsap.utils.random(8.9, 18.7), yoyo: true, repeat: -1, ease: "sine.inOut" }).time(i * 1.7);
          gsap.to(el, { y: amp * 0.8, duration: gsap.utils.random(9.3, 18.1), yoyo: true, repeat: -1, ease: "sine.inOut" }).time(i * 2.3);
          if (i < 4) gsap.to(el, { rotation: i % 2 ? 0.4 : -0.4, duration: gsap.utils.random(9.9, 19.3), yoyo: true, repeat: -1, ease: "sine.inOut" }).time(i * 3.1);
        });

        /* attention pulse — the curator's lamp */
        let lastIdx = -1;
        schedule(() => {
          const candidates = plates.filter((p, i) => !p.featured && !p.focused && i !== lastIdx);
          const p = candidates[Math.floor(Math.random() * candidates.length)];
          if (!p) return;
          lastIdx = plates.indexOf(p);
          if (p.veil) gsap.to(p.veil, { opacity: 0.38, duration: 1.2, yoyo: true, repeat: 1, ease: "sine.inOut" });
          if (p.warm) gsap.fromTo(p.warm, { opacity: 0 }, { opacity: 0.08, duration: 1.2, yoyo: true, repeat: 1, ease: "sine.inOut", clearProps: "opacity" });
        }, 5, 8);

        /* proximity field */
        for (const p of plates) {
          const lag = gsap.utils.mapRange(112, 228, 0.35, 0.62)(p.w || 150);
          p.qx = gsap.quickTo(p.card, "x", { duration: lag, ease: "power3" });
          p.qy = gsap.quickTo(p.card, "y", { duration: lag, ease: "power3" });
          p.qw = gsap.quickTo(p.card, "--warm", { duration: 0.45, ease: "power2" });
        }
        const onMove = (e: PointerEvent) => {
          if (e.pointerType !== "mouse" || gates.current.user) return;
          for (const p of plates) {
            const dx = e.clientX - p.cx;
            const dy = e.clientY - p.cy;
            const d = Math.hypot(dx, dy) || 1;
            if (p.focused) {
              if (d > R * 1.4) blur(p); // janitor
              continue;
            }
            const t = d >= R ? 0 : smooth(1 - d / R);
            if (t === 0 && p.rest) continue; // write-gate
            p.rest = t === 0;
            p.qx?.(dx * ((t * PUSH) / d));
            p.qy?.(dy * ((t * PUSH) / d));
            if (Math.abs(t - p.lastW) > 0.015) {
              p.lastW = t;
              p.qw?.(t);
            }
          }
        };
        section.addEventListener("pointermove", onMove);

        /* hover focus — freeze, never zero */
        const focus = (p: PlateRec) => {
          if (p.focused) return;
          p.focused = true;
          gsap.set(p.root, { zIndex: 20 });
          gsap.to(p.card, { y: "-=6", duration: 0.3, ease: "power2.out" });
          develop(p, true, true);
          for (const j of p.neighbors) {
            const n = plates[j];
            if (n.focused) continue;
            const ax = n.cx - p.cx, ay = n.cy - p.cy;
            const al = Math.hypot(ax, ay) || 1;
            gsap.to(n.card, { x: `+=${(ax / al) * 2}`, y: `+=${(ay / al) * 2}`, opacity: 0.9, duration: 0.35 });
          }
        };
        const blur = (p: PlateRec) => {
          if (!p.focused) return;
          p.focused = false;
          gsap.set(p.root, { zIndex: 0 });
          gsap.to(p.card, { y: "+=6", duration: 0.25, ease: "power2.in" });
          develop(p, false, true);
          for (const j of p.neighbors) {
            const n = plates[j];
            gsap.to(n.card, { opacity: 1, duration: 0.3 });
          }
        };
        const enters: Array<[HTMLElement, (e: PointerEvent) => void]> = [];
        const leaves: Array<[HTMLElement, (e: PointerEvent) => void]> = [];
        for (const p of plates) {
          const onEnter = (e: PointerEvent) => {
            if (e.pointerType === "mouse" && !gates.current.user) focus(p);
          };
          const onLeave = (e: PointerEvent) => {
            if (e.pointerType === "mouse") blur(p);
          };
          p.root.addEventListener("pointerenter", onEnter);
          p.root.addEventListener("pointerleave", onLeave);
          enters.push([p.root, onEnter]);
          leaves.push([p.root, onLeave]);
        }

        if (gates.current.user) {
          enter.progress(1);
          applyPlayState();
        }

        return () => {
          alive.on = false;
          window.clearTimeout(watchdog);
          section.removeEventListener("pointermove", onMove);
          enters.forEach(([el, fn]) => el.removeEventListener("pointerenter", fn));
          leaves.forEach(([el, fn]) => el.removeEventListener("pointerleave", fn));
        };
      });

      /* ── PRM branch — opacity/color only, zero movement ─────────────── */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const alive = { on: true };
        const schedule = makeSchedule(alive);

        /* frames pre-drawn: PRM develop toggles frame OPACITY only — a
           dashoffset tween would be draw-travel, which this branch forbids */
        gsap.set(q(".sw-frame"), { strokeDashoffset: 0, opacity: 0 });

        const enter = gsap.timeline();
        enter
          .from(q(".sw-plate"), { opacity: 0, duration: 0.9, ease: "power1.inOut", stagger: { each: 0.07, from: "random" } }, 0.2)
          .fromTo(
            q(".sw-photo img"),
            { filter: "brightness(0.45) saturate(0.7)" },
            { filter: "brightness(1) saturate(1)", duration: 0.8, ease: "power1.out", stagger: { each: 0.07, from: "random" }, clearProps: "filter" },
            0.35
          )
          .from(q(".sw-leader, .sw-wall > p"), { opacity: 0, duration: 0.5 }, 1.4);
        const watchdog = window.setTimeout(() => {
          if (enter.progress() < 1) enter.progress(1);
        }, 6000);

        /* one plate at a time breathes — shuffled, never a sweep */
        let order: number[] = [];
        schedule(() => {
          if (!order.length) order = gsap.utils.shuffle(plates.map((_, i) => i));
          const p = plates[order.pop()!];
          const glow = p.root.querySelector(".sw-glow");
          if (glow) gsap.to(glow, { opacity: 0.5, duration: 2.3, yoyo: true, repeat: 1, ease: "sine.inOut" });
        }, 5.2, 7.5);

        const enters: Array<[HTMLElement, (e: PointerEvent) => void]> = [];
        const leaves: Array<[HTMLElement, (e: PointerEvent) => void]> = [];
        for (const p of plates) {
          const onEnter = (e: PointerEvent) => {
            if (e.pointerType === "mouse" && !gates.current.user && !p.focused) {
              p.focused = true;
              develop(p, true, false);
              for (const j of p.neighbors) gsap.to(plates[j].card, { opacity: 0.9, duration: 0.35 });
            }
          };
          const onLeave = (e: PointerEvent) => {
            if (e.pointerType === "mouse" && p.focused) {
              p.focused = false;
              develop(p, false, false);
              for (const j of p.neighbors) gsap.to(plates[j].card, { opacity: 1, duration: 0.3 });
            }
          };
          p.root.addEventListener("pointerenter", onEnter);
          p.root.addEventListener("pointerleave", onLeave);
          enters.push([p.root, onEnter]);
          leaves.push([p.root, onLeave]);
        }

        if (gates.current.user) {
          enter.progress(1);
          applyPlayState();
        }

        return () => {
          alive.on = false;
          window.clearTimeout(watchdog);
          enters.forEach(([el, fn]) => el.removeEventListener("pointerenter", fn));
          leaves.forEach(([el, fn]) => el.removeEventListener("pointerleave", fn));
        };
      });

      /* touch: tap develops (both branches' develop() respects PRM via the
         withMotion flag — read the live media state at tap time) */
      let tapped: PlateRec | null = null;
      const onTap = (e: PointerEvent) => {
        if (e.pointerType === "mouse") return;
        const el = (e.target as HTMLElement).closest(".sw-plate");
        const p = plates.find((x) => x.root === el) || null;
        const withMotion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (tapped && tapped !== p) develop(tapped, false, withMotion);
        if (p && p !== tapped) {
          develop(p, true, withMotion);
          tapped = p;
        } else if (!p && tapped) {
          tapped = null;
        }
      };
      section.addEventListener("pointerup", onTap);

      return () => {
        document.removeEventListener("visibilitychange", onVis);
        window.removeEventListener("resize", queueMeasure);
        window.removeEventListener("scroll", queueMeasure);
        section.removeEventListener("pointerup", onTap);
        io.disconnect();
        mm.revert();
      };
    },
    { scope: rootRef }
  );

  const toggle = () => {
    const next = !gates.current.user;
    gates.current.user = next;
    setUserPaused(next);
    try {
      localStorage.setItem("vq-motion", next ? "off" : "on");
    } catch {
      /* storage unavailable — per-page pause still works */
    }
    applyPlayState();
  };

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-10">
      {/* WCAG 2.2.2 — same chip, same shared preference as the homepage */}
      <button
        type="button"
        aria-pressed={userPaused}
        onClick={toggle}
        className="pointer-events-auto absolute bottom-4 right-4 rounded-[2px] border border-gold/60 bg-midnight/60 px-3 py-1.5 text-[11px] tracking-[0.16em] text-gold [font-variant:small-caps] hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
      >
        motion · {userPaused ? "off" : "on"}
        <span className="sr-only">, hero background animation</span>
      </button>
    </div>
  );
}
