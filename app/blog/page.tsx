import Banner from '@/components/Banner'
import BlogGrid from '@/components/Blogs/BlogGrid'
import FeaturedIcons from '@/components/HomePage/FeaturedIcons'
import React from 'react'

export default function AboutUS() {
    return (
        <main>
            <Banner
                title="Our blogs"
                img="/images/blog.png"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            <FeaturedIcons />
            <BlogGrid />
        </main>
    )
}
