import Banner from '@/components/Banner';
import FeaturedIcons from '@/components/HomePage/FeaturedIcons';
import SampleRequestForm from '@/components/Sample/SampleRequestForm';
import { getSamplePageData } from '@/lib/api/getHomeData';
import React from 'react'

export default async function SamplePage() {
    const SampleInfo = await getSamplePageData();
    const BannerInfo = SampleInfo?.sampleInfo;
    const RequestInfo = SampleInfo?.samplesType;
    console.log (SampleInfo);
    return (
        <main>
            <Banner
                title={BannerInfo?.title}
                img={BannerInfo?.image?.node?.mediaItemUrl || "/images/sample.png"}
                desc={BannerInfo?.description} />
            <FeaturedIcons />
            <SampleRequestForm RequestInfo={RequestInfo} />
        </main>
    );
}