import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "AirQualityNest privacy policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="fluid-container py-16 md:py-24">
      <div className="max-w-4xl mx-auto prose-elevated">
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-primary mb-10">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 mb-12">Last updated: April 18, 2026</p>

        <h2>Introduction</h2>
        <p>
          AirQualityNest (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website airqualitynest.com.
          This Privacy Policy explains how we collect, use, disclose, and safeguard your
          information when you visit our website.
        </p>

        <h2>Information We Collect</h2>
        <h3>Automatically Collected Information</h3>
        <p>
          When you visit our website, we may automatically collect certain information
          about your device, including your IP address, browser type, operating system,
          referring URLs, and pages viewed. This data is collected through cookies,
          web beacons, and similar technologies.
        </p>

        <h3>Analytics</h3>
        <p>
          We use third-party analytics services (such as Google Analytics) to help us
          understand how visitors use our website. These services collect information
          about your use of the website, including pages visited, time spent on pages,
          and traffic sources.
        </p>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Operate and maintain our website</li>
          <li>Improve and personalize your experience</li>
          <li>Analyze usage patterns and trends</li>
          <li>Monitor and prevent technical issues</li>
        </ul>

        <h2>Affiliate Links and Third-Party Services</h2>
        <p>
          Our website contains affiliate links to third-party retailers, including
          Amazon.com and Walmart.com. When you click on these links and make a purchase,
          we may earn a commission at no additional cost to you.
        </p>
        <p>
          These third-party websites have their own privacy policies, and we encourage
          you to review them. We are not responsible for the privacy practices of
          external websites.
        </p>
        <p>
          As an Amazon Associate, we earn from qualifying purchases. Amazon and the
          Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
        </p>

        <h2>Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our
          website. Cookies are small data files stored on your device. You can instruct
          your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>
        <p>Types of cookies we use:</p>
        <ul>
          <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
          <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website</li>
          <li><strong>Affiliate cookies:</strong> Used by affiliate programs to track referrals</li>
        </ul>

        <h2>Data Retention</h2>
        <p>
          We retain automatically collected data for a reasonable period of time to
          fulfill the purposes outlined in this policy. Analytics data is typically
          retained for up to 26 months.
        </p>

        <h2>Your Rights</h2>
        <p>
          Depending on your jurisdiction, you may have the right to access, correct,
          delete, or restrict the processing of your personal data. To exercise these
          rights, please contact us at the email address below.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our website is not directed to children under the age of 13. We do not
          knowingly collect personal information from children under 13.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of
          any changes by posting the new Privacy Policy on this page and updating the
          &quot;Last updated&quot; date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at{" "}
          <a href="mailto:privacy@airqualitynest.com">privacy@airqualitynest.com</a>.
        </p>
      </div>
    </div>
  );
}
