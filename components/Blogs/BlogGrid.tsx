"use client";

import React from "react";
import Link from "next/link";
import PostBox from "./PostBox";
import { CategoriesConnection, CategoryNode, Post } from "@/lib/gql-types";

interface BlogGridProps {
  posts: Post[];
  cat?: CategoriesConnection;
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts, cat }) => {
  if (!posts?.length) {
    return <p className="text-center text-gray-500">No blog posts found.</p>;
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* 🏷️ Categories */}
        {cat?.nodes?.length ? (
          <ul className="flex flex-wrap justify-center mb-10">
            {cat.nodes.map((category: CategoryNode) => (
              <li key={category.id}>
                <Link
                  href={`/category/${category.slug}`}
                  className="inline-block bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full mr-2 mb-2 hover:bg-secondary hover:text-white transition-all duration-300"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        {/* 📰 Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostBox key={post.id} data={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
