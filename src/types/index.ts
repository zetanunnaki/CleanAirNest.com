export interface ProductSpecs {
  [key: string]: string | undefined;
}

export interface Product {
  name: string;
  brand: string;
  category: string;
  price: string;
  image: string;
  specs: ProductSpecs;
  amazonLink: string;
  walmartLink?: string;
  filterReplacementLink?: string;
  filterReplacementCycle?: string;
  pros: string[];
  cons: string[];
  rating?: number;
  badge?: string;
}

export interface ProductCatalog {
  [productId: string]: Product;
}

export interface ArticleFrontmatter {
  title: string;
  seoTitle: string;
  description: string;
  author: string;
  date: string;
  updatedDate?: string;
  featuredImage: string;
  category: string;
  featured?: boolean;
  readingTime?: number;
}

export interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
}
