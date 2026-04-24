import { Metadata } from "next";
import Link from "next/link";
import { Activity, ArrowRight, BookOpen, Search, Award } from "lucide-react";
import { getGuides, getReviews, getBestPicks } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Indoor Air Quality Guide Hub - Testing, Monitoring & Improvement",
  description:
    "Your complete resource for understanding and improving indoor air quality. Learn how to test your home's air, interpret results, choose the right monitor, and take action to reduce pollutants.",
  alternates: {
    canonical: "https://airqualitynest.com/guides/indoor-air-quality",
  },
};

const iaqGuides = [
  "how-to-test-home-air-quality",
  "how-to-improve-indoor-air-quality",
  "how-to-reduce-dust-in-your-home",
  "do-air-purifiers-really-work",
  "hepa-filter-explained",
  "do-i-need-a-dehumidifier",
];

const iaqReviews = [
  "airthings-view-plus-review",
  "amazon-air-quality-monitor-review",
  "awair-element-review",
  "temtop-m10-review",
  "frigidaire-50-pint-review",
  "ge-45-pint-review",
  "homelabs-dehumidifier-review",
  "midea-20-pint-review",
  "levoit-lv600s-review",
  "honeywell-hev685w-review",
  "dreo-6l-humidifier-review",
  "canopy-humidifier-review",
  "vornado-evdc300-review",
];

const iaqBestPicks = [
  "best-air-quality-monitors",
  "best-dehumidifiers-for-basement",
  "best-humidifiers",
];

export default function IndoorAirQualityHubPage() {
  const allGuides = getGuides();
  const allReviews = getReviews();
  const allBestPicks = getBestPicks();

  const guides = allGuides.filter((a) => iaqGuides.includes(a.slug));
  const reviews = allReviews.filter((a) => iaqReviews.includes(a.slug));
  const bestPicks = allBestPicks.filter((a) => iaqBestPicks.includes(a.slug));

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
    name: "Indoor Air Quality Guide Hub",
    description:
      "Complete resource for testing, monitoring, and improving indoor air quality.",
    url: "https://airqualitynest.com/guides/indoor-air-quality",
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
      { "@type": "ListItem", position: 3, name: "Indoor Air Quality" },
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
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-accent/5">
        <div className="absolute inset-0 air-glow"></div>
        <div className="fluid-container py-10 sm:py-16 md:py-24 lg:py-32 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-8">
              <Activity className="w-4 h-4" />
              Topical Hub
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold tracking-tighter text-primary mb-6 leading-[1.05]">
              Indoor Air Quality: Test, Monitor & Improve
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed mb-8">
              The EPA estimates indoor air can be 2 to 5 times more polluted
              than outdoor air. Particulate matter (PM2.5), volatile organic
              compounds (VOCs), carbon dioxide, and humidity all affect your
              health -- yet most homes have never been tested.
            </p>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
              This hub brings together our testing guides, air quality monitor
              reviews, humidity control product evaluations, and actionable
              improvement strategies. Whether you are diagnosing a problem or
              optimizing an already-healthy home, start here.
            </p>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="fluid-container py-10 sm:py-16 md:py-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold tracking-tighter text-primary">
              Essential Guides
            </h2>
            <p className="text-slate-500 font-light">
              Understand what is in your air and how to fix it
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((article) => (
            <Link
              key={article.slug}
              href={`/guides/${article.slug}`}
              className="group bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 md:p-8 hover:shadow-xl hover:shadow-slate-200/30 transition-all duration-500"
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

      {/* Best Picks */}
      <section className="fluid-container py-10 sm:py-16 md:py-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
            <Award className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold tracking-tighter text-primary">
              Best Picks
            </h2>
            <p className="text-slate-500 font-light">
              Our top-tested recommendations
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bestPicks.map((article) => (
            <Link
              key={article.slug}
              href={`/best-picks/${article.slug}`}
              className="group bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 md:p-8 hover:shadow-xl hover:shadow-slate-200/30 transition-all duration-500"
            >
              <h3 className="font-display font-bold text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                {article.frontmatter.title}
              </h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-4 line-clamp-2">
                {article.frontmatter.description}
              </p>
              <span className="inline-flex items-center gap-1 text-accent text-sm font-semibold">
                See our picks <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="fluid-container py-10 sm:py-16 md:py-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
            <Search className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold tracking-tighter text-primary">
              Monitor, Humidity & IAQ Product Reviews
            </h2>
            <p className="text-slate-500 font-light">
              In-depth testing of monitors, dehumidifiers, and humidifiers
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((article) => (
            <Link
              key={article.slug}
              href={`/reviews/${article.slug}`}
              className="group bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 md:p-8 hover:shadow-xl hover:shadow-slate-200/30 transition-all duration-500"
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
