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
// ═══════════════════════════════════════════════════════════

export const LEAD_MAGNETS: Record<string, LeadMagnet> = {
  // ── ÖRNEK: İlk lead magnet (aktif olmayan demo) ──────────
  "ai-baslangic-rehberi": {
    slug: "ai-baslangic-rehberi",
    title: "Yapay Zeka ile İşini Büyütme: Başlangıç Rehberi",
    subtitle:
      "Sektörüne özel 5 AI aracı + ilk 7 gün aksiyon planı — ücretsiz PDF",
    painHook:
      "Yapay zeka kullanmak istiyorsun ama nereden başlayacağını bilmiyor musun? Bu rehber tam sana göre.",
    format: "pdf",
    formatLabel: "PDF Rehber",
    icon: "🚀",
    whatInside: [
      "5 AI aracı — işine en uygun olanlar, neden ve nasıl",
      "3 pratik uygulama senaryosu — adım adım, screenshot'lı",
      "İlk 7 gün aksiyon planı — bugün başla, haftaya sonuç gör",
      "Kopyala-yapıştır prompt şablonları — hemen kullanmaya başla",
      "Sektörel örnekler — sağlık, hukuk, güzellik, emlak ve daha fazlası",
    ],
    targetProfile: "Yapay zekayı işinde kullanmak isteyen tüm profesyoneller",
    assetUrl: "/assets/lead/ai-baslangic-rehberi.pdf",
    assetDelivery: "download",
    ghlTag: "gai_lm_ai_baslangic",
    active: true, // TEST: uçtan uca doğrulama için aktif
    createdAt: "2026-04-14",
    seo: {
      title: "Yapay Zeka Başlangıç Rehberi — Ücretsiz PDF | Growtify.ai",
      description:
        "Yapay zeka ile işini büyütmeye başla. 5 AI aracı, 3 uygulama senaryosu, 7 günlük aksiyon planı — ücretsiz indir.",
    },
  },

  "50-ai-prompt-paketi": {
    slug: "50-ai-prompt-paketi",
    title: "50 AI Prompt Paketi: Mesleğine Özel",
    subtitle:
      "Kopyala-yapıştır hazır 50 prompt — içerik üretiminden müşteri iletişimine",
    painHook:
      "AI'a ne soracağını bilemiyor musun? Bu 50 prompt ile hemen sonuç almaya başla.",
    format: "prompt-pack",
    formatLabel: "Prompt Paketi",
    icon: "🤖",
    whatInside: [
      "10 içerik üretim prompt'u — blog, sosyal medya, email",
      "10 müşteri iletişim prompt'u — yanıt, takip, teklif",
      "10 analiz prompt'u — pazar, rakip, performans",
      "10 otomasyon prompt'u — workflow, sistem, planlama",
      "10 strateji prompt'u — büyüme, fiyatlama, konumlama",
    ],
    targetProfile: "Tüm sektörlerdeki bireysel profesyoneller",
    assetUrl: "/assets/lead/50-ai-prompt-paketi.pdf",
    assetDelivery: "download",
    ghlTag: "gai_lm_prompt_paketi",
    active: false,
    createdAt: "2026-04-14",
    seo: {
      title: "50 AI Prompt Paketi — Ücretsiz İndir | Growtify.ai",
      description:
        "Mesleğine özel 50 AI prompt'u. İçerik üretimi, müşteri iletişimi, analiz ve otomasyon — kopyala yapıştır hazır.",
    },
  },

  "haftalik-ai-icerik-plani": {
    slug: "haftalik-ai-icerik-plani",
    title: "AI ile 30 Günlük İçerik Planı Şablonu",
    subtitle: "Instagram, LinkedIn, Blog — 30 günlük hazır içerik takvimi",
    painHook:
      "Her gün 'bugün ne paylaşsam' diye mi düşünüyorsun? Bu şablon ile 30 gün hazır.",
    format: "template",
    formatLabel: "Şablon Paketi",
    icon: "📅",
    whatInside: [
      "30 günlük içerik takvimi — kanal bazlı planlanmış",
      "Her gün için konu + format + CTA önerisi",
      "AI ile içerik üretim prompt'ları — her post için hazır",
      "Hashtag stratejisi — sektöre özel hashtag setleri",
      "Performans takip tablosu — neyin çalıştığını ölç",
    ],
    targetProfile:
      "Instagram, LinkedIn veya blog ile müşteri çekmek isteyen profesyoneller",
    assetUrl: "/assets/lead/haftalik-ai-icerik-plani.pdf",
    assetDelivery: "download",
    ghlTag: "gai_lm_icerik_plani",
    active: false,
    createdAt: "2026-04-14",
    seo: {
      title:
        "AI ile 30 Günlük İçerik Planı — Ücretsiz Şablon | Growtify.ai",
      description:
        "30 günlük hazır içerik takvimi. Instagram, LinkedIn, blog — AI prompt'larıyla birlikte. Ücretsiz indir.",
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
