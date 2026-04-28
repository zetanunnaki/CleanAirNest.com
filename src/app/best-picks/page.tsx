import { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { getBestPicks } from "@/lib/articles";
import { getAllProducts } from "@/lib/products";
import { QuickCompareTable, getReviewSlug } from "@/components/QuickCompareTable";

export const metadata: Metadata = {
  title: "Best Picks - Top Air Quality Products",
  description:
    "Our expert-tested roundups of the best air purifiers, monitors, humidifiers, and dehumidifiers for every budget and room size.",
  openGraph: {
    title: "Best Picks - Top Air Quality Products",
    description: "Our expert-tested roundups of the best air purifiers, monitors, humidifiers, and dehumidifiers for every budget and room size.",
    url: "https://airqualitynest.com/best-picks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Picks - Top Air Quality Products",
    description: "Our expert-tested roundups of the best air purifiers, monitors, humidifiers, and dehumidifiers for every budget and room size.",
  },
  alternates: { canonical: "https://airqualitynest.com/best-picks" },
};

export default function BestPicksPage() {
  const articles = getBestPicks();

  const allProducts = getAllProducts();
  const topProducts = allProducts
    .filter((p) => p.rating !== undefined)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 8)
    .map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      rating: p.rating,
      badge: p.badge,
      amazonLink: p.amazonLink,
      keySpec: p.specs.coverage || p.specs.sensors || p.specs.capacity || "See review",
      reviewSlug: getReviewSlug(p.id),
    }));

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Best Air Quality Product Picks",
    "description": "Our expert-tested roundups of the best air purifiers, monitors, humidifiers, and dehumidifiers for every budget and room size.",
    "url": "https://airqualitynest.com/best-picks",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": articles.map((article, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": article.frontmatter.title,
        "url": `https://airqualitynest.com/best-picks/${article.slug}`
      }))
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://airqualitynest.com" },
      { "@type": "ListItem", position: 2, name: "Best Picks" },
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
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Curated</span>
        </div>
        <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-serif font-bold tracking-tight text-primary mb-4">
          Best Picks
        </h1>
        <p className="text-base sm:text-lg text-slate-500 font-light leading-relaxed">
          Our expert-tested roundups help you find the best air quality products
          for your specific needs, room size, and budget.
        </p>
      </header>

      {topProducts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-primary mb-3">
            Top Rated Products
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-light mb-8">
            Quick comparison of our highest-rated picks across all categories.
          </p>
          <QuickCompareTable products={topProducts} keySpecLabel="Coverage / Key Spec" />
        </section>
      )}

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              slug={article.slug}
              type="best-picks"
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
