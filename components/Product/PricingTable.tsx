"use client";

import { TableInfo, TableItem } from "@/lib/woocommerce-types";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Slider from "react-slick";


const PricingTable = ({ cat_info }: { cat_info: TableInfo }) => {
  // console.log("cat_info", cat_info)

  const sliderRef = useRef<any>(null);
  const [selected, setSelected] = useState(0);

  const goToSlide = (index: number) => {
    sliderRef.current?.slickGoTo(index);
    setSelected(index);
  };
  const tables = cat_info?.table ?? [];
  const settings = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index: number) => setSelected(index),
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
          onChange={(e) => goToSlide(Number(e.target.value))}
          className="md:w-1/3 w-full px-4 py-3 text-sm font-normal border border-[#DDDDDD] rounded-full bg-white"
        >
          {tables.map((item: TableItem, index: number) => (
            <option key={index} value={index}>
              {item.title}
            </option>
          ))}
        </select>
        {/* Click Buttons */}
        <div className="flex gap-2 flex-wrap justify-center">
          {tables.map((item: TableItem, index: number) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition
                ${selected === index
                  ? "bg-secondary text-white"
                  : "bg-white border border-[#DDDDDD]"
                }`}
            >
              {item.title}
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
            {tables.map((item: TableItem, index: number) => (
              <Slide key={index} data={item} />
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
  )
};

export default PricingTable;

/* ---------------- SLIDE ---------------- */

const Slide = ({ data }: { data: TableItem }) => (
  <div className="px-2">
    <div className="bg-white rounded-[20px] border border-[#E4E4E4] md:p-4 p-6">

      <div className="relative h-[189px] w-full rounded-[20px] overflow-hidden">
        {data.tableimage?.url && (
          <Image
            src={data.tableimage.url}
            alt={data.tableimage.title}
            fill
            className="object-cover"
          />
        )}
        <h3 className="md:text-[40px] text-xl text-white absolute left-2 bottom-2">
          {data.title}
        </h3>
      </div>
      <p className="text-sm font-bold my-5">Features</p>
      <ul className="grid md:grid-cols-2 gap-4">
        {data.features.map((item, i) => (
          <li key={i} className="pl-6 relative before:content-['✔'] before:absolute before:left-0 before:text-secondary">
            <strong>{item.label}:</strong><br /> {item.value}
          </li>
        ))}
      </ul>
      <div className="mt-5">
        <Link
          href={`/product/${data.view_product}`}
          className="px-6 py-3 bg-secondary text-white rounded-full font-bold inline-block"
        >
          View Product
        </Link>
      </div>
    </div>
  </div>
);