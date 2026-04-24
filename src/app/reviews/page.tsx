import { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { getReviews } from "@/lib/articles";
import { getAllProducts, getCategories } from "@/lib/products";
import { QuickCompareTable, getReviewSlug } from "@/components/QuickCompareTable";

export const metadata: Metadata = {
  title: "Product Reviews - In-Depth Air Quality Product Reviews",
  description:
    "Detailed reviews of air purifiers, air quality monitors, humidifiers, and dehumidifiers based on real customer feedback and expert analysis.",
  alternates: { canonical: "https://airqualitynest.com/reviews" },
};

export default function ReviewsPage() {
  const articles = getReviews();

  const allProducts = getAllProducts();
  const categories = getCategories();
  const productsByCategory = categories.map((category) => ({
    category,
    products: allProducts
      .filter((p) => p.category === category)
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
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
      })),
  }));

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Air Quality Product Reviews",
    "description": "Detailed reviews of air purifiers, air quality monitors, humidifiers, and dehumidifiers based on real customer feedback and expert analysis.",
    "url": "https://airqualitynest.com/reviews",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": articles.map((article, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": article.frontmatter.title,
        "url": `https://airqualitynest.com/reviews/${article.slug}`
      }))
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://airqualitynest.com" },
      { "@type": "ListItem", position: 2, name: "Reviews" },
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
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">In-Depth</span>
        </div>
        <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-serif font-bold tracking-tight text-primary mb-3 sm:mb-4">
          Product Reviews
        </h1>
        <p className="text-base sm:text-lg text-slate-500 font-light leading-relaxed">
          In-depth reviews based on customer feedback and expert analysis.
          We compare specs and real-world performance so you know what to expect.
        </p>
      </header>

      {productsByCategory.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-primary mb-3">
            Product Overview
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-light mb-8 sm:mb-10">
            Every product we&apos;ve covered, organized by category and sorted by rating.
          </p>
          <div className="space-y-12">
            {productsByCategory.map(({ category, products }) => (
              <div key={category}>
                <h3 className="text-xl font-display font-bold text-slate-800 mb-4">
                  {category}
                </h3>
                <QuickCompareTable products={products} keySpecLabel="Coverage / Key Spec" />
              </div>
            ))}
          </div>
        </section>
      )}

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              slug={article.slug}
              type="reviews"
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
