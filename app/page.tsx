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
import client from "@/lib/apollo-client";
import { GetPostsQuery, Post } from "@/lib/gql-types";
import { GET_POSTS } from "@/lib/queries/getPosts";
import { getFeaturedProducts } from "@/lib/woocommerce-api";


export default async function Home() {

  const { data } = await client.query<GetPostsQuery>({
    query: GET_POSTS,
    variables: { first: 6 },
  });

  // Cleanly filter out nulls to keep type safety
  const posts: Post[] = (data?.posts?.nodes ?? []).filter(
    (post): post is Post => !!post
  );


  const featuredsProducts = await getFeaturedProducts();
  return (
    <main>
      <Hero />
      <FeaturedIcons />
      <WhyChooseus />
      <ProductRange />
      <TrendingProducts data={featuredsProducts} />
      <Advanteges />
      <ClientLogos />
      <CustomerInnovate />
      <Outdoor />
      <Testimonials />
      <FaqsSection title="Frequently Asked Questions" />
      <BlogsSection  posts={posts} />
    </main>
  );
}
