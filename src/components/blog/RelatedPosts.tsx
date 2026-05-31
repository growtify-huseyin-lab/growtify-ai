import { getTranslations } from "next-intl/server";
import { BlogCard } from "./BlogCard";
import type { BlogMeta } from "@/lib/blog-types";

export async function RelatedPosts({ posts }: { posts: BlogMeta[] }) {
  if (posts.length === 0) return null;

  const t = await getTranslations("RelatedPostsC");

  return (
    <div>
      <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
        {t("relatedPosts")}
      </h3>
      <div className="space-y-4">
        {posts.slice(0, 3).map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
