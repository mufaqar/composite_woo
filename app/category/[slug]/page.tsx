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
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/woocommerce-api";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await getCategoryBySlug(params.slug);

  console.log("Category Data:", category); // Debugging line

  if (!category) {
    return (
      <div className="p-10 text-center text-gray-600">Category not found.</div>
    );
  }

  const products = await getProductsByCategory(category.id);

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
        desc={category?.description}
      />
      <FeaturedIcons />
      <ProductSection
        data={mappedProducts}
        readMore
        categoryTitle={category.title}
        categoryDescription={category.description}
      />
      <ProBlog />
      <ClientLogos />
      <section className="bg-background">
        <ProductSection
                 data={mappedProducts}
                    readMore
                    categoryTitle={category.title}
                    categoryDescription={category.description}
                />
      </section>
      <Testimonials title="Lorem ipsum dolor sit amet." />
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
        <FaqsSection title="Composite Fencing FAQ" />
      </div>
      <FollowInsta />
    </main>
  );
}
