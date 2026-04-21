import { MessageCircle } from "lucide-react";

interface QuickAnswerProps {
  question: string;
  answer: string;
}

export function QuickAnswer({ question, answer }: QuickAnswerProps) {
  return (
    <div className="my-10 bg-white border border-slate-200/60 rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 bg-primary/8 rounded-lg flex items-center justify-center">
          <MessageCircle className="w-[18px] h-[18px] text-primary" />
        </div>
        <h3 className="font-display font-bold text-base text-slate-900">Quick Answer</h3>
      </div>
      <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-2">{question}</p>
      <p className="text-base text-slate-700 leading-relaxed font-light">{answer}</p>
    </div>
  );
}
