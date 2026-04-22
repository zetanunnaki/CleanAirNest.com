import Link from "next/link";
import { Calendar, User, Clock, RefreshCw, Shield } from "lucide-react";

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
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-2 sm:gap-y-2.5 text-xs sm:text-sm text-slate-500">
        <Link href="/about/editorial-team" className="flex items-center gap-2 group">
          <div className="w-7 h-7 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/15 transition-colors">
            <User className="w-3.5 h-3.5 text-accent" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-700 group-hover:text-accent transition-colors text-sm leading-tight">
              {author}
            </span>
            <span className="text-[10px] text-slate-400 leading-tight">Indoor Air Quality Expert</span>
          </div>
        </Link>
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
        <span>Independent editorial &middot; Based on customer reviews</span>
      </div>
    </div>
  );
}
