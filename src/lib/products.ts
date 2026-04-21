import productsData from "@/data/products.json";
import type { Product, ProductCatalog } from "@/types";

const products = productsData as ProductCatalog;

export function getProduct(productId: string): Product | null {
  return products[productId] ?? null;
}

export function getProducts(productIds: string[]): (Product & { id: string })[] {
  return productIds
    .map((id) => {
      const product = products[id];
      return product ? { ...product, id } : null;
    })
    .filter((p): p is Product & { id: string } => p !== null);
}

export function getProductsByCategory(category: string): (Product & { id: string })[] {
  return Object.entries(products)
    .filter(([, product]) => product.category === category)
    .map(([id, product]) => ({ ...product, id }));
}

export function getAllProducts(): (Product & { id: string })[] {
  return Object.entries(products).map(([id, product]) => ({ ...product, id }));
}

export function getCategories(): string[] {
  const categories = new Set(Object.values(products).map((p) => p.category));
  return Array.from(categories);
}
