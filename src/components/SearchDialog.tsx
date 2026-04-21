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
    color: "text-amber-700",
    bgColor: "bg-amber-50 border-amber-200",
    icon: Star,
  },
  review: {
    label: "Reviews",
    color: "text-accent",
    bgColor: "bg-blue-50 border-blue-200",
    icon: FileText,
  },
  guide: {
    label: "Guides",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50 border-emerald-200",
    icon: BookOpen,
  },
  product: {
    label: "Products",
    color: "text-purple-700",
    bgColor: "bg-purple-50 border-purple-200",
    icon: Star,
  },
};

const groupOrder: SearchEntry["type"][] = [
  "best-pick",
  "review",
  "guide",
  "product",
];

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = query.length >= 2 ? fuse.search(query, { limit: 20 }) : [];

  // Group results by type
  const grouped = groupOrder
    .map((type) => ({
      type,
      items: results.filter((r) => r.item.type === type),
    }))
    .filter((g) => g.items.length > 0);

  const flatResults = grouped.flatMap((g) => g.items);

  const open = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const navigateTo = useCallback(
    (url: string) => {
      close();
      router.push(url);
    },
    [close, router]
  );

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          close();
        } else {
          open();
        }
      }

      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        close();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, open, close]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the dialog is rendered
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Arrow key navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && flatResults[activeIndex]) {
      e.preventDefault();
      navigateTo(flatResults[activeIndex].item.url);
    }
  }

  // Scroll active item into view
  useEffect(() => {
    const container = resultsRef.current;
    if (!container) return;
    const activeEl = container.querySelector(`[data-index="${activeIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!isOpen) {
    return (
      <>
        {/* Desktop search button */}
        <button
          onClick={open}
          className="hidden md:flex items-center gap-2.5 px-4 py-2 text-sm text-slate-500 bg-slate-100/80 hover:bg-slate-100 border border-slate-200/60 rounded-xl transition-all hover:border-slate-300"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
          <span className="text-slate-400">Search...</span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-white border border-slate-200 rounded-md">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </button>

        {/* Mobile search button */}
        <button
          onClick={open}
          className="md:hidden p-2 rounded-xl hover:bg-slate-50 transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-slate-700" />
        </button>
      </>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]"
      onClick={close}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm search-backdrop-enter" />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search articles, reviews, and guides"
        className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl shadow-slate-300/50 border border-slate-200/60 overflow-hidden search-dialog-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search articles, reviews, and guides..."
            className="flex-1 text-base text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <button
            onClick={close}
            className="shrink-0 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close search"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Results */}
        <div ref={resultsRef} className="max-h-[60vh] overflow-y-auto">
          {query.length < 2 ? (
            <div className="px-5 py-12 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-slate-100 rounded-2xl flex items-center justify-center">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-sm text-slate-500">
                Type at least 2 characters to search
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Search across reviews, guides, and best picks
              </p>
            </div>
          ) : flatResults.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <p className="text-sm text-slate-500">
                No results found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Try a different search term
              </p>
            </div>
          ) : (
            <div className="py-2">
              {grouped.map((group) => {
                const config = typeConfig[group.type];
                const GroupIcon = config.icon;

                return (
                  <div key={group.type}>
                    <div className="px-5 pt-3 pb-1.5 flex items-center gap-2">
                      <GroupIcon className={`w-3.5 h-3.5 ${config.color}`} />
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${config.color}`}
                      >
                        {config.label}
                      </span>
                      <span className="text-xs text-slate-400">
                        ({group.items.length})
                      </span>
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
                          className={`w-full text-left px-5 py-3 flex items-start gap-3 transition-colors ${
                            isActive
                              ? "bg-accent/5"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <h4
                                className={`text-sm font-medium truncate ${
                                  isActive ? "text-accent" : "text-slate-900"
                                }`}
                              >
                                {result.item.title}
                              </h4>
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-1">
                              {result.item.description}
                            </p>
                            <span
                              className={`inline-flex items-center mt-1.5 px-2 py-0.5 text-[10px] font-medium border rounded-md ${config.bgColor} ${config.color}`}
                            >
                              {result.item.category}
                            </span>
                          </div>
                          <ArrowRight
                            className={`w-4 h-4 mt-1 shrink-0 transition-opacity ${
                              isActive
                                ? "text-accent opacity-100"
                                : "text-slate-300 opacity-0"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-2.5 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-white border border-slate-200 rounded">
                &#8593;&#8595;
              </kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-white border border-slate-200 rounded">
                &#9166;
              </kbd>
              Open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-white border border-slate-200 rounded">
                Esc
              </kbd>
              Close
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            {flatResults.length > 0
              ? `${flatResults.length} result${flatResults.length === 1 ? "" : "s"}`
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
