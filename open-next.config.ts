import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No incremental cache yet — add an R2/KV override here (+ binding in
// wrangler.jsonc) if we adopt ISR or `use cache`.
export default defineCloudflareConfig({});
