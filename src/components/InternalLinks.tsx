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
    <div className="my-14 bg-slate-50 border border-slate-100 rounded-[32px] p-8 md:p-10">
      <h3 className="font-display font-bold text-xl text-primary mb-6">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-accent/30 hover:shadow-md transition-all"
          >
            <div className="flex-1">
              <p className="font-semibold text-slate-900 group-hover:text-accent-dark transition-colors text-sm">
                {link.title}
              </p>
              <p className="text-xs text-slate-500 font-light mt-1">{link.description}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-accent flex-shrink-0 mt-1 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
