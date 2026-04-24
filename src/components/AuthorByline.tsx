import Link from "next/link";
import { Calendar, Clock, RefreshCw, Shield } from "lucide-react";

interface AuthorBylineProps {
  author: string;
  date: string;
  updatedDate?: string;
  readingTime: number;
}

export function AuthorByline({ author, date, updatedDate, readingTime }: AuthorBylineProps) {
  const publishDate = new Date(date).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
  const updateDate = updatedDate
    ? new Date(updatedDate).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric",
      })
    : null;

  return (
    <div className="mt-8 pt-6 border-t border-slate-200">
      <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-500">
        <Link href="/about/editorial-team" className="group">
          <span className="font-semibold text-slate-700 group-hover:text-accent transition-colors text-sm">
            {author}
          </span>
        </Link>
        <span className="text-slate-300">|</span>
        <span className="flex items-center gap-1.5 text-xs">
          <Calendar className="w-3.5 h-3.5" />
          <time dateTime={date}>{publishDate}</time>
        </span>
        {updateDate && (
          <span className="flex items-center gap-1.5 text-accent font-medium text-xs">
            <RefreshCw className="w-3 h-3" />
            Updated {updateDate}
          </span>
        )}
        <span className="flex items-center gap-1.5 text-xs">
          <Clock className="w-3.5 h-3.5" />
          {readingTime} min read
        </span>
      </div>
      <div className="flex items-center gap-2 mt-3 text-[11px] text-slate-400">
        <Shield className="w-3 h-3 text-accent" />
        <span>Independent editorial · Based on customer reviews</span>
      </div>
    </div>
  );
}
