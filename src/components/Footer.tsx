import Link from "next/link";
import { Wind } from "lucide-react";
import { NewsletterSignup } from "./NewsletterSignup";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-primary text-white mt-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 overflow-hidden h-24 pointer-events-none">
        <svg className="absolute top-0 w-full h-24 text-wellness-bg" preserveAspectRatio="none" viewBox="0 0 1440 80" fill="currentColor">
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="absolute top-40 right-[10%] w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-[5%] w-72 h-72 bg-cyan-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="fluid-container pt-32 pb-12 border-b border-white/[0.06] relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white mb-3">
              Stay in the know
            </h2>
            <p className="text-slate-400 font-light leading-relaxed max-w-md">
              Independent air quality insights delivered weekly — no fluff, no spam.
            </p>
          </div>
          <div className="md:flex md:justify-end">
            <NewsletterSignup variant="footer" />
          </div>
        </div>
      </div>

      <div className="fluid-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-accent to-cyan-500 rounded-xl flex items-center justify-center">
                <Wind className="w-[18px] h-[18px] text-white" />
              </div>
              <span className="text-lg font-display font-bold tracking-tight">
                AirQualityNest
              </span>
            </div>
            <p className="text-slate-400 text-base font-light leading-relaxed max-w-sm mb-6">
              Independent, lab-backed reviews of air quality products. We buy
              every product we test. No sponsored content, ever.
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: "Pinterest", path: "M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.96s-.36-.72-.36-1.78c0-1.66.96-2.9 2.16-2.9 1.02 0 1.52.77 1.52 1.68 0 1.03-.66 2.57-.99 3.99-.28 1.19.59 2.16 1.76 2.16 2.12 0 3.75-2.23 3.75-5.46 0-2.85-2.05-4.85-4.97-4.85-3.39 0-5.38 2.54-5.38 5.17 0 1.02.4 2.12.89 2.72.1.12.11.22.08.34l-.33 1.36c-.05.22-.18.27-.41.16-1.55-.72-2.52-2.98-2.52-4.8 0-3.9 2.83-7.48 8.17-7.48 4.28 0 7.62 3.06 7.62 7.14 0 4.26-2.68 7.69-6.4 7.69-1.25 0-2.43-.65-2.83-1.42l-.77 2.94c-.28 1.07-1.03 2.42-1.54 3.24A12 12 0 1 0 12 0z", href: "https://pinterest.com/airqualitynest" },
                { label: "YouTube", path: "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z", href: "https://youtube.com/@airqualitynest" },
                { label: "Facebook", path: "M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z", href: "https://facebook.com/airqualitynest" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-9 h-9 bg-white/[0.06] hover:bg-accent rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                  aria-label={social.label}
                >
                  <svg className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d={social.path}/></svg>
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Content", links: [
              { href: "/best-picks", label: "Best Picks" },
              { href: "/reviews", label: "Reviews" },
              { href: "/guides", label: "Guides" },
            ]},
            { title: "Company", links: [
              { href: "/about", label: "About Us" },
              { href: "/about#how-we-test", label: "How We Test" },
              { href: "/about#affiliate-disclosure", label: "Disclosure" },
            ]},
            { title: "Categories", links: [
              { href: "/best-picks/best-air-purifiers-for-allergies", label: "Air Purifiers" },
              { href: "/reviews/airthings-view-plus-review", label: "Air Quality Monitors" },
              { href: "/best-picks/best-humidifiers", label: "Humidifiers" },
              { href: "/best-picks/best-dehumidifiers-for-basement", label: "Dehumidifiers" },
              { href: "/compare", label: "Compare Products" },
            ]},
          ].map((section) => (
            <div key={section.title} className={section.title === "Categories" ? "md:col-span-3" : "md:col-span-2"}>
              <h3 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-accent/80 mb-5">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-400 hover:text-white transition-colors duration-200 text-sm font-light">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} AirQualityNest. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs font-light">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span className="text-slate-600">Amazon Associate</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
