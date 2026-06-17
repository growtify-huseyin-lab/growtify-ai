// POST /api/g1/submit  — verify identity, score answers, push result back to GHL.
// Body: { token, mode: "firebase"|"hmac", answers: {...}, sector?, locale? }
// The same token the page verified is re-verified here (Firebase ID token against
// Google's keys, or our HMAC fallback) — no separate session secret needed.
export const maxDuration = 60;

import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { verifyG1Token } from "@/lib/g1/token";
import { verifyFirebaseIdToken } from "@/lib/g1/firebase-verify";
import { loadG1Config } from "@/lib/g1/config";
import { scoreG1 } from "@/lib/g1/scoring";
import { saveG1ResultToContact } from "@/lib/g1/ghl-g1";
import type { G1Answers } from "@/lib/g1/types";

interface SubmitBody {
  token?: string;
  mode?: "firebase" | "hmac";
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

  // Writeback is best-effort: never block the user's result on a GHL hiccup.
  const wb = await saveG1ResultToContact(contactId, result).catch(
    (e: unknown) => ({ ok: false, wrote: 0, error: (e as Error).message }),
  );

  return Response.json({
    ok: true,
    result,
    contactId,
    ghl: { ok: wb.ok, wrote: wb.wrote, error: wb.error ?? null },
  });
}
