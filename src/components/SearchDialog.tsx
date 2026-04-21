"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, X, ArrowRight, FileText, Star, BookOpen } from "lucide-react";
import searchData from "@/data/searchIndex.json";

interface SearchEntry {
  title: string;
  description: string;
  slug: string;
  type: "review" | "guide" | "best-pick" | "product";
  category: string;
  url: string;
}

const fuse = new Fuse(searchData as SearchEntry[], {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "description", weight: 0.3 },
    { name: "category", weight: 0.2 },
  ],
  threshold: 0.4,
  includeMatches: true,
  minMatchCharLength: 2,
});

const typeConfig: Record<
  SearchEntry["type"],
  { label: string; color: string; bgColor: string; icon: typeof FileText }
> = {
  "best-pick": {
    label: "Best Picks",
    color: "text-amber-600",
    bgColor: "bg-amber-50 border-amber-100",
    icon: Star,
  },
  review: {
    label: "Reviews",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50 border-cyan-100",
    icon: FileText,
  },
  guide: {
    label: "Guides",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 border-emerald-100",
    icon: BookOpen,
  },
  product: {
    label: "Products",
    color: "text-purple-600",
    bgColor: "bg-purple-50 border-purple-100",
    icon: Star,
  },
};

const groupOrder: SearchEntry["type"][] = ["best-pick", "review", "guide", "product"];

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = query.length >= 2 ? fuse.search(query, { limit: 20 }) : [];
  const grouped = groupOrder
    .map((type) => ({ type, items: results.filter((r) => r.item.type === type) }))
    .filter((g) => g.items.length > 0);
  const flatResults = grouped.flatMap((g) => g.items);

  const open = useCallback(() => { setIsOpen(true); setQuery(""); setActiveIndex(0); }, []);
  const close = useCallback(() => { setIsOpen(false); setQuery(""); setActiveIndex(0); }, []);
  const navigateTo = useCallback((url: string) => { close(); router.push(url); }, [close, router]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); isOpen ? close() : open(); }
      if (e.key === "Escape" && isOpen) { e.preventDefault(); close(); }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, open, close]);

  useEffect(() => {
    if (isOpen) { const t = setTimeout(() => inputRef.current?.focus(), 50); return () => clearTimeout(t); }
  }, [isOpen]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((p) => Math.min(p + 1, flatResults.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex((p) => Math.max(p - 1, 0)); }
    else if (e.key === "Enter" && flatResults[activeIndex]) { e.preventDefault(); navigateTo(flatResults[activeIndex].item.url); }
  }

  useEffect(() => {
    const container = resultsRef.current;
    if (!container) return;
    const activeEl = container.querySelector(`[data-index="${activeIndex}"]`);
    if (activeEl) activeEl.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  useEffect(() => { setActiveIndex(0); }, [query]);

  if (!isOpen) {
    return (
      <>
        <button
          onClick={open}
          className="hidden md:flex items-center gap-2 px-3.5 py-2 text-sm text-slate-400 bg-slate-100/60 hover:bg-slate-100 border border-slate-200/50 rounded-xl transition-all hover:border-slate-300/60"
          aria-label="Search"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search...</span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-white border border-slate-200 rounded-md ml-2">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </button>
        <button onClick={open} className="md:hidden p-2 rounded-xl hover:bg-slate-100/80 transition-colors" aria-label="Search">
          <Search className="w-5 h-5 text-slate-500" />
        </button>
      </>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh]" onClick={close}>
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm search-backdrop-enter" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search articles, reviews, and guides"
        className="relative w-full max-w-xl mx-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-slate-400/20 border border-slate-200/60 overflow-hidden search-dialog-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-100">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search articles, reviews, and guides..."
            className="flex-1 text-sm text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <button onClick={close} className="shrink-0 p-1 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Close search">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div ref={resultsRef} className="max-h-[55vh] overflow-y-auto">
          {query.length < 2 ? (
            <div className="px-5 py-10 text-center">
              <div className="w-10 h-10 mx-auto mb-3 bg-slate-100 rounded-xl flex items-center justify-center">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-sm text-slate-500">Type at least 2 characters to search</p>
              <p className="text-xs text-slate-400 mt-1">Search across reviews, guides, and best picks</p>
            </div>
          ) : flatResults.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-slate-500">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-400 mt-1">Try a different search term</p>
            </div>
          ) : (
            <div className="py-1.5">
              {grouped.map((group) => {
                const config = typeConfig[group.type];
                const GroupIcon = config.icon;
                return (
                  <div key={group.type}>
                    <div className="px-5 pt-3 pb-1 flex items-center gap-2">
                      <GroupIcon className={`w-3 h-3 ${config.color}`} />
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${config.color}`}>{config.label}</span>
                      <span className="text-[10px] text-slate-400">({group.items.length})</span>
                    </div>
                    {group.items.map((result) => {
                      const globalIndex = flatResults.indexOf(result);
                      const isActive = globalIndex === activeIndex;
                      return (
                        <button
                          key={result.item.url}
                          data-index={globalIndex}
                          onClick={() => navigateTo(result.item.url)}
                          onMouseEnter={() => setActiveIndex(globalIndex)}
                          className={`w-full text-left px-5 py-2.5 flex items-start gap-3 transition-colors ${isActive ? "bg-accent/[0.06]" : "hover:bg-slate-50"}`}
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-sm font-medium truncate ${isActive ? "text-accent" : "text-slate-900"}`}>{result.item.title}</h4>
                            <p className="text-xs text-slate-500 line-clamp-1">{result.item.description}</p>
                            <span className={`inline-flex items-center mt-1 px-2 py-0.5 text-[10px] font-medium border rounded-md ${config.bgColor} ${config.color}`}>
                              {result.item.category}
                            </span>
                          </div>
                          <ArrowRight className={`w-3.5 h-3.5 mt-1 shrink-0 transition-opacity ${isActive ? "text-accent opacity-100" : "text-slate-300 opacity-0"}`} />
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-5 py-2 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 text-[10px] text-slate-400">
            {[
              { key: "↑↓", label: "Navigate" },
              { key: "⏎", label: "Open" },
              { key: "Esc", label: "Close" },
            ].map((hint) => (
              <span key={hint.label} className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 font-mono text-[10px] bg-white border border-slate-200 rounded">{hint.key}</kbd>
                {hint.label}
              </span>
            ))}
          </div>
          <span className="text-[10px] text-slate-400">
            {flatResults.length > 0 ? `${flatResults.length} result${flatResults.length === 1 ? "" : "s"}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
