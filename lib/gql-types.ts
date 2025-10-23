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

// ✅ A single category node
export interface CategoryNode {
  id: string;
  name: string;
  slug: string;
}

// ✅ Connection wrapper
export interface CategoriesConnection {
  nodes: CategoryNode[]; // direct nodes array
    edges: CategoryNode[]; // direct nodes array
}


// --------------------
// Category By Slug Types
// --------------------

export interface CategoryBySlugResponse {
  category?: CategoryBySlug | null;
}

export interface CategoryBySlug {
  id: string;
  name: string;
  slug: string;
  posts?: {
    nodes?: Post[] | null;
  } | null;
}

// Reuse your existing Post interface
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  date?: string;
  featuredImage?: FeaturedImage;
}

// Featured Image Type
export interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText?: string;
  };
}


export interface GetPostsByCategorySlugQuery {
  category?: {
    id: string;
    name: string;
    slug: string;
    posts?: {
      nodes?: Post[] | null;
    } | null;
  } | null;
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

export interface SourceImage {
  node: {
    mediaItemUrl: string;
    altText?: string;
  };
}

export interface Author {
  node: {
    name: string;
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

// -----------------------------------
// Root Query Type
// -----------------------------------
export interface GetPostBySlugQuery {
  post?: PostBySlug | null;
}

// -----------------------------------
// Post Interface
// -----------------------------------
export interface PostBySlug {
  title: string;
  postInfo?: PostInfo | null;
}

// -----------------------------------
// PostInfo Interface
// -----------------------------------
export interface PostInfo {
  postContent?: PostContentBlock[] | null;
}

// -----------------------------------
// Union Type for Post Content Blocks
// -----------------------------------
export type PostContentBlock =
  | FullContentLayout
  | GetASampleFromUsLayout
  | ContentWithImageLayout;

// -----------------------------
// Content Layout: Full Content
// -----------------------------
export interface FullContentLayout {
  __typename?: "PostInfoPostContentFullContentLayout";
  fullContent?: string | null;
}

// ---------------------------------------------
// Content Layout: Get a Sample From Us
// ---------------------------------------------
export interface GetASampleFromUsLayout {
  __typename?: "PostInfoPostContentGetASampleFromUsLayout";
  title?: string | null;
  subTitle?: string | null;
  description?: string | null;
}

// ---------------------------------------------
// Content Layout: Content with Image
// ---------------------------------------------
export interface ContentWithImageLayout {
  __typename?: "PostInfoPostContentContentWithImageLayout";
  content?: string | null;
  imagePosition?: string | null;
  blockImage?: SourceImage | null;
}

// -----------------------------------
// Media Item Connection Edge
// -----------------------------------
export interface AcfMediaItemConnectionEdge {
  node?: MediaItemNode | null;
}

export interface MediaItemNode {
  mediaItemUrl?: string | null;
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
        icon?: IconType;
      }[]
    | null;
}

export interface HomeInfoAdvanteges {
  title?: string;
  subTitle?: string;
  icon?: IconType;
  options?:
    | {
        title?: string;
        description?: string;
        icon?: IconType;
      }[]
    | null;
}

export interface HomeWhyChooseUs {
  title?: string;
  subTitle?: string;
  whyCards?:
    | {
        title?: string;
        description?: string;
        icon?: IconType;
      }[]
    | null;
}

export interface IconType {
  node: {
    mediaItemUrl: string;
    altText?: string;
  };
}

export interface HomeInfoCustomersInnovate {
  title?: string;
  description?: string;
  customerName?: string;
  customerFeeback?: string;
  icon?: IconType;
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

// ✅ TypeScript Types
export interface InspirationImage {
  node: {
    sourceUrl: string;
    altText: string;
  };
}

export interface Inspiration {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage?: InspirationImage | null;
}

export interface InspirationsResponse {
  inspirations: {
    nodes: Inspiration[];
  };
}

export interface ClientsResponse {
  clientLogos: {
    nodes: Inspiration[];
  };
}
