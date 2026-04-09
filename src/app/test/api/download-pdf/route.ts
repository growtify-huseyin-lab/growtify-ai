// GET /test/api/download-pdf
// Generates and returns an actual PDF file using Puppeteer.
// Uses mock data for preview purposes.

import { generateQuizPdf, getPdfFilename } from "../../lib/pdf-generate";
import { computeResults, pickDiscount } from "../../lib/scoring";
import type { QuizState } from "../../lib/types";
import { initialQuizState } from "../../lib/types";

const MOCK_STATE: QuizState = {
  ...initialQuizState,
  segment: "bireysel",
  sector: "saglik",
  q_time: 4, q_procrastination: 4, q_focus: 3, q_comparison: 4,
  q_fomo: 3, q_progress: 4, q_uncertainty: 7, q_overwhelm: 8,
  q_decision: 7, q_fear: 6, q_selfworth: 5, q_social: 6,
  q_overthink: 7, q_motivation: 8,
  q_goal: "yeni_gelir",
  q_areas: ["icerik", "musteri", "satis"],
  q_habits: ["son_dakika", "telefon"],
  commitment: 30,
  firstName: "Hüseyin",
  email: "huseyin@test.dev",
  bonus_q1: true, bonus_q2: true,
  discount: pickDiscount(),
};

export async function GET() {
  const state = { ...MOCK_STATE, ...computeResults(MOCK_STATE) };
  const pdfBuffer = await generateQuizPdf(state);
  const filename = getPdfFilename(state.firstName);

  return new Response(pdfBuffer as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Content-Length": String(pdfBuffer.length),
    },
  });
}
