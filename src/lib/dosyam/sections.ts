// Çalışma Dosyam — bölüm tanımları. Kaynak: content/dosyam/sections/*.yaml (Course yazar, Development okur).
// Burada: tanımları yükleme, öğrenci verisini doğrulama ve onaylı veriyi GHL alanlarına çevirme.
// Tanımlar derlemede gömülür: scripts/dosyam/build-sections.mjs YAML'dan bu JSON'u üretir.
import sectionsJson from "@/data/dosyam/sections.json";

export type FieldType = "kisa_metin" | "uzun_metin" | "liste" | "sayi" | "secim" | "tablo" | "referans" | "tarih";

export interface FieldDef {
  anahtar: string;
  etiket: string;
  soru?: string; // açık soru, "sen" diliyle (formda başlık) — Course
  aciklama?: string; // ne yazılacağını anlatan tek cümle — Course
  ornek?: string; // kutunun içinde gri örnek (varsayımsal, sade) — Course
  tur: FieldType;
  olcu?: string;
  zorunlu?: boolean;
  adet?: number;
  adet_min?: number;
  adet_max?: number;
  secenekler?: string[];
  coklu?: boolean;
  sutunlar?: FieldDef[];
  satirlar?: string[];
  kaynak_alanlar?: string[];
  referans?: boolean; // yazılabilir alan + üstünde kaynak alanların içeriği gösterilir (OV2)
  hesaplanan?: boolean;
  sonradan_doldurulur?: boolean;
  not?: string;
}

export interface SectionDef {
  anahtar: string;
  baslik: string;
  modul: string;
  ders?: string | string[];
  bolum_no?: number;
  tekrar?: string;
  alanlar: FieldDef[];
  tek_olcut?: (FieldDef & { etiket: string }) | null;
  bagimli?: string[];
  sohbet_kipi?: string;
  salt_okunur?: boolean;
  not?: string;
}

// Öğrencinin dosyasındaki modüller ve sırası. FREE_BB_G dahil mi — CEO kararı bekliyor (Course README); şimdilik dışarıda.
const FILES = ["R.yaml", "O.yaml", "OV.yaml", "W.yaml", "BUYUME_DONGUM.yaml", "T.yaml"];

let cache: SectionDef[] | null = null;

export function loadSections(): SectionDef[] {
  if (cache) return cache;
  cache = (sectionsJson as unknown as (SectionDef & { _dosya: string })[])
    .filter((s) => FILES.includes(s._dosya))
    .map((s) => (s.tek_olcut ? { ...s, tek_olcut: { ...s.tek_olcut, anahtar: "tek_olcut" } } : s));
  return cache;
}

export function getSection(id: string): SectionDef | undefined {
  return loadSections().find((s) => s.anahtar === id);
}

export function modules(): { modul: string; sections: SectionDef[] }[] {
  const map = new Map<string, SectionDef[]>();
  for (const s of loadSections()) {
    if (s.anahtar === "BUYUME_DONGUM") continue; // ayrı sayfa
    map.set(s.modul, [...(map.get(s.modul) ?? []), s]);
  }
  return [...map.entries()].map(([modul, sections]) => ({ modul, sections }));
}

// Öğrencinin yazdığı alanlar (referans ve hesaplanan alanlar öğrenciden alınmaz).
export function editableFields(s: SectionDef): FieldDef[] {
  const fs = s.alanlar.filter((f) => f.tur !== "referans" && !f.hesaplanan);
  return s.tek_olcut ? [...fs, s.tek_olcut] : fs;
}

// Sonucu görünce doldurulan alanlar; Temel bitince ölçüm penceresinde yalnız bunlar yazılır (CEO 2026-10-24).
export function laterFields(s: SectionDef): FieldDef[] {
  return editableFields(s).filter((f) => f.sonradan_doldurulur);
}

// Ölçüm penceresi sonu: Temel başlangıcı + 28 + 30 gün (Worker OLCUM_DAYS ile aynı).
export function olcumBitis(temelBaslangic: string): Date {
  return new Date(Date.parse(temelBaslangic) + 58 * 86_400_000);
}

// --- doğrulama -------------------------------------------------------------------

