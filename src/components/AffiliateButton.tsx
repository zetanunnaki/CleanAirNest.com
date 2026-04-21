import { getProduct } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShoppingCart } from "lucide-react";

interface AffiliateButtonProps {
  productId: string;
  store?: "amazon" | "walmart";
  label?: string;
}

export function AffiliateButton({
  productId,
  store = "amazon",
  label,
}: AffiliateButtonProps) {
  const product = getProduct(productId);
  if (!product) return null;

  const link = store === "walmart" ? product.walmartLink : product.amazonLink;
  if (!link) return null;

  const defaultLabel =
    store === "walmart" ? "Check Price at Walmart" : "Check Price on Amazon";
  const variant = store === "walmart" ? "walmart" : "amazon";

  return (
    <div className="my-8 flex justify-center">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <Button variant={variant} size="xl">
          <ShoppingCart className="w-5 h-5" />
          {label || defaultLabel}
          <ExternalLink className="w-4 h-4" />
        </Button>
      </a>
    </div>
  );
}
