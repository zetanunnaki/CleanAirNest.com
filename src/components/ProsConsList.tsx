import { getProduct } from "@/lib/products";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface ProsConsListProps {
  productId: string;
}

export function ProsConsList({ productId }: ProsConsListProps) {
  const product = getProduct(productId);
  if (!product) return null;

  return (
    <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="bg-emerald-50/60 border border-emerald-100 rounded-[24px] p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
            <ThumbsUp className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-display font-bold text-lg text-emerald-900">What We Like</h4>
        </div>
        <ul className="space-y-3">
          {product.pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-3 text-base">
              <span className="text-emerald-500 mt-1 font-bold">+</span>
              <span className="text-slate-700 font-light">{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-red-50/60 border border-red-100 rounded-[24px] p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
            <ThumbsDown className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-display font-bold text-lg text-red-900">Could Be Better</h4>
        </div>
        <ul className="space-y-3">
          {product.cons.map((con, i) => (
            <li key={i} className="flex items-start gap-3 text-base">
              <span className="text-red-500 mt-1 font-bold">&minus;</span>
              <span className="text-slate-700 font-light">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
