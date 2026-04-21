import { getProduct } from "@/lib/products";
import { Check, X } from "lucide-react";

interface ProsConsListProps {
  productId: string;
}

export function ProsConsList({ productId }: ProsConsListProps) {
  const product = getProduct(productId);
  if (!product) return null;

  return (
    <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-emerald-50/50 border border-emerald-100/80 rounded-2xl p-6">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
          <h4 className="font-display font-bold text-base text-emerald-900">What We Like</h4>
        </div>
        <ul className="space-y-2.5">
          {product.pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm">
              <span className="text-emerald-500 mt-0.5 font-bold text-xs">+</span>
              <span className="text-slate-700 font-light leading-relaxed">{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-red-50/50 border border-red-100/80 rounded-2xl p-6">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <X className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
          <h4 className="font-display font-bold text-base text-red-900">Could Be Better</h4>
        </div>
        <ul className="space-y-2.5">
          {product.cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm">
              <span className="text-red-500 mt-0.5 font-bold text-xs">&minus;</span>
              <span className="text-slate-700 font-light leading-relaxed">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
