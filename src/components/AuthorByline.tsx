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
    <div className="mt-10">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
        <Link href="/about/editorial-team" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
            <User className="w-4 h-4 text-accent" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-700 group-hover:text-accent transition-colors text-sm leading-tight">
              {author}
            </span>
            <span className="text-xs text-slate-400 leading-tight">Indoor Air Quality Expert</span>
          </div>
        </Link>
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <time dateTime={date}>{publishDate}</time>
        </span>
        {updateDate && (
          <span className="flex items-center gap-1.5 text-accent font-medium">
            <RefreshCw className="w-3.5 h-3.5" />
            Updated {updateDate}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {readingTime} min read
        </span>
      </div>
      <div className="flex items-center gap-2 mt-4 text-xs text-slate-400">
        <Shield className="w-3.5 h-3.5 text-accent" />
        <span>Independently tested &middot; No manufacturer influence &middot; <Link href="/about#how-we-test" className="underline underline-offset-2 hover:text-accent transition-colors">Our process</Link></span>
      </div>
    </div>
  );
}
