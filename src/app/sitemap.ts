import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllUpdates } from "@/lib/gelismeler";
import { getAllSectorSlugs } from "@/data/sectors";
import { getActiveLeadMagnetSlugs } from "@/content/lead-magnets";
import { LEAD_TR_TO_EN } from "@/content/lead-magnets/index.en";
import { REHBER_SLUGS } from "@/content/rehberler";
import { GUIDE_TR_TO_EN } from "@/content/rehberler/en";
import { SECTOR_TR_TO_EN } from "@/data/sectors.en";
import { BLOG_CATEGORIES, BLOG_CATEGORIES_EN } from "@/lib/blog-categories";

const baseUrl = "https://growtify.ai";

// Site is PUBLIC (launched) — layout robots index:true, robots.txt allows crawl.
// Funnel/lead pages (/test, /lead) keep their own page-level noindex.

// Bilingual entry — TR loc + tr/en/x-default hreflang. Use ONLY for pages that have real
// EN content (Layer-1 sector pages, lead magnets, static/legal — all fully translated).
function bi(
  path: string,
  priority: number,
  lastModified: Date = new Date(),
): MetadataRoute.Sitemap[number] {
  const tr = `${baseUrl}${path}`;
  const en = `${baseUrl}/en${path}`;
  return {
    url: tr,
    lastModified,
    priority,
    alternates: { languages: { tr, en, "x-default": tr } },
  };
}

// Bilingual entry where the EN path DIFFERS from the TR path (English-slug fork).
// e.g. /rehber → /en/guide, /rehber/hukuk → /en/guide/legal.
function biAlt(
  trPath: string,
  enPath: string,
  priority: number,
  lastModified: Date = new Date(),
): MetadataRoute.Sitemap[number] {
  const tr = `${baseUrl}${trPath}`;
  const en = `${baseUrl}${enPath}`;
  return {
    url: tr,
    lastModified,
    priority,
    alternates: { languages: { tr, en, "x-default": tr } },
  };
}

// TR-only entry — for content that has no EN version yet (blog articles, blog categories)
// and TR-only pages (KVKK: UK GDPR covers EN, so /en/kvkk-aydinlatma 301s to privacy).
function trOnly(
  path: string,
  priority: number,
  lastModified: Date = new Date(),
): MetadataRoute.Sitemap[number] {
  return { url: `${baseUrl}${path}`, lastModified, priority };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // ---- Bilingual (real EN content) ----
  const bilingual: MetadataRoute.Sitemap = [
    bi("", 1.0),
    bi("/growt-method", 0.9),
    bi("/test", 0.7),
    // EN English-slug taxonomy (CEO 2026-06-01): core + sektör + legal on English EN paths
    biAlt("/kurumsal", "/en/enterprise", 0.7),
    biAlt("/sektor", "/en/sectors", 0.8),
    biAlt("/hakkimizda", "/en/about", 0.6),
    biAlt("/iletisim", "/en/contact", 0.5),
    biAlt("/gizlilik-politikasi", "/en/privacy-policy", 0.3),
    biAlt("/kullanim-kosullari", "/en/terms-of-service", 0.3),
    biAlt("/iade-politikasi", "/en/refund-policy", 0.3),
    biAlt("/cerez-politikasi", "/en/cookie-policy", 0.3),
    // Guides: TR /rehber ↔ EN /en/guide (English-slug fork, CEO 2026-05-31)
    biAlt("/rehber", "/en/guide", 0.7),
    // Layer 1 — Sector pages: TR /sektor/{tr} ↔ EN /en/sectors/{en}
    ...getAllSectorSlugs().map((slug) =>
      biAlt(`/sektor/${slug}`, `/en/sectors/${SECTOR_TR_TO_EN[slug] ?? slug}`, 0.8),
    ),
    // Lead magnets: TR /lead/{tr} ↔ EN /en/lead/{en}
    ...getActiveLeadMagnetSlugs().map((slug) =>
      biAlt(`/lead/${slug}`, `/en/lead/${LEAD_TR_TO_EN[slug] ?? slug}`, 0.6),
    ),
    // Sector guides: TR /rehber/{tr} ↔ EN /en/guide/{en} (Creative EN guide content ready)
    ...REHBER_SLUGS.map((slug) =>
      biAlt(`/rehber/${slug}`, `/en/guide/${GUIDE_TR_TO_EN[slug]}`, 0.6),
    ),
  ];

  // ---- Blog ----
  const blog: MetadataRoute.Sitemap = [
    // Blog index is bilingual (TR + EN-native posts both exist)
    bi("/blog", 0.8),
    // TR posts (Turkish slugs) — EN-only standalone, no hreflang pair
    ...getAllPosts("tr").map((post) =>
      trOnly(`/blog/${post.slug}`, 0.7, new Date(post.date)),
    ),
    ...BLOG_CATEGORIES.map((c) => trOnly(`/blog/kategori/${c.slug}`, 0.5)),
    // EN-native posts (English slugs) at /en/blog/{en-slug}
    ...getAllPosts("en").map((post) =>
      trOnly(`/en/blog/${post.slug}`, 0.7, new Date(post.date)),
    ),
    ...BLOG_CATEGORIES_EN.map((c) => trOnly(`/en/blog/kategori/${c.slug}`, 0.5)),
  ];

  // ---- Gelişmeler (daily updates, TR-first) ----
  const gelismeler: MetadataRoute.Sitemap = [
    trOnly("/gelismeler", 0.6),
    ...getAllUpdates().map((u) =>
      trOnly(`/gelismeler/${u.slug}`, 0.5, new Date(u.date)),
    ),
  ];

  // ---- EN-only pillar pages ----
  // EN-native standalone pillars at top-level EN routes (no hreflang pair).
  // /en/growt-method is already emitted via bi("/growt-method") above, so only
  // the two standalone pillars are added here to avoid a duplicate.
  const pillars: MetadataRoute.Sitemap = [
    trOnly("/en/freelancer-consultant-agency-ai", 0.8),
    trOnly("/en/government-funding-ai-adoption", 0.8),
  ];

  // ---- TR-only ----
  const trContent: MetadataRoute.Sitemap = [
    // KVKK is TR-only (UK GDPR covers EN); /en/kvkk-aydinlatma 301s to /en/privacy-policy
    trOnly("/kvkk-aydinlatma", 0.3),
  ];

  return [...bilingual, ...blog, ...gelismeler, ...pillars, ...trContent];
}
