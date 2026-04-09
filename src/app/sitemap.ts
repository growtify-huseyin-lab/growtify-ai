import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllSectorSlugs } from "@/data/sectors";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://growtify.ai";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/growt-method`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/hakkimizda`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/iletisim`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/kurumsal`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/sektor`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/test`, lastModified: new Date(), priority: 0.8 },
  ];

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.7,
  }));

  const sectorPages: MetadataRoute.Sitemap = getAllSectorSlugs().map((slug) => ({
    url: `${baseUrl}/sektor/${slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [...staticPages, ...blogPosts, ...sectorPages];
}
