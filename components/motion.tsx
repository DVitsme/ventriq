"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useRef, useState } from "react";

/** IO trigger: adds data-inview once when ~20% visible, then unobserves.
 *  CSS does all animation; without JS the content is simply visible. */
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.setAttribute("data-inview", "");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.setAttribute("data-inview", "");
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Drafting-numeral count-up: renders the real value (SSR/SEO-safe),
 *  counts 0 -> value when scrolled into view. NumberFlow honors
 *  prefers-reduced-motion by default. */
export function CountUp({
  value,
  prefix,
}: {
  value: number;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    setShown(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(value);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref}>
      <NumberFlow value={shown} prefix={prefix} />
    </span>
  );
}

/** Server-safe word splitter used by the scroll-lit manifesto: each word gets
 *  an index custom property for the CSS stagger. Rendered lit by default. */
export function ScrollLit({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="vq-lit">
      {words.map((w, i) => (
        <span key={i} style={{ ["--w" as string]: i }}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
