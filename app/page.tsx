import BlogsSection from "@/components/BlogSection";
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
import { getBlogData, getFaqData, getHomeData } from "@/lib/api/getHomeData";

import { HomeInfoSection } from "@/lib/gql-types";
import { getAllProductReviews, getFeaturedProducts } from "@/lib/woocommerce-api";

export default async function Home() {
  const [posts, faqs_Cat, homeInfo] = await Promise.all([
    getBlogData(),
    getFaqData("home"),
    getHomeData(),
  ]);
  const featuredsProducts = await getFeaturedProducts();
  const reviews = await getAllProductReviews();
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
      <Advanteges data={homeInfo?.advantages} />
      <ClientLogos />
      <CustomerInnovate data={homeInfo?.customersInnovate} />
      <Outdoor data={homeInfo?.dreamOutdoor} />
      <Testimonials data={reviews} />
      <FaqsSection title="Frequently Asked Questions" faqs={faqs_Cat} />
      <BlogsSection posts={posts} />
    </main>
  );
}
