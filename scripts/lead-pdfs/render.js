#!/usr/bin/env node
/**
 * Lead Magnet PDF Renderer
 *
 * Kullanım:
 *   node scripts/lead-pdfs/render.js <slug>
 *   node scripts/lead-pdfs/render.js ai-baslangic-rehberi
 *
 * Flow:
 *   1. scripts/lead-pdfs/content/{slug}.js dosyasını oku (içerik)
 *   2. scripts/lead-pdfs/template.js ile HTML üret
 *   3. Puppeteer ile A4 PDF'e render et
 *   4. public/assets/lead/{slug}.pdf çıktısı
 */

const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { renderHTML } = require("./template");

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: node render.js <slug>");
    process.exit(1);
  }

  const contentPath = path.join(__dirname, "content", `${slug}.js`);
  if (!fs.existsSync(contentPath)) {
    console.error(`Content file not found: ${contentPath}`);
    process.exit(1);
  }

  console.log(`→ Loading content: ${slug}`);
  // Cache busting for re-runs
  delete require.cache[require.resolve(contentPath)];
  const content = require(contentPath);

  console.log(`→ Rendering HTML...`);
  const html = renderHTML(content);

  // Save HTML for debugging
  const htmlPath = path.join(__dirname, "debug", `${slug}.html`);
  fs.mkdirSync(path.dirname(htmlPath), { recursive: true });
  fs.writeFileSync(htmlPath, html);
  console.log(`  (debug HTML: ${htmlPath})`);

  const outPath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "assets",
    "lead",
    `${slug}.pdf`
  );
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  console.log(`→ Launching browser...`);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });
  console.log(`→ Rendering PDF...`);
  await page.pdf({
    path: outPath,
    format: "A4",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await browser.close();

  const stats = fs.statSync(outPath);
  console.log(`✓ PDF created: ${outPath}`);
  console.log(`  Size: ${(stats.size / 1024).toFixed(1)} KB`);
}

main().catch((err) => {
  console.error("ERROR:", err);
  process.exit(1);
});
