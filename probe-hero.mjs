import { chromium } from "@playwright/test";
const OUT = "/tmp/claude-1000/-home-nero-Clients-Justin-ventriq/3c5a78c9-5cf4-418a-b731-ebccfd77e150/scratchpad/hero";
const URL = process.env.HERO_URL || "http://localhost:3010/";

const b = await chromium.launch();
// recordVideo => continuous screencast => rAF ticks in real time (GSAP needs this headless)
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir: `${OUT}/video`, size: { width: 1440, height: 900 } } });
const p = await ctx.newPage();
await p.goto(URL, { waitUntil: "domcontentloaded" });
const hero = p.locator("section").first();
await p.waitForTimeout(900);
await hero.screenshot({ path: `${OUT}/t1-drafting.png` });
await p.waitForTimeout(1700); // ~2.6s — solidify window
await hero.screenshot({ path: `${OUT}/t2-solidify.png` });
await p.waitForTimeout(3500); // ~6.1s — settled ambient
await hero.screenshot({ path: `${OUT}/t3-settled.png` });
// pointer: lens + parallax + glyph reveal (upper field, right of copy)
await p.mouse.move(700, 200); await p.mouse.move(820, 260, { steps: 20 });
await p.waitForTimeout(900);
await hero.screenshot({ path: `${OUT}/t4-lens.png` });
// pause chip
const chip = p.locator("button", { hasText: "motion" });
await chip.click();
await p.waitForTimeout(600);
await hero.screenshot({ path: `${OUT}/t5-paused.png` });
console.log("chip aria-pressed:", await chip.getAttribute("aria-pressed"));
await ctx.close(); // flush video
// PRM + mobile stills (no video needed — static states)
const p2 = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await p2.goto(URL, { waitUntil: "domcontentloaded" });
await p2.waitForTimeout(1200);
await p2.locator("section").first().screenshot({ path: `${OUT}/t6-prm.png` });
const p3 = await b.newPage({ viewport: { width: 390, height: 844 } });
await p3.goto(URL, { waitUntil: "domcontentloaded" });
await p3.waitForTimeout(5500);
await p3.locator("section").first().screenshot({ path: `${OUT}/t7-mobile.png` });
await b.close();
console.log("done");
