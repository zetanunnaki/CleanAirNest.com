import { Metadata } from "next";
import { Shield, Target, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Our Mission & Review Process",
  description:
    "Learn about AirQualityNest's mission, our editorial review process, and our commitment to helping you breathe cleaner air at home.",
  alternates: {
    canonical: "https://airqualitynest.com/about",
  },
};

export default function AboutPage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AirQualityNest",
    "url": "https://airqualitynest.com",
    "logo": "https://airqualitynest.com/icon.svg",
    "description": "Editorial reviews and buying guides for air purifiers, air quality monitors, humidifiers, and dehumidifiers.",
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
    "name": "How AirQualityNest Reviews Air Quality Products",
    "description": "Our editorial review process for air purifiers, monitors, humidifiers, and dehumidifiers.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Aggregate customer feedback",
        "text": "Analyze hundreds of verified customer reviews across major retailers to identify real-world performance patterns, common issues, and standout features."
      },
      {
        "@type": "HowToStep",
        "name": "Research specifications and certifications",
        "text": "Review manufacturer specifications, AHAM-verified CADR ratings, Energy Star certifications, and third-party test data to verify performance claims."
      },
      {
        "@type": "HowToStep",
        "name": "Compare value and long-term costs",
        "text": "Evaluate each product on total cost of ownership including purchase price, filter replacement costs, energy consumption, and warranty coverage to determine real value."
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

      <section className="border-b border-slate-200">
        <div className="fluid-container py-10 sm:py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-accent" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Our Story</span>
            </div>
            <h1 className="text-[clamp(1.75rem,4vw,3.5rem)] font-serif font-bold tracking-tight text-primary mb-6 leading-[1.1]">
              About AirQualityNest
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed">
              We founded AirQualityNest with a simple belief: everyone deserves to
              know what they&apos;re breathing. We research, test, and review indoor
              air quality products so you can make informed decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="fluid-container py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Target,
              title: "Our Mission",
              text: "Make clean indoor air accessible to everyone through honest, expert guidance and real customer data.",
            },
            {
              icon: Shield,
              title: "Independence",
              text: "Manufacturers cannot pay for positive reviews or influence our rankings. Our editorial recommendations are fully independent.",
            },
            {
              icon: Heart,
              title: "Transparency",
              text: "We clearly disclose affiliate relationships and publish our complete testing methodology.",
            },
          ].map((item) => (
            <div key={item.title} className="border-t-2 border-accent/20 pt-6 sm:pt-8">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-serif font-bold text-xl text-primary mb-3">{item.title}</h3>
              <p className="text-slate-500 font-light leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="fluid-container py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="prose-elevated">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-accent" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Our Process</span>
            </div>
            <h2 id="how-we-review" className="!mt-0">How We Review</h2>
            <p className="lead">
              Every product goes through our thorough editorial review process. Here&apos;s how we do it.
            </p>

            <p>
              We analyze hundreds of verified customer reviews across Amazon, Walmart, and
              specialty retailers to identify real-world performance patterns. We cross-reference
              manufacturer specifications with AHAM-verified CADR ratings, Energy Star certifications,
              and available third-party test data.
            </p>
            <p>
              Each product is evaluated on total cost of ownership — including purchase price,
              filter replacement costs, energy consumption, and warranty coverage — alongside
              real customer feedback on noise levels, ease of maintenance, and build quality durability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
              {[
                { stat: "500+", label: "Customer reviews analyzed per product" },
                { stat: "40+", label: "Products reviewed" },
                { stat: "100%", label: "Editorially independent" },
              ].map((item) => (
                <div key={item.label} className="border-t-2 border-accent/20 pt-6 text-center">
                  <p className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-2">{item.stat}</p>
                  <p className="text-sm text-slate-500 font-light">{item.label}</p>
                </div>
              ))}
            </div>

            <h2 id="affiliate-disclosure">Affiliate Disclosure</h2>
            <p>
              AirQualityNest is reader-supported. When you purchase through links on
              our site, we may earn an affiliate commission at no additional cost to
              you. This revenue funds our editorial research and content.
            </p>
            <p>
              Our affiliate relationships never influence editorial content. We
              recommend products based solely on our research and customer review analysis.
              Many products we review do not make it into our recommendations.
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
