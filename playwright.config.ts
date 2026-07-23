// (`pnpm add -D vitest @playwright/test @axe-core/playwright @lhci/cli`).
// It keeps `next build`'s typecheck green while the harness is dormant.
import { defineConfig, devices } from "@playwright/test";

/** E2E + a11y against the real Workers runtime: `pnpm preview` builds via
 *  OpenNext and serves workerd on :8787 — the thing production actually runs,
 *  not `next dev`. The webServer timeout is generous because the OpenNext
 *  build runs first. */
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // HTML reporter off in CI (list only); locally keep an html report on disk.
  reporter: process.env.CI
    ? [["list"]]
    : [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:8787",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm preview",
    url: "http://localhost:8787",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: "mobile",
      // Chromium-only CI: emulate the phone on the Desktop Chrome descriptor
      // rather than an iPhone descriptor (those default to WebKit, which the
      // workflow deliberately does not install).
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: "reduced-motion",
      // prefers-reduced-motion is a browser-context option, so it gets its
      // own project; desktop + mobile above keep default motion on purpose so
      // both paths of any motion CSS/JS stay covered.
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 800 },
        contextOptions: { reducedMotion: "reduce" },
      },
    },
  ],
});
