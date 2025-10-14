'use client'

import HeadingSection from "./HeadingSection"
import AnimateOnScroll, { useAutoDelay } from "./Animation"
import PostBox from "./Blogs/PostBox"
import { Post } from "@/lib/gql-types";

interface BlogGridProps {
  posts: Post[];
}


const BlogsSection = ({ posts }:BlogGridProps) => {
  const getDelay = useAutoDelay();
  return (
    <section className="py-20 bg-white">
      {/* Heading + Read More */}
      <HeadingSection title="our blogs" desc="" />
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-[65px]">
           {posts.map((post) => (
            <PostBox key={post.id} data={post} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogsSection
