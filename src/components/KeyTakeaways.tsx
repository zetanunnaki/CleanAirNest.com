import { Lightbulb } from "lucide-react";

interface KeyTakeawaysProps {
  points: string[];
}

export function KeyTakeaways({ points }: KeyTakeawaysProps) {
  if (!points || !Array.isArray(points) || points.length === 0) return null;
  return (
    <div className="my-8 sm:my-10 bg-gradient-to-br from-accent/[0.05] via-cyan-50/30 to-transparent border border-accent/10 rounded-2xl p-4 sm:p-7 md:p-8">
      <div className="flex items-center gap-2 sm:gap-2.5 mb-4 sm:mb-5">
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-accent/12 rounded-lg flex items-center justify-center shrink-0">
          <Lightbulb className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-accent" />
        </div>
        <h3 className="font-display font-bold text-sm sm:text-base text-slate-900">Key Takeaways</h3>
      </div>
      <ul className="space-y-2.5 sm:space-y-3">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
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
