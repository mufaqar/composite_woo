import Banner from '@/components/Banner'
import CompositeWarehouse from '@/components/About/CompositeWarehouse'
import FeaturedIcons from '@/components/HomePage/FeaturedIcons'
import React from 'react'
import Shop from '@/components/About/Shop'
import Join from '@/components/About/Join'

export default function About() {
    return (
        <main>
            <Banner
                title="About Composite Warehouse"
                img="/images/about-banner.png"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            <FeaturedIcons />
            <CompositeWarehouse />
            <Shop />
            <Join />
            
        </main>
    )
}
