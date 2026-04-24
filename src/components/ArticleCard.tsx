import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, RefreshCw } from "lucide-react";
import type { ArticleFrontmatter } from "@/types";

interface ArticleCardProps {
  slug: string;
  type: "best-picks" | "reviews" | "guides";
  frontmatter: ArticleFrontmatter;
  featured?: boolean;
}

const typeLabels = {
  "best-picks": "Best Picks",
  "reviews": "Review",
  "guides": "Guide",
};

export function ArticleCard({ slug, type, frontmatter, featured }: ArticleCardProps) {
  const href = `/${type}/${slug}`;

  return (
    <Link href={href} className={`group block ${featured ? "md:col-span-2 md:row-span-2" : ""}`}>
      <article className={`border border-slate-200 rounded-lg overflow-hidden h-full flex ${featured ? "flex-col md:flex-row" : "flex-col"} hover:border-accent/30 transition-colors duration-300`}>
        <div className={`${featured ? "md:w-1/2" : ""} aspect-[16/10] ${featured ? "md:aspect-auto" : ""} bg-slate-100 relative overflow-hidden`}>
          <Image
            src={frontmatter.featuredImage}
            alt={`Featured image for ${frontmatter.title}`}
            fill
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 text-primary text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded">
              {frontmatter.category}
            </span>
          </div>
        </div>

        <div className={`p-4 sm:p-5 flex flex-col flex-1 ${featured ? "md:p-8 lg:p-10 md:justify-center" : ""}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              {typeLabels[type]}
            </span>
            {frontmatter.readingTime && (
              <>
                <span className="text-slate-300">&middot;</span>
                <span className="text-xs text-slate-400">
                  {frontmatter.readingTime} min
                </span>
              </>
            )}
          </div>
          <h3 className={`${featured ? "text-xl md:text-2xl lg:text-3xl" : "text-base lg:text-lg"} font-serif font-bold text-slate-900 group-hover:text-accent transition-colors duration-300 mb-2 line-clamp-2 tracking-tight leading-snug`}>
            {frontmatter.title}
          </h3>
          <p className={`${featured ? "text-base" : "text-sm"} text-slate-500 font-light mb-auto line-clamp-2 leading-relaxed`}>
            {frontmatter.description}
          </p>
          <div className="flex items-center justify-between text-sm mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-3 text-slate-400">
              <span className="flex items-center gap-1.5 text-xs">
                <Calendar className="w-3 h-3" />
                <time dateTime={frontmatter.date}>
                  {new Date(frontmatter.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </span>
              {frontmatter.updatedDate && (
                <span className="flex items-center gap-1 text-accent text-xs font-medium">
                  <RefreshCw className="w-3 h-3" />
                  Updated
                </span>
              )}
            </div>
            <span className="flex items-center gap-1.5 text-accent text-xs font-semibold group-hover:gap-2.5 transition-all duration-300">
              Read <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
