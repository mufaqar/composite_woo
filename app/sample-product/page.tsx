import Banner from "@/components/Banner";
import FeaturedIcons from "@/components/HomePage/FeaturedIcons";
import SampleRequestForm from "@/components/Sample/SampleRequestForm";
import { getSamplePageData } from "@/lib/api/getHomeData";
import React from "react";

export default async function SamplePage() {
  const data = await getSamplePageData();

  const BannerInfo = data?.sampleInfo;

  const RequestInfo =
  data?.samplesType?.map((section: any) => ({
    title: section.title,
    description: section.description,
    products:   // <-- changed from samples
      section.samples?.map((sample: any) => ({
        name: sample.title,
        image: sample.sampleImage?.node?.mediaItemUrl,
      })) || [],
  })) || [];
  return (
    <main>
      <Banner
        title={BannerInfo?.title}
        img={BannerInfo?.image?.node?.mediaItemUrl || "/images/sample.png"}
        desc={BannerInfo?.description}
      />
      <FeaturedIcons />
      <SampleRequestForm RequestInfo={RequestInfo} />
    </main>
  );
}
