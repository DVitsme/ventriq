"use client";

/** THE MASTER SHEET's conductor (plan: docs/plans/summit-aug-1/07-wave-2-hero.md).
 *
 *  Owns every movement except the two CSS ambients (atmosphere breathe,
 *  glyph shimmer): entrance draft → solidify, pen-light glints, plane
 *  drift, iso morph, the randomized moment scheduler (re-drafts, fact
 *  cycles, survey sweeps, forge strikes), pointer parallax + surveyor's
 *  lens, the clock-true T-minus readout, and the WCAG 2.2.2 pause chip.
 *
 *  Laws encoded here (from the Jul 30 research, verbatim targets):
 *  — entrance ≤4.5s, ONE establishing move; ambient is ≥90% of lifetime
 *  — constant-velocity draws (ease:"none") — machine-inevitable, never hand-wavy
 *  — ambient periods coprime-ish; moments in randomized 8–16s windows;
 *    the clock core never repeats, so the loop has no seam
 *  — every luminance cycle ≥2s (2.3.1); heat (#C15A2C) only in strikes
 *  — pointer gating by e.pointerType === "mouse", never hover media queries
 *    (the Jul 29 flip lesson); parallax on the HTML plane wrappers only
 *  — pause = gsap.globalTimeline + .ms-paused class + clock freeze, resume
 *    from point (G4); persisted as localStorage "vq-motion"
 *  — PRM builds NOTHING here; CSS serves the finished breathing sheet.
 *    Base SSR state is the complete drawing, so pre-hydration paint and
 *    JS-never-loads are both the finished sheet (inverted gating law). */

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

const DOORS_MS = Date.parse("2026-08-10T18:30:00-04:00");
const WRAP_MS = Date.parse("2026-08-20T22:00:00-04:00");
const FACTS = ["8 nights", "21 speakers", "90 min · live", "$0 · free"];

