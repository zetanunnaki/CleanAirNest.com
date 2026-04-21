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
    <div className="group relative bg-white border border-slate-100 rounded-[32px] p-8 md:p-10 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 mb-10">
      {rank && rank <= 3 && (
        <div className="absolute -top-5 left-10">
          <div className={`
            inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-display font-bold text-sm shadow-lg
            ${rank === 1 ? "bg-accent text-white shadow-accent/30" : ""}
            ${rank === 2 ? "bg-slate-800 text-white shadow-slate-800/30" : ""}
            ${rank === 3 ? "bg-slate-500 text-white shadow-slate-500/30" : ""}
          `}>
            <Award className="w-4 h-4" />
            #{rank} {product.badge || "Pick"}
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-56 flex-shrink-0">
          <div className="w-full aspect-square bg-slate-50 rounded-3xl flex items-center justify-center overflow-hidden group-hover:bg-slate-100 transition-colors">
            <Image
              src={product.image}
              alt={`${product.brand} ${product.name}`}
              width={224}
              height={224}
              sizes="(max-width: 1024px) 100vw, 224px"
              className="w-full h-full object-contain rounded-3xl p-4 group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="text-sm font-medium text-accent uppercase tracking-widest mb-1">
                {product.brand}
              </p>
              <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
                {product.name}
              </h3>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-3xl font-display font-bold text-slate-900">
                {product.price}
              </span>
            </div>
          </div>

          {product.rating && (
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating!)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-600">
                {product.rating}
              </span>
              <span className="text-sm text-slate-500">/5 rating</span>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Object.entries(product.specs)
              .filter(([, val]) => val && val !== "N/A")
              .slice(0, 4)
              .map(([key, val]) => (
                <div key={key} className="bg-slate-50 rounded-2xl p-3.5">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">{val}</span>
                </div>
              ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={product.amazonLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <Button variant="amazon" size="lg">
                <TrendingUp className="w-4 h-4" />
                Check Price on Amazon
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
            {product.walmartLink && (
              <a
                href={product.walmartLink}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <Button variant="walmart" size="default">
                  Walmart
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
