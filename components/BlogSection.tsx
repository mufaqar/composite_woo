'use client'

import HeadingSection from "./HeadingSection"
import AnimateOnScroll, { useAutoDelay } from "./Animation"
import PostBox from "./Blogs/PostBox"
import { Post } from "@/lib/gql-types";
import Link from "next/link";

interface BlogGridProps {
  posts: Post[];
}


const BlogsSection = ({ posts }: BlogGridProps) => {
  const getDelay = useAutoDelay();
  return (
    <section className="py-20 bg-white">
      {/* Heading + Read More */}
      <HeadingSection title="Our blogs" desc="" />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-[65px]">
          {posts?.slice(0, 3).map((post) => (
            <AnimateOnScroll key={post.id} type="fade-up" delay={getDelay()}>
              <PostBox data={post} />
            </AnimateOnScroll>
          ))}
        </div>
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <div className="w-fit mx-auto flex md:flex-row flex-col gap-5 mt-10">
            <Link href="/blog" className="primary_btn">
              View More
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

export default BlogsSection
