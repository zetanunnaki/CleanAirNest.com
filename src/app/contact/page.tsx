import { Metadata } from "next";
import { Mail, MessageCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the AirQualityNest team. Questions about air purifiers, product recommendations, or partnership inquiries — we're here to help.",
  alternates: {
    canonical: "https://airqualitynest.com/contact",
  },
  openGraph: {
    title: "Contact Us | AirQualityNest",
    description:
      "Get in touch with the AirQualityNest team for questions, product suggestions, or partnership inquiries.",
    url: "https://airqualitynest.com/contact",
  },
};

export default function ContactPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://airqualitynest.com",
      },
      { "@type": "ListItem", position: 2, name: "Contact" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="border-b border-slate-200">
        <div className="fluid-container py-10 sm:py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-accent" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Get In Touch
              </span>
            </div>
            <h1 className="text-[clamp(1.75rem,4vw,3.5rem)] font-serif font-bold tracking-tight text-primary mb-6 leading-[1.1]">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed">
              Have a question about a product, need a recommendation, or want to
              work with us? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="fluid-container py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Mail,
                title: "General Inquiries",
                description:
                  "Questions, feedback, or product suggestions",
                contact: "hello@airqualitynest.com",
                href: "mailto:hello@airqualitynest.com",
              },
              {
                icon: MessageCircle,
                title: "Editorial & Press",
                description:
                  "Partnership inquiries and media requests",
                contact: "press@airqualitynest.com",
                href: "mailto:press@airqualitynest.com",
              },
              {
                icon: Clock,
                title: "Response Time",
                description:
                  "We aim to respond to all inquiries within 1–2 business days",
                contact: null,
                href: null,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-slate-100 rounded-[28px] p-5 sm:p-7 md:p-8 hover:shadow-xl hover:shadow-slate-200/30 transition-all duration-500"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-5">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-serif font-bold text-lg text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 font-light text-sm leading-relaxed mb-3">
                  {item.description}
                </p>
                {item.contact && item.href && (
                  <a
                    href={item.href}
                    className="text-accent hover:underline font-medium text-sm"
                  >
                    {item.contact}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="prose-elevated">
            <h2>Frequently Asked</h2>
            <p>
              <strong>Product recommendations:</strong> Looking for help choosing
              the right air purifier, humidifier, or monitor? Check our{" "}
              <a href="/best-picks">Best Picks</a> section for curated
              recommendations by room size, budget, and use case.
            </p>
            <p>
              <strong>Review requests:</strong> If you&apos;re a manufacturer
              and would like us to consider reviewing your product, please email
              us with product details and we will evaluate it for inclusion in
              our editorial calendar.
            </p>
            <p>
              <strong>Privacy concerns:</strong> For questions about how we
              handle your data, please review our{" "}
              <a href="/privacy-policy">Privacy Policy</a> or contact us at{" "}
              <a href="mailto:privacy@airqualitynest.com">
                privacy@airqualitynest.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
