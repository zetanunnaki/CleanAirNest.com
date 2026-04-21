import { ExternalLink } from "lucide-react";

interface SourceProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

export function Source({ href, label, children }: SourceProps) {
  return (
    <blockquote className="not-prose my-6 border-l-4 border-accent/30 bg-accent/5 rounded-r-2xl p-6">
      <p className="text-slate-700 font-light leading-relaxed mb-3 text-[0.95rem]">
        {children}
      </p>
      <cite className="not-italic">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          {label}
        </a>
      </cite>
    </blockquote>
  );
}
