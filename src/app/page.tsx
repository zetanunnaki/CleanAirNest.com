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
    description: "HEPA purifiers tested for smoke, allergens, and VOCs",
    icon: Wind,
    href: "/best-picks/best-air-purifiers-for-allergies",
    color: "from-teal-500 to-emerald-600",
  },
  {
    name: "Air Quality Monitors",
    description: "Track PM2.5, CO2, VOCs, radon, and more",
    icon: Shield,
    href: "/reviews/airthings-view-plus-review",
    color: "from-cyan-500 to-teal-600",
  },
  {
    name: "Humidifiers",
    description: "Combat dry air and keep humidity balanced",
    icon: Droplets,
    href: "/best-picks/best-humidifiers",
    color: "from-emerald-500 to-green-600",
  },
  {
    name: "Dehumidifiers",
    description: "Prevent mold and protect your home",
    icon: ThermometerSun,
    href: "/best-picks/best-dehumidifiers-for-basement",
    color: "from-amber-500 to-orange-600",
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
    "description": "Independent, lab-backed reviews of air purifiers, air quality monitors, humidifiers, and dehumidifiers.",
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
    "description": "Expert reviews, comparisons, and guides for air purifiers, air quality monitors, humidifiers, and dehumidifiers.",
    "publisher": {
      "@type": "Organization",
      "name": "AirQualityNest"
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

      {/* Hero — Asymmetric Split */}
      <section className="relative overflow-hidden gradient-mesh grain-overlay">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-[10%] w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-20 right-[15%] w-96 h-96 bg-cyan-400/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
        </div>
        <div className="fluid-container py-28 md:py-40 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Typography */}
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-200/60 text-slate-700 rounded-full text-sm font-semibold mb-10 shadow-sm">
                <Sparkles className="w-4 h-4 text-accent" />
                Lab-Tested &middot; Independent &middot; Trusted
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold tracking-tighter text-primary mb-8 leading-[0.9]">
                Breathe Easier
                <br />
                <span className="gradient-text">at Home.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-xl mb-12">
                We lab-test air purifiers, monitors, and humidifiers so you
                don&apos;t have to. Science-backed picks for cleaner, healthier indoor air.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/best-picks/best-air-purifiers-for-allergies">
                  <Button variant="accent" size="xl">
                    See 2026 Top Picks
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/guides/how-to-improve-indoor-air-quality">
                  <Button variant="outline" size="xl">
                    Read Our Guides
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 mt-12 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  28 products tested
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  500+ hours of lab testing
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  No sponsored content
                </span>
              </div>
            </div>

            {/* Right — Floating 3D product card */}
            <div className="hidden lg:flex justify-center items-center relative">
              <div className="relative" style={{ perspective: "1200px" }}>
                {/* Background glow */}
                <div className="absolute -inset-12 bg-gradient-to-br from-accent/20 via-cyan-300/10 to-transparent rounded-full blur-3xl" />
                {/* Floating card with 3D transform */}
                <div className="card-premium p-8 w-[340px] animate-float-rotate relative" style={{ transform: "rotateY(-5deg) rotateX(3deg)" }}>
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-accent to-cyan-500 text-white">
                      <Award className="w-3 h-3" />
                      #1 Pick
                    </span>
                  </div>
                  <div className="w-full aspect-square bg-gradient-to-b from-slate-50 to-white rounded-2xl mb-5 relative overflow-hidden">
                    {(() => {
                      const product = getProduct("coway-airmega-ap1512hh");
                      if (!product) return null;
                      return (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="340px"
                          className="object-contain p-4"
                          priority
                        />
                      );
                    })()}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Coway</p>
                  <h3 className="font-display font-bold text-primary text-base mb-2">Airmega AP-1512HH</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                    <span className="text-xs font-semibold text-slate-600 ml-1">4.8/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-display font-bold text-primary">$139</span>
                    <span className="text-xs font-semibold text-accent">Best Overall</span>
                  </div>
                </div>
                {/* Decorative smaller cards behind */}
                <div className="absolute -bottom-6 -left-10 w-24 h-24 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-100/50 shadow-lg opacity-60" style={{ transform: "rotateY(5deg) rotateX(-5deg)" }} />
                <div className="absolute -top-4 -right-8 w-20 h-20 bg-white/40 backdrop-blur-sm rounded-2xl border border-slate-100/50 shadow-lg opacity-40" style={{ transform: "rotateY(-8deg) rotateX(5deg)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section separator */}
      <div className="section-separator py-2" />

      {/* Categories — Bento Grid */}
      <section className="fluid-container py-32">
        <div className="text-center mb-20">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Browse by Category</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-primary mb-5">
            What Are You Looking For?
          </h2>
          <p className="text-lg text-slate-500 max-w-lg mx-auto">
            Explore our tested categories to find the right product for your home
          </p>
        </div>
        {/* Bento grid: 1 large + 3 smaller */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[200px]">
          {categories.map((cat, i) => (
            <Link key={cat.name} href={cat.href} className={`group ${i === 0 ? "md:row-span-2" : ""}`}>
              <div className={`card-elevated p-8 h-full flex flex-col justify-between relative overflow-hidden ${i === 0 ? "lg:p-12" : ""}`}>
                {/* Background gradient accent */}
                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${cat.color} opacity-[0.06] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.12] transition-opacity duration-500`} />
                <div>
                  <div className={`${i === 0 ? "w-16 h-16" : "w-14 h-14"} bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <cat.icon className={`${i === 0 ? "w-7 h-7" : "w-6 h-6"} text-white`} />
                  </div>
                  <h3 className={`font-display font-bold ${i === 0 ? "text-2xl" : "text-lg"} text-primary mb-2`}>{cat.name}</h3>
                  <p className={`${i === 0 ? "text-base" : "text-sm"} text-slate-500 leading-relaxed`}>{cat.description}</p>
                </div>
                <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section separator */}
      <div className="section-separator py-2" />

      {/* Featured Products — Spotlight layout */}
      <section className="fluid-container py-32">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
            <TrendingUp className="w-4 h-4" />
            Editor&apos;s Choice 2026
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-primary mb-5">
            Top-Tested Air Purifiers
          </h2>
          <p className="text-lg text-slate-500 max-w-lg mx-auto">
            Our highest-rated picks after 500+ hours of lab testing
          </p>
        </div>
        {/* Spotlight: #1 large, #2 and #3 smaller side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Spotlight #1 */}
          {(() => {
            const product = getProduct("coway-airmega-ap1512hh");
            if (!product) return null;
            return (
              <div className="card-premium p-10 lg:p-12 group relative lg:row-span-2">
                <div className="absolute top-8 right-8">
                  <span className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-accent to-cyan-500 text-white shadow-lg shadow-accent/20">
                    <Award className="w-4 h-4" />
                    Best Overall
                  </span>
                </div>
                <div className="w-full aspect-square bg-gradient-to-b from-slate-50 to-white rounded-3xl mb-8 relative overflow-hidden max-w-[400px] mx-auto">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">{product.brand}</p>
                <h3 className="font-display font-bold text-2xl lg:text-3xl text-primary mb-4 leading-snug">{product.name}</h3>
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating || 0) ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} />
                    ))}
                  </div>
                  {product.rating && <span className="text-base font-semibold text-slate-700">{product.rating}/5</span>}
                </div>
                <div className="bg-slate-50/80 rounded-2xl p-5 mb-8">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {product.specs.coverage && <div><span className="text-slate-500 text-xs">Coverage</span><p className="font-semibold text-primary text-base">{product.specs.coverage}</p></div>}
                    {product.specs.cadr && <div><span className="text-slate-500 text-xs">CADR</span><p className="font-semibold text-primary text-base">{product.specs.cadr}</p></div>}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-display font-bold text-primary">{product.price}</span>
                  {product.filterReplacementCycle && <span className="text-sm text-slate-500">Filter: {product.filterReplacementCycle}</span>}
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
                      <Button variant="walmart" className="w-full gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Walmart
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            );
          })()}

          {/* #2 and #3 stacked */}
          <div className="flex flex-col gap-8">
            {[
              { id: "blueair-blue-pure-211", badge: "Best Large Room", rank: 2 },
              { id: "winix-5500-2", badge: "Best Value", rank: 3 },
            ].map(({ id, badge, rank }) => {
              const product = getProduct(id);
              if (!product) return null;
              return (
                <div key={id} className="card-elevated p-8 group relative overflow-hidden flex-1">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-48 aspect-square sm:aspect-auto sm:h-auto bg-gradient-to-b from-slate-50 to-white rounded-2xl relative overflow-hidden shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 200px"
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 mb-3">
                          <Award className="w-3 h-3" />
                          {badge}
                        </span>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">{product.brand}</p>
                        <h3 className="font-display font-bold text-lg text-primary mb-2 leading-snug">{product.name}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 0) ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} />
                            ))}
                          </div>
                          {product.rating && <span className="text-sm font-semibold text-slate-700">{product.rating}/5</span>}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-display font-bold text-primary">{product.price}</span>
                        <a href={product.amazonLink} target="_blank" rel="noopener noreferrer nofollow">
                          <Button variant="amazon" className="gap-2">
                            <ShoppingCart className="w-4 h-4" />
                            Amazon
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-center mt-16">
          <Link href="/best-picks/best-air-purifiers-for-allergies">
            <Button variant="outline" size="lg">
              See All Top Picks
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Section separator */}
      <div className="section-separator py-2" />

      {/* Why Trust Us — Modern metrics layout */}
      <section className="fluid-container py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">Why Trust Us</p>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-primary mb-6 leading-[0.92]">
              Independent Testing,
              <br />
              <span className="gradient-text">Real Results.</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-lg">
              We purchase every product with our own money, test it in controlled lab conditions, and report the results transparently. No manufacturer influence, ever.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="card-elevated p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-2xl mx-auto mb-3">
                  <FlaskConical className="w-6 h-6 text-accent" />
                </div>
                <p className="text-3xl font-display font-bold text-primary">500+</p>
                <p className="text-sm text-slate-500 mt-1">Hours of Testing</p>
              </div>
              <div className="card-elevated p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-2xl mx-auto mb-3">
                  <Wind className="w-6 h-6 text-accent" />
                </div>
                <p className="text-3xl font-display font-bold text-primary">28</p>
                <p className="text-sm text-slate-500 mt-1">Products Tested</p>
              </div>
              <div className="card-elevated p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-2xl mx-auto mb-3">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <p className="text-3xl font-display font-bold text-primary">50K+</p>
                <p className="text-sm text-slate-500 mt-1">Monthly Readers</p>
              </div>
              <div className="card-elevated p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-2xl mx-auto mb-3">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <p className="text-3xl font-display font-bold text-primary">2+</p>
                <p className="text-sm text-slate-500 mt-1">Years of Research</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {[
              {
                icon: Zap,
                title: "Real-World Testing",
                description: "We test every product in sealed chambers with calibrated PM2.5 monitors. No guesswork — just data.",
                color: "from-teal-500 to-emerald-600",
              },
              {
                icon: Award,
                title: "Self-Funded Lab",
                description: "We buy every product ourselves. No free samples, no sponsored content, no manufacturer influence.",
                color: "from-amber-500 to-orange-600",
              },
              {
                icon: Shield,
                title: "Transparent Process",
                description: "We show our methodology, disclose affiliate relationships, and update our rankings as new data comes in.",
                color: "from-cyan-500 to-teal-600",
              },
            ].map((item) => (
              <div key={item.title} className="card-elevated p-8 flex items-start gap-5">
                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg shrink-0`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-primary mb-2">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section separator */}
      <div className="section-separator py-2" />

      {/* Latest Articles — Asymmetric: 1 featured + grid */}
      <section className="fluid-container py-32">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-4">
          <div>
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Stay Informed</p>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-primary mb-4">
              Latest Research
            </h2>
            <p className="text-lg text-slate-500">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* CTA Banner */}
      <section className="fluid-container py-12">
        <div className="bg-primary text-white p-16 md:p-24 rounded-[48px] relative overflow-hidden group grain-overlay">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full animate-pulse-glow" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-400/15 blur-[120px] rounded-full animate-pulse-glow" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-teal-400/10 blur-[100px] rounded-full" />
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-accent to-cyan-500 rounded-3xl mx-auto mb-12 flex items-center justify-center shadow-2xl shadow-accent/30 group-hover:scale-110 transition-transform">
              <Wind className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tighter leading-[0.95]">
              Breathe Better,
              <br />Faster.
            </h3>
            <p className="text-slate-400 mb-12 text-xl leading-relaxed max-w-lg mx-auto">
              Not sure which purifier is right for your space? Start with our
              most popular guide to find your perfect match.
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
