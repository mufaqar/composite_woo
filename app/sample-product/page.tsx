import Banner from '@/components/Banner';
import FeaturedIcons from '@/components/HomePage/FeaturedIcons';
import SampleRequestForm from '@/components/Sample/SampleRequestForm';
import React from 'react'

export default function SamplePage() {
    return (
        <main>
            <Banner
                title="Sample Product"
                img="/images/sample.png"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            <FeaturedIcons />
            <SampleRequestForm />
        </main>
    );
}