import { notFound } from "next/navigation"
import Image from "next/image"
import Banner from "@/components/Banner"
import FeaturedIcons from "@/components/HomePage/FeaturedIcons"
import ProductSection from "@/components/Product/ProductSection"
import ProBlog from "@/components/Product/ProBlog"
import ClientLogos from "@/components/Product/ClientLogos"
import Testimonials from "@/components/Product/Testimonails"
import FaqsSection from "@/components/FaqSection"
import CompositPanel from "@/components/Product/CompositPanel"
import FollowInsta from "@/components/Product/FollowInsta"
import Compare from "@/components/Product/Compare"

interface Product {
    id: number
    title: string
    description: string
    image: string
    price?: string
    discountPrice?: string
    rating?: number
    buttons?: boolean
}

interface Category {
    id: number
    slug: string
    title: string
    description: string
    image: string
    products: Product[]
}

const categories: Category[] = [
    {
        id: 1,
        slug: "decking",
        title: "Composite Fencing Panels",
        description:
            "Composite fencing is quickly becoming one of the most widely used fencing materials in the UK today. Homeowners now understand the benefits of its low maintenance attributes. It is not only modern and attractive but also durable",
        image: "/images/fencing.png",
        
        products: [
            {
                id: 1,
                title: "Capped Composite Fencing Panel ",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-1.png", // replace with real image path
                buttons: true,
            },
            {
                id: 2,
                title: "Capped Composite Fencing Panel",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-2.png",
                buttons: true,
            },
            {
                id: 3,
                title: "Composite Fencing Panel For Concrete Post",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-3.png",
                buttons: true,
            },
            {
                id: 4,
                title: "Capped Composite Fencing Panel ",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-1.png", // replace with real image path
                buttons: true,
            },
            {
                id: 5,
                title: "Capped Composite Fencing Panel ",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-1.png", // replace with real image path
                buttons: true,
            },
            {
                id: 6,
                title: "Capped Composite Fencing Panel",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-2.png",
                buttons: true,
            },
            {
                id: 7,
                title: "Composite Fencing Panel For Concrete Post",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-3.png",
                buttons: true,
            },
            {
                id: 8,
                title: "Capped Composite Fencing Panel ",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-1.png", // replace with real image path
                buttons: true,
            },
        ],
    },
    {
        id: 2,
        slug: "fencing",
        title: "Fencing Panels",
        description:
            "Composite fencing is quickly becoming one of the most widely used fencing materials in the UK today. Homeowners now understand the benefits of its low maintenance attributes. It is not only modern and attractive but also durable",
        image: "/images/fencing.png",
        
        products: [
            {
                id: 1,
                title: "Capped Composite Fencing Panel ",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-1.png", // replace with real image path
                buttons: true,
            },
            {
                id: 2,
                title: "Capped Composite Fencing Panel",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-2.png",
                buttons: true,
            },
            {
                id: 3,
                title: "Composite Fencing Panel For Concrete Post",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-3.png",
                buttons: true,
            },
            {
                id: 4,
                title: "Capped Composite Fencing Panel ",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-1.png", // replace with real image path
                buttons: true,
            },
            {
                id: 5,
                title: "Capped Composite Fencing Panel ",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-1.png", // replace with real image path
                buttons: true,
            },
            {
                id: 6,
                title: "Capped Composite Fencing Panel",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-2.png",
                buttons: true,
            },
            {
                id: 7,
                title: "Composite Fencing Panel For Concrete Post",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-3.png",
                buttons: true,
            },
            {
                id: 8,
                title: "Capped Composite Fencing Panel ",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-1.png", // replace with real image path
                buttons: true,
            },
        ],
    },
    {
        id: 3,
        slug: "cladding",
        title: "cladding Panels",
        description:
            "Composite fencing is quickly becoming one of the most widely used fencing materials in the UK today. Homeowners now understand the benefits of its low maintenance attributes. It is not only modern and attractive but also durable",
        image: "/images/fencing.png",
        
        products: [
            {
                id: 1,
                title: "Capped Composite Fencing Panel ",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-1.png", // replace with real image path
                buttons: true,
            },
            {
                id: 2,
                title: "Capped Composite Fencing Panel",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-2.png",
                buttons: true,
            },
            {
                id: 3,
                title: "Composite Fencing Panel For Concrete Post",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-3.png",
                buttons: true,
            },
            {
                id: 4,
                title: "Capped Composite Fencing Panel ",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-1.png", // replace with real image path
                buttons: true,
            },
            {
                id: 5,
                title: "Capped Composite Fencing Panel ",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-1.png", // replace with real image path
                buttons: true,
            },
            {
                id: 6,
                title: "Capped Composite Fencing Panel",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-2.png",
                buttons: true,
            },
            {
                id: 7,
                title: "Composite Fencing Panel For Concrete Post",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-3.png",
                buttons: true,
            },
            {
                id: 8,
                title: "Capped Composite Fencing Panel ",
                description: "A short description goes in here",
                price: "€299.99",
                discountPrice: "€249.99",
                rating: 4.5,
                image: "/images/Products-1.png", // replace with real image path
                buttons: true,
            },
        ],
    },
]


export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  // params is available directly (no need for await in Next.js 14/15 stable)
  const { slug } = params;
  const category = categories.find((c) => c.slug === slug);



  if (!category) return notFound();

   

    return (
        <main>
            <Banner title={category.title} img={category.image} desc={category.description} />
            <FeaturedIcons />
            <ProductSection
                data={category.products}
                readMore
                categoryTitle={category.title}
                categoryDescription={category.description}
            />
            <ProBlog />
            <ClientLogos />
            <section className="bg-background">
                <ProductSection
                    data={category.products}
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
    )
}
