import React from "react";
import Banner from "@/components/Banner";
import BlogGrid from "@/components/Blogs/BlogGrid";
import FeaturedIcons from "@/components/HomePage/FeaturedIcons";
import client from "@/lib/apollo-client";
import { GET_POSTS } from "@/lib/queries/getPosts";
import { GetPostsQuery, Post } from "@/lib/gql-types";

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
