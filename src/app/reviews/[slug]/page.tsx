import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, User, Clock } from "lucide-react";
import { getArticle, getArticleSlugs, getAllArticles } from "@/lib/articles";
import { getReadingTime, extractFaqItems } from "@/lib/utils";
import { getProduct } from "@/lib/products";
import { MdxContent } from "@/components/MdxContent";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { SocialShare } from "@/components/SocialShare";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <header className="relative overflow-hidden">
        <div className="absolute inset-0 air-glow"></div>
        <div className="fluid-container py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Breadcrumbs items={[
              { label: "Reviews", href: "/reviews" },
              { label: article.frontmatter.title },
            ]} />
            <div className="flex items-center gap-3 mb-8">
              <span className="bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                {article.frontmatter.category}
              </span>
              <span className="bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                Review
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-primary mb-6 leading-[1.05]">
              {article.frontmatter.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed mb-10 max-w-3xl">
              {article.frontmatter.description}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <Link href="/about/editorial-team" className="flex items-center gap-2 hover:text-accent transition-colors">
                <User className="w-4 h-4" />
                <span className="font-medium text-slate-600 hover:text-accent transition-colors">{article.frontmatter.author}</span>
              </Link>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.frontmatter.date}>
                  {new Date(article.frontmatter.date).toLocaleDateString("en-US", {
                    month: "long", day: "numeric", year: "numeric",
                  })}
                </time>
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {getReadingTime(article.content)} min read
              </span>
            </div>
            <SocialShare
              title={article.frontmatter.title}
              url={`https://airqualitynest.com/reviews/${slug}`}
              description={article.frontmatter.description}
            />
          </div>
        </div>
      </header>

      <article className="fluid-container pb-24">
        <div className="max-w-4xl mx-auto">
          <AffiliateDisclosure />
          <MdxContent source={article.content} />
          <NewsletterSignup />
          <RelatedArticles articles={allArticles} currentSlug={slug} />
        </div>
      </article>
    </>
  );
}
