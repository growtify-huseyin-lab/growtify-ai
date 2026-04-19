/**
 * Lead Magnet Content Catalog
 *
 * Her yeni lead magnet buraya eklenir. Tek template (/lead/[slug])
 * bu data'dan beslenir. Yeni magnet = yeni entry + asset dosyası.
 *
 * Format türleri: pdf, checklist, template, video, prompt-pack
 * Asset'ler: /public/assets/lead/ altında
 * GHL tag: gai_lm_{slug} — her magnet kendi nurture workflow'unu tetikler
 *
 * Operasyon brief: /website/LEAD-MAGNET-OPS-BRIEF.md
 */

export type LeadMagnetFormat =
  | "pdf"
  | "checklist"
  | "template"
  | "video"
  | "prompt-pack";

export interface LeadMagnet {
  slug: string;
  title: string;
  subtitle: string;
  painHook: string;
  format: LeadMagnetFormat;
  formatLabel: string;
  icon: string;
  whatInside: string[];
  targetProfile: string;
  assetUrl: string;
  assetDelivery: "download" | "redirect";
  ghlTag: string;
  sectorRef?: string;
  active: boolean;
  createdAt: string;
  seo: {
    title: string;
    description: string;
  };
}

export const FORMAT_CONFIG: Record<
  LeadMagnetFormat,
  { label: string; ctaVerb: string; ctaIcon: string; badge: string }
> = {
  pdf: {
    label: "PDF Rehber",
    ctaVerb: "Rehberi İndir",
    ctaIcon: "FileDown",
    badge: "PDF",
  },
  checklist: {
    label: "Checklist",
    ctaVerb: "Checklist'i Al",
    ctaIcon: "ListChecks",
    badge: "Checklist",
  },
  template: {
    label: "Şablon Paketi",
    ctaVerb: "Şablonları İndir",
    ctaIcon: "FileDown",
    badge: "Şablon",
  },
  video: {
    label: "Video",
    ctaVerb: "Videoyu İzle",
    ctaIcon: "Play",
    badge: "Video",
  },
  "prompt-pack": {
    label: "Prompt Paketi",
    ctaVerb: "Prompt'ları Al",
    ctaIcon: "FileDown",
    badge: "Prompt",
  },
};

// ═══════════════════════════════════════════════════════════
// LEAD MAGNET KATALOĞU
// Yeni magnet eklemek için buraya entry ekle + asset'i
// /public/assets/lead/ dizinine koy.
//
// Şu an boş — günlük üretilecek magnet'ler eklendikçe doldurulur.
// Operasyon brief: /website/LEAD-MAGNET-OPS-BRIEF.md
// E-Series nurture flow: marketing/platform/ghl/workflows/leadmagnet-e-series-guide.md
// ═══════════════════════════════════════════════════════════

export const LEAD_MAGNETS: Record<string, LeadMagnet> = {
  // ─────────────────────────────────────────────────────────
  // ai-baslangic-rehberi — İlk E-Series pilot lead magnet
  // PDF: scripts/lead-pdfs/content/ai-baslangic-rehberi.js
  // Üretim: node scripts/lead-pdfs/render.js ai-baslangic-rehberi
  // ─────────────────────────────────────────────────────────
  "ai-baslangic-rehberi": {
    slug: "ai-baslangic-rehberi",
    title: "Yapay Zeka ile İşini Büyütme: Başlangıç Rehberi",
    subtitle:
      "5 AI aracı + 3 pratik senaryo + 7 günlük aksiyon planı — ücretsiz PDF",
    painHook:
      "Yapay zeka kullanmak istiyorsun ama nereden başlayacağını bilmiyor musun? Bu rehber tam sana göre.",
    format: "pdf",
    formatLabel: "PDF Rehber",
    icon: "🚀",
    whatInside: [
      "5 AI aracı — ChatGPT, Perplexity, Canva AI, Otter, Make",
      "3 pratik uygulama senaryosu — güzellik, emlak, muhasebe sektörlerinden",
      "7 günlük aksiyon planı — bugün başla, haftaya sonuç gör",
      "Sektörel örnekler ve kopyala-yapıştır prompt önerileri",
      "Sıradaki adım: kişisel AI yol haritanı oluştur",
    ],
    targetProfile: "Yapay zekayı işinde kullanmak isteyen tüm profesyoneller",
    assetUrl: "/assets/lead/ai-baslangic-rehberi.pdf",
    assetDelivery: "download",
    ghlTag: "gai_lm_ai_baslangic",
    active: true,
    createdAt: "2026-04-19",
    seo: {
      title: "Yapay Zeka Başlangıç Rehberi — Ücretsiz PDF | Growtify.ai",
      description:
        "Yapay zeka ile işini büyütmeye başla. 5 AI aracı, 3 pratik senaryo, 7 günlük aksiyon planı — ücretsiz indir.",
    },
  },
};

// ═══════════════════════════════════════════════════════════
// HELPER FONKSİYONLAR
// ═══════════════════════════════════════════════════════════

export function getLeadMagnet(slug: string): LeadMagnet | null {
  return LEAD_MAGNETS[slug] ?? null;
}

export function getActiveLeadMagnets(): LeadMagnet[] {
  return Object.values(LEAD_MAGNETS).filter((lm) => lm.active);
}

export function getAllLeadMagnetSlugs(): string[] {
  return Object.keys(LEAD_MAGNETS);
}

export function getActiveLeadMagnetSlugs(): string[] {
  return Object.values(LEAD_MAGNETS)
    .filter((lm) => lm.active)
    .map((lm) => lm.slug);
}
