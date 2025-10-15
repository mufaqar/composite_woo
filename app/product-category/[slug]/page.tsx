import { notFound } from "next/navigation";
import Image from "next/image";
import Banner from "@/components/Banner";
import FeaturedIcons from "@/components/HomePage/FeaturedIcons";
import ProductSection from "@/components/Product/ProductSection";
import ProBlog from "@/components/Product/ProBlog";
import ClientLogos from "@/components/Product/ClientLogos";
import Testimonials from "@/components/Product/Testimonails";
import FaqsSection from "@/components/FaqSection";
import CompositPanel from "@/components/Product/CompositPanel";
import FollowInsta from "@/components/Product/FollowInsta";
import Compare from "@/components/Product/Compare";
import {
  getAllProductReviews,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/woocommerce-api";
import client from "@/lib/apollo-client";
import { GetFaqByCatQuery } from "@/lib/gql-types";
import { GET_FAQ_BY_CAT } from "@/lib/queries/getFaqsbyCat";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ✅ Await here

  const category = await getCategoryBySlug(slug);
  const cat_sub_title = category.acf.sub_title;
  const sale_offer = category.acf.cat_sales_off;

  const { data } = await client.query<GetFaqByCatQuery>({
    query: GET_FAQ_BY_CAT,
    variables: { id: slug }, // ✅ use the awaited slug
  });

  const faqs_Cat = data?.faqtype?.faqs?.nodes;

  if (!category) {
    return (
      <div className="p-10 text-center text-gray-600">Category not found.</div>
    );
  }

  const products = await getProductsByCategory(category.id);

       const reviews = await getAllProductReviews();

  // Map WooProduct[] to Product[]
  const mappedProducts = products.map((p: any) => ({
    title: p.name,
    image: p.images?.[0]?.src || "",
    ...p,
  }));

  return (
    <main>
      <Banner
        title={category?.name}
        img={category?.image || "/images/fencing.png"}
        desc={cat_sub_title}
      />
      <FeaturedIcons />
      <ProductSection
        data={mappedProducts}
        readMore
        categoryTitle={category.name}
        categoryDescription={category.description}
      />
      <ProBlog />
      <ClientLogos />
      <section className="bg-background">
        <ProductSection
          data={mappedProducts}
          readMore
          categoryTitle={category.name}
          categoryDescription={category.description}
        />
      </section>
      <Testimonials title={`${category?.name} Reviews`} reviews={reviews} />
      <CompositPanel />
      <Compare />
      <div className="relative ">
        <Image
          src="/images/boxes-right.png"
          alt="boxes-right"
          width={232}
          height={155}
          className=" md:w-[100px] md:h-[155px] w-[87.5px] h-[58.33] absolute top-0 right-0"
        />
        <FaqsSection title={`${category?.name} Frequently Asked Questions`} faqs={faqs_Cat} />
      </div>
      <FollowInsta />
    </main>
  );
}
