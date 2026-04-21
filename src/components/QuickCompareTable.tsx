import { Star, ExternalLink } from "lucide-react";

interface QuickCompareProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  rating?: number;
  badge?: string;
  amazonLink: string;
  keySpec: string;
  reviewSlug: string;
}

interface QuickCompareTableProps {
  products: QuickCompareProduct[];
  columns?: ("category" | "rating" | "price" | "keySpec")[];
  keySpecLabel?: string;
}

const productIdToReviewSlug: Record<string, string> = {
  "coway-airmega-ap1512hh": "coway-airmega-ap1512hh-review",
  "airthings-view-plus": "airthings-view-plus-review",
  "levoit-core-400s": "levoit-core-400s-review",
  "levoit-core-300": "levoit-core-300-review",
  "blueair-blue-pure-211": "blueair-blue-pure-211-review",
  "winix-5500-2": "winix-5500-2-review",
  "honeywell-hpa300": "honeywell-hpa300-review",
  "levoit-lv600s": "levoit-lv600s-review",
  "frigidaire-ffad5033w1": "frigidaire-50-pint-review",
  "dreo-oversized-6l": "dreo-6l-humidifier-review",
  "midea-20-pint": "midea-20-pint-review",
  "dyson-purifier-big-quiet": "dyson-big-quiet-review",
  "honeywell-hev685w": "honeywell-hev685w-review",
  "amazon-air-quality-monitor": "amazon-air-quality-monitor-review",
  "awair-element": "awair-element-review",
  "ge-adel45ly": "ge-45-pint-review",
  "iqair-healthpro-plus": "iqair-healthpro-plus-review",
  "molekule-air-mini-plus": "molekule-air-mini-plus-review",
  "rabbit-air-minusa2": "rabbit-air-minusa2-review",
  "medify-ma40": "medify-ma40-review",
  "homelabs-4500": "homelabs-dehumidifier-review",
  "canopy-humidifier": "canopy-humidifier-review",
  "alen-breathesmart-45i": "alen-breathesmart-45i-review",
  "coway-airmega-400": "coway-airmega-400-review",
  "hathaspace-hsp001": "hathaspace-hsp001-review",
  "temtop-m10": "temtop-m10-review",
  "vornado-evdc300": "vornado-evdc300-review",
};

export function getReviewSlug(productId: string): string {
  return productIdToReviewSlug[productId] || productId;
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  return (
    <div className="flex items-center justify-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < fullStars
                ? "fill-amber-400 text-amber-400"
                : i === fullStars && hasHalf
                ? "fill-amber-400/50 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }`}
          />
        ))}
      </div>
      <span className="ml-1 font-semibold text-slate-900 text-sm">{rating}</span>
    </div>
  );
}

export function QuickCompareTable({
  products,
  columns = ["rating", "price", "keySpec"],
  keySpecLabel = "Coverage",
}: QuickCompareTableProps) {
  if (!products || products.length === 0) return null;

  const showCategory = columns.includes("category");

  return (
    <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm min-w-[640px]">
        <table className="w-full text-base border-collapse">
          <thead>
            <tr style={{ background: "linear-gradient(135deg, #020617, #1e293b)" }}>
              <th className="px-5 py-4 text-left text-white text-sm font-display font-bold uppercase tracking-wider rounded-tl-2xl">
                Product
              </th>
              {showCategory && (
                <th className="px-5 py-4 text-left text-white text-sm font-display font-bold uppercase tracking-wider">
                  Category
                </th>
              )}
              <th className="px-5 py-4 text-center text-white text-sm font-display font-bold uppercase tracking-wider">
                Rating
              </th>
              <th className="px-5 py-4 text-center text-white text-sm font-display font-bold uppercase tracking-wider">
                Price
              </th>
              <th className="px-5 py-4 text-center text-white text-sm font-display font-bold uppercase tracking-wider">
                {keySpecLabel}
              </th>
              <th className="px-5 py-4 text-center text-white text-sm font-display font-bold uppercase tracking-wider rounded-tr-2xl">
                &nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => {
              const isLast = i === products.length - 1;
              return (
                <tr
                  key={product.id}
                  className={`transition-colors duration-150 hover:bg-accent/[0.03] ${
                    i % 2 === 1 ? "bg-slate-50/60" : ""
                  }`}
                >
                  <td
                    className={`px-5 py-4 ${
                      !isLast ? "border-b border-slate-100" : ""
                    } ${isLast ? "rounded-bl-2xl" : ""}`}
                  >
                    <div className="flex flex-col gap-1">
                      <a
                        href={`/reviews/${product.reviewSlug}`}
                        className="font-semibold text-slate-900 hover:text-accent-dark transition-colors"
                      >
                        {product.name}
                      </a>
                      {product.badge && (
                        <span className="inline-block text-[11px] bg-accent/10 text-accent px-2.5 py-0.5 rounded-full font-semibold w-fit">
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </td>
                  {showCategory && (
                    <td
                      className={`px-5 py-4 text-slate-600 text-[15px] ${
                        !isLast ? "border-b border-slate-100" : ""
                      }`}
                    >
                      {product.category}
                    </td>
                  )}
                  <td
                    className={`px-5 py-4 text-center ${
                      !isLast ? "border-b border-slate-100" : ""
                    }`}
                  >
                    {product.rating ? (
                      <StarRating rating={product.rating} />
                    ) : (
                      <span className="text-slate-400">&mdash;</span>
                    )}
                  </td>
                  <td
                    className={`px-5 py-4 text-center font-display font-bold text-slate-900 ${
                      !isLast ? "border-b border-slate-100" : ""
                    }`}
                  >
                    {product.price}
                  </td>
                  <td
                    className={`px-5 py-4 text-center text-slate-600 text-[15px] ${
                      !isLast ? "border-b border-slate-100" : ""
                    }`}
                  >
                    {product.keySpec}
                  </td>
                  <td
                    className={`px-5 py-4 text-center ${
                      !isLast ? "border-b border-slate-100" : ""
                    } ${isLast ? "rounded-br-2xl" : ""}`}
                  >
                    <a
                      href={product.amazonLink}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-center gap-1.5 bg-[#FF9900] text-black hover:bg-[#e88b00] shadow-lg shadow-[#FF9900]/20 rounded-full font-bold h-9 px-4 text-sm transition-all active:scale-[0.98] whitespace-nowrap"
                    >
                      Buy on Amazon <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
