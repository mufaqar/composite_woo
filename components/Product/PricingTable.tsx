"use client";

import { CompareProps } from "@/lib/woocommerce-types";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Slider from "react-slick";

const SLIDES = [
  { key: "finish", title: "Finish" },
  { key: "colour", title: "Colour" },
  { key: "maintenance", title: "Maintenance" },
];

const PricingTable = ({ cat_info }: CompareProps) => {
  const sliderRef = useRef<any>(null);
  const [selected, setSelected] = useState("finish");

  const goToSlide = (key: string) => {
    const index = SLIDES.findIndex((s) => s.key === key);
    if (index !== -1) {
      sliderRef.current?.slickGoTo(index);
      setSelected(key);
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index: number) => {
      setSelected(SLIDES[index].key);
    },
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
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="flex flex-wrap items-center bg-[#F0FAF7] rounded-t-[20px] px-3 pt-3 gap-4">
        <div className="md:w-1/4 w-full">
        </div>
        {/* Select */}
        <select
          value={selected}
          onChange={(e) => goToSlide(e.target.value)}
          className="md:w-1/3 w-full px-4 py-3 text-sm font-normal border border-[#DDDDDD] rounded-full bg-white"
        >
          {SLIDES.map((s) => (
            <option key={s.key} value={s.key}>
              {s.title}
            </option>
          ))}
        </select>
        {/* Click Buttons */}
        <div className="flex gap-2 flex-wrap justify-center">
          {SLIDES.map((s) => (
            <button
              key={s.key}
              onClick={() => goToSlide(s.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition
                ${selected === s.key
                  ? "bg-secondary text-white"
                  : "bg-white border border-[#DDDDDD]"
                }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="flex bg-[#F0FAF7] rounded-b-[20px] px-3 pb-6 items-center pt-3">
        {/* Left Column */}
        <div className="md:w-1/4 h-full bg-[#003D2C] rounded-[20px]">
          <ul className="divide-y divide-[#E5E5E5]">
            {[
              "Features",
              "Finish",
              "Colour",
              "Maintenance",
              "Scratch Resistance",
              "Slip Resistance",
            ].map((item, i) => (
              <li
                key={i}
                className="text-white text-center py-4 min-h-[70px]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Slider */}
        <div className="md:w-2/4 w-full mx-auto relative">
          <Slider ref={sliderRef} {...settings} className="md:w-3/4 mx-auto w-full">
            {SLIDES.map((s) => (
              <Slide key={s.key} title={s.title} />
            ))}
          </Slider>

          {/* Arrows */}
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="w-10 h-10 rounded-full absolute top-1/2 -translate-y-1/2 left-0 border flex items-center justify-center"
          >
            <FaChevronLeft size={14} />
          </button>

          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="w-10 h-10 rounded-full absolute top-1/2 -translate-y-1/2 right-0 bg-secondary text-white flex items-center justify-center"
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;

/* ---------------- SLIDE ---------------- */

const Slide = ({ title }: { title: string }) => (
  <div className="px-2">
    <div className="bg-white rounded-[20px] border border-[#E4E4E4] md:py-6 md:px-7 p-6">
      <h3 className="md:text-[40px] text-xl font-medium text-title mb-2">
        {title}
      </h3>
      <p className="text-sm font-bold text-title mb-2">Features</p>
      <ul className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="relative pl-6 text-sm font-normal text-title
                 before:absolute before:left-0 before:top-0
                 before:content-['✔'] before:text-secondary">
            <strong>Finish</strong> Grain / Thin Grooved
          </li>
        ))}
        <li className="py-2">
          <Link
            href="#"
            className="px-6 py-3 bg-secondary text-white rounded-full font-bold inline-block"
          >
            View Product
          </Link>
        </li>
      </ul>
    </div>
  </div>
);
