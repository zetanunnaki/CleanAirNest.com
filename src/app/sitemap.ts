import type { MetadataRoute } from "next";
import { getBestPicks, getReviews, getGuides } from "@/lib/articles";

const BASE_URL = "https://airqualitynest.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const bestPicks = getBestPicks();
  const reviews = getReviews();
  const guides = getGuides();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/best-picks`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides/air-purifiers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides/indoor-air-quality`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/about/editorial-team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Best-picks articles
  const bestPickPages: MetadataRoute.Sitemap = bestPicks.map((article) => ({
    url: `${BASE_URL}/best-picks/${article.slug}`,
    lastModified: new Date(
      article.frontmatter.updatedDate || article.frontmatter.date
    ),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Review articles
  const reviewPages: MetadataRoute.Sitemap = reviews.map((article) => ({
    url: `${BASE_URL}/reviews/${article.slug}`,
    lastModified: new Date(
      article.frontmatter.updatedDate || article.frontmatter.date
    ),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Guide articles
  const guidePages: MetadataRoute.Sitemap = guides.map((article) => ({
    url: `${BASE_URL}/guides/${article.slug}`,
    lastModified: new Date(
      article.frontmatter.updatedDate || article.frontmatter.date
    ),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...bestPickPages, ...reviewPages, ...guidePages];
}
