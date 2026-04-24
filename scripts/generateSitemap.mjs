import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const contentDir = path.join(rootDir, "src/content");

const SITE_URL = "https://airqualitynest.com";

const STATIC_PAGES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/best-picks", changefreq: "weekly", priority: "0.8" },
  { path: "/reviews", changefreq: "weekly", priority: "0.8" },
  { path: "/guides", changefreq: "weekly", priority: "0.8" },
  { path: "/compare", changefreq: "weekly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.5" },
  { path: "/about/editorial-team", changefreq: "monthly", priority: "0.6" },
  { path: "/guides/air-purifiers", changefreq: "weekly", priority: "0.8" },
  { path: "/guides/indoor-air-quality", changefreq: "weekly", priority: "0.8" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

const CONTENT_CONFIG = {
  "best-picks": { changefreq: "monthly", priority: "0.9" },
  reviews: { changefreq: "monthly", priority: "0.9" },
  guides: { changefreq: "monthly", priority: "0.7" },
};

const COMPARISON_SLUGS = new Set([
  "coway-vs-winix",
  "coway-vs-levoit",
  "frigidaire-vs-ge-dehumidifier",
  "levoit-vs-blueair",
  "hepa-vs-ionic-air-purifier",
]);

function getContentPages(type) {
  const dir = path.join(contentDir, type);
  if (!fs.existsSync(dir)) return [];
  const config = CONTENT_CONFIG[type];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(dir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      const slug = file.replace(".mdx", "");
      const isComparison = type === "guides" && COMPARISON_SLUGS.has(slug);

      return {
        path: `/${type}/${slug}`,
        lastmod: data.date || data.lastUpdated || new Date().toISOString().split("T")[0],
        changefreq: config.changefreq,
        priority: isComparison ? "0.8" : config.priority,
      };
    });
}

function buildSitemap(pages) {
  const today = new Date().toISOString().split("T")[0];
  const urls = pages
    .map(
      (page) =>
        `  <url><loc>${SITE_URL}${page.path}</loc><lastmod>${page.lastmod || today}</lastmod><changefreq>${page.changefreq}</changefreq><priority>${page.priority}</priority></url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const today = new Date().toISOString().split("T")[0];
const staticPages = STATIC_PAGES.map((p) => ({ ...p, lastmod: today }));

const contentPages = [
  ...getContentPages("best-picks"),
  ...getContentPages("reviews"),
  ...getContentPages("guides"),
];

const allPages = [...staticPages, ...contentPages];
const sitemap = buildSitemap(allPages);

const outputPath = path.join(rootDir, "public/sitemap.xml");
fs.writeFileSync(outputPath, sitemap);
console.log(
  `Sitemap generated: ${allPages.length} URLs → public/sitemap.xml`
);
