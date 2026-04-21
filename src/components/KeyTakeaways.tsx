import { Lightbulb } from "lucide-react";

interface KeyTakeawaysProps {
  points: string[];
}

export function KeyTakeaways({ points }: KeyTakeawaysProps) {
  if (!points || !Array.isArray(points) || points.length === 0) return null;
  return (
    <div className="my-10 bg-gradient-to-br from-accent/[0.05] via-cyan-50/30 to-transparent border border-accent/10 rounded-2xl p-7 md:p-8">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-9 h-9 bg-accent/12 rounded-lg flex items-center justify-center">
          <Lightbulb className="w-[18px] h-[18px] text-accent" />
        </div>
        <h3 className="font-display font-bold text-base text-slate-900">Key Takeaways</h3>
      </div>
      <ul className="space-y-3">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
            <span className="w-5 h-5 bg-accent text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              {i + 1}
            </span>
            <span className="font-light">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
