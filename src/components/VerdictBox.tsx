import { Trophy, ThumbsUp, AlertTriangle } from "lucide-react";

interface VerdictBoxProps {
  verdict: string;
  product?: string;
  rating?: string;
  pros?: string[];
  cons?: string[];
}

export function VerdictBox({ verdict, product, rating, pros, cons }: VerdictBoxProps) {
  if (!verdict) return null;

  return (
    <div data-speakable="verdict" className="my-8 sm:my-10 bg-gradient-to-br from-emerald-50/80 via-white to-cyan-50/40 border border-emerald-200/40 rounded-2xl p-4 sm:p-7 md:p-8 shadow-sm">
      <div className="flex items-center flex-wrap gap-2 sm:gap-2.5 mb-4">
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-emerald-500/12 rounded-lg flex items-center justify-center shrink-0">
          <Trophy className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-emerald-600" />
        </div>
        <h3 className="font-display font-bold text-sm sm:text-base text-slate-900">
          Bottom Line
        </h3>
        {rating && (
          <span className="ml-auto text-xs sm:text-sm font-bold text-emerald-600 bg-emerald-500/10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">
            {rating}/5
          </span>
        )}
      </div>
      {product && (
        <p className="text-[10px] sm:text-xs font-bold text-accent uppercase tracking-wider sm:tracking-[0.2em] mb-2">
          {product}
        </p>
      )}
      <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium mb-4 sm:mb-5">
        {verdict}
      </p>
      {(pros?.length || cons?.length) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-emerald-100/60">
          {pros && pros.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="text-[10px] sm:text-xs font-bold text-emerald-600 uppercase tracking-widest">Strengths</span>
              </div>
              <ul className="space-y-1.5">
                {pros.map((pro, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-600 font-light flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5 shrink-0">+</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {cons && cons.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="text-[10px] sm:text-xs font-bold text-amber-600 uppercase tracking-widest">Weaknesses</span>
              </div>
              <ul className="space-y-1.5">
                {cons.map((con, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-600 font-light flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5 shrink-0">−</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
