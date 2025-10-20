import FaqsSection from "@/components/FaqSection";
import FeaturedIcons from "@/components/HomePage/FeaturedIcons";
import TrendingProducts from "@/components/HomePage/TrendingProducts";
import NewsLetter from "@/components/Product/NewsLetter";
import ProductTabs from "@/components/Product/ProductTabs";
import SingleBanner from "@/components/Product/SingleBanner";
import Testimonials from "@/components/Product/Testimonails";
import Image from "next/image";
import React from "react";
import {
  getProductBySlug,
  getProductReviewsById,
  getProductVariationsById,
  getRelatedProducts,
} from "@/lib/woocommerce-api";

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return <div className="p-10">Product not found.</div>;
  }


  const categoryIds = product.categories?.map((cat: any) => cat.id) || [];
  const relatedProducts = await getRelatedProducts(categoryIds, product.id);
  const reviews = await getProductReviewsById(product.id);

   const product_variations = await getProductVariationsById(product.id);

 

  const faqs = [
    {
      title: "Are Composite Materials Slippery?",
      content:
        "While traditional wood decking can become slippery, our composite decking is designed with a low slip resistance, offering a safer surface, especially in wet conditions. With an average PTV of 33, it presents a low to medium slip risk.",
    },
    {
      title: "Are Composite Materials Eco-Friendly?",
      content:
        "While traditional wood decking can become slippery, our composite decking is designed with a low slip resistance, offering a safer surface, especially in wet conditions. With an average PTV of 33, it presents a low to medium slip risk..",
    },
    {
      title: "How Do I Install Composite Products?",
      content:
        "While traditional wood decking can become slippery, our composite decking is designed with a low slip resistance, offering a safer surface, especially in wet conditions. With an average PTV of 33, it presents a low to medium slip risk.",
    },
  ];

  const pro_info = {
    title: "Related Products",
    subTitle:
      "While traditional wood decking can become slippery, our composite decking is designed with a low slip resistance, offering a safer surface, especially in wet conditions. With an average PTV of 33, it presents a low to medium slip risk.",
  };

  return (
    <main>

      
      <SingleBanner data={product} images={product.images || []} product_variations={product_variations} />
      <FeaturedIcons />


      <ProductTabs data={product} />
      <section className="bg-[#F0FAF7] relative">
        <Image
          src="/images/boxes-right.png"
          alt="boxes-right"
          width={232}
          height={155}
          className=" md:w-[100px] md:h-[155px] w-[87.5px] h-[58.33] absolute top-0 left-0"
        />
        <Testimonials
          title="Be the first to review “Vertical Composite Fencing Panel”"
          reviews={reviews}
        />
      </section>
      <TrendingProducts data={relatedProducts} info={pro_info} />
      <NewsLetter />
      <FaqsSection title="Composite Fencing FAQ" faqs={faqs} />
    </main>
  );
}
