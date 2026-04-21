import { getProduct } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { RefreshCw, ExternalLink } from "lucide-react";

interface FilterReplacementCTAProps {
  productId: string;
}

export function FilterReplacementCTA({ productId }: FilterReplacementCTAProps) {
  const product = getProduct(productId);
  if (!product || !product.filterReplacementLink) return null;

  return (
    <div className="my-10 border border-accent/20 rounded-[32px] p-8 md:p-10 bg-gradient-to-br from-sky-50/80 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] rounded-full"></div>
      <div className="relative z-10 flex items-start gap-6">
        <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent/20 animate-float">
          <RefreshCw className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-display font-bold text-xl text-slate-900 mb-2">
            Time for a Filter Replacement?
          </h4>
          <p className="text-slate-500 text-base font-light leading-relaxed mb-5">
            The {product.name} needs a new filter{" "}
            <strong className="text-slate-900">{product.filterReplacementCycle?.toLowerCase() || "periodically"}</strong>.
            Genuine replacement filters maintain peak performance and keep your warranty intact.
          </p>
          <a
            href={product.filterReplacementLink}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <Button variant="accent" size="lg">
              Buy Replacement Filter
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
