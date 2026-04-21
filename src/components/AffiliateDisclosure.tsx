import { Info } from "lucide-react";

export function AffiliateDisclosure() {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-[24px] p-6 my-10 flex items-start gap-4">
      <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
        <Info className="w-5 h-5 text-accent" />
      </div>
      <p className="text-sm text-slate-500 font-light leading-relaxed">
        <strong className="text-slate-700 font-semibold">Affiliate Disclosure:</strong>{" "}
        AirQualityNest is reader-supported. When you buy through links on our site,
        we may earn an affiliate commission at no additional cost to you. This funds
        our independent testing.{" "}
        <a href="/about" className="text-accent-dark underline underline-offset-2 hover:text-accent">
          Learn more
        </a>
      </p>
    </div>
  );
}
