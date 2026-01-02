import Banner from "@/components/Banner";
import CompositeWarehouse from "@/components/About/CompositeWarehouse";
import FeaturedIcons from "@/components/HomePage/FeaturedIcons";
import React from "react";
import Shop from "@/components/About/Shop";
import Join from "@/components/About/Join";
import { getAboutPageData } from "@/lib/api/getHomeData";

export default async function About() {
  const aboutData = await getAboutPageData();
  if (!aboutData) return <p>Failed to load About page</p>;

  // console.log(aboutData);

  return (
    <main>
      <Banner
        title={aboutData.title}
        img="/images/about-banner.png"
        desc={aboutData?.aboutUs?.description}
      />
      <FeaturedIcons />
      <CompositeWarehouse  data={aboutData.aboutUs} />
      <Shop  data={aboutData.shopOnline}/>
      <Join />
    </main>
  );
}
