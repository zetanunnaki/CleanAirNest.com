import Image from "next/image";
import { getProduct } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, Award, TrendingUp } from "lucide-react";

interface ProductCardProps {
  productId: string;
  showBadge?: boolean;
  rank?: number;
}

export function ProductCard({ productId, showBadge = true, rank }: ProductCardProps) {
  const product = getProduct(productId);
  if (!product) return null;

  return (
    <div className="group relative bg-white border border-slate-100/80 rounded-3xl p-7 md:p-8 hover:shadow-2xl hover:shadow-slate-200/40 hover:border-accent/10 transition-all duration-500 mb-8">
      {rank && rank <= 3 && (
        <div className="absolute -top-4 left-8">
          <div className={`
            badge shadow-lg
            ${rank === 1 ? "bg-gradient-to-r from-accent to-cyan-500 text-white shadow-accent/25" : ""}
            ${rank === 2 ? "bg-slate-800 text-white shadow-slate-800/25" : ""}
            ${rank === 3 ? "bg-slate-500 text-white shadow-slate-500/25" : ""}
          `}>
            <Award className="w-3.5 h-3.5" />
            #{rank} {product.badge || "Pick"}
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-48 flex-shrink-0">
          <div className="w-full aspect-square bg-gradient-to-b from-slate-50 to-white rounded-2xl flex items-center justify-center overflow-hidden group-hover:bg-slate-50 transition-colors">
            <Image
              src={product.image}
              alt={`${product.brand} ${product.name}`}
              width={192}
              height={192}
              sizes="(max-width: 1024px) 100vw, 192px"
              className="w-full h-full object-contain rounded-2xl p-3 group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-1">
                {product.brand}
              </p>
              <h3 className="text-xl font-display font-bold text-slate-900 tracking-tight">
                {product.name}
              </h3>
            </div>
            <span className="text-2xl font-display font-bold text-slate-900 flex-shrink-0">
              {product.price}
            </span>
          </div>

          {product.rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating!)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-600">{product.rating}/5</span>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {Object.entries(product.specs)
              .filter(([, val]) => val && val !== "N/A")
              .slice(0, 4)
              .map(([key, val]) => (
                <div key={key} className="bg-slate-50/80 rounded-xl p-3">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-0.5">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">{val}</span>
                </div>
              ))}
          </div>

          <div className="flex flex-wrap gap-2.5">
            <a href={product.amazonLink} target="_blank" rel="noopener noreferrer nofollow">
              <Button variant="amazon" size="default">
                <TrendingUp className="w-3.5 h-3.5" />
                Check Price on Amazon
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>
            {product.walmartLink && (
              <a href={product.walmartLink} target="_blank" rel="noopener noreferrer nofollow">
                <Button variant="walmart" size="sm">
                  Walmart <ExternalLink className="w-3 h-3" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