function tminusLabel(now: number): string {
  if (now >= WRAP_MS) return "forged · aug 2026";
  if (now >= DOORS_MS) return "doors open · live now";
  const s = Math.floor((DOORS_MS - now) / 1000);
  const d = Math.floor(s / 86400);
  const hh = String(Math.floor((s % 86400) / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `t-${d}d ${hh}:${mm}:${ss}`;
}

export function HeroDriver() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  // hidden-tab / offscreen freezes compose with the user's choice
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

      // restore the persisted choice before anything moves
      const stored = typeof localStorage !== "undefined" && localStorage.getItem("vq-motion") === "off";
      if (stored) {
        gates.current.user = true;
        setUserPaused(true);
      }

      /* clock — real time, never loops; the seam-free core. Runs under PRM
         too (information, not motion) but freezes with the pause chip
         (2.2.2 also governs auto-updating info). */
      const tminus = section.querySelector("#ms-tminus");
      const tickClock = () => {
        if (tminus && !gates.current.user) tminus.textContent = tminusLabel(Date.now());
      };
      tickClock();
      const clockId = window.setInterval(tickClock, 1000);

      /* visibility + offscreen etiquette */
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

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ── ENTRANCE — the one establishing move (≤4.5s) ─────────────── */
        const enter = gsap.timeline({ defaults: { ease: "none" } });
        enter
          .from(q(".ms-vp"), { opacity: 0, duration: 0.15, ease: "power1.out" }, 0)
          .from(q(".ms-ray"), { drawSVG: "0%", duration: 1.1, stagger: 0.05 }, 0.12)
          .from(q(".ms-grid line"), { opacity: 0, duration: 0.5, stagger: 0.012, ease: "power1.out" }, 0.5)
          .fromTo(
            q(".ms-struct-plan path"),
            { drawSVG: "0%", strokeOpacity: 0.5 },
            { drawSVG: "100%", duration: 0.85, stagger: 0.07 },
            1.2
          )
          /* SOLIDIFY — the plan becomes real */
          .from(q(".ms-struct path"), { drawSVG: "0%", duration: 0.65, stagger: 0.06, ease: "power1.inOut" }, 2.25)
          .to(q(".ms-struct-plan path"), { strokeOpacity: 0, duration: 0.45 }, 2.7)
          .from(q(".ms-constr path"), { drawSVG: "0%", duration: 0.6, stagger: 0.08 }, 2.75)
          .from(q(".ms-detail"), { opacity: 0, duration: 0.6, ease: "power1.out" }, 3.2)
          .add(() => sweep(0.9), 3.5);

        /* Watchdog — wall clock, not the GSAP ticker: if rAF starves (WebView
           throttling, battery savers, headless probes), the visitor still
           lands on the complete sheet. Skips the show, never the drawing. */
        const watchdog = window.setTimeout(() => {
          if (enter.progress() < 1) enter.progress(1);
        }, 8000);

        /* ── AMBIENT — coprime periods, phase-seeded ──────────────────── */
        gsap.set(q(".ms-ray-hot"), { strokeOpacity: 0.55 });
        (q(".ms-ray-hot") as unknown as SVGLineElement[]).forEach((el, i) => {
          gsap.fromTo(
            el,
            { strokeDashoffset: 0.06 },
            {
              strokeDashoffset: -1,
              duration: 2.4,
              ease: "none",
              repeat: -1,
              delay: 4.2 + i * 3.7,
              repeatDelay: 9 + i * 2.3,
            }
          );
        });
        gsap.to(q(".ms-plane-a svg"), { y: -8, duration: 26.5, yoyo: true, repeat: -1, ease: "sine.inOut" });
        gsap.to(q(".ms-plane-b svg"), { y: -12, x: 6, duration: 17, yoyo: true, repeat: -1, ease: "sine.inOut" }).time(5);
        gsap.to(q(".ms-plane-c svg"), { y: -14, duration: 37, yoyo: true, repeat: -1, ease: "sine.inOut" }).time(11);
        const isoA = q(".ms-iso-a");
        const isoB = q(".ms-iso-b");
        if (isoA.length && isoB.length) {
          gsap.to(isoA, { opacity: 0.25, duration: 18.5, yoyo: true, repeat: -1, ease: "sine.inOut" });
          gsap.fromTo(
            isoB,
            { attr: { "stroke-opacity": 0 } },
            { attr: { "stroke-opacity": 0.07 }, duration: 18.5, yoyo: true, repeat: -1, ease: "sine.inOut" }
          );
        }

        /* ── MOMENTS — randomized windows so nothing shares a beat ────── */
        const schedule = (fn: () => void, min: number, max: number) => {
          const loop = () => {
            fn();
            gsap.delayedCall(gsap.utils.random(min, max), loop);
          };
          gsap.delayedCall(gsap.utils.random(min, max) + 5, loop);
        };

        function sweep(intensity = 0.45) {
          gsap.fromTo(
            q(".ms-atmo-2"),
            { xPercent: 0, opacity: intensity },
            { xPercent: 210, opacity: 0, duration: 2.6, ease: "power1.inOut" }
          );
          /* the sweep finds the camouflage — per-glyph attr, no fight with
             the CSS shimmer (different property axis) */
          gsap.fromTo(
            q(".ms-glyph"),
            { attr: { "stroke-opacity": 0.05 } },
            {
              attr: { "stroke-opacity": 0.45 },
              duration: 0.9,
              stagger: 0.05,
              yoyo: true,
              repeat: 1,
              ease: "sine.inOut",
            }
          );
        }

        function redraft() {
          const lines = q(".ms-redraft");
          const el = lines[Math.floor(Math.random() * lines.length)];
          if (el) gsap.fromTo(el, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.9, ease: "none" });
        }

        let factIdx = 0;
        function cycleFact() {
          const label = section!.querySelector(".ms-callout-label");
          if (!label) return;
          factIdx = (factIdx + 1) % FACTS.length;
          const tl = gsap.timeline();
          tl.to(label, { opacity: 0, duration: 0.25, ease: "power1.in" })
            .add(() => {
              label.textContent = FACTS[factIdx];
            })
            .to(label, { opacity: 1, duration: 0.3, ease: "power1.out" });
        }

        let lastStrike = 0;
        function strike() {
          const now = Date.now();
          if (now - lastStrike < 20_000) return; // 2.3.1 + taste: rare beats
          lastStrike = now;
          const rig = section!.querySelector(".ms-strike");
          if (!rig) return;
          const tl = gsap.timeline();
          tl.set(rig, { opacity: 1 })
            .fromTo(
              q(".ms-strike-ring"),
              { drawSVG: "0%", opacity: 1 },
              { drawSVG: "100%", duration: 0.45, stagger: 0.07, ease: "power2.out" }
            )
            .to(q(".ms-strike-ring"), { opacity: 0, duration: 0.5 }, 0.5);
          (q(".ms-spark") as unknown as SVGLineElement[]).forEach((sp, i) => {
            const dx = Number(sp.dataset.dx || 0);
            const dy = Number(sp.dataset.dy || 0);
            tl.fromTo(
              sp,
              { attr: { x2: dx / 4, y2: dy / 4 }, opacity: 1, stroke: "#C15A2C" },
              { attr: { x2: dx, y2: dy }, stroke: "#C9A24C", opacity: 0, duration: 0.9, ease: "power2.out" },
              0.05 + i * 0.02
            );
          });
          /* the threshold takes the heat and cools — orange→gold */
          tl.fromTo(
            q(".ms-struct path:last-of-type"),
            { stroke: "#C15A2C" },
            { stroke: "#C9A24C", duration: 1.5, ease: "power1.out" },
            0.05
          ).set(rig, { opacity: 0 }, 1.7);
        }

        schedule(redraft, 9, 15);
        schedule(cycleFact, 8, 13);
        schedule(() => sweep(0.45), 29, 34);
        schedule(strike, 46, 58);

        /* CTA hover forges (throttled inside strike) */
        const ctaRow = section!.querySelector("[data-ms-strike]");
        const onCtaEnter = () => strike();
        ctaRow?.addEventListener("mouseenter", onCtaEnter);

        /* ── POINTER — parallax + the surveyor's lens (mouse only) ────── */
        const xa = gsap.quickTo(q(".ms-plane-a"), "x", { duration: 0.7, ease: "power3" });
        const ya = gsap.quickTo(q(".ms-plane-a"), "y", { duration: 0.7, ease: "power3" });
        const xb = gsap.quickTo(q(".ms-plane-b"), "x", { duration: 0.55, ease: "power3" });
        const yb = gsap.quickTo(q(".ms-plane-b"), "y", { duration: 0.55, ease: "power3" });
        const xc = gsap.quickTo(q(".ms-plane-c"), "x", { duration: 0.45, ease: "power3" });
        const yc = gsap.quickTo(q(".ms-plane-c"), "y", { duration: 0.45, ease: "power3" });
        const lens = root.querySelector(".ms-lens") as HTMLDivElement | null;
        const lx = lens ? gsap.quickTo(lens, "x", { duration: 0.35, ease: "power2" }) : null;
        const ly = lens ? gsap.quickTo(lens, "y", { duration: 0.35, ease: "power2" }) : null;
        const glyphs = q(".ms-glyph") as unknown as SVGGElement[];

        const onMove = (e: PointerEvent) => {
          if (e.pointerType !== "mouse" || gates.current.user) return;
          const r = section!.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          xa(nx * 6);
          ya(ny * 4);
          xb(nx * 12);
          yb(ny * 8);
          xc(nx * -7);
          yc(ny * -5);
          if (lx && ly && lens) {
            lx(e.clientX - r.left - 110);
            ly(e.clientY - r.top - 110);
            gsap.to(lens, { opacity: 1, duration: 0.3, overwrite: "auto" });
          }
          /* the lens finds what's camouflaged */
          for (const gEl of glyphs) {
            const b = gEl.getBoundingClientRect();
            const d = Math.hypot(b.left + b.width / 2 - e.clientX, b.top + b.height / 2 - e.clientY);
            if (d < 170) {
              gsap.to(gEl, {
                attr: { "stroke-opacity": 0.5 - (d / 170) * 0.4 },
                duration: 0.25,
                overwrite: "auto",
              });
              gsap.to(gEl, { attr: { "stroke-opacity": 0.05 }, duration: 0.9, delay: 0.6, overwrite: false });
            }
          }
        };
        const onLeave = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          xa(0); ya(0); xb(0); yb(0); xc(0); yc(0);
          if (lens) gsap.to(lens, { opacity: 0, duration: 0.4, overwrite: "auto" });
        };
        section!.addEventListener("pointermove", onMove);
        section!.addEventListener("pointerleave", onLeave);

        /* user paused (persisted) → land on the finished sheet, resumable */
        if (gates.current.user) {
          enter.progress(1);
          applyPlayState();
        }

        return () => {
          window.clearTimeout(watchdog);
          section!.removeEventListener("pointermove", onMove);
          section!.removeEventListener("pointerleave", onLeave);
          ctaRow?.removeEventListener("mouseenter", onCtaEnter);
        };
      });

      return () => {
        window.clearInterval(clockId);
        document.removeEventListener("visibilitychange", onVis);
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
      /* storage unavailable — the per-page pause still works */
    }
    applyPlayState();
  };

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-10">
      <div className="ms-lens" aria-hidden />
      {/* WCAG 2.2.2 — pause/stop for >5s auto-motion. Real button, in-hero,
          early in tab order (driver renders before the copy column), Apple
          per-module chip pattern, resume-from-point. */}
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
