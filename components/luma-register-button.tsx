"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";

// The URL search string never changes within a page load — no notifications.
const subscribeNever = () => () => {};
import { track } from "@/lib/analytics";
import { LUMA_URL } from "@/lib/agenda";

const LUMA_EVENT_ID = "evt-YckrsStrlGk0W6o";

declare global {
  interface Window {
    luma?: { initCheckout: () => void };
  }
}

/** Brand-styled trigger for Luma's checkout overlay (roadmap A5). The same
 *  element is a plain link, so no-JS/crawlers still reach registration.
 *  UTMs from the current page URL auto-forward into the overlay. */
export function LumaRegisterButton({
  children,
  ctaLocation,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  ctaLocation: string;
  variant?: "primary" | "outline";
  className?: string;
}) {
  useEffect(() => {
    window.luma?.initCheckout();
  }, []);

  // Ambassador-attribution guard (research doc §8): Luma's checkout-button.js
  // gives data-luma-utm-source PRECEDENCE over the page's ?utm_source, and
  // utm_source is the ONLY UTM Luma stores per-guest. Hardcoding our
  // cta-location tag was silently overwriting ambassador IDs
  // (?utm_source=speaker-jane → recorded as "site-summit-hero").
  // Fix: when the page URL carries a utm_source, let it through; tag with the
  // cta location only for untagged traffic. useSyncExternalStore = the
  // sanctioned two-pass: server snapshot null, client reads the (static per
  // page load) query string — no hydration mismatch, no setState-in-effect.
  const pageUtmSource = useSyncExternalStore(
    subscribeNever,
    () => new URLSearchParams(window.location.search).get("utm_source"),
    () => null,
  );

  const styles =
    variant === "primary"
      ? "bg-gold text-ink hover:bg-gold-hover font-semibold"
      : "border border-gold/75 text-gold hover:bg-gold/10 font-medium";

  return (
    <>
      <Script
        id="luma-checkout"
        src="https://embed.lu.ma/checkout-button.js"
        strategy="afterInteractive"
        onLoad={() => window.luma?.initCheckout()}
      />
      <a
        href={LUMA_URL}
        data-luma-action="checkout"
        data-luma-event-id={LUMA_EVENT_ID}
        data-luma-utm-source={pageUtmSource ?? `site-${ctaLocation}`}
        onClick={() =>
          track("luma_register_click", {
            cta_location: ctaLocation,
            link_url: LUMA_URL,
          })
        }
        className={`inline-block rounded-[2px] px-6 py-[15px] leading-none ${styles} ${className}`}
      >
        {children}
      </a>
    </>
  );
}
