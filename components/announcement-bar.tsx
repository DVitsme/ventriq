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
  // SSR-visible (crawlers/no-JS see it; no layout shift on load). Users who
  // dismissed get a brief flash on next visit — the right trade vs CLS-for-all.
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(`vq-announce-${state}`) === "1") setDismissed(true);
  }, [state]);

  if (dismissed) return null;

  return (
    // A landmark of its own — this renders above <header>, and content
    // outside all landmarks fails axe's region rule on every page.
    <div
      role="region"
      aria-label="Announcement"
      className="relative bg-ink px-10 py-2.5 text-center text-[13.5px] tracking-[0.02em] text-cream/85 md:px-20"
    >
      {state === "pre" && (
        <>
          <span className="hidden min-[431px]:inline">
            Forge The Future Summit · free · virtual ·{" "}
            <span className="[font-variant-numeric:tabular-nums]">Aug 10–20</span>{" "}
            —{" "}
          </span>
          <span className="min-[431px]:hidden">
            Forge The Future Summit ·{" "}
            <span className="[font-variant-numeric:tabular-nums]">Aug 10–20</span>{" "}
            —{" "}
          </span>
          <a
            href={LUMA_URL}
            className="text-gold underline underline-offset-[3px] hover:text-gold-hover"
          >
            Save your seat →
          </a>
        </>
      )}
      {state === "during" && (
        <>
          <span aria-hidden className="mr-2 inline-block size-1.5 bg-gold align-middle" />
          Forge The Future Summit is live — tonight: {nightTitle}, 6:30 PM ET{" "}
          <a
            href={LUMA_URL}
            className="text-gold underline underline-offset-[3px] hover:text-gold-hover"
          >
            →
          </a>
        </>
      )}
      {state === "post" && (
        <>
          Missed the summit? Every replay lives in{" "}
          <a
            href="/founders-after-hours"
            className="text-gold underline underline-offset-[3px] hover:text-gold-hover"
          >
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
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[15px] text-cream/60 hover:text-cream/80"
      >
        ×
      </button>
    </div>
  );
}
