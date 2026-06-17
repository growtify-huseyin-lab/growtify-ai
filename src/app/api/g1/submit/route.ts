// POST /api/g1/submit  — verify token, score answers, push result back to GHL.
// Body: { token, answers: { [questionId]: score }, sector?, locale? }
export const maxDuration = 60;

import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { verifyG1Token } from "@/lib/g1/token";
import { loadG1Config } from "@/lib/g1/config";
import { scoreG1 } from "@/lib/g1/scoring";
import { saveG1ResultToContact } from "@/lib/g1/ghl-g1";
import type { G1Answers } from "@/lib/g1/types";

interface SubmitBody {
  token?: string;
  answers?: G1Answers;
  sector?: string;
  locale?: string;
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

  const v = verifyG1Token(body.token);
  if (!v.ok) {
    return Response.json({ ok: false, error: "invalid_token", reason: v.reason }, { status: 401 });
  }

  const config = loadG1Config(body.sector, body.locale);
  const result = scoreG1(config, body.answers);

  // Writeback is best-effort: never block the user's result on a GHL hiccup.
  const wb = await saveG1ResultToContact(v.payload.sub, result, config).catch(
    (e: unknown) => ({ ok: false, wrote: 0, error: (e as Error).message }),
  );

  return Response.json({
    ok: true,
    result,
    contactId: v.payload.sub,
    ret: v.payload.ret ?? null,
    ghl: { ok: wb.ok, wrote: wb.wrote, error: wb.error ?? null },
  });
}
