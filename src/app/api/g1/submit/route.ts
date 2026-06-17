// POST /api/g1/submit  — verify identity, score answers, push result back to GHL.
// Body: { token, mode: "firebase"|"hmac", answers: {...}, sector?, locale? }
// The same token the page verified is re-verified here (Firebase ID token against
// Google's keys, or our HMAC fallback) — no separate session secret needed.
export const maxDuration = 60;

import { after } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { verifyG1Token } from "@/lib/g1/token";
import { verifyFirebaseIdToken } from "@/lib/g1/firebase-verify";
import { loadG1Config } from "@/lib/g1/config";
import { scoreG1 } from "@/lib/g1/scoring";
import { buildG1Synthesis } from "@/lib/g1/synthesis";
import { buildG1Comparison } from "@/lib/g1/compare";
import { saveG1ResultToContact, sendG1ResultEmail, getG1Contact } from "@/lib/g1/ghl-g1";
import { generateG1PdfHtml } from "@/lib/g1/g1-pdf-template";
import { generateSinglePagePdfFromHtml, getPdfFilename } from "@/app/[locale]/test/lib/pdf-generate";
import { uploadPdfToContact } from "@/app/[locale]/test/lib/ghl-client";
import type { G1Answers, G1BeforeAfter, G1PriorResult, G1Result } from "@/lib/g1/types";

// G→T (Gap→Transformation): the stored result is the baseline; this attempt is
// the "after". Build the per-dimension before/after delta for the result screen.
function buildBeforeAfter(
  prior: G1PriorResult,
  result: G1Result,
  attempt: number,
): G1BeforeAfter {
  const priorById = new Map(prior.dims.map((d) => [d.id, d.score]));
  const round1 = (n: number) => Math.round(n * 10) / 10;
  return {
    before: prior.overall,
    after: result.overall,
    delta: round1(result.overall - prior.overall),
    attempt,
    dims: result.dimensions.map((d) => {
      const before = priorById.get(d.id) ?? d.score;
      return {
        id: d.id,
        label: d.label,
        before,
        after: d.score,
        delta: round1(d.score - before),
      };
    }),
  };
}

interface SubmitBody {
  token?: string;
  mode?: "firebase" | "hmac";
  answers?: G1Answers;
  sector?: string;
  locale?: string;
  name?: string;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = checkRateLimit(ip, 10, 60_000);
  if (!rl.ok) {
    return Response.json(
      { ok: false, error: "rate_limited", retryAfter: Math.ceil((rl.resetAt - Date.now()) / 1000) },
      { status: 429 },
    );
  }

  let body: SubmitBody;
  try {
    body = (await request.json()) as SubmitBody;
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  if (!body.token || !body.answers || typeof body.answers !== "object") {
    return Response.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  let contactId: string;
  if (body.mode === "hmac") {
    const v = verifyG1Token(body.token);
    if (!v.ok) {
      return Response.json({ ok: false, error: "invalid_token", reason: v.reason }, { status: 401 });
    }
    contactId = v.payload.sub;
  } else {
    // default: firebase
    const fb = await verifyFirebaseIdToken(body.token);
    if (!fb.ok || !fb.uid) {
      return Response.json({ ok: false, error: "invalid_token", reason: fb.reason }, { status: 401 });
    }
    contactId = fb.uid;
  }

  const config = loadG1Config(body.sector, body.locale);
  const result = scoreG1(config, body.answers);
  const synthesis = buildG1Synthesis(config, result, body.answers, body.name ?? "");

  // Read the stored result BEFORE overwriting — it is the G (baseline) for the
  // G→T before/after. A 404/empty contact just means first attempt (no delta).
  const lookup = await getG1Contact(contactId).catch(() => ({ found: false }) as Awaited<ReturnType<typeof getG1Contact>>);
  const prior = lookup.found ? lookup.prior : undefined;
  const attempt = (prior?.attempt ?? 0) + 1;
  const beforeAfter = prior ? buildBeforeAfter(prior, result, attempt) : null;
  // The interpreted "transformation" comparison (only on a retake).
  const comparison =
    beforeAfter && prior
      ? buildG1Comparison(beforeAfter, synthesis.levelLabel, prior.archetype)
      : null;

  // Writeback is best-effort: never block the user's result on a GHL hiccup.
  const wb = await saveG1ResultToContact(contactId, result, attempt).catch(
    (e: unknown) => ({ ok: false, wrote: 0, error: (e as Error).message }),
  );

  // Result PDF + email (full /test parity): after the response, render a branded
  // A4 PDF, upload it to the GHL contact, then send the branded report email with
  // the PDF link. PDF failure is non-fatal — the email still goes (CTA → /g1).
  const fid = contactId;
  const fname = body.name ?? "";
  const synth = synthesis;
  const sectorLabel = config.sector.label;
  const ba = beforeAfter;
  const cmp = comparison;
  after(async () => {
    let pdfUrl: string | undefined;
    try {
      const html = generateG1PdfHtml({ name: fname, sectorLabel, synth, beforeAfter: ba, comparison: cmp });
      const buf = await generateSinglePagePdfFromHtml(html);
      const up = await uploadPdfToContact(fid, buf, getPdfFilename(fname));
      pdfUrl = up.ok ? (up as { urls?: string[] }).urls?.[0] : undefined;
      console.log(`[g1/submit] pdf ok=${up.ok} url=${pdfUrl ?? ("error" in up ? up.error : "")}`);
    } catch (e) {
      console.error("[g1/submit] pdf flow error:", (e as Error).message);
    }
    const r = await sendG1ResultEmail(fid, fname, synth, pdfUrl, cmp).catch((e: unknown) => ({
      ok: false,
      error: (e as Error).message,
    }));
    console.log("[g1/submit] result email →", JSON.stringify(r));
  });

  return Response.json({
    ok: true,
    result,
    synthesis,
    beforeAfter,
    comparison,
    attempt,
    contactId,
    ghl: { ok: wb.ok, wrote: wb.wrote, error: wb.error ?? null },
  });
}
