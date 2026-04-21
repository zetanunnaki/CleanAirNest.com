import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const contentDir = path.join(rootDir, "src/content");
const dataDir = path.join(rootDir, "src/data");

function getArticlesFromDir(type) {
  const dir = path.join(contentDir, type);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(dir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      const slug = file.replace(".mdx", "");

      const typeToLabel = {
        "best-picks": "best-pick",
        reviews: "review",
        guides: "guide",
      };

      return {
        title: data.title || "",
        description: data.description || "",
        slug,
        type: typeToLabel[type],
        category: data.category || "",
        url: `/${type}/${slug}`,
      };
    });
}

function getProductEntries() {
  const productsPath = path.join(dataDir, "products.json");
  if (!fs.existsSync(productsPath)) return [];

  const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

  return Object.entries(products).map(([id, product]) => ({
    title: product.name,
    description: `${product.brand} - ${product.category}${product.badge ? ` - ${product.badge}` : ""}`,
    slug: id,
    type: "product",
    category: product.category,
    url: `/reviews/${id}-review`,
  }));
}

const searchIndex = [
  ...getArticlesFromDir("best-picks"),
  ...getArticlesFromDir("reviews"),
  ...getArticlesFromDir("guides"),
  ...getProductEntries(),
];

// Deduplicate by URL
const seen = new Set();
const deduplicated = searchIndex.filter((entry) => {
  if (seen.has(entry.url)) return false;
  seen.add(entry.url);
  return true;
});

fs.writeFileSync(
  path.join(dataDir, "searchIndex.json"),
  JSON.stringify(deduplicated, null, 2)
);

console.log(`Search index generated: ${deduplicated.length} entries`);
