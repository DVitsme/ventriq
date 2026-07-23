"use client";

import Script from "next/script";
import { useEffect } from "react";
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
        data-luma-utm-source={`site-${ctaLocation}`}
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
