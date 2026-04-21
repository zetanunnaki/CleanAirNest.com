import { Info } from "lucide-react";

export function AffiliateDisclosure() {
  return (
    <div className="bg-accent/[0.04] border border-accent/20 rounded-[24px] p-6 my-10 flex items-start gap-4">
      <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
        <Info className="w-5 h-5 text-accent" />
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">
        <strong className="text-slate-800 font-semibold">Affiliate Disclosure:</strong>{" "}
        AirQualityNest is reader-supported. When you buy through links on our site,
        we may earn an affiliate commission at no additional cost to you. This funds
        our independent testing.{" "}
        <a href="/about#affiliate-disclosure" className="text-accent-dark underline underline-offset-2 hover:text-accent font-medium">
          Learn more
        </a>
      </p>
    </div>
  );
}
