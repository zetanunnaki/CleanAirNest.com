import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "AirQualityNest affiliate disclosure. Learn how we earn revenue through affiliate partnerships and how it affects our editorial content.",
  alternates: {
    canonical: "https://airqualitynest.com/disclosure",
  },
  openGraph: {
    title: "Affiliate Disclosure | AirQualityNest",
    description:
      "Learn how we earn revenue through affiliate partnerships and how it affects our editorial content.",
    url: "https://airqualitynest.com/disclosure",
  },
};

export default function DisclosurePage() {
  return (
    <div className="fluid-container py-16 md:py-24">
      <div className="max-w-4xl mx-auto prose-elevated">
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-primary mb-10">
          Affiliate Disclosure
        </h1>
        <p className="text-sm text-slate-500 mb-12">Last updated: May 7, 2026</p>

        <h2>How We Earn Revenue</h2>
        <p>
          AirQualityNest is reader-supported. When you buy through links on our
          site, we may earn an affiliate commission at no additional cost to you.
          This revenue supports our editorial research and allows us to continue
          providing free, in-depth content.
        </p>

        <h2>Amazon Associates Program</h2>
        <p>
          AirQualityNest is a participant in the Amazon Services LLC Associates
          Program, an affiliate advertising program designed to provide a means
          for sites to earn advertising fees by advertising and linking to
          Amazon.com. Amazon and the Amazon logo are trademarks of Amazon.com,
          Inc. or its affiliates.
        </p>

        <h2>Other Affiliate Partnerships</h2>
        <p>
          We may also participate in other affiliate programs, including the
          Walmart.com affiliate program. When you click on affiliate links to
          these retailers and make a purchase, we may receive a commission.
        </p>

        <h2>Editorial Independence</h2>
        <p>
          Our affiliate relationships never influence our editorial content,
          product ratings, or recommendations. We recommend products based
          solely on our research and analysis of verified customer reviews,
          manufacturer specifications, and independent certifications.
        </p>
        <p>
          Many products we evaluate do not make it into our recommendations.
          Manufacturers cannot pay for positive reviews or influence our
          rankings in any way. Our editorial team maintains complete
          independence from our revenue operations.
        </p>

        <h2>How Affiliate Links Work</h2>
        <p>
          When you click an affiliate link on AirQualityNest and make a
          purchase, the retailer pays us a small commission. This commission
          comes from the retailer — it does not increase the price you pay.
          You would pay the same price whether you use our link or navigate
          to the retailer directly.
        </p>

        <h2>Identifying Affiliate Links</h2>
        <p>
          Affiliate links on AirQualityNest are clearly marked with buttons
          such as &quot;Check Price on Amazon&quot; or &quot;Check Price at Walmart.&quot; These
          links open in a new tab and direct you to the retailer&apos;s product
          page. Every page that contains affiliate links includes a disclosure
          statement near the top of the content.
        </p>

        <h2>FTC Compliance</h2>
        <p>
          This disclosure is provided in accordance with the Federal Trade
          Commission&apos;s 16 CFR Part 255, &quot;Guides Concerning the Use of
          Endorsements and Testimonials in Advertising.&quot; We believe in full
          transparency with our readers about how we fund our operations.
        </p>

        <h2>Questions?</h2>
        <p>
          If you have any questions about our affiliate relationships or
          editorial process, please contact us at{" "}
          <a href="mailto:hello@airqualitynest.com">hello@airqualitynest.com</a>.
        </p>
      </div>
    </div>
  );
}
