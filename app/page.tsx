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
import { getHomeData } from "@/lib/api/getHomeData";
import client from "@/lib/apollo-client";
import {
  GetFaqByCatQuery,
  GetPostsQuery,
  HomeInfo,
  HomeInfoSection,
  Post,
} from "@/lib/gql-types";
import { GET_FAQ_BY_CAT } from "@/lib/queries/getFaqsbyCat";
import { GET_HOME } from "@/lib/queries/GetFrontPage";

import { GET_POSTS } from "@/lib/queries/getPosts";
import { getFeaturedProducts, getProductReviews } from "@/lib/woocommerce-api";

export default async function Home() {
  const { data } = await client.query<GetPostsQuery>({
    query: GET_POSTS,
    variables: { first: 6 },
  });

  // Cleanly filter out nulls to keep type safety
  const posts: Post[] = (data?.posts?.nodes ?? []).filter(
    (post): post is Post => !!post
  );

  const { data: faqData } = await client.query<GetFaqByCatQuery>({
    query: GET_FAQ_BY_CAT,
    variables: { id: "home" },
  });

  const faqs_Cat = faqData?.faqtype?.faqs?.nodes ?? [];

  const homeInfo: HomeInfo = await getHomeData();
  console.log(homeInfo);

  const featuredsProducts = await getFeaturedProducts();

  // Fetch global top 10 reviews
  const reviews = await getProductReviews();
  return (
    <main>
      <Hero data={homeInfo?.sliderInfo} />
      <FeaturedIcons />
      <WhyChooseus data={homeInfo?.whyChooseUs} />
      <ProductRange data={homeInfo?.productRange} />
      <TrendingProducts
        data={featuredsProducts}
        info={homeInfo?.trendingProducts ?? {} as HomeInfoSection}
      />
      <Advanteges data={homeInfo?.advantages} />
      <ClientLogos />
      <CustomerInnovate data={homeInfo?.customersInnovate} />
      <Outdoor data={homeInfo?.dreamOutdoor} />
      <Testimonials data={reviews}/>
      <FaqsSection title="Frequently Asked Questions" faqs={faqs_Cat} />
      <BlogsSection posts={posts} />
    </main>
  );
}
