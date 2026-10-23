// Günlük yedek (ADR K10): kalıcı tablolar JSON + gzip olarak R2'ye (gai-dosyam-yedek, AB).
// Geçici/gizli tablolar (oturum, giriş kodu, nonce, oran sınırı, idempotency) yedeğe girmez.
// Saklama: R2 yaşam döngüsü kuralı 35 günden eski yedekleri siler ("yedek/" öneki).
import type { D1Like } from "./db";

// Sohbetler (chat_*) yedeğe girer: saklama süresi boyunca öğrencinin verisidir; yedek de 35 günde silinir.
export const BACKUP_TABLES = ["students", "submissions", "buyume_weeks", "ghl_outbox", "audit_log", "chat_sessions", "chat_messages", "usage_daily"] as const;

export interface R2Like {
  put(key: string, value: ArrayBuffer | Uint8Array, opts?: { httpMetadata?: { contentType?: string; contentEncoding?: string } }): Promise<unknown>;
}

async function gzip(text: string): Promise<Uint8Array> {
  const stream = new Blob([text]).stream().pipeThrough(new CompressionStream("gzip"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

export async function runBackup(db: D1Like, bucket: R2Like, nowMs: number): Promise<{ key: string; rows: Record<string, number>; bytes: number }> {
  const tables: Record<string, unknown[]> = {};
  const rows: Record<string, number> = {};
  for (const t of BACKUP_TABLES) {
    const { results } = await db.prepare(`SELECT * FROM ${t}`).all();
    tables[t] = results;
    rows[t] = results.length;
  }
  const at = new Date(nowMs).toISOString();
  const body = await gzip(JSON.stringify({ surum: 1, alindi: at, tablolar: tables }));
  const key = `yedek/${at.slice(0, 10)}.json.gz`;
  await bucket.put(key, body, { httpMetadata: { contentType: "application/json", contentEncoding: "gzip" } });
  return { key, rows, bytes: body.byteLength };
}
