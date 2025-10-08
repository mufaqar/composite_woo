"use client";

import Image from "next/image";
import Slider from "react-slick";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useRef } from "react";

const testimonials = [
  {
    id: 1,
    title: "Professional work, awesome!",
    text: "Excellent quality decking and fantastic customer service. Highly recommend!",
    name: "John D.",
    role: "CEO, Company",
    email: "@buckybn",
    image: "/images/testimonail.png", // place in public folder
    rating: 5,
  },
  {
    id: 2,
    title: "Professional work, awesome!",
    text: "The composite fencing looks amazing and was so easy to install. Very happy!",
    name: "Sarah M.",
    role: "Manager",
    email: "@buckybn",
    image: "/images/testimonail.png",
    rating: 4,
  },
  {
    id: 3,
    title: "Professional work, awesome!",
    text: "I’m impressed with the durability and look of the cladding. Great choice!",
    name: "Michael B.",
    role: "Homeowner",
    email: "@buckybn",
    image: "/images/testimonail.png",
    rating: 5,
  },
  {
    id: 4,
    title: "Professional work, awesome!",
    text: "I’m impressed with the durability and look of the cladding. Great choice!",
    name: "Michael B.",
    role: "Homeowner",
    email: "@buckybn",
    image: "/images/testimonail.png",
    rating: 5,
  },
];


const Testimonials = ({ title }: any) => {
  const sliderRef = useRef<any>(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="py-20 relative">

      {/* Header */}
      <div className="max-w-[848px] mx-auto px-4 md:mb-16 mb-12">
        <h2 className="md:text-6xl text-[34px] leading-none font-semibold text-title text-center font-DM_Sans">
          {title}
        </h2>
      </div>
      <div className="container mx-auto px-4">
        {/* Slider */}
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((t) => (
            <div key={t.id} className="px-4">
              <div className="border border-[#E5E5E5] bg-white rounded-[10px] p-6 h-full flex flex-col justify-between hover:border-transparent transition-all ease-in-out duration-300">
                <div className="flex text-[#FAAE4B]">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <h3 className="md:text-2xl text-[22px] leading-none font-normal text-title font-DM_Sans mt-8 mb-3.5">
                  Professional work, awesome!
                </h3>
                <p className="md:text-lg text-sm text-description mb-6">{t.text}</p>
                <span className="flex w-[30px] h-[2px] bg-[#E5E5E5] mb-6"></span>
                <div className="flex items-center gap-4 mt-auto">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h4 className="md:text-lg text-sm font-semibold text-title">{t.name}</h4>
                    <p className="md:text-sm text-sm text-description"><span>{t.role} </span> <span className="text-[#5138ED]"> {t.email}</span></p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </Slider>
        {/* Custom Arrows */}
        <div className="flex items-center gap-5 w-fit mx-auto mt-16">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="bg-transparent text-title hover:text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-secondary border border-white hover:border-secondary transition"
          >
            <FaChevronLeft size={14} />
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="bg-secondary text-white hover:text-title w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-white border border-secondary hover:border-white transition"
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
