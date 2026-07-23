"use client";

import { useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

/** Turnstile, mounted inside each form so its implicit hidden input rides
 *  along in FormData as "cf-turnstile-response". Interaction-only: invisible
 *  until Cloudflare needs a click, and the in-voice line (LAW, 00-global.md)
 *  appears only alongside the widget. Pass `instanceRef` so the form can
 *  reset() after every server response — tokens are single-use. */
export function TurnstileField({
  action,
  instanceRef,
  onCream = false,
}: {
  action: "newsletter" | "contact" | "chapter";
  instanceRef?: React.RefObject<TurnstileInstance | null>;
  onCream?: boolean;
}) {
  const [interactive, setInteractive] = useState(false);

  return (
    <div>
      {interactive && (
        <p
          className={`mb-1.5 text-[13px] ${onCream ? "text-ink/60" : "text-cream/60"}`}
        >
          One quick check — no puzzles, promise.
        </p>
      )}
      <Turnstile
        ref={instanceRef}
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        options={{ action, appearance: "interaction-only", theme: "auto" }}
        onBeforeInteractive={() => setInteractive(true)}
      />
    </div>
  );
}
