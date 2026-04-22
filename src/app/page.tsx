import Image from "next/image";
import Link from "next/link";
import { Wind, Shield, Droplets, ThermometerSun, ArrowRight, Sparkles, Award, Zap, Star, ShoppingCart, TrendingUp, CheckCircle2, Clock, Users, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";
import { getProduct } from "@/lib/products";

const categories = [
  {
    name: "Air Purifiers",
    description: "Top-rated HEPA purifiers for smoke, allergens, and VOCs",
    icon: Wind,
    href: "/best-picks/best-air-purifiers-for-allergies",
    color: "from-teal-500 to-emerald-600",
    bg: "bg-teal-500/8",
  },
  {
    name: "Air Quality Monitors",
    description: "Track PM2.5, CO2, VOCs, radon, and more",
    icon: Shield,
    href: "/reviews/airthings-view-plus-review",
    color: "from-cyan-500 to-teal-600",
    bg: "bg-cyan-500/8",
  },
  {
    name: "Humidifiers",
    description: "Combat dry air and keep humidity balanced",
    icon: Droplets,
    href: "/best-picks/best-humidifiers",
    color: "from-emerald-500 to-green-600",
    bg: "bg-emerald-500/8",
  },
  {
    name: "Dehumidifiers",
    description: "Prevent mold and protect your home",
    icon: ThermometerSun,
    href: "/best-picks/best-dehumidifiers-for-basement",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-500/8",
  },
];

const trustPoints = [
  {
    icon: Zap,
    title: "In-Depth Research",
    description: "We analyze hundreds of verified customer reviews and expert opinions to surface what actually matters.",
    color: "from-teal-500 to-emerald-600",
  },
  {
    icon: Award,
    title: "No Sponsored Content",
    description: "Our recommendations are based on merit. We earn from affiliate links, but our picks are never paid placements.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Shield,
    title: "Transparent & Updated",
    description: "We disclose our affiliate relationships upfront and update our rankings regularly as new products and reviews emerge.",
    color: "from-cyan-500 to-teal-600",
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
      <section className="relative overflow-hidden gradient-mesh-hero">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-[8%] w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] bg-cyan-400/8 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-accent/[0.04] rounded-full animate-morph" />
        </div>

        <div className="fluid-container pt-14 pb-20 sm:pt-20 sm:pb-28 md:pt-28 md:pb-36 lg:pt-32 lg:pb-44 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <div className="section-label mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                Expert Picks &middot; Honest Reviews &middot; Trusted
              </div>
              <h1 className="text-[clamp(2.25rem,5.5vw,5.5rem)] font-display font-bold tracking-[-0.03em] text-primary leading-[0.92] mb-5 sm:mb-7">
                Breathe Easier
                <br />
                <span className="gradient-text">at Home.</span>
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

            <div className="hidden lg:flex justify-center items-center relative">
              <div className="relative" style={{ perspective: "1200px" }}>
                <div className="absolute -inset-16 bg-gradient-to-br from-accent/15 via-cyan-300/8 to-transparent rounded-full blur-[80px]" />
                <div className="card-premium p-7 w-[320px] animate-float-rotate relative !overflow-visible" style={{ transform: "rotateY(-5deg) rotateX(3deg)" }}>
                  <div className="absolute -top-3 right-4 z-10">
                    <span className="badge-premium shadow-lg shadow-accent/20">
                      <Award className="w-3 h-3" />
                      #1 Pick
                    </span>
                  </div>
                  <div className="w-full aspect-square bg-gradient-to-b from-slate-50 to-white rounded-2xl mb-4 relative overflow-hidden">
                    {(() => {
                      const product = getProduct("coway-airmega-ap1512hh");
                      if (!product) return null;
                      return (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="320px"
                          className="object-contain p-4"
                          priority
                        />
                      );
                    })()}
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">Coway</p>
                  <h3 className="font-display font-bold text-primary text-sm mb-2">Airmega AP-1512HH</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                    <span className="text-xs font-semibold text-slate-600 ml-1">4.8/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-display font-bold text-primary">$139</span>
                    <span className="text-xs font-semibold text-accent">Best Overall</span>
                  </div>
                </div>
                <div className="absolute -bottom-5 -left-8 w-20 h-20 card-glass opacity-60" style={{ transform: "rotateY(5deg) rotateX(-5deg)" }} />
                <div className="absolute -top-3 -right-6 w-16 h-16 card-glass opacity-40" style={{ transform: "rotateY(-8deg) rotateX(5deg)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-separator py-4" />

      {/* ═══════════════ CATEGORIES ═══════════════ */}
      <section className="fluid-container py-16 sm:py-24 md:py-32">
        <div className="text-center mb-10 sm:mb-16">
          <div className="section-label mx-auto mb-4 sm:mb-5 w-fit">Browse by Category</div>
          <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-display font-bold tracking-tight text-primary mb-3 sm:mb-4">
            What Are You Looking For?
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-md mx-auto font-light">
            Explore our tested categories to find the right product for your home
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {categories.map((cat) => (
            <Link key={cat.name} href={cat.href} className="group">
              <div className="card-elevated p-4 sm:p-7 h-full flex flex-col relative overflow-hidden">
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-[0.06] rounded-full blur-2xl group-hover:opacity-[0.12] transition-opacity duration-500`} />
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${cat.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-5 shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300`}>
                  <cat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base text-primary mb-1 sm:mb-2">{cat.name}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-3 sm:mb-4 flex-1 hidden sm:block">{cat.description}</p>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-accent sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-1 sm:group-hover:translate-y-0 transition-all duration-300">
                  Explore <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="section-separator py-4" />

      {/* ═══════════════ FEATURED PRODUCTS ═══════════════ */}
      <section className="fluid-container py-16 sm:py-24 md:py-32">
        <div className="text-center mb-10 sm:mb-16">
          <div className="section-label mx-auto mb-4 sm:mb-5 w-fit">
            <TrendingUp className="w-3.5 h-3.5" />
            Editor&apos;s Choice 2026
          </div>
          <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-display font-bold tracking-tight text-primary mb-3 sm:mb-4">
            Top-Rated Air Purifiers
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-md mx-auto font-light">
            Our highest-rated picks based on customer reviews and expert analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {(() => {
            const product = getProduct("coway-airmega-ap1512hh");
            if (!product) return null;
            return (
              <div className="card-premium p-5 sm:p-8 lg:p-10 group relative lg:row-span-2 !overflow-visible">
                <div className="absolute -top-3 right-4 sm:right-6 z-10">
                  <span className="badge-premium shadow-lg shadow-accent/20">
                    <Award className="w-3.5 h-3.5" />
                    Best Overall
                  </span>
                </div>
                <div className="w-full aspect-square bg-gradient-to-b from-slate-50/80 to-white rounded-2xl mb-4 sm:mb-6 relative overflow-hidden max-w-[280px] sm:max-w-[360px] mx-auto">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1.5">{product.brand}</p>
                <h3 className="font-display font-bold text-xl lg:text-2xl text-primary mb-3 leading-snug">{product.name}</h3>
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} />
                    ))}
                  </div>
                  {product.rating && <span className="text-sm font-semibold text-slate-700">{product.rating}/5</span>}
                </div>
                <div className="bg-slate-50/80 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {product.specs.coverage && <div><span className="text-slate-400 text-xs">Coverage</span><p className="font-semibold text-primary">{product.specs.coverage}</p></div>}
                    {product.specs.cadr && <div><span className="text-slate-400 text-xs">CADR</span><p className="font-semibold text-primary">{product.specs.cadr}</p></div>}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-display font-bold text-primary">{product.price}</span>
                  {product.filterReplacementCycle && <span className="text-xs text-slate-400">Filter: {product.filterReplacementCycle}</span>}
                </div>
                <div className="flex gap-3">
                  <a href={product.amazonLink} target="_blank" rel="noopener noreferrer nofollow" className="flex-1">
                    <Button variant="amazon" className="w-full gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Check on Amazon
                    </Button>
                  </a>
                  {product.walmartLink && (
                    <a href={product.walmartLink} target="_blank" rel="noopener noreferrer nofollow" className="flex-1">
                      <Button variant="walmart" className="w-full gap-2">Walmart</Button>
                    </a>
                  )}
                </div>
              </div>
            );
          })()}

          <div className="flex flex-col gap-6">
            {[
              { id: "blueair-blue-pure-211", badge: "Best Large Room" },
              { id: "winix-5500-2", badge: "Best Value" },
            ].map(({ id, badge }) => {
              const product = getProduct(id);
              if (!product) return null;
              return (
                <div key={id} className="card-elevated p-4 sm:p-6 group relative overflow-hidden flex-1">
                  <div className="flex flex-row gap-4 sm:gap-5">
                    <div className="w-24 sm:w-40 aspect-square bg-gradient-to-b from-slate-50 to-white rounded-xl relative overflow-hidden shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 160px"
                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 mb-2">
                          <Award className="w-3 h-3" />
                          {badge}
                        </span>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-0.5">{product.brand}</p>
                        <h3 className="font-display font-bold text-base text-primary mb-2 leading-snug">{product.name}</h3>
                        <div className="flex items-center gap-1.5 mb-3">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 0) ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} />
                            ))}
                          </div>
                          {product.rating && <span className="text-xs font-semibold text-slate-600">{product.rating}/5</span>}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-display font-bold text-primary">{product.price}</span>
                        <a href={product.amazonLink} target="_blank" rel="noopener noreferrer nofollow">
                          <Button variant="amazon" size="sm">Amazon</Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-center mt-12">
          <Link href="/best-picks/best-air-purifiers-for-allergies">
            <Button variant="outline" size="lg">
              See All Top Picks
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <div className="section-separator py-4" />

      {/* ═══════════════ WHY TRUST US ═══════════════ */}
      <section className="fluid-container py-16 sm:py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="section-label mb-4 sm:mb-5">Why Trust Us</div>
            <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-display font-bold tracking-tight text-primary mb-4 sm:mb-5 leading-[0.95]">
              Honest Research,
              <br />
              <span className="gradient-text">Better Choices.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-8 sm:mb-10 max-w-lg font-light">
              We dig through hundreds of verified customer reviews, compare specs, and highlight what real buyers love (and hate) so you can shop with confidence.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: FlaskConical, value: "1,000+", label: "Reviews Analyzed" },
                { icon: Wind, value: "50+", label: "Products Compared" },
                { icon: Users, value: "50K+", label: "Monthly Readers" },
                { icon: Clock, value: "2+", label: "Years of Research" },
              ].map((stat) => (
                <div key={stat.label} className="stat-card p-3 sm:p-5 text-center">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-accent/8 rounded-lg sm:rounded-xl mx-auto mb-2 sm:mb-3">
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                  </div>
                  <p className="text-xl sm:text-2xl font-display font-bold text-primary">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:gap-5">
            {trustPoints.map((item) => (
              <div key={item.title} className="card-glass p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
                <div className={`w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg shrink-0`}>
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-primary mb-1.5">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm font-light">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-separator py-4" />

      {/* ═══════════════ LATEST ARTICLES ═══════════════ */}
      <section className="fluid-container py-16 sm:py-24 md:py-32">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 sm:mb-14 gap-4">
          <div>
            <div className="section-label mb-4 sm:mb-5">Stay Informed</div>
            <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-display font-bold tracking-tight text-primary mb-3">
              Latest Research
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Fresh reviews and guides from our testing lab
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

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section className="fluid-container py-12">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary text-white p-6 sm:p-10 md:p-16 lg:p-24 rounded-2xl sm:rounded-[40px] relative overflow-hidden group grain-overlay">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full animate-pulse-glow" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-cyan-400/10 blur-[100px] rounded-full animate-pulse-glow" style={{ animationDelay: "2s" }} />
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-accent to-cyan-500 rounded-xl sm:rounded-2xl mx-auto mb-6 sm:mb-10 flex items-center justify-center shadow-2xl shadow-accent/25 group-hover:scale-110 transition-transform duration-500">
              <Wind className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-[clamp(1.5rem,4vw,3.5rem)] font-display font-bold mb-4 sm:mb-6 tracking-tight leading-[0.95]">
              Breathe Better,
              <br />Faster.
            </h3>
            <p className="text-slate-400 mb-8 sm:mb-10 text-base sm:text-lg leading-relaxed max-w-md mx-auto font-light">
              Not sure which purifier is right for your space? Browse our
              curated recommendations to find your perfect match.
            </p>
            <Link href="/best-picks/best-air-purifiers-for-allergies">
              <Button variant="secondary" size="xl">
                Find Your Perfect Purifier
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
