import { getProduct } from "@/lib/products";
import { Check, X } from "lucide-react";

interface ProsConsListProps {
  productId: string;
}

export function ProsConsList({ productId }: ProsConsListProps) {
  const product = getProduct(productId);
  if (!product) return null;

  return (
    <div className="my-8 sm:my-10 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
      <div className="bg-emerald-50/50 border border-emerald-100/80 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-500 rounded-lg flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={3} />
          </div>
          <h4 className="font-display font-bold text-sm sm:text-base text-emerald-900">What We Like</h4>
        </div>
        <ul className="space-y-2 sm:space-y-2.5">
          {product.pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm">
              <span className="text-emerald-500 mt-0.5 font-bold text-xs shrink-0">+</span>
              <span className="text-slate-700 font-light leading-relaxed">{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-red-50/50 border border-red-100/80 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-500 rounded-lg flex items-center justify-center shrink-0">
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={3} />
          </div>
          <h4 className="font-display font-bold text-sm sm:text-base text-red-900">Could Be Better</h4>
        </div>
        <ul className="space-y-2 sm:space-y-2.5">
          {product.cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm">
              <span className="text-red-500 mt-0.5 font-bold text-xs shrink-0">&minus;</span>
              <span className="text-slate-700 font-light leading-relaxed">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
