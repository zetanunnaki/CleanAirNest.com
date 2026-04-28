import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getArticle, getArticleSlugs, getAllArticles } from "@/lib/articles";
import { getReadingTime, extractFaqItems, extractProductIds } from "@/lib/utils";
import { getProduct } from "@/lib/products";
import { MdxContent } from "@/components/MdxContent";
import { AuthorByline } from "@/components/AuthorByline";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";

import { SocialShare } from "@/components/SocialShare";


interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getArticleSlugs("best-picks").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle("best-picks", slug);
  if (!article) return {};
  return {
    title: article.frontmatter.seoTitle || article.frontmatter.title,
    description: article.frontmatter.description,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      type: "article",
      url: `https://airqualitynest.com/best-picks/${slug}`,
      publishedTime: article.frontmatter.date,
      modifiedTime: article.frontmatter.updatedDate || article.frontmatter.date,
      authors: [article.frontmatter.author],
      images: [{ url: `https://airqualitynest.com/best-picks/${slug}/opengraph-image`, width: 1200, height: 630, alt: article.frontmatter.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      images: [`https://airqualitynest.com/best-picks/${slug}/opengraph-image`],
    },
    alternates: {
      canonical: `https://airqualitynest.com/best-picks/${slug}`,
    },
  };
}

export default async function BestPicksArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle("best-picks", slug);
  if (!article) notFound();

  const allArticles = getAllArticles();

  const jsonLd = {
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
      logo: { "@type": "ImageObject", url: "https://airqualitynest.com/logo.png" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://airqualitynest.com/best-picks/${slug}`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["[data-speakable='verdict']", ".prose-elevated h2", ".prose-elevated h2 + p"],
    },
  };

  const productIds = extractProductIds(article.content);
  const itemListJsonLd = productIds.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: productIds.map((id, i) => {
      const product = getProduct(id);
      if (!product) return null;
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: `${product.brand} ${product.name}`,
          image: `https://airqualitynest.com${product.image}`,
          brand: { "@type": "Brand", name: product.brand },
          ...(product.rating && {
            review: {
              "@type": "Review",
              reviewRating: { "@type": "Rating", ratingValue: product.rating, bestRating: 5 },
              author: { "@type": "Organization", name: "AirQualityNest" },
            },
          }),
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: product.price.replace("$", "").replace(",", ""),
            availability: "https://schema.org/InStock",
            url: product.amazonLink,
          },
        },
      };
    }).filter(Boolean),
  } : null;

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
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <header className="border-b border-slate-200">
        <div className="fluid-container py-10 sm:py-14 md:py-20">
          <div className="max-w-4xl mx-auto">
            <Breadcrumbs items={[
              { label: "Best Picks", href: "/best-picks" },
              { label: article.frontmatter.title },
            ]} />
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-[2px] bg-accent" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {article.frontmatter.category} · Best Picks
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
              url={`https://airqualitynest.com/best-picks/${slug}`}
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
          <RelatedArticles articles={allArticles} currentSlug={slug} />
        </div>
      </article>
    </>
  );
}
