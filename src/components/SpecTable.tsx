import { BarChart3 } from "lucide-react";

interface SpecTableProps {
  title?: string;
  specs: Array<{ label: string; value: string }>;
}

export function SpecTable({ title, specs }: SpecTableProps) {
  if (!specs || !Array.isArray(specs) || specs.length === 0) return null;

  return (
    <div className="my-8 sm:my-10 bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center gap-2.5 px-4 sm:px-7 py-4 sm:py-5 border-b border-slate-100">
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary/8 rounded-lg flex items-center justify-center shrink-0">
          <BarChart3 className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-primary" />
        </div>
        <h3 className="font-display font-bold text-sm sm:text-base text-slate-900">
          {title || "Key Specifications"}
        </h3>
      </div>
      <div className="divide-y divide-slate-50">
        {specs.map((spec, i) => (
          <div
            key={i}
            className={`flex items-baseline justify-between gap-3 sm:gap-4 px-4 sm:px-7 py-3 sm:py-3.5 ${i % 2 === 0 ? "bg-slate-50/40" : ""}`}
          >
            <span className="text-xs sm:text-sm text-slate-500 font-medium shrink-0">{spec.label}</span>
            <span className="text-xs sm:text-sm text-slate-900 font-semibold text-right min-w-0">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
