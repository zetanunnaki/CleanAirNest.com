import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ProductCatalog } from "@/types";

export interface SearchEntry {
  title: string;
  description: string;
  slug: string;
  type: "review" | "guide" | "best-pick" | "product";
  category: string;
  url: string;
}

const contentDir = path.join(process.cwd(), "src/content");

type ContentType = "best-picks" | "reviews" | "guides";

function getArticleEntries(type: ContentType): SearchEntry[] {
  const dir = path.join(contentDir, type);
  if (!fs.existsSync(dir)) return [];

  const typeToLabel: Record<ContentType, SearchEntry["type"]> = {
    "best-picks": "best-pick",
    reviews: "review",
    guides: "guide",
  };

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(dir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      const slug = file.replace(".mdx", "");

      return {
        title: (data.title as string) || "",
        description: (data.description as string) || "",
        slug,
        type: typeToLabel[type],
        category: (data.category as string) || "",
        url: `/${type}/${slug}`,
      };
    });
}

function getProductEntries(): SearchEntry[] {
  const productsPath = path.join(process.cwd(), "src/data/products.json");
  if (!fs.existsSync(productsPath)) return [];

  const products: ProductCatalog = JSON.parse(
    fs.readFileSync(productsPath, "utf-8")
  );

  return Object.entries(products).map(([id, product]) => ({
    title: product.name,
    description: `${product.brand} - ${product.category}${product.badge ? ` - ${product.badge}` : ""}`,
    slug: id,
    type: "product" as const,
    category: product.category,
    url: `/reviews/${id}-review`,
  }));
}

export function buildSearchIndex(): SearchEntry[] {
  const entries = [
    ...getArticleEntries("best-picks"),
    ...getArticleEntries("reviews"),
    ...getArticleEntries("guides"),
    ...getProductEntries(),
  ];

  // Deduplicate by URL
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
