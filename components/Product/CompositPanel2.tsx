"use client";
import { CompositPanelProps } from "@/lib/woocommerce-types";
import Image from "next/image";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const CompositPanel2 = ({ cat_info }: CompositPanelProps) => {
  const options = cat_info?.options || [];
  //console.log("CompositPanel options:", options); 

  return (
    <section className="bg-[#F0FAF7]">
      <div className="container mx-auto flex md:flex-row flex-col">
        {/* Left Side */}
        <div className="md:w-1/2 w-full  px-4 md:py-16 py-8 flex flex-col justify-center">
          <h2 className="md:text-5xl text-[34px] leading-none font-semibold text-title font-DM_Sans mb-6">
            {cat_info?.title}
          </h2>
          <p className="md:text-xl text-sm font-normal text-description">
            {/* {cat_info?.description} */}
          </p>

          <div className="post_content"
            dangerouslySetInnerHTML={{
              __html: cat_info?.description || "",
            }}
          />
        </div>
        {/* Right Side */}
        <div className="md:w-1/2 w-full">
          <Image
            src={cat_info?.image || "/images/fence-panel.png"}
            alt="fence-panel"
            width={509}
            height={598}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default CompositPanel2;
