import { chromium } from "playwright";
import { createSiteServer } from "./serve.mjs";
import { promises as fs } from "node:fs";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const server = createSiteServer(4174);
await new Promise((resolve) => server.once("listening", resolve));
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox"],
});
const base = "http://127.0.0.1:4174";
let checks = 0;
const check = (value, message) => {
  assert.ok(value, message);
  checks++;
  console.log("PASS", message);
};
const errors = [];
await fs.mkdir(".test-results", { recursive: true });
try {
  for (const width of [1440, 1024, 768, 390, 320]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
    });
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    const requests = [];
    page.on("request", (request) => requests.push(request.url()));
    const response = await page.goto(base, { waitUntil: "networkidle" });
    check(response.status() === 200, `${width}: document served`);
    await page.waitForTimeout(1300);
    const height = await page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    for (let y = 0; y < height; y += 700) {
      await page.evaluate(
        (y) => window.scrollTo({ top: y, behavior: "instant" }),
        y,
      );
      await page.waitForTimeout(70);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(350);
    check(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `${width}: no horizontal overflow`,
    );
    check(
      (await page.locator("h1").count()) === 1,
      `${width}: one main heading`,
    );
    check(
      await page.evaluate(() =>
        [...document.images].every((i) => i.complete && i.naturalWidth > 0),
      ),
      `${width}: all images load`,
    );
    check(
      requests.every((url) => url.startsWith(base)),
      `${width}: zero third-party runtime requests`,
    );
    check(
      await page.evaluate(() =>
        [...document.querySelectorAll('a[href^="#"]')].every((a) =>
          document.querySelector(a.getAttribute("href")),
        ),
      ),
      `${width}: all anchor destinations exist`,
    );
    const whats = await page
      .locator('a[href^="https://wa.me/"]')
      .evaluateAll((links) => links.map((a) => a.href));
    check(
      whats.length >= 5 &&
        whats.every((href) => new URL(href).pathname === "/5569992023034"),
      `${width}: official WhatsApp contact`,
    );
    for (const summary of await page
      .locator(".area-details summary, .faq-list summary")
      .all()) {
      await summary.click();
      check(
        await summary.evaluate((el) => el.parentElement.open),
        `${width}: accordion opens`,
      );
      await summary.press("Enter");
      check(
        await summary.evaluate((el) => !el.parentElement.open),
        `${width}: accordion keyboard close`,
      );
    }
    if (width <= 700) {
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      const toggle = page.getByRole("button", { name: "Abrir menu" });
      await toggle.click();
      check(
        await page.locator("#main-nav").isVisible(),
        `${width}: mobile menu opens`,
      );
      await page.keyboard.press("Escape");
      check(
        (await toggle.getAttribute("aria-expanded")) === "false",
        `${width}: menu Escape closes`,
      );
      await toggle.click();
      await page.locator("#main-nav a").first().click();
      check(
        (await toggle.getAttribute("aria-expanded")) === "false",
        `${width}: menu navigation closes`,
      );
    }
    await page.getByRole("link", { name: "Privacidade", exact: true }).click();
    check(
      await page.locator("dialog").isVisible(),
      `${width}: privacy dialog opens`,
    );
    await page.keyboard.press("Escape");
    check(
      !(await page.locator("dialog").isVisible()),
      `${width}: privacy Escape closes`,
    );
    await page.getByRole("button", { name: "Pausar movimento" }).click();
    check(
      await page
        .locator("html")
        .evaluate((el) => el.classList.contains("motion-paused")),
      `${width}: motion pause works`,
    );
    await page.getByRole("button", { name: "Ativar movimento" }).click();
    await page.evaluate(
      await fs.readFile(require.resolve("axe-core/axe.min.js"), "utf8"),
    );
    const a11y = await page.evaluate(
      async () =>
        (
          await axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
          })
        ).violations,
    );
    await fs.writeFile(
      `.test-results/axe-${width}.json`,
      JSON.stringify(a11y, null, 2),
    );
    check(
      a11y.length === 0,
      `${width}: axe WCAG A/AA (violations: ${a11y.map((v) => v.id).join(", ")})`,
    );
    if (width === 1440 || width === 390) {
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: `.test-results/site-${width}.png`,
        fullPage: true,
      });
    }
    await page.close();
  }
  const reduced = await browser.newPage({
    reducedMotion: "reduce",
    viewport: { width: 390, height: 844 },
  });
  await reduced.goto(base, { waitUntil: "networkidle" });
  check(
    await reduced
      .locator(".blur-piece")
      .evaluateAll((nodes) =>
        nodes.every(
          (n) =>
            getComputedStyle(n).opacity === "1" &&
            getComputedStyle(n).filter === "none",
        ),
      ),
    "reduced motion: title fully visible without blur",
  );
  check(
    await reduced.evaluate(
      () =>
        getComputedStyle(document.documentElement).scrollBehavior === "auto",
    ),
    "reduced motion: native instant scroll",
  );
  await reduced.close();
  const nojs = await browser.newPage({ javaScriptEnabled: false });
  await nojs.goto(base);
  check(
    (await nojs.locator("h1").innerText()).includes("Uma defesa"),
    "no JavaScript: server-rendered title present",
  );
  await nojs.locator(".faq-list summary").first().click();
  check(
    (await nojs.locator(".faq-list details").first().getAttribute("open")) !==
      null,
    "no JavaScript: FAQ still works",
  );
  await nojs.getByRole("link", { name: "Privacidade", exact: true }).click();
  check(
    nojs.url().endsWith("/privacidade.html"),
    "no JavaScript: privacy page reachable",
  );
  check(
    await nojs.getByRole("heading", { name: "Sua privacidade." }).isVisible(),
    "no JavaScript: privacy policy visible",
  );
  await nojs.close();
  check(
    errors.length === 0,
    `no browser or hydration errors: ${errors.join("; ")}`,
  );
  console.log(`${checks} checks passed.`);
} finally {
  await browser.close();
  server.close();
}
