// GET /test/kurumsal/api/preview-pdf
// Preview the kurumsal PDF template in browser (for development).

import { generateKurumsalPdfHtml } from "../../lib/pdf-html-template-kurumsal";
import { initialKurumsalState } from "../../lib/types-kurumsal";

export async function GET() {
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
    firstName: "Ahmet",
    email: "ahmet@demo.com",
    totalScore: 42,
    painLevel: "medium" as const,
    persona: "Kesif" as const,
  };

  const html = generateKurumsalPdfHtml(mockState);
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
