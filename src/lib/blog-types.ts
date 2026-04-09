export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  featured: boolean;
  sectorRef: string | null;
  content: string;
};

export type BlogMeta = Omit<BlogPost, "content">;
