import { chromium } from "playwright";
import { createSiteServer } from "./serve.mjs";
import { promises as fs } from "node:fs";
import assert from "node:assert/strict";

const server = createSiteServer(4176);
await new Promise((resolve) => server.once("listening", resolve));
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const base = "http://127.0.0.1:4176";
let checks = 0;
const check = (condition, description) => {
  assert.ok(condition, description);
  console.log("PASS", description);
  checks++;
};
const state = (page) =>
  page.locator(".portrait-gallery__body").evaluate((el) => {
    const matrix = new DOMMatrix(getComputedStyle(el).transform);
    return { tilted: Math.abs(matrix.m13) + Math.abs(matrix.m23) > 0.001 };
  });
const center = (page) =>
  page.locator(".portrait-gallery").evaluate((el) => {
    window.scrollTo({
      top: scrollY + el.getBoundingClientRect().top - 120,
      behavior: "instant",
    });
  });
try {
  await fs.mkdir(".test-results", { recursive: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  await page.goto(base, { waitUntil: "networkidle" });
  await center(page);
  await page.waitForTimeout(1100);
  const box = await page.locator(".portrait-gallery").boundingBox();
  await page.mouse.move(box.x + box.width * 0.9, box.y + box.height * 0.2);
  await page.waitForTimeout(650);
  check(
    (await state(page)).tilted,
    "desktop: frame responds with subtle perspective",
  );
  check(
    await page
      .locator(".portrait-gallery__spotlight")
      .evaluate((el) => +getComputedStyle(el).opacity > 0.9),
    "desktop: gold edge follows pointer",
  );
  await page.mouse.move(1400, 800);
  await page.waitForTimeout(650);
  check(
    !(await state(page)).tilted,
    "desktop: frame settles after pointer leaves",
  );
  check(
    await page
      .locator(".portrait-gallery__spotlight")
      .evaluate((el) => +getComputedStyle(el).opacity === 0),
    "desktop: spotlight settles without continuous animation",
  );
  const photoTransform = () =>
    page
      .locator(".portrait-gallery__photo img")
      .evaluate((el) => getComputedStyle(el).transform);
  const before = await photoTransform();
  await page.evaluate(() => window.scrollBy({ top: 180, behavior: "instant" }));
  await page.waitForTimeout(1100);
  check(
    before !== (await photoTransform()),
    "scroll: photograph parallax progresses",
  );
  await page.getByRole("button", { name: "Pausar movimento" }).click();
  await center(page);
  check(
    (await photoTransform()) === "none",
    "pause: photo returns to its static composition",
  );
  const pausedBox = await page.locator(".portrait-gallery").boundingBox();
  await page.mouse.move(pausedBox.x + pausedBox.width * 0.9, pausedBox.y + 80);
  await page.waitForTimeout(650);
  check(!(await state(page)).tilted, "pause: pointer cannot restart the frame");
  await page.getByRole("button", { name: "Ativar movimento" }).click();
  await center(page);
  await page.waitForTimeout(1100);
  const resumedBox = await page.locator(".portrait-gallery").boundingBox();
  await page.mouse.move(
    resumedBox.x + resumedBox.width * 0.2,
    resumedBox.y + 90,
  );
  await page.waitForTimeout(650);
  check(
    (await state(page)).tilted,
    "resume: pointer effect restarts correctly",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(200);
  check(
    !(await state(page)).tilted && (await photoTransform()) === "none",
    "reduced motion: live preference change removes transforms",
  );
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await center(page);
    await page
      .locator(".portrait-gallery__photo img")
      .evaluate((image) => image.decode());
    check(
      await page.locator("#fernanda").evaluate((section) => {
        const frame = section
          .querySelector(".portrait-gallery__body")
          .getBoundingClientRect();
        const copy = section
          .querySelector(".about-copy")
          .getBoundingClientRect();
        const seal = section
          .querySelector(".portrait-gallery__seal")
          .getBoundingClientRect();
        const separated = frame.right <= copy.left || seal.bottom <= copy.top;
        return (
          separated &&
          frame.left >= 0 &&
          frame.right <= innerWidth &&
          seal.right <= innerWidth
        );
      }),
      `${width}: frame, seal and text have their own space`,
    );
    if (width === 1440 || width === 390) {
      await page
        .locator("#fernanda")
        .screenshot({ path: `.test-results/moldura-${width}.png` });
    }
  }
  await page.close();

  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await mobile.goto(base, { waitUntil: "networkidle" });
  await center(mobile);
  await mobile.waitForTimeout(1100);
  await mobile.touchscreen.tap(270, 350);
  check(
    !(await state(mobile)).tilted,
    "touch: photo does not stick in a tilted state",
  );
  const cdp = await mobile.context().newCDPSession(mobile);
  const initialScroll = await mobile.evaluate(() => scrollY);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 200, y: 440 }],
  });
  for (let y = 415; y >= 240; y -= 25) {
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: 200, y }],
    });
    await mobile.waitForTimeout(25);
  }
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await mobile.waitForTimeout(200);
  check(
    (await mobile.evaluate(() => scrollY)) > initialScroll + 80,
    "touch: native swipe scrolls over the photograph",
  );
  await mobile.close();

  const nojs = await browser.newPage({ javaScriptEnabled: false });
  await nojs.goto(base);
  await nojs.locator(".portrait-gallery").scrollIntoViewIfNeeded();
  check(
    await nojs
      .locator(".portrait-gallery__photo img")
      .evaluate(
        (el) =>
          el.complete &&
          el.naturalWidth > 0 &&
          el.alt.includes("Fernanda Jardim"),
      ),
    "no JavaScript: framed portrait and alternative text remain available",
  );
  await nojs.close();
  console.log(`${checks} portrait checks passed.`);
} finally {
  await browser.close();
  server.close();
}
