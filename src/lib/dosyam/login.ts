// Giriş: GHL kişisi → hak kontrolü → öğrenci kaydı → oturum. E-posta kodu ve panel (Firebase) yolları ortak.
import { dosyamApi, type DosyamStudent } from "./api";
import { entitlement, getContact, type GhlContact } from "./ghl";
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

// Free öğrenci Temel/Tam alınca oturum değişmeden üst pakete geçer: sayfa açılışında GHL'den hak yeniden okunur
// (yalnız free için; Free'de yazdıkları aynı kayıtta kalır).
export async function refreshFree(student: DosyamStudent): Promise<DosyamStudent> {
  if (student.package !== "free") return student;
  try {
    const contact = await getContact(student.ghl_contact_id);
    const ent = contact ? await entitlement(contact) : null;
    if (!ent || ent.package === "free") return student;
    const r = await dosyamApi<{ student?: DosyamStudent }>("POST", "/v1/students/upsert", {
      body: { ghl_contact_id: student.ghl_contact_id, package: ent.package, temel_baslangic: ent.temel_baslangic, first_name: student.first_name },
    });
    return r.body.ok && r.body.student ? r.body.student : student;
  } catch {
    return student;
  }
}
