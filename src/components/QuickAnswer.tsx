import { MessageCircle } from "lucide-react";

interface QuickAnswerProps {
  question: string;
  answer: string;
}

export function QuickAnswer({ question, answer }: QuickAnswerProps) {
  return (
    <div className="my-8 sm:my-10 bg-white border border-slate-200/60 rounded-2xl p-4 sm:p-7 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary/8 rounded-lg flex items-center justify-center shrink-0">
          <MessageCircle className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-primary" />
        </div>
        <h3 className="font-display font-bold text-sm sm:text-base text-slate-900">Quick Answer</h3>
      </div>
      <p className="text-[10px] font-bold text-accent uppercase tracking-wider sm:tracking-[0.2em] mb-2">{question}</p>
      <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">{answer}</p>
    </div>
  );
}
