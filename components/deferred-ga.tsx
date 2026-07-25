"use client";

import Script from "next/script";

/** GA4, deferred. @next/third-parties' <GoogleAnalytics> loads gtag.js
 *  afterInteractive, which put ~3.5s of script evaluation inside the
 *  mobile-throttled TBT window (the single biggest item in the first
 *  Lighthouse sweep). This keeps the identical dataLayer contract — the
 *  inline stub queues the config ping and every track() call — but pulls
 *  the 163KB gtag.js evaluation out to browser idle (lazyOnload). gtag
 *  replays the queue on arrival, so no events are lost; only their
 *  timestamps shift a beat. */
export function DeferredGA({ gaId }: { gaId: string }) {
  return (
    <>
      <Script id="_ga-stub" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${gaId}');`}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="lazyOnload"
      />
    </>
  );
}
