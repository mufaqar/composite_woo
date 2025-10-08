"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import HeadingSection from "../HeadingSection";
import Link from "next/link";

const WhyUS = [
  {
    id: 1,
    title: "Only the Finest Materials",
    description:
      "We go extra length to make sure our customers get the right decking material for their project. From composite decking boards to composite decking accessories.",
    icon: "/images/crown.png",
  },
  {
    id: 2,
    title: "Designed For Outdoor Flooring",
    description:
      "Get all you need, call one of our expert skilled men today and place your orders. Your items will be delivered directly to your home.",
    icon: "/images/crown.png",
  },
  {
    id: 3,
    title: "Premium Product Available",
    description:
      "At Compositewarehouse, we offer all types of composite materials for all kinds of projects. Let us walk you through our full range of products.",
    icon: "/images/crown.png",
  },
  {
    id: 4,
    title: "Trusted Service",
    description:
      "Our experts provide unmatched support to guide you every step of the way.",
    icon: "/images/crown.png",
  },
];

const Shop = () => {
  const sliderRef = useRef<any>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    pauseOnFocus: false,
    swipeToSlide: true, // helps on touch devices
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  // 🔧 Fix for mobile autoplay freeze (resize event)
  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        sliderRef.current.slickPlay();
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="pt-24 pb-12 bg-background">
      {/* Heading + Read More */}
      <HeadingSection
        title="Shop Composite Decking Online"
        desc="CompositeWarehouse – Your one-stop-shop for all kinds of composite materials. You will buy Eco-friendly and low maintenance composite materials for your projects."
        readMore
      />

      {/* Slider Section */}
      <div className="container mx-auto px-4 mt-12 relative">
        <Slider ref={sliderRef} {...settings}>
          {WhyUS.map((item) => (
            <div key={item.id} className="px-2">
              <div className="border border-[#E4E4E4] bg-background/35 px-11 py-9 h-[353px]">
                <div className="relative w-fit">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={72}
                    height={72}
                    className="w-[32px] h-[32px] md:w-[72px] md:h-[72px]"
                  />
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

        {/* Buttons */}
        <div className="w-fit mx-auto flex md:flex-row flex-col gap-5 mt-10">
          <Link href="#" className="primary_btn">
            Request a Free Sample
          </Link>
          <Link href="/contact" className="secondary_btn !bg-black !text-white ">
            contact us
          </Link>
        </div>

        {/* Custom Arrows */}
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-secondary transition"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-secondary transition"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default Shop;
