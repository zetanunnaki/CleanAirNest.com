import type { MetadataRoute } from "next";
import { getBestPicks, getReviews, getGuides } from "@/lib/articles";

export const dynamic = "force-static";

const BASE_URL = "https://airqualitynest.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const bestPicks = getBestPicks();
  const reviews = getReviews();
  const guides = getGuides();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date("2026-05-07"),
    },
    {
      url: `${BASE_URL}/best-picks`,
      lastModified: new Date("2026-05-07"),
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: new Date("2026-05-07"),
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date("2026-05-07"),
    },
    {
      url: `${BASE_URL}/compare`,
      lastModified: new Date("2026-05-07"),
    },
    {
      url: `${BASE_URL}/guides/air-purifiers`,
      lastModified: new Date("2026-05-07"),
    },
    {
      url: `${BASE_URL}/guides/indoor-air-quality`,
      lastModified: new Date("2026-05-07"),
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date("2026-03-01"),
    },
    {
      url: `${BASE_URL}/about/editorial-team`,
      lastModified: new Date("2026-03-01"),
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date("2026-05-07"),
    },
    {
      url: `${BASE_URL}/disclosure`,
      lastModified: new Date("2026-05-07"),
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date("2025-01-15"),
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date("2025-01-15"),
    },
  ];

  const bestPickPages: MetadataRoute.Sitemap = bestPicks.map((article) => ({
    url: `${BASE_URL}/best-picks/${article.slug}`,
    lastModified: new Date(
      article.frontmatter.updatedDate || article.frontmatter.date
    ),
  }));

  const reviewPages: MetadataRoute.Sitemap = reviews.map((article) => ({
    url: `${BASE_URL}/reviews/${article.slug}`,
    lastModified: new Date(
      article.frontmatter.updatedDate || article.frontmatter.date
    ),
  }));

  const guidePages: MetadataRoute.Sitemap = guides.map((article) => ({
    url: `${BASE_URL}/guides/${article.slug}`,
    lastModified: new Date(
      article.frontmatter.updatedDate || article.frontmatter.date
    ),
  }));

  return [...staticPages, ...bestPickPages, ...reviewPages, ...guidePages];
}
