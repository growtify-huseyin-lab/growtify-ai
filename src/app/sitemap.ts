import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllSectorSlugs } from "@/data/sectors";
import { getActiveLeadMagnetSlugs } from "@/content/lead-magnets";
import { REHBER_SLUGS } from "@/content/rehberler";
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

// TR-only entry — for content that has no EN version yet (blog articles, rehber guides,
// blog categories). EN variants render TR content + canonical to TR, so we do NOT list
// /en URLs for them. Add bilingual entries here once EN content is produced.
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
    bi("/test", 0.7),
    bi("/hakkimizda", 0.6),
    bi("/iletisim", 0.5),
    bi("/gizlilik-politikasi", 0.3),
    bi("/kvkk-aydinlatma", 0.3),
    bi("/kullanim-kosullari", 0.3),
    bi("/iade-politikasi", 0.3),
    bi("/cerez-politikasi", 0.3),
    // Layer 1 — Sector pages (EN data ready)
    ...getAllSectorSlugs().map((slug) => bi(`/sektor/${slug}`, 0.8)),
    // Lead magnets (EN data ready)
    ...getActiveLeadMagnetSlugs().map((slug) => bi(`/lead/${slug}`, 0.6)),
  ];

  // ---- TR-only (no EN content yet — blog + rehber) ----
  const trContent: MetadataRoute.Sitemap = [
    trOnly("/blog", 0.8),
    ...getAllPosts().map((post) =>
      trOnly(`/blog/${post.slug}`, 0.7, new Date(post.date)),
    ),
    ...BLOG_CATEGORIES.map((c) => trOnly(`/blog/kategori/${c.slug}`, 0.5)),
    ...REHBER_SLUGS.map((slug) => trOnly(`/rehber/${slug}`, 0.6)),
  ];

  return [...bilingual, ...trContent];
}
