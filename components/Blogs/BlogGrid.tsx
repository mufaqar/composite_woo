"use client";

import React, { useState } from "react";
import PostBox from "./PostBox";
import { Post } from "@/lib/gql-types";

interface BlogGridProps {
  posts: Post[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
  if (!posts.length)
    return <p className="text-center text-gray-500">No blog posts found.</p>;

  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3); // show 3 more on each click
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, visibleCount).map((post) => (
            <PostBox key={post.id} data={post} />
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < posts.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="md:text-base text-sm font-bold text-white inline-flex w-fit md:px-7 md:py-3 px-5 py-2 bg-secondary rounded-4xl hover:bg-primary border border-secondary hover:border-primary hover:text-white transition-all duration-300 ease-in-out"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;
