import { ArticleCard } from "./ArticleCard";
import type { Article } from "@/types";

interface RelatedArticlesProps {
  articles: (Article & { type: "best-picks" | "reviews" | "guides" })[];
  currentSlug: string;
}

export function RelatedArticles({ articles, currentSlug }: RelatedArticlesProps) {
  const related = articles
    .filter((a) => a.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-24 pt-16 border-t border-slate-100">
      <h2 className="text-3xl font-display font-bold tracking-tight text-primary mb-10">
        Continue Reading
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map((article) => (
          <ArticleCard
            key={article.slug}
            slug={article.slug}
            type={article.type}
            frontmatter={article.frontmatter}
          />
        ))}
      </div>
    </section>
  );
}
