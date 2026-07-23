import type { NextConfig } from "next";

// Static CSP (roadmap A13): 'unsafe-inline' script-src is the phase-1 trade —
// nonce CSP forces every page dynamic. Revisit when the webapp phase lands.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://embed.lu.ma",
  "style-src 'self' 'unsafe-inline' https://embed.lu.ma",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "img-src 'self' https://*.google-analytics.com https://www.googletagmanager.com https://embed.lu.ma https://images.lumacdn.com data:",
  "font-src 'self'",
  "frame-src https://lu.ma https://luma.com",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
