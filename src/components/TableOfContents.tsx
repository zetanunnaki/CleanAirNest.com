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
    <nav className="my-10 bg-white border border-slate-100 rounded-[28px] p-8">
      <h4 className="font-display font-bold text-sm uppercase tracking-widest text-accent mb-5">
        In This Article
      </h4>
      <ol className="space-y-3">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex items-start gap-3 text-base text-slate-500 hover:text-accent transition-colors group"
            >
              <span className="text-sm font-bold text-slate-300 group-hover:text-accent mt-0.5 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-light">{item.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
