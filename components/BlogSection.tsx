'use client'

import HeadingSection from "./HeadingSection"
import AnimateOnScroll, { useAutoDelay } from "./Animation"
import PostBox from "./Blogs/PostBox"


const blogs = [
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
]

const BlogsSection = () => {
  const getDelay = useAutoDelay();
  return (
    <section className="py-20 bg-white">
      {/* Heading + Read More */}
      <HeadingSection title="our blogs" desc="" />
      <div className="container mx-auto px-4">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-[65px]">
          {blogs.map((blog) => (
            <AnimateOnScroll key={blog.id} type="fade-up" delay={getDelay()}>
              <PostBox data={blog} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogsSection
