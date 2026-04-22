import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const metadata: Metadata = {
  title: {
    default: "AirQualityNest - Expert Air Quality Reviews & Guides",
    template: "%s | AirQualityNest",
  },
  description:
    "Expert reviews, comparisons, and guides for air purifiers, air quality monitors, humidifiers, and dehumidifiers. Breathe easier at home.",
  metadataBase: new URL("https://airqualitynest.com"),
  openGraph: {
    type: "website",
    siteName: "AirQualityNest",
    locale: "en_US",
    title: "AirQualityNest - Expert Air Quality Reviews & Guides",
    description:
      "In-depth reviews and buying guides for air purifiers, monitors, humidifiers, and dehumidifiers.",
    url: "https://airqualitynest.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "AirQualityNest",
    description:
      "In-depth reviews and buying guides for air purifiers, monitors, humidifiers, and dehumidifiers.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://airqualitynest.com",
    types: {
      "application/rss+xml": "https://airqualitynest.com/feed.xml",
    },
  },
  verification: {
    google: "GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen flex flex-col">
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:top-4 focus:left-4 focus:px-6 focus:py-3 focus:bg-accent focus:text-white focus:rounded-xl focus:text-sm focus:font-semibold focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1 contain-layout">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
