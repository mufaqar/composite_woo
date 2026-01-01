import BlogsSection from "@/components/BlogSection";
import { CalculatorHome } from "@/components/Calculator";
import FaqsSection from "@/components/FaqSection";
import Advanteges from "@/components/HomePage/Advanteges";
import ClientLogos from "@/components/HomePage/ClientLogos";
import CustomerInnovate from "@/components/HomePage/CustomerInovate";
import FeaturedIcons from "@/components/HomePage/FeaturedIcons";
import Hero from "@/components/HomePage/Hero";
import Outdoor from "@/components/HomePage/Outdoor";
import ProductRange from "@/components/HomePage/ProductRange";
import Testimonials from "@/components/HomePage/Testimonails";
import TrendingProducts from "@/components/HomePage/TrendingProducts";
import WhyChooseus from "@/components/HomePage/WhyChooseus";
import {
  getBlogData,
  getClientLogoData,
  getFaqData,
  getHomeData,
  getInspirtionData,
} from "@/lib/api/getHomeData";

import { HomeInfoSection } from "@/lib/gql-types";
import {
  getAllProductReviews,
  getFeaturedProducts,
} from "@/lib/woocommerce-api";

export default async function Home() {
  const [
    posts,
    inpirtations,
    client_logos,
    faqs_Cat,
    homeInfo,
    featuredsProducts,
    reviews,
  ] = await Promise.all([
    getBlogData(),
    getInspirtionData(),
    getClientLogoData(),
    getFaqData("home"),
    getHomeData(),
    getFeaturedProducts(),
    getAllProductReviews(),
  ]);

  return (
    <main>
      <Hero data={homeInfo?.sliderInfo} />
      <FeaturedIcons />
      <WhyChooseus data={homeInfo?.whyChooseUs} />
      <ProductRange data={homeInfo?.productRange} />
      <TrendingProducts
        data={featuredsProducts}
        info={homeInfo?.trendingProducts ?? ({} as HomeInfoSection)}
      />
      <div className="w-full h-px bg-white/10" />
      <ClientLogos data={client_logos} />
      <Advanteges data={homeInfo?.advantages} />
      <CustomerInnovate data={homeInfo?.customersInnovate} />
      <CalculatorHome />
      <Outdoor data={homeInfo?.dreamOutdoor} post={inpirtations} />
      <Testimonials data={reviews} />
      <FaqsSection title="Frequently Asked Questions" faqs={faqs_Cat} />
      <BlogsSection posts={posts} />
    </main>
  );
}
