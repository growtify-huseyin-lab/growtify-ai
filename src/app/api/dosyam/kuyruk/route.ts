// GET /api/dosyam/kuyruk — GHL kuyruğunu işler. Vercel zamanlanmış görevi (CRON_SECRET) çağırır.
import { processOutbox } from "@/lib/dosyam/outbox";

export const maxDuration = 60;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return Response.json({ ok: false }, { status: 401 });
  const r = await processOutbox(25);
  return Response.json({ ok: true, ...r });
}
