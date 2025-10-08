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


export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedIcons />
      <WhyChooseus />
      <ProductRange />
      <TrendingProducts />
      <Advanteges />
      <ClientLogos />
      <CustomerInnovate />
      <Outdoor />
      <Testimonials />
      <FaqsSection title="Frequently Asked Questions" />
      <BlogsSection />
    </main>
  );
}
