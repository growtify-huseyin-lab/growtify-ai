/**
 * Generate Lead Magnet PDFs
 *
 * Usage: npx tsx scripts/generate-pdfs.ts
 *
 * Reads sector content from src/content/rehberler/pdf-content.ts,
 * renders each sector as a branded PDF using @react-pdf/renderer,
 * and writes to public/rehberler/growtify-{slug}-rehberi.pdf
 */

import fs from "fs";
import path from "path";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";

// Dynamic import to handle path aliases
async function main() {
  // Import content
  const contentPath = path.resolve(
    __dirname,
    "../src/content/rehberler/pdf-content.ts"
  );

  // We need to use require with ts-node/tsx for TypeScript
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PDF_CONTENT } = require(contentPath);

  // Import template
  const templatePath = path.resolve(
    __dirname,
    "../src/lib/pdf/RehberTemplate.tsx"
  );
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { RehberDocument } = require(templatePath);

  const outDir = path.resolve(__dirname, "../public/rehberler");

  // Ensure output directory exists
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const slugs = Object.keys(PDF_CONTENT);

  if (slugs.length === 0) {
    console.log("⚠️  No sectors found in PDF_CONTENT. Nothing to generate.");
    return;
  }

  console.log(`\n🚀 Generating ${slugs.length} PDF(s)...\n`);

  for (const slug of slugs) {
    const data = PDF_CONTENT[slug];
    const filename = `growtify-${slug}-rehberi.pdf`;
    const outPath = path.join(outDir, filename);

    try {
      console.log(`  📄 ${filename}...`);

      const element = React.createElement(RehberDocument, { data });
      const buffer = await renderToBuffer(element);

      fs.writeFileSync(outPath, Buffer.from(buffer));

      const sizeKB = Math.round(buffer.byteLength / 1024);
      console.log(`  ✅ ${filename} (${sizeKB} KB)`);
    } catch (err) {
      console.error(`  ❌ ${filename} FAILED:`, err);
    }
  }

  console.log(`\n✨ Done! PDFs written to: ${outDir}\n`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
