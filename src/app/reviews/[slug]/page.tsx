import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getArticle, getArticleSlugs, getAllArticles } from "@/lib/articles";
import { getReadingTime, extractFaqItems } from "@/lib/utils";
import { getProduct } from "@/lib/products";
import { MdxContent } from "@/components/MdxContent";
import { AuthorByline } from "@/components/AuthorByline";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";

import { SocialShare } from "@/components/SocialShare";
import { NewsletterSignup } from "@/components/NewsletterSignup";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getArticleSlugs("reviews").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle("reviews", slug);
  if (!article) return {};
  return {
    title: article.frontmatter.seoTitle || article.frontmatter.title,
    description: article.frontmatter.description,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      type: "article",
      publishedTime: article.frontmatter.date,
      authors: [article.frontmatter.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.frontmatter.title,
      description: article.frontmatter.description,
    },
    alternates: {
      canonical: `https://airqualitynest.com/reviews/${slug}`,
    },
  };
}

function getProductIdFromSlug(slug: string): string | null {
  const mappings: Record<string, string> = {
    "coway-airmega-ap1512hh-review": "coway-airmega-ap1512hh",
    "airthings-view-plus-review": "airthings-view-plus",
    "levoit-core-400s-review": "levoit-core-400s",
    "levoit-core-300-review": "levoit-core-300",
    "blueair-blue-pure-211-review": "blueair-blue-pure-211",
    "winix-5500-2-review": "winix-5500-2",
    "honeywell-hpa300-review": "honeywell-hpa300",
    "levoit-lv600s-review": "levoit-lv600s",
    "frigidaire-50-pint-review": "frigidaire-ffad5033w1",
    "dreo-6l-humidifier-review": "dreo-oversized-6l",
    "midea-20-pint-review": "midea-20-pint",
    "dyson-big-quiet-review": "dyson-purifier-big-quiet",
    "honeywell-hev685w-review": "honeywell-hev685w",
    "amazon-air-quality-monitor-review": "amazon-air-quality-monitor",
    "awair-element-review": "awair-element",
    "ge-45-pint-review": "ge-adel45ly",
    "iqair-healthpro-plus-review": "iqair-healthpro-plus",
    "molekule-air-mini-plus-review": "molekule-air-mini-plus",
    "rabbit-air-minusa2-review": "rabbit-air-minusa2",
    "medify-ma40-review": "medify-ma40",
    "homelabs-dehumidifier-review": "homelabs-4500",
    "canopy-humidifier-review": "canopy-humidifier",
    "alen-breathesmart-45i-review": "alen-breathesmart-45i",
    "coway-airmega-400-review": "coway-airmega-400",
    "hathaspace-hsp001-review": "hathaspace-hsp001",
    "temtop-m10-review": "temtop-m10",
    "vornado-evdc300-review": "vornado-evdc300",
  };
  return mappings[slug] || null;
}

export default async function ReviewArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle("reviews", slug);
  if (!article) notFound();

  const allArticles = getAllArticles();
  const productId = getProductIdFromSlug(slug);
  const product = productId ? getProduct(productId) : null;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.frontmatter.title,
    description: article.frontmatter.description,
    datePublished: article.frontmatter.date,
    dateModified: article.frontmatter.updatedDate || article.frontmatter.date,
    image: article.frontmatter.featuredImage,
    author: {
      "@type": "Organization",
      name: article.frontmatter.author,
      url: "https://airqualitynest.com/about/editorial-team",
    },
    publisher: {
      "@type": "Organization",
      name: "AirQualityNest",
      url: "https://airqualitynest.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://airqualitynest.com/reviews/${slug}`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["[data-speakable='verdict']", ".prose-elevated h2", ".prose-elevated h2 + p"],
    },
  };

  const productJsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        brand: { "@type": "Brand", name: product.brand },
        image: product.image,
        description: article.frontmatter.description,
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: product.rating,
            bestRating: 5,
          },
          author: { "@type": "Organization", name: "AirQualityNest" },
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: product.price.replace("$", ""),
          offerCount: product.walmartLink ? 2 : 1,
          availability: "https://schema.org/InStock",
        },
      }
    : null;

  const faqItems = extractFaqItems(article.content);
  const faqJsonLd = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {productJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />}
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <header className="border-b border-slate-200">
        <div className="fluid-container py-10 sm:py-14 md:py-20">
          <div className="max-w-4xl mx-auto">
            <Breadcrumbs items={[
              { label: "Reviews", href: "/reviews" },
              { label: article.frontmatter.title },
            ]} />
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-[2px] bg-accent" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {article.frontmatter.category} · Review
              </span>
            </div>
            <h1 className="text-[clamp(1.75rem,4vw,3.25rem)] font-serif font-bold tracking-tight text-primary mb-4 sm:mb-5 leading-[1.1]">
              {article.frontmatter.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-500 font-light leading-relaxed mb-6 sm:mb-8 max-w-3xl">
              {article.frontmatter.description}
            </p>
            <AuthorByline
              author={article.frontmatter.author}
              date={article.frontmatter.date}
              updatedDate={article.frontmatter.updatedDate}
              readingTime={getReadingTime(article.content)}
            />
            <SocialShare
              title={article.frontmatter.title}
              url={`https://airqualitynest.com/reviews/${slug}`}
              description={article.frontmatter.description}
            />
          </div>
        </div>
      </header>

      <article className="fluid-container pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden mb-8 sm:mb-12 border border-slate-200 rounded-lg">
            <Image
              src={article.frontmatter.featuredImage}
              alt={article.frontmatter.title}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
          <MdxContent source={article.content} />
          <NewsletterSignup />
          <RelatedArticles articles={allArticles} currentSlug={slug} />
        </div>
      </article>
    </>
  );
}