const LIMIT = { kisa_metin: 600, uzun_metin: 5000, hucre: 600, liste_max: 30, tablo_max: 60 };

export type Clean = Record<string, unknown>;

function cleanValue(f: FieldDef, v: unknown): unknown {
  if (v === null || v === undefined || v === "") return undefined;
  switch (f.tur) {
    case "kisa_metin":
      return typeof v === "string" ? v.slice(0, LIMIT.kisa_metin) : undefined;
    case "uzun_metin":
      return typeof v === "string" ? v.slice(0, LIMIT.uzun_metin) : undefined;
    case "sayi": {
      const n = typeof v === "number" ? v : Number(String(v).replace(",", "."));
      return Number.isFinite(n) ? n : undefined;
    }
    case "tarih":
      return typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : undefined;
    case "secim": {
      const opts = f.secenekler ?? [];
      if (f.coklu) {
        const arr = Array.isArray(v) ? v.filter((x) => typeof x === "string" && (opts.length === 0 || opts.includes(x))) : [];
        return arr.length ? arr : undefined;
      }
      return typeof v === "string" && (opts.length === 0 || opts.includes(v)) ? v : undefined;
    }
    case "liste": {
      if (!Array.isArray(v)) return undefined;
      const max = Math.min(f.adet ?? f.adet_max ?? LIMIT.liste_max, LIMIT.liste_max);
      const arr = v.map((x) => (typeof x === "string" ? x.slice(0, LIMIT.hucre) : "")).slice(0, max);
      return arr.some((x) => x.trim()) ? arr : undefined;
    }
    case "tablo": {
      if (!Array.isArray(v)) return undefined;
      const cols = f.sutunlar ?? [];
      const max = Math.min(f.adet ?? f.satirlar?.length ?? LIMIT.tablo_max, LIMIT.tablo_max);
      const rows = v.slice(0, max).map((row) => {
        const r: Record<string, unknown> = {};
        for (const c of cols) {
          const cv = cleanValue(c, (row as Record<string, unknown>)?.[c.anahtar]);
          if (cv !== undefined) r[c.anahtar] = cv;
        }
        return r;
      });
      return rows.some((r) => Object.keys(r).length) ? rows : undefined;
    }
    default:
      return undefined;
  }
}

// Bilinmeyen anahtarlar atılır; her değer türüne ve ölçüsüne göre kırpılır.
export function cleanData(s: SectionDef, data: unknown): Clean {
  const src = (data && typeof data === "object" ? data : {}) as Record<string, unknown>;
  const out: Clean = {};
  for (const f of editableFields(s)) {
    const v = cleanValue(f, src[f.anahtar]);
    if (v !== undefined) out[f.anahtar] = v;
  }
  return out;
}

// Onay için eksik zorunlu alanlar (sonradan doldurulan tek ölçüt hariç).
export function missingRequired(s: SectionDef, data: Clean): FieldDef[] {
  return editableFields(s).filter(
    (f) => f.zorunlu && !f.sonradan_doldurulur && f.anahtar !== "tek_olcut" && data[f.anahtar] === undefined,
  );
}

// --- GHL yansıması --------------------------------------------------------------

function render(f: FieldDef, v: unknown): string {
  if (v === undefined) return "";
  if (Array.isArray(v)) {
    if (f.tur === "tablo") {
      return v
        .map((row, i) => {
          const r = row as Record<string, unknown>;
          const label = f.satirlar?.[i];
          const cells = (f.sutunlar ?? []).map((c) => (r[c.anahtar] === undefined ? "" : `${c.etiket}: ${String(r[c.anahtar])}`)).filter(Boolean);
          return `- ${label ? `${label} · ` : ""}${cells.join(" · ")}`;
        })
        .join("\n");
    }
    return v.map((x, i) => `${i + 1}. ${String(x)}`).join("\n");
  }
  return String(v);
}

export function renderSection(s: SectionDef, data: Clean, only?: string[]): string {
  return editableFields(s)
    .filter((f) => (!only || only.includes(f.anahtar)) && data[f.anahtar] !== undefined)
    .map((f) => {
      const body = render(f, data[f.anahtar]);
      return body.includes("\n") ? `${f.etiket}:\n${body}` : `${f.etiket}: ${body}`;
    })
    .join("\n");
}

