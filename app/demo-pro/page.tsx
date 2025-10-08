import FaqsSection from '@/components/FaqSection'
import FeaturedIcons from '@/components/HomePage/FeaturedIcons'
import TrendingProducts from '@/components/HomePage/TrendingProducts'
import NewsLetter from '@/components/Product/NewsLetter'
import ProductTabs from '@/components/Product/ProductTabs'
import SingleBanner from '@/components/Product/SingleBanner'
import Testimonials from '@/components/Product/Testimonails'
import Image from 'next/image'
import React from 'react'

function Page() {
    return (
        <main>
            <SingleBanner />
            <FeaturedIcons />
            <ProductTabs />
            <section className='bg-[#F0FAF7] relative'>
                <Image
                    src="/images/boxes-right.png"
                    alt="boxes-right"
                    width={232}
                    height={155}
                    className=" md:w-[100px] md:h-[155px] w-[87.5px] h-[58.33] absolute top-0 left-0"
                />
                <Testimonials title="Be the first to review “Vertical Composite Fencing Panel”" />
            </section>
            <TrendingProducts />
            <NewsLetter />
            <FaqsSection title="Composite Fencing FAQ" />
        </main>
    )
}

export default Page