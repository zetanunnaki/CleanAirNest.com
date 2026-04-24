interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-16">
      <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-6 sm:mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-2.5 sm:space-y-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="group bg-white/80 backdrop-blur-sm border border-slate-100/80 rounded-xl sm:rounded-2xl overflow-hidden hover:border-accent/15 hover:shadow-md transition-all duration-300"
          >
            <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
              <span className="font-display font-semibold text-sm sm:text-base text-slate-900 pr-3 sm:pr-4 leading-snug">
                {item.question}
              </span>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-accent/8 flex items-center justify-center flex-shrink-0 group-open:bg-accent/15 transition-colors">
                <span className="text-accent text-base sm:text-lg font-light group-open:rotate-45 transition-transform duration-300">+</span>
              </span>
            </summary>
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
              <p className="text-slate-500 font-light leading-relaxed text-[13px] sm:text-[15px]">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
