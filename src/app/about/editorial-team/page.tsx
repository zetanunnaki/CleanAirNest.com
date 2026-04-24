import { Metadata } from "next";
import Link from "next/link";
import { Shield, Award, Beaker, Users, BookOpen, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Editorial Team - Meet the Experts Behind AirQualityNest",
  description:
    "Meet the AirQualityNest editorial team. Our indoor air quality experts combine deep product research, air quality science knowledge, and years of experience to deliver trustworthy reviews and guides.",
  alternates: {
    canonical: "https://airqualitynest.com/about/editorial-team",
  },
};

const teamMembers = [
  {
    name: "CleanAir Team",
    role: "Editorial & Research",
    expertise: [
      "HEPA & activated carbon filtration",
      "PM2.5 / VOC analysis",
      "Customer review data analysis",
      "Product value & cost-of-ownership evaluation",
    ],
    description:
      "Our core editorial team researches, analyzes, and writes every review and guide on AirQualityNest. Each member brings deep knowledge of air purifiers, monitors, humidifiers, and dehumidifiers. We analyze hundreds of verified customer reviews and cross-reference manufacturer specs with independent certifications to evaluate real-world product performance.",
  },
];

export default function EditorialTeamPage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AirQualityNest",
    url: "https://airqualitynest.com",
    logo: "https://airqualitynest.com/icon.svg",
    description:
      "Editorial reviews and buying guides for air purifiers, air quality monitors, humidifiers, and dehumidifiers.",
    foundingDate: "2024",
    sameAs: [
      "https://pinterest.com/airqualitynest",
      "https://youtube.com/@airqualitynest",
      "https://facebook.com/airqualitynest",
    ],
    member: teamMembers.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      worksFor: {
        "@type": "Organization",
        name: "AirQualityNest",
      },
      knowsAbout: member.expertise,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 air-glow"></div>
        <div className="fluid-container py-10 sm:py-16 md:py-24 lg:py-32 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-8">
              <Users className="w-4 h-4" />
              Our Team
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold tracking-tighter text-primary mb-6 leading-[1.05]">
              Meet the Editorial Team
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed">
              Every recommendation on AirQualityNest is backed by thorough
              research, real customer data, and a genuine commitment to
              helping you breathe cleaner air at home.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="fluid-container py-10 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Beaker,
              title: "Air Quality Science",
              text: "Deep knowledge of particulate matter (PM2.5, PM10), volatile organic compounds (VOCs), CO2, and other indoor pollutants. We understand filtration mechanisms -- HEPA, activated carbon, photocatalytic oxidation -- at a technical level.",
            },
            {
              icon: Award,
              title: "Product Research",
              text: "Every product we review goes through an extensive research process. We analyze hundreds of verified customer reviews, cross-reference AHAM-verified CADR ratings, and evaluate total cost of ownership over the product's lifespan.",
            },
            {
              icon: Shield,
              title: "Editorial Independence",
              text: "Manufacturers cannot pay for reviews or influence our rankings. We disclose every affiliate relationship and recommend only what we would use in our own homes.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white border border-slate-100 rounded-[28px] p-5 sm:p-7 md:p-10 text-center hover:shadow-xl hover:shadow-slate-200/30 transition-all duration-500"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-bold text-xl text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-slate-500 font-light leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Members */}
      <section className="fluid-container py-10 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-3xl font-display font-bold tracking-tighter text-primary">
              Who We Are
            </h2>
          </div>

          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white border border-slate-100 rounded-[28px] p-5 sm:p-7 md:p-10 mb-8"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Users className="w-10 h-10 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-2xl text-primary mb-1">
                    {member.name}
                  </h3>
                  <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">
                    {member.role}
                  </p>
                  <p className="text-slate-500 font-light leading-relaxed mb-6">
                    {member.description}
                  </p>
                  <h4 className="font-display font-bold text-sm text-primary uppercase tracking-widest mb-3">
                    Areas of Expertise
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {member.expertise.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-2 text-slate-500 font-light"
                      >
                        <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Review Methodology */}
      <section className="fluid-container py-10 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-50 border border-slate-100 p-5 sm:p-7 md:p-10 rounded-2xl sm:rounded-[40px]">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="bg-accent text-white p-4 rounded-3xl shrink-0 animate-float shadow-xl shadow-accent/20">
                <Beaker size={32} />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-primary mb-4">
                  Our Review Methodology
                </h2>
                <p className="text-slate-500 font-light leading-relaxed mb-4">
                  For every product, we analyze hundreds of verified customer
                  reviews across major retailers and cross-reference them with
                  AHAM-verified CADR ratings, Energy Star certifications, and
                  available third-party performance data.
                </p>
                <p className="text-slate-500 font-light leading-relaxed mb-4">
                  We evaluate the full picture: filter replacement cost over
                  a year, real-world noise levels reported by customers,
                  maintenance effort, app reliability, energy consumption,
                  and build-quality durability based on long-term owner
                  feedback.
                </p>
                <p className="text-slate-500 font-light leading-relaxed">
                  We publish our methodology, disclose our affiliate
                  relationships, and update reviews when manufacturers release
                  firmware or hardware changes. Read more on our{" "}
                  <Link
                    href="/about"
                    className="text-accent hover:underline font-medium"
                  >
                    About page
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
