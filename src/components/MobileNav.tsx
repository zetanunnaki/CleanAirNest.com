"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { href: "/best-picks", label: "Best Picks" },
  { href: "/reviews", label: "Reviews" },
  { href: "/guides", label: "Guides" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-xl hover:bg-slate-100/80 transition-colors"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
      >
        {open ? (
          <X className="w-5 h-5 text-slate-600" />
        ) : (
          <Menu className="w-5 h-5 text-slate-600" />
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <nav className="absolute right-4 top-full mt-2 w-[calc(100vw-2rem)] sm:w-64 max-w-[280px] bg-white border border-slate-200/60 rounded-2xl shadow-2xl shadow-slate-900/10 py-2 z-50 overflow-hidden animate-scale-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-5 py-3 text-sm font-medium text-slate-600 hover:bg-accent/5 hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-3 pt-2 pb-1 border-t border-slate-100 mt-1">
              <Link
                href="/best-picks/best-air-purifiers-for-allergies"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-accent to-cyan-500 text-white rounded-xl hover:opacity-90 transition-opacity shadow-md"
              >
                Find Your Purifier
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
