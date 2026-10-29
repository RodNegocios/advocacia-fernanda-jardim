import { chromium } from "playwright";
import { createSiteServer } from "./serve.mjs";
import { promises as fs } from "node:fs";
import assert from "node:assert/strict";
const server = createSiteServer(4175);
await new Promise((resolve) => server.once("listening", resolve));
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox"],
});
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  await page.goto("http://127.0.0.1:4175", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await fs.mkdir(".test-results", { recursive: true });
  await page.screenshot({ path: ".test-results/hero-desktop.png" });
  await page.evaluate(() =>
    window.scrollTo({
      top: document.querySelector(".manifesto").offsetTop - 100,
      behavior: "instant",
    }),
  );
  await page.waitForTimeout(1100);
  const clip = await page
    .locator(".manifesto h2 > span")
    .evaluate((el) => getComputedStyle(el).clipPath);
  assert.match(clip, /inset\(0% 0% 0% 0%\)|inset\(0px\)|none/);
  console.log("PASS scroll-driven manifesto reveals completely:", clip);
  await page
    .locator(".manifesto")
    .screenshot({ path: ".test-results/manifesto.png" });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.locator(".manifesto").scrollIntoViewIfNeeded();
    await page.locator(".justice-cutout img").evaluate(async (image) => {
      await image.decode();
    });
    await page
      .locator(".manifesto")
      .screenshot({ path: `.test-results/justice-${width}.png` });
    await page.locator(".journey").scrollIntoViewIfNeeded();
    await page
      .locator(".journey")
      .screenshot({ path: `.test-results/journey-${width}.png` });
    await page.evaluate(() =>
      document.querySelector("#fernanda").scrollIntoView(),
    );
    await page.waitForTimeout(250);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: `.test-results/site-${width}.png`,
      fullPage: true,
    });
  }
  console.log(
    "Screenshots saved with reduced motion so off-screen scroll reveals remain visible.",
  );
} finally {
  await browser.close();
  server.close();
}
