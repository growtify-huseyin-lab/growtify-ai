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

export const LEAD_MAGNETS: Record<string, LeadMagnet> = {};

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
