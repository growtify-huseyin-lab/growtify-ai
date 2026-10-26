// Asistan uçları için ortak veri: onaylı bağımlı bölümler, bu bölümün taslağı, sohbet geçmişi, kota.
import { dosyamApi, type DosyamStudent, type Submission } from "./api";
import { getPrompt } from "./prompts";
import type { Clean } from "./sections";

export const GUNLUK_MESAJ = 60; // CEO 2026-10-23
export const GUNLUK_MESAJ_FREE = 20; // Free: yalnız FREE4B; ~0,20 $/sohbet (Course önerisi 2026-10-26)
export const GUNLUK_TAVAN_MICRO = Number(process.env.DOSYAM_DAILY_USD_CAP ?? "25") * 1_000_000; // tüm öğrenciler

export type HistoryMsg = { role: "user" | "assistant"; content: unknown };

export async function approvedDeps(student: DosyamStudent, sectionId: string): Promise<Record<string, Clean>> {
  const out: Record<string, Clean> = {};
  for (const dep of (getPrompt(sectionId)?.bagimli ?? []) as string[]) {
    const r = await dosyamApi<{ approved: Submission | null }>("GET", `/v1/me/sections/${dep}`, { student: student.id });
    if (r.body.approved) out[dep] = r.body.approved.data as Clean;
  }
  return out;
}

export async function currentDraft(student: DosyamStudent, sectionId: string): Promise<Clean | null> {
  const r = await dosyamApi<{ latest: Submission | null }>("GET", `/v1/me/sections/${sectionId}`, { student: student.id });
  return (r.body.latest?.data as Clean) ?? null;
}

export async function getChat(student: DosyamStudent, chatId: string) {
  const r = await dosyamApi<{ section_id: string; messages: { seq: number; role: "user" | "assistant"; content: unknown }[] }>(
    "GET",
    `/v1/me/chats/${chatId}`,
    { student: student.id },
  );
  return r.body.ok ? r.body : null;
}

export function displayText(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .filter((b) => b && typeof b === "object" && (b as { type?: string }).type === "text")
      .map((b) => String((b as { text?: string }).text ?? ""))
      .join("\n")
      .trim();
  }
  return "";
}

// Ekranda gösterilecek mesajlar: açılış turunun gizli "Başlayalım." öğrenci mesajı gösterilmez.
export function visibleMessages(msgs: { seq: number; role: string; content: unknown }[]) {
  return msgs
    .filter((m) => !(m.seq === 1 && m.role === "user"))
    .map((m) => ({ rol: m.role as "user" | "assistant", metin: displayText(m.content) }))
    .filter((m) => m.metin);
}

export async function quota(student: DosyamStudent): Promise<{ kalan: number; kapali: boolean }> {
  const [mine, all] = await Promise.all([
    dosyamApi<{ messages: number }>("GET", "/v1/me/usage", { student: student.id }),
    dosyamApi<{ cost_micro: number }>("GET", "/v1/usage/global"),
  ]);
  return {
    kalan: Math.max(0, (student.package === "free" ? GUNLUK_MESAJ_FREE : GUNLUK_MESAJ) - (mine.body.messages ?? 0)),
    kapali: (all.body.cost_micro ?? 0) >= GUNLUK_TAVAN_MICRO,
  };
}
