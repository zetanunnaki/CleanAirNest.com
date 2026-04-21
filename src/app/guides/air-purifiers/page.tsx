import { Metadata } from "next";
import Link from "next/link";
import { Wind, ArrowRight, BookOpen, Search, Award } from "lucide-react";
import { getGuides, getReviews, getBestPicks } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Air Purifier Guide Hub - Everything You Need to Know",
  description:
    "Your complete resource for air purifiers: how HEPA filters work, sizing guides, placement tips, head-to-head comparisons, in-depth reviews, and our expert best-picks for every budget and room size.",
  alternates: {
    canonical: "https://airqualitynest.com/guides/air-purifiers",
  },
};

const airPurifierGuides = [
  "hepa-filter-explained",
  "do-air-purifiers-really-work",
  "air-purifier-sizing-guide",
  "air-purifier-placement-guide",
  "air-purifier-vs-humidifier",
  "hepa-vs-ionic-air-purifier",
  "how-to-reduce-dust-in-your-home",
  "best-air-purifier-for-apartment",
  "best-air-purifier-for-baby-nursery",
  "best-air-purifier-for-mold",
  "best-air-purifier-for-pets",
  "best-air-purifier-for-smoke",
  "coway-vs-levoit",
  "coway-vs-winix",
];

const airPurifierReviews = [
  "coway-airmega-ap1512hh-review",
  "coway-airmega-400-review",
  "levoit-core-400s-review",
  "levoit-core-300-review",
  "blueair-blue-pure-211-review",
  "winix-5500-2-review",
  "honeywell-hpa300-review",
  "dyson-big-quiet-review",
  "iqair-healthpro-plus-review",
  "molekule-air-mini-plus-review",
  "rabbit-air-minusa2-review",
  "medify-ma40-review",
  "alen-breathesmart-45i-review",
  "hathaspace-hsp001-review",
];

const airPurifierBestPicks = [
  "best-air-purifiers-for-allergies",
  "best-air-purifiers-for-asthma",
  "best-air-purifiers-for-bedroom",
  "best-air-purifiers-for-large-rooms",
  "best-air-purifiers-for-pet-hair",
  "best-air-purifiers-for-wildfire-smoke",
  "best-air-purifiers-under-200",
  "best-premium-air-purifiers",
];

export default function AirPurifierHubPage() {
  const allGuides = getGuides();
  const allReviews = getReviews();
  const allBestPicks = getBestPicks();

  const guides = allGuides.filter((a) => airPurifierGuides.includes(a.slug));
  const reviews = allReviews.filter((a) => airPurifierReviews.includes(a.slug));
  const bestPicks = allBestPicks.filter((a) =>
    airPurifierBestPicks.includes(a.slug)
  );

  const allItems = [
    ...guides.map((a) => ({
      name: a.frontmatter.title,
      url: `https://airqualitynest.com/guides/${a.slug}`,
    })),
    ...reviews.map((a) => ({
      name: a.frontmatter.title,
      url: `https://airqualitynest.com/reviews/${a.slug}`,
    })),
    ...bestPicks.map((a) => ({
      name: a.frontmatter.title,
      url: `https://airqualitynest.com/best-picks/${a.slug}`,
    })),
  ];

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Air Purifier Guide Hub",
    description:
      "Your complete resource for air purifiers: guides, reviews, and expert best-picks.",
    url: "https://airqualitynest.com/guides/air-purifiers",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allItems.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://airqualitynest.com" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://airqualitynest.com/guides" },
      { "@type": "ListItem", position: 3, name: "Air Purifiers" },
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent/5 via-white to-sky-50">
        <div className="absolute inset-0 air-glow"></div>
        <div className="fluid-container py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-8">
              <Wind className="w-4 h-4" />
              Topical Hub
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-primary mb-6 leading-[1.05]">
              The Complete Air Purifier Resource
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed mb-8">
              Air purifiers with true HEPA filters can remove 99.97% of
              airborne particles down to 0.3 microns -- including dust, pollen,
              mold spores, pet dander, and smoke. But not all purifiers are
              created equal. Room size, filter type, noise level, and long-term
              filter costs all matter.
            </p>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
              We have tested over 25 air purifiers in our 400 sq. ft. sealed
              chamber with calibrated PM2.5 monitors. Below you will find every
              guide, review, and buying recommendation we have published --
              organized to help you find exactly what you need.
            </p>
          </div>
        </div>
      </section>

      {/* Best Picks */}
      <section className="fluid-container py-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
            <Award className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold tracking-tighter text-primary">
              Best Picks
            </h2>
            <p className="text-slate-500 font-light">
              Curated recommendations for specific needs
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestPicks.map((article) => (
            <Link
              key={article.slug}
              href={`/best-picks/${article.slug}`}
              className="group bg-white border border-slate-100 rounded-2xl p-8 hover:shadow-xl hover:shadow-slate-200/30 transition-all duration-500"
            >
              <h3 className="font-display font-bold text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                {article.frontmatter.title}
              </h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-4 line-clamp-2">
                {article.frontmatter.description}
              </p>
              <span className="inline-flex items-center gap-1 text-accent text-sm font-semibold">
                Read guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Guides */}
      <section className="fluid-container py-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold tracking-tighter text-primary">
              Guides & Comparisons
            </h2>
            <p className="text-slate-500 font-light">
              Learn the science and make smarter decisions
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((article) => (
            <Link
              key={article.slug}
              href={`/guides/${article.slug}`}
              className="group bg-white border border-slate-100 rounded-2xl p-8 hover:shadow-xl hover:shadow-slate-200/30 transition-all duration-500"
            >
              <h3 className="font-display font-bold text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                {article.frontmatter.title}
              </h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-4 line-clamp-2">
                {article.frontmatter.description}
              </p>
              <span className="inline-flex items-center gap-1 text-accent text-sm font-semibold">
                Read guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="fluid-container py-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
            <Search className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold tracking-tighter text-primary">
              In-Depth Reviews
            </h2>
            <p className="text-slate-500 font-light">
              Hands-on testing with real performance data
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((article) => (
            <Link
              key={article.slug}
              href={`/reviews/${article.slug}`}
              className="group bg-white border border-slate-100 rounded-2xl p-8 hover:shadow-xl hover:shadow-slate-200/30 transition-all duration-500"
            >
              <h3 className="font-display font-bold text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                {article.frontmatter.title}
              </h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-4 line-clamp-2">
                {article.frontmatter.description}
              </p>
              <span className="inline-flex items-center gap-1 text-accent text-sm font-semibold">
                Read review <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
