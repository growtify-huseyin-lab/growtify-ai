import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllSectorSlugs } from "@/data/sectors";
import { getActiveLeadMagnetSlugs } from "@/content/lead-magnets";
import { REHBER_SLUGS } from "@/content/rehberler";
import { GUIDE_TR_TO_EN } from "@/content/rehberler/en";
import { BLOG_CATEGORIES } from "@/lib/blog-categories";

const baseUrl = "https://growtify.ai";

// NOTE: the site is currently globally noindex (layout robots:false). This sitemap is
// launch-ready infrastructure; it has no effect until indexing is enabled.

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
    bi("/kurumsal", 0.7),
    bi("/sektor", 0.8),
    // Guides: TR /rehber ↔ EN /en/guide (English-slug fork, CEO 2026-05-31)
    biAlt("/rehber", "/en/guide", 0.7),
    bi("/test", 0.7),
    bi("/hakkimizda", 0.6),
    bi("/iletisim", 0.5),
    bi("/gizlilik-politikasi", 0.3),
    bi("/kullanim-kosullari", 0.3),
    bi("/iade-politikasi", 0.3),
    bi("/cerez-politikasi", 0.3),
    // Layer 1 — Sector pages (EN data ready)
    ...getAllSectorSlugs().map((slug) => bi(`/sektor/${slug}`, 0.8)),
    // Lead magnets (EN data ready)
    ...getActiveLeadMagnetSlugs().map((slug) => bi(`/lead/${slug}`, 0.6)),
    // Sector guides: TR /rehber/{tr} ↔ EN /en/guide/{en} (Creative EN guide content ready)
    ...REHBER_SLUGS.map((slug) =>
      biAlt(`/rehber/${slug}`, `/en/guide/${GUIDE_TR_TO_EN[slug]}`, 0.6),
    ),
  ];

  // ---- TR-only (no EN version) ----
  const trContent: MetadataRoute.Sitemap = [
    // KVKK is TR-only (UK GDPR covers EN); /en/kvkk-aydinlatma 301s to /en/gizlilik-politikasi
    trOnly("/kvkk-aydinlatma", 0.3),
    trOnly("/blog", 0.8),
    ...getAllPosts().map((post) =>
      trOnly(`/blog/${post.slug}`, 0.7, new Date(post.date)),
    ),
    ...BLOG_CATEGORIES.map((c) => trOnly(`/blog/kategori/${c.slug}`, 0.5)),
  ];

  return [...bilingual, ...trContent];
}
