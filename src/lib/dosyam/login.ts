// Giriş: GHL kişisi → hak kontrolü → öğrenci kaydı → oturum. E-posta kodu ve panel (Firebase) yolları ortak.
import { dosyamApi, type DosyamStudent } from "./api";
import { entitlement, type GhlContact } from "./ghl";
import { startSession } from "./session";

export type LoginResult = { ok: true; student: DosyamStudent } | { ok: false; reason: "kayitli_degil" | "hata" };

export async function loginContact(contact: GhlContact): Promise<LoginResult> {
  const ent = await entitlement(contact);
  if (!ent) return { ok: false, reason: "kayitli_degil" };
  const r = await dosyamApi<{ student?: DosyamStudent }>("POST", "/v1/students/upsert", {
    body: { ghl_contact_id: contact.id, package: ent.package, temel_baslangic: ent.temel_baslangic, first_name: contact.firstName ?? null },
  });
  if (!r.body.ok || !r.body.student) return { ok: false, reason: "hata" };
  if (!(await startSession(r.body.student.id))) return { ok: false, reason: "hata" };
  return { ok: true, student: r.body.student };
}
