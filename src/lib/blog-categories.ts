export const BLOG_CATEGORIES = [
  { slug: "ai-donusum", label: "AI Dönüşüm", labelEn: "AI Transformation" },
  { slug: "sektorel", label: "Sektörel", labelEn: "By Sector" },
  { slug: "growt-method", label: "GROWT Method", labelEn: "GROWT Method" },
  { slug: "basari-hikayeleri", label: "Başarı Hikayeleri", labelEn: "Success Stories" },
] as const;

// Locale-aware category label (single source — used by BlogCard, CategoryTabs, related posts).
export function getCategoryLabel(slug: string, locale: string): string {
  const c = BLOG_CATEGORIES.find((x) => x.slug === slug);
  if (!c) return slug;
  return locale === "en" ? c.labelEn : c.label;
}
