import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "AirQualityNest terms of use. Read our terms and conditions for using our website.",
  alternates: {
    canonical: "https://airqualitynest.com/terms",
  },
  openGraph: {
    title: "Terms of Use | AirQualityNest",
    description: "Read our terms and conditions for using our website.",
    url: "https://airqualitynest.com/terms",
  },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <div className="fluid-container py-16 md:py-24">
      <div className="max-w-4xl mx-auto prose-elevated">
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-primary mb-10">
          Terms of Use
        </h1>
        <p className="text-sm text-slate-500 mb-12">Last updated: April 18, 2026</p>

        <h2>Agreement to Terms</h2>
        <p>
          By accessing and using AirQualityNest.com (&quot;the Site&quot;), you agree to be bound
          by these Terms of Use. If you do not agree with any part of these terms,
          please do not use our website.
        </p>

        <h2>Content and Information</h2>
        <p>
          The content on AirQualityNest.com is provided for informational purposes only.
          While we strive for accuracy, we make no warranties or representations about
          the completeness, accuracy, reliability, or suitability of the information,
          products, services, or related graphics contained on the website.
        </p>
        <p>
          Product specifications, prices, and availability are subject to change
          without notice. We recommend verifying current information on the
          retailer&apos;s website before making a purchase.
        </p>

        <h2>Affiliate Relationships</h2>
        <p>
          AirQualityNest.com is a participant in the Amazon Services LLC Associates
          Program, an affiliate advertising program designed to provide a means for
          sites to earn advertising fees by advertising and linking to Amazon.com.
          We may also participate in other affiliate programs, including the
          Walmart.com affiliate program.
        </p>
        <p>
          When you click on affiliate links and make purchases, we may receive
          commissions. This does not affect the price you pay. Our editorial
          recommendations are independent and not influenced by affiliate
          relationships.
        </p>

        <h2>Product Reviews and Testing</h2>
        <p>
          Our product reviews reflect the honest opinions and testing results of
          our team. Individual results may vary based on your specific environment,
          usage patterns, and conditions. We purchase the majority of products we
          review at retail price.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content on this website, including text, graphics, logos, images, and
          software, is the property of AirQualityNest or its content suppliers and is
          protected by copyright laws. You may not reproduce, distribute, modify,
          or create derivative works without our prior written consent.
        </p>

        <h2>User Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the website for any unlawful purpose</li>
          <li>Attempt to gain unauthorized access to any portion of the website</li>
          <li>Interfere with the proper functioning of the website</li>
          <li>Scrape, data mine, or use automated tools to access content</li>
        </ul>

        <h2>Disclaimer of Warranties</h2>
        <p>
          THE WEBSITE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF
          ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE WEBSITE
          WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL
          COMPONENTS.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          IN NO EVENT SHALL AIRQUALITYNEST BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
          SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO
          YOUR USE OF THE WEBSITE OR ANY PRODUCTS PURCHASED THROUGH AFFILIATE LINKS.
        </p>

        <h2>External Links</h2>
        <p>
          Our website contains links to third-party websites. We are not responsible
          for the content, privacy policies, or practices of these external sites.
          Visiting these websites is at your own risk.
        </p>

        <h2>Changes to These Terms</h2>
        <p>
          We reserve the right to modify these Terms of Use at any time. Changes
          will be effective immediately upon posting to the website. Your continued
          use of the website after changes constitutes acceptance of the modified terms.
        </p>

        <h2>Governing Law</h2>
        <p>
          These Terms of Use are governed by and construed in accordance with the
          laws of the United States, without regard to conflict of law principles.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about these Terms, please contact us at{" "}
          <a href="mailto:legal@airqualitynest.com">legal@airqualitynest.com</a>.
        </p>
      </div>
    </div>
  );
}
