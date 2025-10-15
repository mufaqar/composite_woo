// --------------------
// TypeScript Interfaces
// --------------------

// Generic GraphQL helper for nullable fields
export type Maybe<T> = T | null | undefined;

// Author
export interface Author {
  node: {
    name: string;
  };
}

// Featured Image
export interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText?: string;
  };
}

// Category
export interface Category {
  node: {
    name: string;
    slug: string;
  };
}

// --------------------
// Main Post Interface
// --------------------
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  featuredImage?: FeaturedImage;
  author?: Author;
  categories?: {
    edges: Category[];
  };
}

// --------------------
// Root Query Type
// --------------------
export interface GetPostsQuery {
  posts?: {
    nodes?: Maybe<Array<Maybe<Post>>>;
  };
}

// --------------------
// FAQ Query Types
// --------------------
export interface Faq {
  title: string;
  content: string;
}

export interface GetFaqByCatQuery {
  faqtype?: {
    faqs?: {
      nodes?: Maybe<Array<Maybe<Faq>>>;
    };
  };
}

export interface GetFaqs {
  faqs?: {
    nodes?: Maybe<Array<Maybe<Faq>>>;
  };
}

// types/home.ts
export interface HomeInfoSection {
  title?: string;
  subTitle?: string;
}



export interface HomeInfoAdvanteges extends HomeInfoSection {
  options?: {
    title?: string;
    description?: string;
    icon?: { node?: { mediaItemUrl?: string } };
  }[] | null;
}

export interface HomeWhyChooseUs extends HomeInfoSection {
  whyCards?: {
    title?: string;
    description?: string;
    icon?: {
      node?: {
        mediaItemUrl?: string;
      };
    };
  }[] | null;
}

export interface HomeInfoCustomersInnovate {
  title?: string;
  description?: string;
  customerName?: string;
  customerFeeback?: string;
}

export interface HomeInfo {
  sliderInfo?: HomeInfoSection;
  whyChooseUs?: HomeWhyChooseUs;
  productRange?: HomeInfoSection;
  trendingProducts?: HomeInfoSection;
  advantages?: HomeInfoAdvanteges;
  customersInnovate?: HomeInfoCustomersInnovate;
  dreamOutdoor?: HomeInfoSection;
}

export interface GetHomeQuery {
  page?: {
    title?: string;
    homeInfo?: HomeInfo;
  };
}