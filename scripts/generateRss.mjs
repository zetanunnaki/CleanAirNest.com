import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const contentDir = path.join(rootDir, "src/content");

const SITE_URL = "https://airqualitynest.com";
const SITE_TITLE = "AirQualityNest";
const SITE_DESCRIPTION =
  "Expert reviews, comparisons, and guides for air purifiers, air quality monitors, humidifiers, and dehumidifiers.";

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

      return {
        title: data.title || slug,
        description: data.description || "",
        date: data.date || "2026-01-01",
        author: data.author || "CleanAir Team",
        category: data.category || "",
        url: `${SITE_URL}/${type}/${slug}`,
        type,
      };
    });
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateStr) {
  const d = new Date(dateStr);
  return d.toUTCString();
}

const allArticles = [
  ...getArticlesFromDir("reviews"),
  ...getArticlesFromDir("guides"),
  ...getArticlesFromDir("best-picks"),
].sort((a, b) => new Date(b.date) - new Date(a.date));

const items = allArticles
  .map(
    (article) => `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${article.url}</link>
      <guid isPermaLink="true">${article.url}</guid>
      <description>${escapeXml(article.description)}</description>
      <pubDate>${toRfc822(article.date)}</pubDate>
      <category>${escapeXml(article.type)}</category>
    </item>`
  )
  .join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${toRfc822(new Date().toISOString())}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

const outputPath = path.join(rootDir, "public/feed.xml");
fs.writeFileSync(outputPath, rss);
console.log(`RSS feed generated: ${allArticles.length} items → public/feed.xml`);
