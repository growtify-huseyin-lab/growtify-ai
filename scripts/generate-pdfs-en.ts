/**
 * Generate EN Lead-Magnet Guide PDFs
 *
 * Usage: npx tsx scripts/generate-pdfs-en.ts
 *
 * Reads EN sector content from src/content/rehberler/pdf-content.en.ts (keyed by
 * English slug), renders each as a branded PDF (locale="en") using RehberTemplate,
 * and writes to public/rehberler/en/growtify-{english-slug}-guide.pdf
 */
import fs from "fs";
import path from "path";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";

async function main() {
  const contentPath = path.resolve(__dirname, "../src/content/rehberler/pdf-content.en.ts");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PDF_CONTENT_EN } = require(contentPath);
  const templatePath = path.resolve(__dirname, "../src/lib/pdf/RehberTemplate.tsx");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { RehberDocument } = require(templatePath);

  const outDir = path.resolve(__dirname, "../public/rehberler/en");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const slugs = Object.keys(PDF_CONTENT_EN);
  if (slugs.length === 0) { console.log("⚠️  No EN sectors found."); return; }
  console.log(`\n🚀 Generating ${slugs.length} EN PDF(s)...\n`);

  for (const slug of slugs) {
    const data = PDF_CONTENT_EN[slug];
    const filename = `growtify-${slug}-guide.pdf`;
    const outPath = path.join(outDir, filename);
    try {
      console.log(`  📄 ${filename}...`);
      const element = React.createElement(RehberDocument, { data, locale: "en" });
      const buffer = await renderToBuffer(element);
      fs.writeFileSync(outPath, Buffer.from(buffer));
      console.log(`  ✅ ${filename} (${Math.round(buffer.byteLength / 1024)} KB)`);
    } catch (err) {
      console.error(`  ❌ ${filename} FAILED:`, err);
    }
  }
  console.log(`\n✨ Done! EN PDFs written to: ${outDir}\n`);
}
main().catch((err) => { console.error("Fatal error:", err); process.exit(1); });
