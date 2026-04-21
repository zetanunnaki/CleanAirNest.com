import { FileText } from "lucide-react";

interface SourceCitationProps {
  sources: Array<{
    name: string;
    url?: string;
    detail?: string;
  }>;
}

export function SourceCitation({ sources }: SourceCitationProps) {
  if (!sources || !Array.isArray(sources) || sources.length === 0) return null;
  return (
    <div className="my-10 bg-slate-50/80 border border-slate-100/80 rounded-2xl p-6 md:p-7">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-4 h-4 text-slate-400" />
        <h4 className="font-display font-bold text-xs text-slate-600 uppercase tracking-[0.15em]">Sources & References</h4>
      </div>
      <ol className="space-y-2 list-decimal list-inside">
        {sources.map((source, i) => (
          <li key={i} className="text-sm text-slate-500 leading-relaxed">
            {source.url ? (
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-accent-dark underline underline-offset-2 hover:text-accent">
                {source.name}
              </a>
            ) : (
              <span className="text-slate-600 font-medium">{source.name}</span>
            )}
            {source.detail && <span className="text-slate-400"> — {source.detail}</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}
