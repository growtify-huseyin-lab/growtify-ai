import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogMeta } from "./blog-types";

// TR posts live flat in content/blog/*.mdx; EN posts (EN-native, not translations)
// live in content/blog/en/*.mdx. readdirSync on the TR dir ignores the `en` subdir
// (it is not a .mdx file), so TR loading is unaffected.
const BLOG_DIRS: Record<string, string> = {
  tr: path.join(process.cwd(), "content/blog"),
  en: path.join(process.cwd(), "content/blog/en"),
};

export type { BlogPost, BlogMeta } from "./blog-types";

// Per-locale in-memory cache.
const _cache: Record<string, { metas: BlogMeta[]; posts: Map<string, BlogPost> }> = {};

function loadLocale(locale: string): { metas: BlogMeta[]; posts: Map<string, BlogPost> } {
  const loc = locale === "en" ? "en" : "tr";
  if (_cache[loc]) return _cache[loc];

  const dir = BLOG_DIRS[loc];
  if (!fs.existsSync(dir)) {
    _cache[loc] = { metas: [], posts: new Map() };
    return _cache[loc];
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const metas: BlogMeta[] = [];
  const posts = new Map<string, BlogPost>();

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);
    const slug = data.slug || file.replace(".mdx", "");

    const meta: BlogMeta = {
      slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      category: data.category || (loc === "en" ? "industry-guides" : "ai-donusum"),
      author: data.author || "Growtify AI",
      date: data.date || "",
      readTime: data.readTime || (loc === "en" ? "5 min read" : "5 dk"),
      seoTitle: data.seoTitle || data.title || "",
      seoDescription: data.seoDescription || data.excerpt || "",
      tags: data.tags || [],
      featured: data.featured || false,
      sectorRef: data.sectorRef || null,
      locale: data.locale || loc,
    };

    metas.push(meta);
    posts.set(slug, { ...meta, content });
  }

  metas.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  _cache[loc] = { metas, posts };
  return _cache[loc];
}

export function getAllPosts(locale: string = "tr"): BlogMeta[] {
  return loadLocale(locale).metas;
}

export function getPostBySlug(slug: string, locale: string = "tr"): BlogPost | null {
  return loadLocale(locale).posts.get(slug) ?? null;
}

export function getPostsByCategory(category: string, locale: string = "tr"): BlogMeta[] {
  return getAllPosts(locale).filter((p) => p.category === category);
}

export function getPostsBySector(sectorRef: string, locale: string = "tr"): BlogMeta[] {
  return getAllPosts(locale).filter((p) => p.sectorRef === sectorRef);
}

export { BLOG_CATEGORIES } from "./blog-categories";
