"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import HeadingSection from "../HeadingSection";
import AnimateOnScroll, { useAutoDelay } from "../Animation";
import { HomeWhyChooseUs } from "@/lib/gql-types";

interface Props {
  data?: HomeWhyChooseUs;
}

const WhyChooseus = ({ data }: Props) => {
  const getDelay = useAutoDelay();
  const sliderRef = useRef<any>(null);

  // Safely handle cards data
  const whyCards = data?.whyCards ?? [];

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
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section className="pt-24 pb-12">
      {/* Heading + Read More */}
      <HeadingSection title={data?.title} desc={data?.subTitle} readMore />

      {/* Slider Section */}
      <div className="container mx-auto px-4 mt-12 relative">
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <Slider ref={sliderRef} {...settings}>
            {whyCards.map((item, index) => (
              <div key={index} className="px-2 md:h-[353px] h-[240px]">
                <div className="border border-[#E4E4E4] bg-background/35 px-11 md:py-9 py-5 h-full">
                  <div className="relative w-fit">
                    {item.icon?.node?.mediaItemUrl && (
                      <Image
                        src={item.icon.node.mediaItemUrl}
                        alt={item.title || ""}
                        width={72}
                        height={72}
                        className="w-[32px] h-[32px] md:w-[72px] md:h-[72px]"
                      />
                    )}
                    <span className="absolute md:w-10 md:h-10 w-[22px] h-[22px] bg-primary/20 rounded-full -bottom-2"></span>
                  </div>
                  <h3 className="md:text-[28px] text-lg font-semibold text-title font-DM_Sans mt-4">
                    {item.title}
                  </h3>
                  <p className="md:text-xl text-sm font-normal text-description mt-5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </AnimateOnScroll>

        {/* Custom Arrows */}
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="absolute left-1 top-1/2 -translate-y-1/2 bg-primary text-white md:w-10 md:h-10 w-7 h-7 rounded-full flex items-center justify-center shadow-md hover:bg-secondary transition"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-white md:w-10 md:h-10 w-7 h-7 rounded-full flex items-center justify-center shadow-md hover:bg-secondary transition"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default WhyChooseus;
