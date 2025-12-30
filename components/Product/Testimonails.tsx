"use client";

import Image from "next/image";
import Slider from "react-slick";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useRef } from "react";
import { WooReview } from "@/lib/woocommerce-types";

interface TestimonialsProps {
  title: string;
  reviews?: WooReview[];
}

const Testimonials = ({ title, reviews }: TestimonialsProps) => {
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
          {reviews?.map((t, index) => (
            <div key={t.id || index} className="px-4">
              <div className="border border-[#E5E5E5] bg-white rounded-[10px] p-6 h-full flex flex-col justify-between hover:border-transparent transition-all ease-in-out duration-300">
                {/* Stars */}
                <div className="flex text-[#FAAE4B]">
                  {Array.from({ length: t.rating || t.rating || 5 }).map(
                    (_, i) => (
                      <FaStar key={i} />
                    )
                  )}
                </div>

                <div
                  className="md:text-lg text-sm text-description mb-6 max-h-[100px] overflow-y-auto p-2"
                  dangerouslySetInnerHTML={{ __html: `${t.review}` }}
                />

                <span className="flex w-[30px] h-[2px] bg-[#E5E5E5] mb-6"></span>

                {/* Reviewer info */}
                <div className="flex items-center gap-4 mt-auto">
                  <Image
                    src={
                      t.reviewer_avatar_urls?.["96"] ||
                      "/images/testimonail.png"
                    }
                    alt={t.reviewer}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h4 className="md:text-lg text-sm font-semibold text-title">
                      {reviews ? t.reviewer : t.reviewer}
                    </h4>
                    {reviews ? (
                      <p className="md:text-sm text-sm text-description">
                        Verified: Yes | Rating:{t.rating}
                      </p>
                    ) : (
                      <p className="md:text-sm text-sm text-description">
                        <span>{t.reviewer} </span>{" "}
                        <span className="text-[#5138ED]">
                          {t.reviewer_email}
                        </span>
                      </p>
                    )}
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
