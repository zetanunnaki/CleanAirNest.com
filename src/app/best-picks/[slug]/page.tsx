import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getArticle, getArticleSlugs, getAllArticles } from "@/lib/articles";
import { getReadingTime, extractFaqItems } from "@/lib/utils";
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
      publishedTime: article.frontmatter.date,
      authors: [article.frontmatter.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.frontmatter.title,
      description: article.frontmatter.description,
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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <header className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-hero" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-[15%] w-72 h-72 bg-accent/8 rounded-full blur-[80px]" />
        </div>
        <div className="fluid-container py-10 sm:py-14 md:py-20 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Breadcrumbs items={[
              { label: "Best Picks", href: "/best-picks" },
              { label: article.frontmatter.title },
            ]} />
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <span className="badge-accent">
                {article.frontmatter.category}
              </span>
              <span className="badge bg-primary/10 text-primary border border-primary/15">
                Best Picks
              </span>
            </div>
            <h1 className="text-[clamp(1.5rem,4vw,3.25rem)] font-display font-bold tracking-tight text-primary mb-4 sm:mb-5 leading-[1.08]">
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
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl sm:rounded-3xl overflow-hidden mb-6 sm:mb-10 shadow-lg">
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
