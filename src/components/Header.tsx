import Link from "next/link";
import { Wind, ArrowRight } from "lucide-react";
import { SearchDialog } from "./SearchDialog";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/best-picks", label: "Best Picks" },
  { href: "/reviews", label: "Reviews" },
  { href: "/guides", label: "Guides" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md header-border-gradient header-float">
      <div className="fluid-container h-[72px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-9 h-9 bg-gradient-to-br from-accent to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-accent/20">
              <Wind className="w-[18px] h-[18px] text-white" />
            </div>
          </div>
          <span className="text-lg font-display font-bold tracking-tight text-primary">
            AirQualityNest
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-pill">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block w-px h-6 bg-slate-200/60 mx-2" />
          <SearchDialog />
          <Link
            href="/best-picks/best-air-purifiers-for-allergies"
            className="hidden lg:inline-flex items-center gap-2 ml-2 px-5 py-2 text-sm font-semibold bg-gradient-to-r from-accent to-cyan-500 text-white rounded-full hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-px transition-all duration-300"
          >
            Find Your Purifier
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
