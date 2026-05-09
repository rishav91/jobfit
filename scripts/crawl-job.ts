import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const [url, outDir = "tmp/job-crawl"] = process.argv.slice(2);

if (!url) {
  console.error("Usage: npm run crawl -- <url> [outDir]");
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

// Phrases that indicate the page blocked the crawler or requires auth
const BLOCK_SIGNALS = [
  "access denied",
  "please enable javascript",
  "enable javascript to continue",
  "cloudflare",
  "just a moment",
  "checking your browser",
  "verify you are human",
  "captcha",
  "are you a robot",
  "sign in to view",
  "log in to view",
  "please sign in",
  "create an account to view",
  "this page requires javascript",
];

// Minimum body text length to consider a crawl successful
const MIN_CONTENT_LENGTH = 300;

let browser;
try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Mimic a real browser to reduce bot fingerprinting
  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
  });

  const response = await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  const statusCode = response?.status() ?? 0;

  const title = await page.title();
  const text = (await page.locator("body").innerText({ timeout: 10000 })).trim();
  const html = await page.content();

  await browser.close();

  // Detect block signals in the extracted text
  const lowerText = text.toLowerCase();
  const blockSignal = BLOCK_SIGNALS.find(s => lowerText.includes(s));

  const tooShort = text.length < MIN_CONTENT_LENGTH;
  const isBlocked = !!blockSignal || tooShort || (statusCode >= 400);

  if (isBlocked) {
    const reason = blockSignal
      ? `Block signal detected: "${blockSignal}"`
      : tooShort
        ? `Body text too short (${text.length} chars) — page likely JS-gated or empty`
        : `HTTP ${statusCode}`;

    const result = { success: false, reason, url, title, statusCode, textLength: text.length };
    fs.writeFileSync(path.join(outDir, "crawl-result.json"), JSON.stringify(result, null, 2) + "\n");
    console.log(JSON.stringify(result, null, 2));
    process.exit(1);
  }

  fs.writeFileSync(path.join(outDir, "job-url.txt"), url + "\n");
  fs.writeFileSync(path.join(outDir, "job-page.html"), html);
  fs.writeFileSync(path.join(outDir, "job-page.txt"), text);

  const result = {
    success: true,
    url,
    title,
    statusCode,
    textLength: text.length,
    outDir,
    crawled_at: new Date().toISOString(),
  };
  fs.writeFileSync(path.join(outDir, "crawl-result.json"), JSON.stringify(result, null, 2) + "\n");
  console.log(JSON.stringify(result, null, 2));

} catch (err) {
  if (browser) await (browser as Awaited<typeof browser>).close().catch(() => {});
  const reason = err instanceof Error ? err.message : String(err);
  const result = { success: false, reason, url };
  fs.writeFileSync(path.join(outDir, "crawl-result.json"), JSON.stringify(result, null, 2) + "\n");
  console.log(JSON.stringify(result, null, 2));
  process.exit(1);
}
