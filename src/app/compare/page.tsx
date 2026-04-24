import { Metadata } from "next";
import { getAllProducts, getCategories } from "@/lib/products";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ProductCard } from "@/components/ProductCard";
import { Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Compare Air Quality Products Side by Side",
  description:
    "Compare air purifiers, air quality monitors, humidifiers, and dehumidifiers side by side with specs, pricing, and expert ratings.",
  alternates: {
    canonical: "https://airqualitynest.com/compare",
  },
};

export default function ComparePage() {
  const allProducts = getAllProducts();
  const categories = getCategories();

  const productsByCategory = categories.map((cat) => ({
    category: cat,
    products: allProducts.filter((p) => p.category === cat),
  }));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://airqualitynest.com" },
      { "@type": "ListItem", position: 2, name: "Compare" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    <div className="fluid-container py-16 md:py-24">
      <header className="max-w-3xl mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
            <Scale className="w-6 h-6 text-accent" />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest text-accent">
            Side by Side
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tighter text-primary mb-4">
          Compare Products
        </h1>
        <p className="text-xl text-slate-500 font-light leading-relaxed">
          See how our tested products stack up against each other. Every spec,
          rating, and price in one place.
        </p>
      </header>

      {productsByCategory.map(({ category, products }) => (
        <section key={category} className="mb-24">
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 mb-10">
            {category}
          </h2>

          <ComparisonTable productIds={products.map((p) => p.id)} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
            {products.map((product, i) => (
              <ProductCard key={product.id} productId={product.id} rank={i + 1} />
            ))}
          </div>
        </section>
      ))}
    </div>
    </>
  );
}
