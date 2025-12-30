"use client";
import React, { useRef } from "react";
import HeadingSection from "../HeadingSection";
import ProductBox from "../Product/ProductBox";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import AnimateOnScroll, { useAutoDelay } from "../Animation";
import { getAllProducts } from "@/lib/woocommerce-api";
import { WooProduct } from "@/lib/woocommerce-types";
import { HomeInfoSection } from "@/lib/gql-types";

interface TrendingProductsProps {
  data: WooProduct[];
  info: HomeInfoSection;
}

export default function TrendingProducts({
  data,
  info,
}: TrendingProductsProps) {
  const getDelay = useAutoDelay();
  const sliderRef = useRef<any>(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-12 bg-white">
      <HeadingSection title={info.title} desc={info.subTitle} readMore />
      <div className="container mx-auto px-4 mt-12 relative">
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <Slider ref={sliderRef} {...settings}>
            {data.map((product) => (
              <div key={product.id} className="px-2">
                <ProductBox data={product} />
              </div>
            ))}
          </Slider>
        </AnimateOnScroll>
        {/* Custom Arrows */}
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="absolute left-0 top-1/3 -translate-y-1/2 bg-primary text-white md:w-10 md:h-10 w-7 h-7 rounded-full flex items-center justify-center shadow-md hover:bg-secondary transition"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="absolute right-0 top-1/3 -translate-y-1/2 bg-primary text-white md:w-10 md:h-10 w-7 h-7 rounded-full flex items-center justify-center shadow-md hover:bg-secondary transition"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}
