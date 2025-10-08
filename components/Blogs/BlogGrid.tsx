"use client";

import React, { useState } from "react";
import Image from "next/image";
import PostBox from "./PostBox";

interface Post {
  id: number;
  title: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

const posts: Post[] = [
  {
    id: 1,
    date: "13 Feb 2022",
    category: "Design",
    title: "Timeless product crafted beautifully with a sustainable materials",
    readTime: "3 minute read",
    image: "/images/blog1.png",
  },
  {
    id: 2,
    date: "12 Jan 2022",
    category: "Lifestyle",
    title: "Timeless product crafted beautifully with a sustainable materials",
    readTime: "8 minute read",
    image: "/images/blog2.png",
  },
  {
    id: 3,
    date: "11 Dec 2021",
    category: "Inspiration",
    title: "Timeless product crafted beautifully with a sustainable materials",
    readTime: "4 minute read",
    image: "/images/blog3.png",
  },
  {
    id: 4,
    title: "How to Increase your Property Value?",
    date: "Mar 2024",
    category: "Inspiration",
    readTime: "4 min read",
    image: "/images/blog1.png",
  },
  {
    id: 5,
    title: "Fencing Costs",
    date: "Mar 2024",
    category: "Lifestyle",
    readTime: "2 min read",
    image: "/images/blog2.png",
  },
  {
    id: 6,
    title: "Tips to Improve your Outdoor Space",
    date: "Mar 2024",
    category: "Design",
    readTime: "3 min read",
    image: "/images/blog3.png",
  },
  {
    id: 7,
    title: "Ways to Decorate your Garden",
    date: "Mar 2024",
    category: "Inspiration",
    readTime: "3 min read",
    image: "/images/blog2.png",
  },
  {
    id: 8,
    title: "Modern Patio Ideas",
    date: "Mar 2024",
    category: "Lifestyle",
    readTime: "2 min read",
    image: "/images/blog1.png",
  },
  {
    id: 9,
    title: "Outdoor Furniture Trends",
    date: "Mar 2024",
    category: "Design",
    readTime: "2 min read",
    image: "/images/blog3.png",
  },
];

const BlogGrid: React.FC = () => {
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
