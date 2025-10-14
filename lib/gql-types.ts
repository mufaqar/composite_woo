// --------------------
// TypeScript Interfaces
// --------------------

// Generic GraphQL "maybe" helper
type Maybe<T> = T | null | undefined;

// Author
interface Author {
  node: {
    name: string;
  };
}

// Featured Image
interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText?: string;
  };
}

// Single Post Type
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: FeaturedImage;
  author?: Author;
}

// Root Query Type
export interface GetPostsQuery {
  posts?: {
    nodes?: Maybe<Array<Maybe<Post>>>;
  };
}