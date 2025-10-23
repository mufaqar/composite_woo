import React from "react";
import Banner from "@/components/Banner";
import BlogGrid from "@/components/Blogs/BlogGrid";
import FeaturedIcons from "@/components/HomePage/FeaturedIcons";
import client from "@/lib/apollo-client";
import { GET_POSTS, Query_Post_Categories } from "@/lib/queries/getPosts";
import { CategoriesConnection, GetPostsQuery, Post } from "@/lib/gql-types";

export default async function BlogPage() {
  // 📰 Fetch posts
  const { data } = await client.query<GetPostsQuery>({
    query: GET_POSTS,
    variables: { first: 20 },
  });

  // 🏷️ Fetch categories
  const { data: catData } = await client.query<{
    categories: CategoriesConnection;
  }>({
    query: Query_Post_Categories,
    variables: { first: 10 },
  });

  // ✅ Cleanly filter posts
  const posts: Post[] = (data?.posts?.nodes ?? []).filter(
    (post): post is Post => !!post
  );

  const categories = catData?.categories;

  return (
    <main>
      <Banner
        title="Our Blogs"
        img="/images/blog.png"
        desc="Read our latest updates, guides, and stories."
      />
      <FeaturedIcons />
      <BlogGrid posts={posts} cat={categories} />
    </main>
  );
}

// ♻️ Incremental Static Regeneration
export const revalidate = 60; // rebuild page every 60s
