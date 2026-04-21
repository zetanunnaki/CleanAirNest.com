interface TocItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="my-10 bg-white/80 backdrop-blur-sm border border-slate-100/80 rounded-2xl p-7">
      <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-accent mb-5">
        In This Article
      </h4>
      <ol className="space-y-2.5">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex items-start gap-3 text-sm text-slate-500 hover:text-accent transition-colors group"
            >
              <span className="text-xs font-bold text-slate-300 group-hover:text-accent mt-0.5 tabular-nums w-5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-light leading-snug">{item.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
