import { Metadata } from "next";
import { Shield, Target, Heart, Zap, Award, Beaker } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Our Mission & Testing Process",
  description:
    "Learn about AirQualityNest's mission, our rigorous testing methodology, and our commitment to helping you breathe cleaner air at home.",
};

export default function AboutPage() {
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

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How AirQualityNest Tests Air Quality Products",
    "description": "Our rigorous real-home testing process for air purifiers, monitors, humidifiers, and dehumidifiers.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Measure particle reduction",
        "text": "Measure particle reduction rates using calibrated PM2.5 monitors (Temtop LKC-1000S+) in a standardized 400 sq. ft. sealed chamber."
      },
      {
        "@type": "HowToStep",
        "name": "Test at multiple fan speeds",
        "text": "Test at multiple fan speeds, measure noise levels with a decibel meter at 3-foot distance, and track energy consumption over 7-day periods."
      },
      {
        "@type": "HowToStep",
        "name": "Evaluate real-world performance",
        "text": "Evaluate each product over a minimum of two weeks of daily use, assessing real-world factors like filter replacement costs, ease of maintenance, noise during sleep, and build quality durability."
      }
    ]
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://airqualitynest.com" },
      { "@type": "ListItem", position: 2, name: "About" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 air-glow"></div>
        <div className="fluid-container py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-8">
              <Heart className="w-4 h-4" />
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-primary mb-6 leading-[1.05]">
              About AirQualityNest
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed">
              We founded AirQualityNest with a simple belief: everyone deserves to
              know what they&apos;re breathing. We research, test, and review indoor
              air quality products so you can make informed decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="fluid-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Target,
              title: "Our Mission",
              text: "Make clean indoor air accessible to everyone through honest, expert guidance and lab-backed data.",
            },
            {
              icon: Shield,
              title: "Independence",
              text: "We buy every product we test. Manufacturers cannot pay for positive reviews or influence our rankings.",
            },
            {
              icon: Heart,
              title: "Transparency",
              text: "We clearly disclose affiliate relationships and publish our complete testing methodology.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-slate-100 rounded-[28px] p-10 text-center hover:shadow-xl hover:shadow-slate-200/30 transition-all duration-500">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-bold text-xl text-primary mb-3">{item.title}</h3>
              <p className="text-slate-500 font-light leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How We Test */}
      <section className="fluid-container py-20">
        <div className="max-w-4xl mx-auto">
          <div className="prose-elevated">
            <div className="bg-slate-50 border border-slate-100 p-10 rounded-[40px] flex flex-col md:flex-row gap-8 mb-20 items-center">
              <div className="bg-accent text-white p-4 rounded-3xl shrink-0 animate-float shadow-xl shadow-accent/20">
                <Beaker size={32} />
              </div>
              <div>
                <h2 id="how-we-test" className="!mt-0 !mb-2">How We Test</h2>
                <p className="!mb-0">
                  Every product goes through rigorous real-home testing. Here&apos;s our process.
                </p>
              </div>
            </div>

            <p>
              For air purifiers, we measure particle reduction rates using calibrated
              PM2.5 monitors (Temtop LKC-1000S+) in a standardized 400 sq. ft. sealed chamber.
              We test at multiple fan speeds, measure noise levels with a decibel
              meter at 3-foot distance, and track energy consumption over 7-day periods.
            </p>
            <p>
              Each product is evaluated over a minimum of two weeks of daily use,
              assessing real-world factors like filter replacement costs, ease of
              maintenance, noise during sleep, and build quality durability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
              {[
                { icon: Zap, stat: "400 sq ft", label: "Sealed test chamber" },
                { icon: Award, stat: "14+ days", label: "Per product tested" },
                { icon: Shield, stat: "100%", label: "Self-purchased products" },
              ].map((item) => (
                <div key={item.label} className="bg-white border border-slate-100 rounded-3xl p-8 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <p className="font-display text-3xl font-bold text-primary mb-1">{item.stat}</p>
                  <p className="text-sm text-slate-500 font-light">{item.label}</p>
                </div>
              ))}
            </div>

            <h2 id="affiliate-disclosure">Affiliate Disclosure</h2>
            <p>
              AirQualityNest is reader-supported. When you purchase through links on
              our site, we may earn an affiliate commission at no additional cost to
              you. This revenue funds our independent product testing and lab equipment.
            </p>
            <p>
              Our affiliate relationships never influence editorial content. We
              recommend products based solely on testing results and research.
              Many products we test do not make it into our recommendations.
            </p>

            <h2>Contact Us</h2>
            <p>
              Have a question, product suggestion, or partnership inquiry? Reach out
              to us at{" "}
              <a href="mailto:hello@airqualitynest.com">hello@airqualitynest.com</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
