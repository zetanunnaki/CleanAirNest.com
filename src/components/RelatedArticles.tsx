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
    <section className="mt-20 pt-14 border-t-2 border-slate-200">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-[2px] bg-accent" />
        <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-primary">
          Continue Reading
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
