// G testi (growtify.ai/g1) sonucu → Çalışma Dosyam'daki "G1.*" kaynak kutuları (G2 profil, G3 seviye, W5/T5 ölçümler…).
// Sonuç GHL kişisinde duruyor (g1_* alanları + ilk ölçümün değişmez kopyası g1_baseline); burada yalnız okunur.
// Dosyam'ın kendi "G1" bölümündeki alanlar (yoran_is, tahmini_saat) bu dosyanın işi değil; o bölümden gelir.
import config from "@/data/g1/g1-content-config.json";
import { getG1Contact } from "@/lib/g1/ghl-g1";
import type { G1PriorResult } from "@/lib/g1/types";

const DIM_LABEL: Record<string, string> = Object.fromEntries(
  (config.scoring.dimensions as { id: string; label: string }[]).map((d) => [d.id, d.label]),
);

// Bu anahtarların karşılığı testte yok (ör. bedel kartı rakamları): kutu boş kalır, "G testini çözdüğünde…" yazar.
export const G1_ENGINE_KEYS = ["profil", "pdf", "seviye", "en_zayif_halka", "en_dusuk_pencere", "ilk_olcum", "yeniden_olcum"];

const puan = (n: number) => n.toLocaleString("tr-TR", { maximumFractionDigits: 1 });
const tarih = (iso: string) => {
  const t = Date.parse(iso);
  return Number.isNaN(t) ? "" : new Date(t).toLocaleDateString("tr-TR");
};

// Boyutlar her ölçümde aynı sırada (testteki sıra) — ilk ve yeniden ölçüm yan yana okunabilsin.
function boyutlar(r: G1PriorResult): string {
  const skor = new Map(r.dims.map((d) => [d.id, d.score]));
  return Object.keys(DIM_LABEL)
    .filter((id) => skor.has(id))
    .map((id) => `- ${DIM_LABEL[id]}: ${puan(skor.get(id) as number)}/5`)
    .join("\n");
}

function enZayif(r: G1PriorResult): string {
  const d = [...r.dims].filter((x) => DIM_LABEL[x.id]).sort((a, b) => a.score - b.score)[0];
  return d ? `${DIM_LABEL[d.id]} (${puan(d.score)}/5)` : "";
}

function olcum(baslik: string, r: G1PriorResult): string {
  const t = tarih(r.completedAt);
  return [`${baslik}${t ? ` (${t})` : ""}: ${r.archetype} · genel ${puan(r.overall)}/5`, boyutlar(r)].filter(Boolean).join("\n");
}

// İstenen "G1.<alan>" anahtarlarının metinleri; test çözülmemişse boş nesne.
export async function g1Refs(contactId: string, keys: string[]): Promise<Record<string, string>> {
  const want = keys.filter((k) => G1_ENGINE_KEYS.includes(k.split(".")[1] ?? ""));
  if (!want.length || !contactId) return {};
  const c = await getG1Contact(contactId).catch(() => null);
  const son = c?.found ? c.prior : undefined;
  if (!son) return {};
  const ilk = c?.baseline ?? (son.attempt <= 1 ? son : undefined);
  const out: Record<string, string> = {};
  for (const k of want) {
    const alan = k.split(".")[1];
    let v = "";
    if (alan === "profil") v = [`${son.archetype} · genel ${puan(son.overall)}/5`, boyutlar(son)].filter(Boolean).join("\n");
    else if (alan === "pdf") v = "Raporunun tamamı ve PDF'i growtify.ai/g1 sayfasında.";
    else if (alan === "seviye") v = `${son.archetype} · genel ${puan(son.overall)}/5`;
    else if (alan === "en_zayif_halka" || alan === "en_dusuk_pencere") v = enZayif(son);
    else if (alan === "ilk_olcum" && ilk) v = olcum("İlk ölçüm", ilk);
    else if (alan === "yeniden_olcum" && son.attempt > 1) v = olcum("Yeniden ölçüm", son);
    if (v) out[k] = v;
  }
  return out;
}
