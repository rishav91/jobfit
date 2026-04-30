import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const [url, outDir = "tmp/job-crawl"] = process.argv.slice(2);

if (!url) {
  console.error("Usage: npm run crawl -- <url> [outDir]");
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

const title = await page.title();
const text = await page.locator("body").innerText({ timeout: 10000 });
const html = await page.content();

await browser.close();

fs.writeFileSync(path.join(outDir, "job-url.txt"), url + "\n");
fs.writeFileSync(path.join(outDir, "job-page.html"), html);
fs.writeFileSync(path.join(outDir, "job-page.txt"), text);
fs.writeFileSync(path.join(outDir, "crawl-metadata.json"), JSON.stringify({
  url,
  title,
  crawled_at: new Date().toISOString()
}, null, 2) + "\n");

console.log(JSON.stringify({ url, title, outDir }, null, 2));
