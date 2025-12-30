"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PostBox from "./PostBox";
import { CategoriesConnection, CategoryNode, Post } from "@/lib/gql-types";

interface BlogGridProps {
  posts: Post[];
  cat?: CategoriesConnection;
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts, cat }) => {
  const pathname = usePathname(); // ⭐ Current URL path

  if (!posts?.length) {
    return <p className="text-center text-gray-500">No blog posts found.</p>;
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">

        {/* 🏷️ Categories */}
        {cat?.nodes?.length ? (
          <ul className="flex flex-wrap justify-center mb-10">

            {/* ALL link */}
            <li>
              <Link
                href={`/blog`}
                className={`inline-block text-sm px-5 py-2 rounded-sm mr-2 mb-2 transition-all duration-300
                  ${
                    pathname === "/blog"
                      ? "bg-secondary text-white" // ⭐ Active state
                      : "bg-primary/20 text-gray-800 hover:bg-secondary hover:text-white"
                  }
                `}
              >
                All
              </Link>
            </li>

            {/* Category List */}
            {cat.nodes.map((category: CategoryNode) => (
              <li key={category.id}>
                <Link
                  href={`/category/${category.slug}`}
                  className={`inline-block text-sm px-5 py-2 rounded-sm mr-2 mb-2 transition-all duration-300
                    ${
                      pathname === `/category/${category.slug}`
                        ? "bg-secondary text-white" // ⭐ Active link style
                        : "bg-primary/20 text-gray-800 hover:bg-secondary hover:text-white"
                    }
                  `}
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
