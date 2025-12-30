"use client";
import { CompositPanelProps } from "@/lib/woocommerce-types";
import Image from "next/image";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const CompositPanel = ({ cat_info }: CompositPanelProps) => {
  const options = cat_info?.options || [];
  //console.log("CompositPanel options:", options); 
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="py-16 bg-[#F0FAF7] relative">
      {/* Decorative image */}
      <Image
        src="/images/boxes-right.png"
        alt="boxes-right"
        width={232}
        height={155}
        className="md:w-[100px] md:h-[155px] w-[87.5px] h-[58.33px] absolute top-0"
      />

      <div className="container mx-auto px-4 flex md:flex-row flex-col gap-6 mt-10">
        {/* Left Side */}
        <div className="md:w-1/2 w-full md:ml-12">
          <Image
            src={cat_info?.image || "/images/fence-panel.png"}
            alt="fence-panel"
            width={509}
            height={598}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Right Side */}
        <div className="md:w-1/2 w-full">
          <h2 className="md:text-6xl text-[34px] leading-none font-semibold text-title font-DM_Sans">
            {cat_info?.title}
          </h2>
          <p className="md:text-xl text-sm font-normal text-description">
            {cat_info?.description}
          </p>

          <div className="mt-6 divide-y divide-[#D6D6D6]">
            {options?.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-2 py-3 cursor-pointer"
                onClick={() =>
                  setActiveIndex(activeIndex === index ? -1 : index)
                }
              >
                <div className="relative w-[22px] md:w-[48px]">
                  <Image
                    src={item.icon || "/images/shield.png"}
                    alt={item.title || "icon"}
                    width={48}
                    height={48}
                    className="min-w-[22px] min-h-[22px] md:min-w-[48px] md:min-h-[48px]"
                  />
                  <span className="absolute md:w-10 md:h-10 w-[22px] h-[22px] bg-primary/20 rounded-full -bottom-2"></span>
                </div>

                <div className="w-full">
                  <h3 className="md:text-[28px] text-lg font-semibold text-title font-DM_Sans">
                    {item.title}
                  </h3>
                  {activeIndex === index && (
                    <p className="md:text-xl text-sm font-normal text-description mt-3">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="text-primary w-[22px] md:w-[48px] flex justify-end">
                  <FaChevronDown
                    className={`${
                      activeIndex === index ? "rotate-180" : ""
                    } transition-all ease-in-out duration-300`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompositPanel;
