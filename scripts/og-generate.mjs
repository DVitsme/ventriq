// Generates the per-page OG cards (1200x630 PNG) into public/og/.
// Build-time only (roadmap A10: runtime next/og costs ~2MiB of Worker budget).
// Rerun after title changes: node scripts/og-generate.mjs  (needs Chrome + playwright)
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const PAGES = [
  ["home", "Ventriq", "Capital, programming & council for founders — rooted in Baltimore, built to travel."],
  ["summit", "Forge The Future", "Eight nights. Two weeks. Free. · Aug 10–20 · Forged together. Built to last."],
  ["founders-after-hours", "Founders After Hours", "The founder community that does the work — from $39/month."],
  ["mastermind", "The Mastermind", "Ten founders. Ninety days. A scoreboard. · Cohort 2, September 2026."],
  ["about", "Built by a founder nobody handed a map.", "Ventriq (ven-TREEK) — the story, the name, the why."],
  ["contact", "Talk to us.", "A real person reads every message — expect a reply within two business days."],
];

const html = (title, line) => `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400..700&display=swap" rel="stylesheet">
<style>
  * { margin:0; box-sizing:border-box; }
  body { width:1200px; height:630px; background:#101B2D; color:#F1ECDF;
    font-family:'Space Grotesk',sans-serif; padding:72px 80px; position:relative; overflow:hidden;
    display:flex; flex-direction:column; justify-content:flex-end; }
  svg.rays { position:absolute; inset:0; opacity:.3; }
  .rule { width:44px; height:1px; background:#C9A24C; margin-bottom:22px; }
  h1 { font-size:${title.length > 24 ? 64 : 84}px; font-weight:600; line-height:1.05;
    letter-spacing:-0.015em; max-width:980px; }
  p.line { margin-top:26px; font-size:28px; color:rgba(241,236,223,.8); max-width:900px; line-height:1.4; }
  .brand { position:absolute; top:64px; left:80px; display:flex; align-items:center; gap:14px;
    font-size:26px; letter-spacing:.02em; }
  .brand b { font-weight:500; } .brand span { color:#C9A24C; }
  .url { position:absolute; top:70px; right:80px; font-size:22px; color:rgba(241,236,223,.55);
    font-variant-numeric:tabular-nums; }
</style></head><body>
<svg class="rays" viewBox="0 0 1200 630" fill="none">
  ${[[0,60],[0,300],[0,560],[300,630],[760,630],[1200,560],[1200,80],[700,0],[260,0]]
    .map(([x,y]) => `<line x1="${x}" y1="${y}" x2="950" y2="250" stroke="#C9A24C" stroke-width="1"/>`).join("")}
  <circle cx="950" cy="250" r="3" fill="#C9A24C"/>
  <line x1="930" y1="250" x2="940" y2="250" stroke="#C9A24C" stroke-width="1.5"/>
  <line x1="960" y1="250" x2="970" y2="250" stroke="#C9A24C" stroke-width="1.5"/>
  <line x1="950" y1="230" x2="950" y2="240" stroke="#C9A24C" stroke-width="1.5"/>
  <line x1="950" y1="260" x2="950" y2="270" stroke="#C9A24C" stroke-width="1.5"/>
</svg>
<div class="brand"><b>Ventriq</b><span>▸</span></div>
<div class="url">ventriq.io</div>
<div class="rule"></div>
<h1>${title}</h1>
<p class="line">${line}</p>
</body></html>`;

mkdirSync("public/og", { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [slug, title, line] of PAGES) {
  await page.setContent(html(title, line), { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `public/og/${slug}.png` });
  console.log("og:", slug);
}
await browser.close();
