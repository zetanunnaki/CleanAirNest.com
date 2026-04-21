import Link from "next/link";
import { Home, Wind, Star, BookOpen, FileText, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-200/10 rounded-full blur-3xl" />

      <div className="relative fluid-container py-20 text-center">
        {/* Air quality themed icon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-accent/10 rounded-3xl rotate-6" />
          <div className="relative w-full h-full bg-gradient-to-br from-accent/15 to-indigo-100 rounded-3xl flex items-center justify-center">
            <Wind className="w-12 h-12 text-accent" aria-hidden="true" />
          </div>
          {/* Floating particles */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent/20 rounded-full animate-pulse" />
          <div className="absolute -bottom-1 -left-3 w-3 h-3 bg-indigo-300/30 rounded-full animate-pulse delay-500" />
        </div>

        <h1 className="text-7xl font-display font-bold text-primary mb-3 tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl font-display font-semibold text-slate-600 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-slate-500 font-light mb-10 max-w-lg mx-auto leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Try searching or explore our popular sections below.
        </p>

        {/* Search suggestion */}
        <div className="max-w-md mx-auto mb-12">
          <p className="text-sm text-slate-500 mb-3 flex items-center justify-center gap-2">
            <Search className="w-4 h-4" aria-hidden="true" />
            Try searching for what you need
          </p>
          <p className="text-xs text-slate-400">
            Press{" "}
            <kbd className="px-1.5 py-0.5 font-mono text-[10px] font-medium bg-white border border-slate-200 rounded-md">
              <span aria-label="Command">&#8984;</span>K
            </kbd>{" "}
            to open search
          </p>
        </div>

        {/* Navigation links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
          <Link
            href="/"
            className="group flex flex-col items-center gap-3 p-6 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-accent/10 transition-colors">
              <Home className="w-5 h-5 text-slate-500 group-hover:text-accent transition-colors" aria-hidden="true" />
            </div>
            <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">
              Home
            </span>
          </Link>

          <Link
            href="/reviews"
            className="group flex flex-col items-center gap-3 p-6 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-accent/10 transition-colors">
              <FileText className="w-5 h-5 text-slate-500 group-hover:text-accent transition-colors" aria-hidden="true" />
            </div>
            <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">
              Reviews
            </span>
          </Link>

          <Link
            href="/guides"
            className="group flex flex-col items-center gap-3 p-6 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-accent/10 transition-colors">
              <BookOpen className="w-5 h-5 text-slate-500 group-hover:text-accent transition-colors" aria-hidden="true" />
            </div>
            <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">
              Guides
            </span>
          </Link>

          <Link
            href="/best-picks"
            className="group flex flex-col items-center gap-3 p-6 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-amber-50 transition-colors">
              <Star className="w-5 h-5 text-slate-500 group-hover:text-amber-500 transition-colors" aria-hidden="true" />
            </div>
            <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">
              Best Picks
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
