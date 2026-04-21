import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowUpRight, RefreshCw } from "lucide-react";
import type { ArticleFrontmatter } from "@/types";

interface ArticleCardProps {
  slug: string;
  type: "best-picks" | "reviews" | "guides";
  frontmatter: ArticleFrontmatter;
  featured?: boolean;
}

const typeColors = {
  "best-picks": { bar: "bg-gradient-to-b from-teal-400 to-emerald-600", overlay: "from-teal-900/40" },
  "reviews": { bar: "bg-gradient-to-b from-cyan-400 to-blue-600", overlay: "from-cyan-900/40" },
  "guides": { bar: "bg-gradient-to-b from-emerald-400 to-green-600", overlay: "from-emerald-900/40" },
};

export function ArticleCard({ slug, type, frontmatter, featured }: ArticleCardProps) {
  const href = `/${type}/${slug}`;
  const colors = typeColors[type];

  return (
    <Link href={href} className={`group block ${featured ? "md:col-span-2 md:row-span-2" : ""}`}>
      <article className={`card-elevated overflow-hidden h-full flex ${featured ? "flex-col md:flex-row" : "flex-col"} relative`}>
        {/* Type indicator bar */}
        <div className={`absolute top-0 left-0 w-1 h-full ${colors.bar} rounded-l-[28px] z-10`} />

        <div className={`${featured ? "md:w-1/2" : ""} aspect-[16/10] ${featured ? "md:aspect-auto" : ""} bg-slate-100 relative overflow-hidden`}>
          <Image
            src={frontmatter.featuredImage}
            alt={`Featured image for ${frontmatter.title}`}
            fill
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          {/* Category color overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t ${colors.overlay} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          {/* Read overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <span className="bg-white/95 backdrop-blur-sm text-primary text-sm font-bold px-6 py-3 rounded-full shadow-lg translate-y-3 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2">
              Read Article <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
            {frontmatter.category}
          </span>
        </div>

        <div className={`p-7 flex flex-col flex-1 ${featured ? "md:p-10 md:justify-center" : ""}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              {type.replace("-", " ")}
            </span>
            {frontmatter.readingTime && (
              <span className="text-xs text-slate-400 font-medium">
                {frontmatter.readingTime} min read
              </span>
            )}
          </div>
          <h3 className={`${featured ? "text-2xl md:text-3xl" : "text-lg"} font-display font-bold text-slate-900 group-hover:text-accent-dark transition-colors mb-3 line-clamp-2 tracking-tight`}>
            {frontmatter.title}
          </h3>
          <p className={`${featured ? "text-base" : "text-sm"} text-slate-500 font-light mb-5 flex-1 line-clamp-2 leading-relaxed`}>
            {frontmatter.description}
          </p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3 text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <time dateTime={frontmatter.date} className="font-light">
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
            <span className="flex items-center gap-1 text-accent font-semibold group-hover:gap-2 transition-all">
              Read <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
