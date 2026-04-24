import { getProducts } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star } from "lucide-react";

interface ComparisonTableProps {
  productIds: string[];
}

export function ComparisonTable({ productIds }: ComparisonTableProps) {
  if (!productIds || !Array.isArray(productIds)) return null;
  const products = getProducts(productIds);
  if (products.length === 0) return null;

  const allSpecKeys = Array.from(
    new Set(products.flatMap((p) => Object.keys(p.specs)))
  ).filter((key) => products.some((p) => p.specs[key] && p.specs[key] !== "N/A"));

  return (
    <div className="my-10 sm:my-16 overflow-x-auto -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0">
      <div className="bg-white border border-slate-100 rounded-2xl sm:rounded-[32px] overflow-hidden shadow-sm min-w-[420px]">
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-gradient-to-r from-primary to-slate-800 text-white">
              <th className="p-3 sm:p-5 text-left font-display font-bold text-xs sm:text-sm uppercase tracking-widest sticky left-0 bg-gradient-to-r from-primary to-slate-800 z-10 min-w-[100px] sm:min-w-[140px]">
                Specs
              </th>
              {products.map((product) => (
                <th key={product.id} className="p-3 sm:p-5 text-center min-w-[120px]">
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                    <span className="font-display font-bold text-xs sm:text-sm line-clamp-2">{product.name}</span>
                    {product.badge && (
                      <span className="text-[10px] sm:text-[11px] bg-accent text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-semibold whitespace-nowrap">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-50">
              <td className="p-3 sm:p-5 font-semibold text-slate-900 bg-slate-50/50 sticky left-0 z-10 text-xs sm:text-base">Price</td>
              {products.map((product) => (
                <td key={product.id} className="p-3 sm:p-5 text-center font-display font-bold text-base sm:text-xl text-slate-900">
                  {product.price}
                </td>
              ))}
            </tr>
            <tr className="border-b border-slate-50">
              <td className="p-3 sm:p-5 font-semibold text-slate-900 bg-slate-50/50 sticky left-0 z-10 text-xs sm:text-base">Rating</td>
              {products.map((product) => (
                <td key={product.id} className="p-3 sm:p-5 text-center">
                  {product.rating ? (
                    <div className="flex items-center justify-center gap-1 sm:gap-1.5">
                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-sm sm:text-base">{product.rating}</span>
                    </div>
                  ) : "—"}
                </td>
              ))}
            </tr>
            {allSpecKeys.map((key, i) => (
              <tr key={key} className={`border-b border-slate-50 ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}>
                <td className="p-3 sm:p-5 font-semibold text-slate-900 bg-slate-50/50 capitalize sticky left-0 z-10 text-xs sm:text-base">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </td>
                {products.map((product) => (
                  <td key={product.id} className="p-3 sm:p-5 text-center text-slate-600 text-xs sm:text-base">
                    {product.specs[key] || "—"}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="p-3 sm:p-5 bg-slate-50/50 sticky left-0 z-10"></td>
              {products.map((product) => (
                <td key={product.id} className="p-3 sm:p-5 text-center">
                  <a
                    href={product.amazonLink}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    data-affiliate="amazon"
                    data-product-id={product.id}
                    data-cta="comparison-table"
                  >
                    <Button variant="amazon" size="sm">
                      View Deal <ExternalLink className="w-3 h-3" />
                    </Button>
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
