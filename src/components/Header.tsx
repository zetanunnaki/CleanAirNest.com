import Link from "next/link";
import { Wind, Menu, X } from "lucide-react";
import { SearchDialog } from "./SearchDialog";

const navLinks = [
  { href: "/best-picks", label: "Best Picks" },
  { href: "/reviews", label: "Reviews" },
  { href: "/guides", label: "Guides" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass-card header-border-gradient">
      <div className="fluid-container h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-accent/20">
            <Wind className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-primary">
            AirQualityNest
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 rounded-full transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <SearchDialog />
          <Link
            href="/best-picks/best-air-purifiers-for-allergies"
            className="hidden md:inline-flex ml-2 px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-accent to-cyan-500 text-white rounded-full hover:opacity-90 transition-opacity shadow-md shadow-accent/20"
          >
            Find Your Purifier
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <div className="md:hidden">
      <details className="group relative">
        <summary
          className="list-none cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-6 h-6 text-slate-700 group-open:hidden" aria-hidden="true" />
          <X className="w-6 h-6 text-slate-700 hidden group-open:block" aria-hidden="true" />
        </summary>
        <nav className="absolute right-0 top-full mt-3 w-72 bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-2xl shadow-slate-200/50 py-3 z-50 overflow-hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-6 py-3.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="px-4 pt-3 pb-2 border-t border-slate-100 mt-2">
            <Link
              href="/best-picks/best-air-purifiers-for-allergies"
              className="block text-center px-6 py-3 text-sm font-semibold bg-gradient-to-r from-accent to-cyan-500 text-white rounded-2xl hover:opacity-90 transition-opacity shadow-md"
            >
              Find Your Purifier
            </Link>
          </div>
        </nav>
      </details>
    </div>
  );
}
