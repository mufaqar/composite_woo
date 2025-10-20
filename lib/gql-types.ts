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

// Category node type
export interface CategoryNode {
  name: string;
  slug: string;
}

// Category edge type
export interface CategoryEdge {
  node: CategoryNode;
}

// Categories connection type (GraphQL style)
export interface CategoriesConnection {
  edges: CategoryEdge[];
}
// --------------------
// Main Post Interface
// --------------------
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  date?: string;
  featuredImage?: FeaturedImage;
  author?: Author;
  postInfo?: PostInfo;
 categories?: CategoriesConnection;
}

export interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText?: string;
  };
}

export interface Author {
  node: {
    name: string;
  };
}

// For postInfo
export interface PostInfoUpperContent {
  data?: string;
  dataImage?: {
    node?: {
      mediaItemUrl: string;
    };
  };
}

export interface PostInfoLowerContent {
  data?: string;
}

export interface PostInfo {
  upperContent?: PostInfoUpperContent;
  lowerContent?: PostInfoLowerContent;
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

export interface HomeInfoProductRange {
  title?: string;

  subTitle?: string;
  categoryInfo?:
    | {
        title?: string;
        link?: string;
        desc?: string;
        image?: { node?: { mediaItemUrl?: string } };
      }[]
    | null;
}

export interface HomeInfoAdvanteges extends HomeInfoSection {
  options?:
    | {
        title?: string;
        description?: string;
        icon?: { node?: { mediaItemUrl?: string } };
      }[]
    | null;
}

export interface HomeWhyChooseUs extends HomeInfoSection {
  whyCards?:
    | {
        title?: string;
        description?: string;
        icon?: {
          node?: {
            mediaItemUrl?: string;
          };
        };
      }[]
    | null;
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
  productRange?: HomeInfoProductRange;
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


// src/types/auth.ts

export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginUser {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  login: {
    authToken: string;
    refreshToken: string;
    user: LoginUser;
  };
}


// ✅ TypeScript types
export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
}

export interface RegisterUserResponse {
  registerUser: {
    user: {
      id: string;
      username: string;
      email: string;
    };
  };
}
