import { Lightbulb } from "lucide-react";

interface KeyTakeawaysProps {
  points: string[];
}

export function KeyTakeaways({ points }: KeyTakeawaysProps) {
  if (!points || !Array.isArray(points) || points.length === 0) return null;
  return (
    <div className="my-10 bg-gradient-to-br from-accent/[0.06] to-cyan-50/50 border border-accent/15 rounded-[28px] p-8 md:p-10">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-accent/15 rounded-xl flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-accent" />
        </div>
        <h3 className="font-display font-bold text-lg text-slate-900">Key Takeaways</h3>
      </div>
      <ul className="space-y-3">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-3 text-base text-slate-700 leading-relaxed">
            <span className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              {i + 1}
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
