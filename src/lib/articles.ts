import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Article, ArticleFrontmatter } from "@/types";

const contentDir = path.join(process.cwd(), "src/content");

type ContentType = "best-picks" | "reviews" | "guides";

function getArticlesFromDir(type: ContentType): Article[] {
  const dir = path.join(contentDir, type);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(dir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      return {
        slug: file.replace(".mdx", ""),
        frontmatter: data as ArticleFrontmatter,
        content,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getBestPicks(): Article[] {
  return getArticlesFromDir("best-picks");
}

export function getReviews(): Article[] {
  return getArticlesFromDir("reviews");
}

export function getGuides(): Article[] {
  return getArticlesFromDir("guides");
}

export function getAllArticles(): (Article & { type: ContentType })[] {
  const bestPicks = getBestPicks().map((a) => ({ ...a, type: "best-picks" as const }));
  const reviews = getReviews().map((a) => ({ ...a, type: "reviews" as const }));
  const guides = getGuides().map((a) => ({ ...a, type: "guides" as const }));
  return [...bestPicks, ...reviews, ...guides].sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getArticle(type: ContentType, slug: string): Article | null {
  const filePath = path.join(contentDir, type, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    slug,
    frontmatter: data as ArticleFrontmatter,
    content,
  };
}

export function getArticleSlugs(type: ContentType): string[] {
  const dir = path.join(contentDir, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));
}
