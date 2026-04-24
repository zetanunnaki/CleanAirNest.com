import { BarChart3 } from "lucide-react";

interface SpecTableProps {
  title?: string;
  specs: Array<{ label: string; value: string }>;
}

export function SpecTable({ title, specs }: SpecTableProps) {
  if (!specs || !Array.isArray(specs) || specs.length === 0) return null;

  return (
    <div className="my-10 bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center gap-2.5 px-7 py-5 border-b border-slate-100">
        <div className="w-9 h-9 bg-primary/8 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-[18px] h-[18px] text-primary" />
        </div>
        <h3 className="font-display font-bold text-base text-slate-900">
          {title || "Key Specifications"}
        </h3>
      </div>
      <div className="divide-y divide-slate-50">
        {specs.map((spec, i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-7 py-3.5 ${i % 2 === 0 ? "bg-slate-50/40" : ""}`}
          >
            <span className="text-sm text-slate-500 font-medium">{spec.label}</span>
            <span className="text-sm text-slate-900 font-semibold text-right">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
