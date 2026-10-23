// GHL kuyruğu tüketicisi (ADR K5): tek yol — Worker'dan iş al, GHL'e yaz, sonucu bildir.
// Onaydan hemen sonra (after) ve günlük zamanlanmış görevle (güvenlik ağı) çalışır.
import { dosyamApi } from "./api";
import { addTag, writeFields } from "./ghl";

interface Job {
  id: string;
  ghl_contact_id: string;
  kind: "fields" | "tag" | "buyume_week";
  payload: { fields?: Record<string, string>; tag?: string };
}

export async function processOutbox(limit = 10): Promise<{ tamam: number; hata: number }> {
  const claim = await dosyamApi<{ jobs?: Job[] }>("POST", "/v1/outbox/claim", { body: { limit } });
  let tamam = 0;
  let hata = 0;
  for (const job of claim.body.jobs ?? []) {
    try {
      if (job.kind === "fields" && job.payload.fields) await writeFields(job.ghl_contact_id, job.payload.fields);
      else if (job.kind === "tag" && job.payload.tag) await addTag(job.ghl_contact_id, job.payload.tag);
      else throw new Error(`desteklenmeyen_is:${job.kind}`);
      await dosyamApi("POST", `/v1/outbox/${job.id}/done`, { body: {} });
      tamam++;
    } catch (e) {
      // Hata metni öğrenci içeriği taşımaz (yalnız kod/durum); Worker 300 karakterle sınırlar.
      await dosyamApi("POST", `/v1/outbox/${job.id}/fail`, { body: { error: (e as Error).message } }).catch(() => undefined);
      hata++;
    }
  }
  return { tamam, hata };
}
