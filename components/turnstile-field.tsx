"use client";

import { useEffect, useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

/** Turnstile, mounted inside each form so its implicit hidden input rides
 *  along in FormData as "cf-turnstile-response". Interaction-only: invisible
 *  until Cloudflare needs a click, and the in-voice line (LAW, 00-global.md)
 *  appears only alongside the widget. Pass `instanceRef` so the form can
 *  reset() after every server response — tokens are single-use.
 *
 *  Mounting is lazy: the widget (api.js + a challenge iframe that hauls
 *  ~400KB and runs anti-bot work) loads on the form's first focusin, not on
 *  page view — the footer form otherwise put that cost on every page for
 *  every visitor. The challenge normally clears while the visitor types; a
 *  submit that outruns it just gets the server's polite retry message. */
export function TurnstileField({
  action,
  instanceRef,
  onCream = false,
}: {
  action: "newsletter" | "contact" | "chapter";
  instanceRef?: React.RefObject<TurnstileInstance | null>;
  onCream?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const form = hostRef.current?.closest("form");
    if (!form) {
      setArmed(true);
      return;
    }
    if (form.matches(":focus-within")) {
      setArmed(true);
      return;
    }
    const arm = () => setArmed(true);
    form.addEventListener("focusin", arm, { once: true });
    return () => form.removeEventListener("focusin", arm);
  }, []);

  return (
    <div ref={hostRef}>
      {interactive && (
        <p
          className={`mb-1.5 text-[13px] ${onCream ? "text-ink/60" : "text-cream/60"}`}
        >
          One quick check — no puzzles, promise.
        </p>
      )}
      {armed && (
        <Turnstile
          ref={instanceRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          options={{ action, appearance: "interaction-only", theme: "auto" }}
          onBeforeInteractive={() => setInteractive(true)}
        />
      )}
    </div>
  );
}
