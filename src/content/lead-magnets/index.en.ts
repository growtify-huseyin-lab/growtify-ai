/**
 * Lead Magnet Content Catalog
 *
 * Every new lead magnet is added here. A single template (/lead/[slug])
 * is powered by this data. New magnet = new entry + asset file.
 *
 * Format types: pdf, checklist, template, video, prompt-pack
 * Assets: under /public/assets/lead/
 * GHL tag: gai_lm_{slug} — each magnet triggers its own nurture workflow
 *
 * Operations brief: /website/LEAD-MAGNET-OPS-BRIEF.md
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
    label: "PDF Guide",
    ctaVerb: "Download the Guide",
    ctaIcon: "FileDown",
    badge: "PDF",
  },
  checklist: {
    label: "Checklist",
    ctaVerb: "Get the Checklist",
    ctaIcon: "ListChecks",
    badge: "Checklist",
  },
  template: {
    label: "Template Pack",
    ctaVerb: "Download the Templates",
    ctaIcon: "FileDown",
    badge: "Template",
  },
  video: {
    label: "Video",
    ctaVerb: "Watch the Video",
    ctaIcon: "Play",
    badge: "Video",
  },
  "prompt-pack": {
    label: "Prompt Pack",
    ctaVerb: "Get the Prompts",
    ctaIcon: "FileDown",
    badge: "Prompt",
  },
};

// ═══════════════════════════════════════════════════════════
// LEAD MAGNET CATALOG
// To add a new magnet, add an entry here + drop the asset
// into the /public/assets/lead/ directory.
//
// Currently empty — filled in as daily-produced magnets are added.
// Operations brief: /website/LEAD-MAGNET-OPS-BRIEF.md
// E-Series nurture flow: marketing/platform/ghl/workflows/leadmagnet-e-series-guide.md
// ═══════════════════════════════════════════════════════════

export const LEAD_MAGNETS: Record<string, LeadMagnet> = {
  // ─────────────────────────────────────────────────────────
  // ai-baslangic-rehberi — First E-Series pilot lead magnet
  // PDF: scripts/lead-pdfs/content/ai-baslangic-rehberi.js
  // Build: node scripts/lead-pdfs/render.js ai-baslangic-rehberi
  // ─────────────────────────────────────────────────────────
  "ai-baslangic-rehberi": {
    slug: "ai-baslangic-rehberi",
    title: "Growing Your Business with AI: A Getting-Started Guide",
    subtitle:
      "5 AI tools + 3 practical scenarios + a 7-day action plan — free PDF",
    painHook:
      "Want to use AI but don't know where to start? This guide is made exactly for you.",
    format: "pdf",
    formatLabel: "PDF Guide",
    icon: "🚀",
    whatInside: [
      "5 AI tools — ChatGPT, Perplexity, Canva AI, Otter, Make",
      "3 practical use-case scenarios — from the beauty, real estate, and accounting industries",
      "A 7-day action plan — start today, see results next week",
      "Industry examples and copy-paste prompt suggestions",
      "Your next step: build your personal AI roadmap",
    ],
    targetProfile: "Every professional who wants to use AI in their business",
    assetUrl: "/assets/lead/ai-baslangic-rehberi.pdf",
    assetDelivery: "download",
    ghlTag: "gai_lm_ai_baslangic",
    active: true,
    createdAt: "2026-04-19",
    seo: {
      title: "AI Getting-Started Guide — Free PDF | Growtify.ai",
      description:
        "Start growing your business with AI. 5 AI tools, 3 practical scenarios, a 7-day action plan — download for free.",
    },
  },
};

// ═══════════════════════════════════════════════════════════
// HELPER FUNCTIONS
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

// EN English-slug taxonomy (CEO 2026-06-01): /en/lead/{tr} → /en/lead/{en}.
export const LEAD_TR_TO_EN: Record<string, string> = {
  "ai-baslangic-rehberi": "ai-starter-guide",
};
export const LEAD_EN_TO_TR: Record<string, string> = Object.fromEntries(
  Object.entries(LEAD_TR_TO_EN).map(([tr, en]) => [en, tr]),
);
