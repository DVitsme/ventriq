// (`pnpm add -D vitest @playwright/test @axe-core/playwright @lhci/cli`).
// It keeps `next build`'s typecheck green while the harness is dormant.
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
