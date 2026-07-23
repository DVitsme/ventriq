"use client";

import { useEffect, useState } from "react";
import type { AnnouncementState } from "@/lib/calendar";
import { LUMA_URL } from "@/lib/agenda";

/** One line, ink ground, dismissible per state (localStorage). Strings are
 *  law from copy/00-global.md v1.2. Server computes the state; this component
 *  only handles dismissal + the mobile-tight string. */
export function AnnouncementBar({
  state,
  nightTitle,
}: {
  state: AnnouncementState;
  nightTitle?: string;
}) {
  const [dismissed, setDismissed] = useState(true); // avoid flash; reveal after mount

  useEffect(() => {
    setDismissed(localStorage.getItem(`vq-announce-${state}`) === "1");
  }, [state]);

  if (dismissed) return null;

  return (
    <div className="relative bg-ink px-10 py-2.5 text-center text-[13.5px] tracking-[0.02em] text-cream/85 md:px-20">
      {state === "pre" && (
        <>
          <span className="hidden min-[431px]:inline">
            Forge The Future · free · virtual ·{" "}
            <span className="[font-variant-numeric:tabular-nums]">Aug 10–20</span>{" "}
            —{" "}
          </span>
          <span className="min-[431px]:hidden">
            Forge The Future ·{" "}
            <span className="[font-variant-numeric:tabular-nums]">Aug 10–20</span>{" "}
            —{" "}
          </span>
          <a href={LUMA_URL} className="text-accent hover:underline">
            Save your seat →
          </a>
        </>
      )}
      {state === "during" && (
        <>
          <span aria-hidden className="mr-2 inline-block size-1.5 bg-gold align-middle" />
          Forge The Future is live — tonight: {nightTitle}, 6:30 PM ET{" "}
          <a href={LUMA_URL} className="text-accent hover:underline">
            →
          </a>
        </>
      )}
      {state === "post" && (
        <>
          Missed the summit? Every replay lives in{" "}
          <a href="/founders-after-hours" className="text-accent hover:underline">
            Founders After Hours →
          </a>
        </>
      )}
      <button
        aria-label="Dismiss"
        onClick={() => {
          localStorage.setItem(`vq-announce-${state}`, "1");
          setDismissed(true);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[15px] text-cream/50 hover:text-cream/80"
      >
        ×
      </button>
    </div>
  );
}
