import { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { getGuides } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Air Quality Guides - Learn About Indoor Air Quality",
  description:
    "Science-backed guides on indoor air quality, filtration technology, testing methods, and practical tips for healthier air at home.",
  openGraph: {
    title: "Air Quality Guides - Learn About Indoor Air Quality",
    description: "Science-backed guides on indoor air quality, filtration technology, testing methods, and practical tips for healthier air at home.",
    url: "https://airqualitynest.com/guides",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Air Quality Guides - Learn About Indoor Air Quality",
    description: "Science-backed guides on indoor air quality, filtration technology, testing methods, and practical tips for healthier air at home.",
  },
  alternates: { canonical: "https://airqualitynest.com/guides" },
};

export default function GuidesPage() {
  const articles = getGuides();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Air Quality Guides",
    "description": "Science-backed guides on indoor air quality, filtration technology, testing methods, and practical tips for healthier air at home.",
    "url": "https://airqualitynest.com/guides",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": articles.map((article, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": article.frontmatter.title,
        "url": `https://airqualitynest.com/guides/${article.slug}`
      }))
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://airqualitynest.com" },
      { "@type": "ListItem", position: 2, name: "Guides" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    <div className="fluid-container py-10 sm:py-14 md:py-20">
      <header className="max-w-3xl mb-10 sm:mb-16">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-[2px] bg-accent" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Learn</span>
        </div>
        <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-serif font-bold tracking-tight text-primary mb-4">
          Guides
        </h1>
        <p className="text-base sm:text-lg text-slate-500 font-light leading-relaxed">
          Science-backed guides to help you understand indoor air quality,
          choose the right products, and create a healthier home environment.
        </p>
      </header>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              slug={article.slug}
              type="guides"
              frontmatter={article.frontmatter}
            />
          ))}
        </div>
      ) : (
        <p className="text-slate-500 font-light text-lg">Coming soon.</p>
      )}
    </div>
    </>
  );
}
