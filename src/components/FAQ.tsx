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
      <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 mb-10">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <details
            key={i}
            className="group bg-white border border-slate-100 rounded-[20px] overflow-hidden hover:shadow-md transition-shadow"
          >
            <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
              <span className="font-display font-semibold text-lg text-slate-900 pr-4">
                {item.question}
              </span>
              <span className="text-accent text-2xl font-light flex-shrink-0 group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <div className="px-6 pb-6 pt-0">
              <p className="text-slate-500 font-light leading-relaxed">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
