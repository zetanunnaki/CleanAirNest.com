import Image from "next/image";
import Link from "next/link";
import { Wind, Shield, Droplets, ThermometerSun, ArrowRight, Award, Star, ShoppingCart, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";
import { getProduct } from "@/lib/products";
import { NewsletterSignup } from "@/components/NewsletterSignup";

const categories = [
  {
    name: "Air Purifiers",
    description: "Top-rated HEPA purifiers for smoke, allergens, and VOCs",
    icon: Wind,
    href: "/best-picks/best-air-purifiers-for-allergies",
  },
  {
    name: "Air Quality Monitors",
    description: "Track PM2.5, CO2, VOCs, radon, and more",
    icon: Shield,
    href: "/reviews/airthings-view-plus-review",
  },
  {
    name: "Humidifiers",
    description: "Combat dry air and keep humidity balanced",
    icon: Droplets,
    href: "/best-picks/best-humidifiers",
  },
  {
    name: "Dehumidifiers",
    description: "Prevent mold and protect your home",
    icon: ThermometerSun,
    href: "/best-picks/best-dehumidifiers-for-basement",
  },
];

const trustPoints = [
  {
    title: "In-Depth Research",
    description: "We analyze hundreds of verified customer reviews and expert opinions to surface what actually matters.",
  },
  {
    title: "No Sponsored Content",
    description: "Our recommendations are based on merit. We earn from affiliate links, but our picks are never paid placements.",
  },
  {
    title: "Transparent & Updated",
    description: "We disclose our affiliate relationships upfront and update our rankings regularly as new products and reviews emerge.",
  },
];

export default function HomePage() {
  const articles = getAllArticles();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AirQualityNest",
    "url": "https://airqualitynest.com",
    "logo": "https://airqualitynest.com/icon.svg",
    "description": "Independent reviews and buying guides for air purifiers, air quality monitors, humidifiers, and dehumidifiers.",
    "foundingDate": "2024",
    "sameAs": [
      "https://pinterest.com/airqualitynest",
      "https://youtube.com/@airqualitynest",
      "https://facebook.com/airqualitynest"
    ]
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AirQualityNest",
    "url": "https://airqualitynest.com",
    "description": "Reviews, comparisons, and buying guides for air purifiers, air quality monitors, humidifiers, and dehumidifiers.",
    "publisher": {
      "@type": "Organization",
      "name": "AirQualityNest"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://airqualitynest.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const heroProducts = [
    { id: "coway-airmega-ap1512hh", label: "Best Overall" },
    { id: "blueair-blue-pure-211", label: "Best Large Room" },
    { id: "winix-5500-2", label: "Best Value" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="bg-wellness-bg">
        <div className="fluid-container pt-14 pb-16 sm:pt-20 sm:pb-24 md:pt-28 md:pb-32 lg:pt-32 lg:pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left column */}
            <div className="lg:col-span-7">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4 sm:mb-5">
                Independent Air Quality Reviews
              </p>
              <div className="w-12 h-px bg-accent mb-6 sm:mb-8" />
              <h1 className="font-serif text-[clamp(2.25rem,5vw,4.5rem)] font-bold tracking-[-0.02em] text-primary leading-[1.05] mb-5 sm:mb-7">
                Independent Reviews
                <br />
                for Cleaner Air
                <br />
                at Home
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed max-w-xl mb-8 sm:mb-10 font-light">
                We research air purifiers, monitors, and humidifiers based on
                real customer reviews so you can make confident buying decisions.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/best-picks/best-air-purifiers-for-allergies">
                  <Button variant="accent" size="xl">
                    See 2026 Top Picks
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/guides/how-to-improve-indoor-air-quality">
                  <Button variant="outline" size="xl">
                    Read Our Guides
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-5 mt-8 sm:mt-10 text-xs sm:text-sm text-slate-500">
                {["50+ products researched", "1,000+ customer reviews analyzed", "No sponsored content"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right column: editorial product thumbnails + decorative line */}
            <div className="hidden lg:flex lg:col-span-5 flex-col items-center relative pt-6">
              {/* Decorative vertical line with dot */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <div className="w-px flex-1 bg-slate-200" />
              </div>

              <div className="pl-10 w-full space-y-5">
                {heroProducts.map(({ id, label }) => {
                  const product = getProduct(id);
                  if (!product) return null;
                  return (
                    <Link
                      key={id}
                      href={`/reviews/${id}-review`}
                      className="group flex items-center gap-5 p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-accent/20 hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 rounded-xl relative overflow-hidden shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="80px"
                          className="object-contain p-2"
                          priority
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent mb-1">{label}</p>
                        <h3 className="font-display font-bold text-sm text-primary mb-1.5 truncate">{product.name}</h3>
                        <div className="flex items-center gap-1.5">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 0) ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} />
                            ))}
                          </div>
                          {product.rating && <span className="text-xs text-slate-500">{product.rating}</span>}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-separator py-4" />

      {/* ═══════════════ CATEGORIES ═══════════════ */}
      <section className="fluid-container py-16 sm:py-24 md:py-32">
        <div className="mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3">What We Cover</p>
          <div className="w-10 h-px bg-accent mb-5" />
          <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-display font-bold tracking-tight text-primary">
            Browse by Category
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((cat, index) => (
            <Link
              key={cat.name}
              href={cat.href}
              className={`group ${index === 0 ? "col-span-2" : ""}`}
            >
              <div className="relative bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 h-full hover:border-accent/25 hover:shadow-md transition-all duration-300 overflow-hidden">
                {/* Top accent border */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-start gap-3 sm:gap-4">
                  <cat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-primary mb-1">{cat.name}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed hidden sm:block">{cat.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-accent mt-3 sm:mt-4 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  Explore <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="section-separator py-4" />

      {/* ═══════════════ EDITOR'S PICK ═══════════════ */}
      <section className="fluid-container py-16 sm:py-24 md:py-32">
        <div className="mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3">
            Editor&apos;s Pick 2026
          </p>
          <div className="w-10 h-px bg-accent mb-5" />
          <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-display font-bold tracking-tight text-primary mb-3">
            Top-Rated Air Purifiers
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-lg font-light">
            Our highest-rated picks based on customer reviews and expert analysis
          </p>
        </div>

        {/* #1 Pick - Full-width editorial treatment */}
        {(() => {
          const product = getProduct("coway-airmega-ap1512hh");
          if (!product) return null;
          return (
            <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl overflow-hidden mb-6 sm:mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image side */}
                <div className="relative bg-slate-50 p-6 sm:p-10 md:p-12 flex items-center justify-center">
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-accent text-white">
                      <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      #1 Best Overall
                    </span>
                  </div>
                  <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain p-4"
                      priority
                    />
                  </div>
                </div>
                {/* Content side */}
                <div className="p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">{product.brand}</p>
                  <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-primary mb-4 leading-snug">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} />
                      ))}
                    </div>
                    {product.rating && <span className="text-sm font-semibold text-slate-700">{product.rating}/5</span>}
                  </div>

                  {/* Editorial pull quote */}
                  <blockquote className="border-l-2 border-accent pl-4 sm:pl-5 mb-6">
                    <p className="font-serif text-base sm:text-lg text-slate-600 italic leading-relaxed">
                      &ldquo;The best air purifier for most people &mdash; outstanding filtration, quiet operation, and a price that respects your budget.&rdquo;
                    </p>
                  </blockquote>

                  <div className="bg-slate-50 rounded-xl p-4 mb-6">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {product.specs.coverage && <div><span className="text-slate-400 text-xs">Coverage</span><p className="font-semibold text-primary">{product.specs.coverage}</p></div>}
                      {product.specs.cadr && <div><span className="text-slate-400 text-xs">CADR</span><p className="font-semibold text-primary">{product.specs.cadr}</p></div>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-display font-bold text-primary">{product.price}</span>
                    {product.filterReplacementCycle && <span className="text-xs text-slate-400">Filter: {product.filterReplacementCycle}</span>}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a href={product.amazonLink} target="_blank" rel="noopener noreferrer nofollow" className="flex-1 min-w-[140px]">
                      <Button variant="amazon" className="w-full gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Check on Amazon
                      </Button>
                    </a>
                    {product.walmartLink && (
                      <a href={product.walmartLink} target="_blank" rel="noopener noreferrer nofollow" className="flex-1 min-w-[140px]">
                        <Button variant="walmart" className="w-full gap-2">Walmart</Button>
                      </a>
                    )}
                  </div>
                  <Link href="/reviews/coway-airmega-ap1512hh-review" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-dark mt-5 transition-colors">
                    Read our full review <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Runners-up */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            { id: "blueair-blue-pure-211", badge: "Best Large Room", slug: "blueair-blue-pure-211-review" },
            { id: "winix-5500-2", badge: "Best Value", slug: "winix-5500-2-review" },
          ].map(({ id, badge, slug }) => {
            const product = getProduct(id);
            if (!product) return null;
            return (
              <div key={id} className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 group hover:border-accent/20 hover:shadow-md transition-all duration-300">
                <div className="flex flex-row gap-4 sm:gap-5">
                  <div className="w-24 sm:w-32 aspect-square bg-slate-50 rounded-xl relative overflow-hidden shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 160px"
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 mb-2">
                        <Award className="w-3 h-3" />
                        {badge}
                      </span>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-0.5">{product.brand}</p>
                      <h3 className="font-display font-bold text-sm sm:text-base text-primary mb-2 leading-snug">{product.name}</h3>
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 0) ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} />
                          ))}
                        </div>
                        {product.rating && <span className="text-xs font-semibold text-slate-600">{product.rating}/5</span>}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl font-display font-bold text-primary">{product.price}</span>
                        <a href={product.amazonLink} target="_blank" rel="noopener noreferrer nofollow">
                          <Button variant="amazon" size="sm">Amazon</Button>
                        </a>
                      </div>
                      <Link href={`/reviews/${slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-dark transition-colors">
                        Read our full review <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <Link href="/best-picks/best-air-purifiers-for-allergies">
            <Button variant="outline" size="lg">
              See All Top Picks
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <div className="section-separator py-4" />

      {/* ═══════════════ OUR PROCESS ═══════════════ */}
      <section className="fluid-container py-16 sm:py-24 md:py-32">
        <div className="mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3">Our Process</p>
          <div className="w-10 h-px bg-accent mb-5" />
          <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-display font-bold tracking-tight text-primary mb-3 sm:mb-4">
            Honest Research, Better Choices
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-xl font-light leading-relaxed">
            We dig through hundreds of verified customer reviews, compare specs, and highlight what real buyers love (and hate) so you can shop with confidence.
          </p>
        </div>

        {/* Stats - large serif numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {[
            { value: "1,000+", label: "Reviews Analyzed" },
            { value: "50+", label: "Products Compared" },
            { value: "50K+", label: "Monthly Readers" },
            { value: "2+", label: "Years of Research" },
          ].map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-1 sm:mb-2">{stat.value}</p>
              <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Trust points - simple editorial blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {trustPoints.map((item) => (
            <div key={item.title} className="border-t-2 border-accent/20 pt-5 sm:pt-6">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">{item.title}</h3>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-light">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-separator py-4" />

      {/* ═══════════════ LATEST ARTICLES ═══════════════ */}
      <section className="fluid-container py-16 sm:py-24 md:py-32">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 sm:mb-14 gap-4">
          <div>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3">Latest</p>
            <div className="w-10 h-px bg-accent mb-5" />
            <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-display font-bold tracking-tight text-primary mb-2 sm:mb-3">
              Latest Research
            </h2>
            <p className="text-base sm:text-lg text-slate-500 font-light">
              Fresh reviews and guides from our editorial team
            </p>
          </div>
          <Link href="/guides" className="hidden md:block">
            <Button variant="outline" size="default">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 1).map((article) => (
              <ArticleCard
                key={article.slug}
                slug={article.slug}
                type={article.type}
                frontmatter={article.frontmatter}
                featured
              />
            ))}
            {articles.slice(1, 5).map((article) => (
              <ArticleCard
                key={article.slug}
                slug={article.slug}
                type={article.type}
                frontmatter={article.frontmatter}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 text-lg">
            Articles coming soon. Check back for expert air quality reviews and guides.
          </p>
        )}
      </section>

      {/* ═══════════════ NEWSLETTER ═══════════════ */}
      <section className="fluid-container">
        <NewsletterSignup />
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section className="fluid-container py-12">
        <div className="bg-primary text-white p-6 sm:p-10 md:p-16 lg:p-20 rounded-2xl sm:rounded-3xl relative overflow-hidden">
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h3 className="font-serif text-[clamp(1.5rem,4vw,3.25rem)] font-bold mb-4 sm:mb-6 tracking-tight leading-[1.1]">
              Find Your Perfect
              <br />Air Purifier
            </h3>
            <p className="text-slate-400 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed max-w-md mx-auto font-light">
              Not sure which purifier is right for your space? Browse our
              curated recommendations to find your perfect match.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link href="/best-picks/best-air-purifiers-for-allergies">
                <Button variant="secondary" size="xl">
                  Browse Top Picks
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/compare">
                <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10">
                  Compare Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
