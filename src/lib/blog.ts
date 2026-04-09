import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogMeta } from "./blog-types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type { BlogPost, BlogMeta } from "./blog-types";

// In-memory cache — dosyaları bir kez oku, bellekte tut
let _metaCache: BlogMeta[] | null = null;
let _postCache: Map<string, BlogPost> | null = null;

function loadAllOnce(): { metas: BlogMeta[]; posts: Map<string, BlogPost> } {
  if (_metaCache && _postCache) return { metas: _metaCache, posts: _postCache };

  if (!fs.existsSync(BLOG_DIR)) {
    _metaCache = [];
    _postCache = new Map();
    return { metas: _metaCache, posts: _postCache };
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const metas: BlogMeta[] = [];
  const posts = new Map<string, BlogPost>();

  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const slug = data.slug || file.replace(".mdx", "");

    const meta: BlogMeta = {
      slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      category: data.category || "ai-donusum",
      author: data.author || "Growtify AI",
      date: data.date || "",
      readTime: data.readTime || "5 dk",
      seoTitle: data.seoTitle || data.title || "",
      seoDescription: data.seoDescription || data.excerpt || "",
      tags: data.tags || [],
      featured: data.featured || false,
      sectorRef: data.sectorRef || null,
    };

    metas.push(meta);
    posts.set(slug, { ...meta, content });
  }

  metas.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  _metaCache = metas;
  _postCache = posts;
  return { metas, posts };
}

export function getAllPosts(): BlogMeta[] {
  return loadAllOnce().metas;
}

export function getPostBySlug(slug: string): BlogPost | null {
  return loadAllOnce().posts.get(slug) ?? null;
}

export function getPostsByCategory(category: string): BlogMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostsBySector(sectorRef: string): BlogMeta[] {
  return getAllPosts().filter((p) => p.sectorRef === sectorRef);
}

export { BLOG_CATEGORIES } from "./blog-categories";
