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
  "best-picks": { accent: "bg-teal-500", text: "text-teal-600", overlay: "from-teal-900/50" },
  "reviews": { accent: "bg-cyan-500", text: "text-cyan-600", overlay: "from-cyan-900/50" },
  "guides": { accent: "bg-emerald-500", text: "text-emerald-600", overlay: "from-emerald-900/50" },
};

export function ArticleCard({ slug, type, frontmatter, featured }: ArticleCardProps) {
  const href = `/${type}/${slug}`;
  const colors = typeColors[type];

  return (
    <Link href={href} className={`group block ${featured ? "md:col-span-2 md:row-span-2" : ""}`}>
      <article className={`card-elevated overflow-hidden h-full flex ${featured ? "flex-col md:flex-row" : "flex-col"}`}>
        <div className={`${featured ? "md:w-1/2" : ""} aspect-[16/10] ${featured ? "md:aspect-auto" : ""} bg-slate-100 relative overflow-hidden`}>
          <Image
            src={frontmatter.featuredImage}
            alt={`Featured image for ${frontmatter.title}`}
            fill
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            className="object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${colors.overlay} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <span className="glass text-primary text-sm font-bold px-5 py-2.5 rounded-full shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2">
              Read Article <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="glass text-primary text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              {frontmatter.category}
            </span>
          </div>
        </div>

        <div className={`p-4 sm:p-6 flex flex-col flex-1 ${featured ? "md:p-8 lg:p-10 md:justify-center" : ""}`}>
          <div className="flex items-center gap-2 sm:gap-2.5 mb-2 sm:mb-3">
            <div className={`w-1.5 h-1.5 rounded-full ${colors.accent}`} />
            <span className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>
              {type.replace("-", " ")}
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
          <h3 className={`${featured ? "text-xl md:text-2xl lg:text-3xl" : "text-base lg:text-lg"} font-display font-bold text-slate-900 group-hover:text-accent transition-colors duration-300 mb-3 line-clamp-2 tracking-tight leading-snug`}>
            {frontmatter.title}
          </h3>
          <p className={`${featured ? "text-base" : "text-sm"} text-slate-500 font-light mb-auto line-clamp-2 leading-relaxed`}>
            {frontmatter.description}
          </p>
          <div className="flex items-center justify-between text-sm mt-5 pt-4 border-t border-slate-100/80">
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
            <span className="flex items-center gap-1 text-accent text-xs font-semibold group-hover:gap-2 transition-all duration-300">
              Read <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
