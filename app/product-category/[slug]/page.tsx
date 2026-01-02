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
import SaleSection from "@/components/Product/SaleSection";
import { getBlogData, getClientLogoData } from "@/lib/api/getHomeData";
import CompositPanel2 from "@/components/Product/CompositPanel2";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ Await here

  const category = await getCategoryBySlug(slug);
  // console.log("category", category)
  const cat_sub_title = category.acf.sub_title;
  const cat_title = category.acf.title;
  const sale_offer = category.acf.cat_sales_off;

  const blogs = await getBlogData();


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

  const client_logos = await getClientLogoData();

  const products = await getProductsByCategory(category.id);
  const reviews = await getAllProductReviews();

  const mappedProducts = products.map((p: any) => ({
    title: p.name,
    image: p.images?.[0]?.src || "",
    ...p,
  }));


  return (
    <main>
      <Banner
        title={cat_title || category.name}
        img={category?.image?.src || "/images/fencing.png"}
        desc={cat_sub_title}
      />
      <FeaturedIcons />
      <SaleSection />
      <ProductSection
        data={mappedProducts}
        readMore
        categoryTitle={category.name}
        categoryDescription={category.description}
      />
      <ProBlog cat_info={category.acf.blog_info} />
      <ClientLogos data={client_logos} />
      <section className="bg-background">
        <Compare cat_info={category.acf} />
      </section>
      <Testimonials title={`${category?.name} Reviews`} reviews={reviews} />
      <CompositPanel cat_info={category.acf.standards} />
      <CompositPanel2 cat_info={category.acf.standard_two} />
      <div className="relative ">
        <Image
          src="/images/boxes-right.png"
          alt="boxes-right"
          width={232}
          height={155}
          className=" md:w-[100px] md:h-[155px] w-[87.5px] h-[58.33] absolute top-0 right-0"
        />
        <FaqsSection
          title={`${category?.name} Frequently Asked Questions`}
          faqs={faqs_Cat}
        />
      </div>
      <FollowInsta cat_info={category.acf.social_media} />
    </main>
  );
}
