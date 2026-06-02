// GET /test/api/download-pdf
// Generates and returns an actual PDF file using Puppeteer.

export const maxDuration = 60;

import { generateQuizPdf, getPdfFilename } from "../../lib/pdf-generate";
import { computeResults, pickDiscount } from "../../lib/scoring";
import type { QuizState } from "../../lib/types";
import { initialQuizState } from "../../lib/types";
import { upsertQuizContact } from "../../lib/ghl-client";
import { buildGhlCustomFieldsEn } from "../../lib/ghl-mapping";

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

export async function GET(req: Request) {
  // Diagnostic query overrides (no email/contact side effects): ?locale=en&sector=hukuk
  const url = new URL(req.url);
  const qLocale = url.searchParams.get("locale");
  const qSector = url.searchParams.get("sector");
  const mock = { ...MOCK_STATE } as QuizState & { locale?: string };
  if (qLocale === "en") mock.locale = "en";
  if (qSector) mock.sector = qSector as QuizState["sector"];

  const state = { ...mock, ...computeResults(mock) };
  const pdfLocale = (state as { locale?: string }).locale === "en" ? "en" : "tr";

  // ?test=upsert → isolate the GHL upsert (the email-gating fast path). No email is sent here.
  if (url.searchParams.get("test") === "upsert") {
    const fields = buildGhlCustomFieldsEn(state);
    const r = await upsertQuizContact({ ...state, email: "pdf-diag@growtify.ai" } as QuizState, pdfLocale);
    return Response.json({
      locale: pdfLocale,
      sector: state.sector,
      upsert: r,
      en_custom_fields: fields,
      field_count: fields.length,
      empty_value_fields: fields.filter((f) => f.value === undefined || f.value === null || f.value === "").map((f) => f.id),
    });
  }

  try {
    const pdfBuffer = await generateQuizPdf(state, undefined, pdfLocale);
    const filename = getPdfFilename(state.firstName);
    return new Response(pdfBuffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Content-Length": String(pdfBuffer.length),
      },
    });
  } catch (err) {
    // Surface the PDF-gen error for diagnostics (the real flow gates the email behind this).
    return Response.json(
      { ok: false, locale: pdfLocale, sector: state.sector, error: (err as Error).message, stack: (err as Error).stack?.split("\n").slice(0, 6) },
      { status: 500 },
    );
  }
}