// 1. parti GHL alanları (CEO onayı 2026-10-23). Ad → değer üreticisi. Ad, GHL anahtarını belirler
// ("GAI - R2 Tek Cumle" → contact.gai__r2_tek_cumle); kimlik koda gömülmez, çalışırken anahtardan çözülür.
type Mapper = (s: SectionDef, d: Clean) => string;
const all: Mapper = (s, d) => renderSection(s, d);
const pick = (...keys: string[]): Mapper => (s, d) => renderSection(s, d, keys);
const raw = (key: string): Mapper => (_s, d) => (d[key] === undefined ? "" : String(d[key]));

const GHL_FIELDS: Record<string, Record<string, Mapper>> = {
  R2: {
    "GAI - R2 Kimlik Cekirdegi": pick("neden", "kime_kime_degil", "donusum", "nasil", "durus", "ses"),
    "GAI - R2 Tek Cumle": raw("tek_cumle"),
    "GAI - R2 Tek Olcut": raw("tek_olcut"),
  },
  R3: {
    "GAI - R3 Teklif Karti": pick("kim_icin", "hangi_sonuc", "hangi_yolla", "hangi_bicimde", "soz"),
    "GAI - R3 Itirazlar": pick("itirazlar"),
    "GAI - R3 Sayfa Iskeleti": pick("sayfa_iskeleti"),
    "GAI - R3 Tek Olcut": raw("tek_olcut"),
  },
  O2: { "GAI - O2 Beyin Dosyasi": all },
  OV0: { "GAI - Harita OV0": all },
  OV2: { "GAI - Harita OV2": all },
  OV3: { "GAI - Harita OV3": all },
  OV4: { "GAI - Harita OV4": all },
  OV5: { "GAI - Harita OV5": all },
  OV6: { "GAI - Harita OV6": all },
  OV7: { "GAI - Harita OV7": all },
  OV8: { "GAI - Harita OV8": all },
  OV9: { "GAI - Harita OV9": all },
};
const GHL_TAGS: Record<string, string> = { R2: "gai_dosya_r2", R3: "gai_dosya_r3", O2: "gai_dosya_o2" };
const HARITA = ["OV0", "OV2", "OV3", "OV4", "OV5", "OV6", "OV7", "OV8", "OV9"];

// GHL büyük metin alanı sınırına karşı (MIMARI §3): uzun metin kısaltılır, tam metin dosyada kalır.
const GHL_TEXT_MAX = 9000;

export function fieldKeyFromName(name: string): string {
  const slug = name
    .replace(/^GAI\s*-\s*/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
  return `contact.gai__${slug}`;
}

export interface OutboxItem {
  kind: "fields" | "tag";
  payload: { fields?: Record<string, string>; tag?: string };
  idempotency_key: string;
}

// approvedIds: bu onaydan SONRA onaylı olan bölümler (Harita tamam etiketi için).
export function outboxFor(s: SectionDef, version: number, data: Clean, approvedIds: Set<string>): OutboxItem[] {
  const items: OutboxItem[] = [];
  const map = GHL_FIELDS[s.anahtar];
  if (map) {
    const fields: Record<string, string> = {};
    for (const [name, fn] of Object.entries(map)) {
      let v = fn(s, data);
      if (v.length > GHL_TEXT_MAX) v = `${v.slice(0, GHL_TEXT_MAX - 60)}\n…(devamı Çalışma Dosyam'da)`;
      fields[fieldKeyFromName(name)] = v;
    }
    items.push({ kind: "fields", payload: { fields }, idempotency_key: `fields:${s.anahtar}:v${version}` });
  }
  const tag = GHL_TAGS[s.anahtar];
  if (tag) items.push({ kind: "tag", payload: { tag }, idempotency_key: `tag:${tag}` });
  if (HARITA.includes(s.anahtar) && HARITA.every((id) => approvedIds.has(id))) {
    items.push({ kind: "tag", payload: { tag: "gai_harita_tamam" }, idempotency_key: "tag:gai_harita_tamam" });
  }
  return items;
}
