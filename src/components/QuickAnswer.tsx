import { MessageCircle } from "lucide-react";

interface QuickAnswerProps {
  question: string;
  answer: string;
}

export function QuickAnswer({ question, answer }: QuickAnswerProps) {
  return (
    <div className="my-10 bg-white border border-slate-200 rounded-[28px] p-8 md:p-10 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-display font-bold text-lg text-slate-900">Quick Answer</h3>
      </div>
      <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">{question}</p>
      <p className="text-lg text-slate-700 leading-relaxed font-light">{answer}</p>
    </div>
  );
}
