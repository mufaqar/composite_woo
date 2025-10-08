'use client'

import Image from "next/image"
import HeadingSection from "./HeadingSection"
import Link from "next/link"
import AnimateOnScroll, { useAutoDelay } from "./Animation"

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
              <div className="bg-white">
                {/* Image */}
                <div className="relative w-full">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={400}
                    height={400}
                  />
                </div>

                {/* Content */}
                <div className="mt-4 hover:bg-[#D2D2D7] p-2">
                  <p className="text-sm text-description font-DM_Sans flex items-center gap-2">
                    <span className="text-red-500 text-lg">•</span>
                    {blog.date}
                    <span className="text-description">|</span>
                    <Link href="#" className="text-primary font-medium">{blog.category}</Link>
                  </p>
                  <Link href="#" className="md:text-[22px] text-lg leading-none font-normal font-DM_Sans inline-flex mt-3 mb-4">
                    {blog.title}
                  </Link>
                  <div className="py-2 border-t border-[#D2D2D7]">
                    <p className="text-sm text-description ">
                      {blog.readTime}
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogsSection
