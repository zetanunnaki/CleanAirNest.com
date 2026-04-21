import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface InternalLink {
  title: string;
  href: string;
  description: string;
}

interface InternalLinksProps {
  title?: string;
  links: InternalLink[];
}

export function InternalLinks({ title = "Related Reading", links }: InternalLinksProps) {
  if (!links || links.length === 0) return null;

  return (
    <div className="my-14 bg-slate-50/80 border border-slate-100/80 rounded-2xl p-7 md:p-8">
      <h3 className="font-display font-bold text-lg text-primary mb-5">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-start gap-3 p-3.5 bg-white/80 rounded-xl border border-slate-100/60 hover:border-accent/20 hover:shadow-md transition-all duration-300"
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 group-hover:text-accent transition-colors text-sm leading-snug">
                {link.title}
              </p>
              <p className="text-xs text-slate-500 font-light mt-1 line-clamp-1">{link.description}</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-accent flex-shrink-0 mt-0.5 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
