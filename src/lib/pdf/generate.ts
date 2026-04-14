/**
 * PDF Generation — data → PDF buffer
 *
 * Usage:
 *   import { generateRehberPdf } from "@/lib/pdf/generate";
 *   const buffer = await generateRehberPdf(sectorContent);
 *   fs.writeFileSync("output.pdf", buffer);
 */

import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { RehberDocument } from "./RehberTemplate";
import type { PdfSectorContent } from "@/content/rehberler/pdf-content";

export async function generateRehberPdf(
  data: PdfSectorContent
): Promise<Buffer> {
  const element = React.createElement(RehberDocument, { data });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buffer = await renderToBuffer(element as any);
  return Buffer.from(buffer);
}
