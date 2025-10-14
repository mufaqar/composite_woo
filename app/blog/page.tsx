import React from "react";
import Banner from "@/components/Banner";
import BlogGrid from "@/components/Blogs/BlogGrid";
import FeaturedIcons from "@/components/HomePage/FeaturedIcons";
import client from "@/lib/apollo-client";
import { GET_POSTS } from "@/lib/queries/getPosts";

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

// --------------------
// Page Component
// --------------------

export default async function BlogPage() {
  const { data } = await client.query<GetPostsQuery>({
    query: GET_POSTS,
    variables: { first: 6 },
  });

  // Cleanly filter out nulls to keep type safety
  const posts: Post[] = (data?.posts?.nodes ?? []).filter(
    (post): post is Post => !!post
  );

  return (
    <main>
      <Banner
        title="Our Blogs"
        img="/images/blog.png"
        desc="Read our latest updates, guides, and stories."
      />
      <FeaturedIcons />
      <BlogGrid posts={posts} />
    </main>
  );
}

// (Optional) Enable Incremental Static Regeneration
export const revalidate = 60; // rebuild page every 60s
