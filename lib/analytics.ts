"use client";

type VentriqEvent =
  | ["luma_register_click", { cta_location: string; link_url: string }]
  | ["generate_lead", { form_id: "contact" | "chapter"; lead_source?: string }]
  | ["sign_up", { method: "newsletter" }];

/** Push straight to the dataLayer (what @next/third-parties' sendGAEvent did,
 *  minus its init check — our stub in DeferredGA creates the array before
 *  anything can call this, and gtag.js replays the queue when it loads). */
export function track<E extends VentriqEvent>(name: E[0], params: E[1]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // gtag reads `arguments`, not an array — a real IArguments object is
  // required, hence the inner function.
  (function gtag(..._args: unknown[]) {
    window.dataLayer.push(arguments);
  })("event", name, params);
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
