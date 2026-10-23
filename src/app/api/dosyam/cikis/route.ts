// POST /api/dosyam/cikis — oturumu kapatır.
import { endSession, sameOrigin } from "@/lib/dosyam/session";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return Response.json({ ok: false }, { status: 403 });
  await endSession();
  return Response.json({ ok: true });
}
