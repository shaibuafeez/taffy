// Screenshots every route at desktop and phone widths, scrolling through
// so scroll-driven motion has run, and reports console errors and failed
// requests. Usage: node scripts/verify.mjs [baseUrl] [route ...]
import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";

const base = process.argv[2] || "http://127.0.0.1:3007";
const routes = process.argv.slice(3).length ? process.argv.slice(3) : ["/", "/build", "/trade", "/token", "/points", "/privacy", "/terms", "/nope"];
const chrome =
  process.env.CHROME_PATH ||
  ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium"].find((p) => existsSync(p));

const out = "evidence";
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ executablePath: chrome, args: ["--use-gl=angle", "--ignore-gpu-blocklist"] });
const report = [];

for (const vp of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, hasTouch: vp.hasTouch, deviceScaleFactor: vp.deviceScaleFactor || 1 });
  for (const route of routes) {
    const page = await ctx.newPage();
    const errors = [];
    const failed = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("requestfailed", (r) => failed.push(r.url()));
    page.on("response", (r) => r.status() >= 400 && !r.url().endsWith("/nope") && failed.push(`${r.status()} ${r.url()}`));
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(4200);
    const slug = route === "/" ? "home" : route.slice(1).replace(/\//g, "-");
    await page.screenshot({ path: `${out}/${vp.name}-${slug}-0.png` });
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    let shot = 1;
    for (let y = 0; y < h; y += vp.height * 0.5) {
      await page.mouse.wheel(0, vp.height * 0.5);
      await page.waitForTimeout(260);
      if (Math.round(y / vp.height) === shot && shot < 14) {
        await page.waitForTimeout(700);
        await page.screenshot({ path: `${out}/${vp.name}-${slug}-${shot}.png` });
        shot++;
      }
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    report.push({ viewport: vp.name, route, height: h, horizontalOverflow: overflow, errors, failed });
    await page.close();
  }
  await ctx.close();
}
await browser.close();
writeFileSync(`${out}/verification-summary.json`, JSON.stringify(report, null, 2));
for (const r of report)
  console.log(`${r.viewport.padEnd(7)} ${r.route.padEnd(9)} h=${r.height} overflow=${r.horizontalOverflow} errors=${r.errors.length} failed=${r.failed.length}${r.errors.length ? "\n   " + r.errors.slice(0, 3).join("\n   ") : ""}${r.failed.length ? "\n   " + r.failed.slice(0, 3).join("\n   ") : ""}`);
