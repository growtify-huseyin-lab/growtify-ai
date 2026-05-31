// TEMPORARY DIAGNOSTIC — remove after EN email is verified.
// Runs the quiz report chain SYNCHRONOUSLY and returns a step-by-step trace,
// so a serverless background failure becomes a visible JSON response.
// Usage (browser): /test/api/diag?key=gx9diag&email=you@example.com&locale=en
export const maxDuration = 60;

import type { QuizState } from "../../lib/types";
import {
  upsertQuizContact,
  uploadPdfToContact,
  sendQuizReportEmail,
} from "../../lib/ghl-client";
import { generateQuizPdf } from "../../lib/pdf-generate";

const DIAG_KEY = "gx9diag";

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("key") !== DIAG_KEY) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const email = url.searchParams.get("email") || "diag@growtify.ai";
  const locale = url.searchParams.get("locale") === "tr" ? "tr" : "en";
  const firstName = url.searchParams.get("name") || "Diag";

  const state = {
    email,
    firstName,
    phone: "",
    persona: "Uygulamacı",
    painLevel: "high",
    totalScore: 78,
    discount: 50,
    commitment: 30,
    sector: "saglik",
    segment: "bireysel",
    q_goal: "musteri",
    q_areas: ["pazarlama"],
    q_habits: ["son_dakika"],
    q_time: 5, q_procrastination: 5, q_focus: 5, q_comparison: 5,
    q_fomo: 5, q_progress: 5, q_uncertainty: 5, q_overwhelm: 5,
    q_decision: 5, q_fear: 5, q_selfworth: 5, q_social: 5,
    q_overthink: 5, q_motivation: 5, bonus_q1: null, bonus_q2: null,
    locale,
  } as unknown as QuizState;

  const trace: Record<string, unknown> = { locale, email };

  // 1. Upsert
  const up = await upsertQuizContact(state, locale);
  trace.upsert = { ok: up.ok, contactId: up.contactId, isNew: up.isNew, error: up.error, statusCode: up.statusCode };
  if (!up.ok || !up.contactId) return Response.json(trace);

  // 2. PDF (independent — capture error but keep going)
  let pdfUrl: string | null = null;
  try {
    const pdf = await generateQuizPdf(state, "DIAGTEST9", locale);
    trace.pdf = { ok: true, bytes: pdf.length };
    // 3. Upload
    const upl = await uploadPdfToContact(up.contactId, pdf, "diag-report.pdf");
    trace.upload = { ok: upl.ok, url: upl.urls?.[0] ?? null, error: upl.error };
    pdfUrl = upl.urls?.[0] ?? null;
  } catch (err) {
    trace.pdf = { ok: false, error: String((err as Error)?.message ?? err) };
  }

  // 4. Email — ALWAYS test (decoupled from PDF; use dummy URL if upload failed)
  try {
    const url = pdfUrl ?? "https://growtify.ai/en/test";
    const em = await sendQuizReportEmail(up.contactId, firstName, state.persona, url, locale);
    trace.email = { ok: em.ok, messageId: em.messageId ?? null, error: em.error ?? null, usedDummyUrl: !pdfUrl };
  } catch (err) {
    trace.email = { ok: false, exception: String((err as Error)?.message ?? err) };
  }

  return Response.json(trace);
}
