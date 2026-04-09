// GET /test/kurumsal/api/download-pdf
// Download kurumsal PDF (real Puppeteer render).

export const maxDuration = 60;

import { generateKurumsalPdfHtml } from "../../lib/pdf-html-template-kurumsal";
import { generatePdfFromHtml } from "../../../lib/pdf-generate";
import { initialKurumsalState } from "../../lib/types-kurumsal";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const name = url.searchParams.get("name") ?? "rapor";

  // In production this would come from stored state; for now use mock
  const mockState = {
    ...initialKurumsalState,
    sector: "saas",
    d_strategy: 4,
    d_team: 6,
    d_process: 3,
    d_data: 5,
    d_culture: 7,
    p_pilot: 4,
    p_roi: 3,
    p_resistance: 4,
    p_resources: 3,
    q_goal: "verimlilik",
    q_priority_depts: ["pazarlama", "satis", "it"],
    companySize: "51-200" as const,
    firstName: name,
    email: "test@demo.com",
    totalScore: 42,
    painLevel: "medium" as const,
    persona: "Kesif" as const,
  };

  const html = generateKurumsalPdfHtml(mockState);
  const pdfBuffer = await generatePdfFromHtml(html);
  const filename = `growtify-kurumsal-rapor-${name.toLowerCase().replace(/\s+/g, "-")}.pdf`;

  return new Response(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
    },
  });
}
