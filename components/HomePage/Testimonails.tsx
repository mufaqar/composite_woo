"use client";

import Image from "next/image";
import Slider from "react-slick";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useRef } from "react";
import AnimateOnScroll, { useAutoDelay } from "../Animation";

// testimonialData.ts
const testimonials = [
  {
    id: 1,
    text: "Excellent quality decking and fantastic customer service. Highly recommend!",
    name: "John D.",
    role: "CEO, Company",
    image: "/images/testimonail.png", // place in public folder
    rating: 5,
  },
  {
    id: 2,
    text: "The composite fencing looks amazing and was so easy to install. Very happy!",
    name: "Sarah M.",
    role: "Manager",
    image: "/images/testimonail.png",
    rating: 4,
  },
  {
    id: 3,
    text: "I’m impressed with the durability and look of the cladding. Great choice!",
    name: "Michael B.",
    role: "Homeowner",
    image: "/images/testimonail.png",
    rating: 5,
  },
  {
    id: 4,
    text: "I’m impressed with the durability and look of the cladding. Great choice!",
    name: "Michael B.",
    role: "Homeowner",
    image: "/images/testimonail.png",
    rating: 5,
  },
];


const Testimonials = () => {
  const sliderRef = useRef<any>(null);
  const getDelay = useAutoDelay();
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
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="bg-black pt-20 relative">
      <div className="">
        {/* Header */}
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center md:mb-16 mb-12">
          <AnimateOnScroll type="fade-up" delay={getDelay()}>
            <h2 className="md:text-6xl text-[34px] leading-none font-semibold text-white font-DM_Sans">
              What Our <br /> Customers Say
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll type="fade-up" delay={getDelay()}>
            <p className="md:text-xl text-sm font-normal text-white mt-5">
              Don’t just take our word for it—here’s what our satisfied clients
              have to say
            </p>
          </AnimateOnScroll>
        </div>
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          {/* Slider */}
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((t) => (
              <div key={t.id} className="px-4">
                <div className="bg-[#2A2A2A] p-6 h-full flex flex-col justify-between">
                  <FaQuoteLeft className="text-primary text-2xl mb-4 -rotate-180" />
                  <p className="text-white mb-6">“{t.text}”</p>

                  <div className="flex items-center gap-4 mt-auto">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h4 className="md:text-lg text-sm font-semibold text-white">{t.name}</h4>
                      <p className="md:text-base text-sm text-[#7E7E7E]">{t.role}</p>

                    </div>
                  </div>
                  <div className="flex text-[#CEC400] mt-5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </AnimateOnScroll>
        {/* Custom Arrows */}
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <div className="flex items-center gap-5 w-fit mx-auto mt-16">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="bg-transparent text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-secondary border border-white transition"
            >
              <FaChevronLeft size={14} />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-primary border border-secondary transition"
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        </AnimateOnScroll>
      </div>
      <Image src="/images/boxes2.png" alt='boxes2' width={232} height={155} className='md:w-[232px] md:h-[155px] w-[87.5px] h-[58.33] ml-auto mr-0 ' />
    </section>
  );
};

export default Testimonials;
