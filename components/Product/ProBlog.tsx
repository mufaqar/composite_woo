"use client";

import Image from "next/image";
import React from "react";
import HeadingSection from "../HeadingSection";
import { WooCategory } from "@/lib/woocommerce-types";

interface Props {
  cat_info: WooCategory;
}

const ProBlog = ({ cat_info }: Props) => {
  const related_data = Array.isArray(cat_info?.related_data)
    ? cat_info.related_data
    : [];

  return (
    <section className="py-16 bg-[#F0FAF7] relative ">
      <Image
        src="/images/boxes-right.png"
        alt="boxes-right"
        width={232}
        height={155}
        className=" md:w-[100px] md:h-[155px] w-[87.5px] h-[58.33] absolute top-0"
      />
      {/* Heading + Read More */}
      <HeadingSection
        title={cat_info?.blog_title}
        desc={cat_info?.blog_description}
        readMore
      />

      <div className="container mx-auto px-4 flex md:flex-row flex-col gap-6 items-center mt-16">
        <div className="md:w-1/2 w-full">
          <Image
            src={cat_info?.blog_banner || "/images/pro-blog.png"}
            alt="pro-blog"
            width={509}
            height={598}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="md:w-1/2 w-full flex md:flex-row flex-col gap-5">
          {related_data?.map((item, idx) => {
            return (
              <div key={idx} className="pt-5 border-t border-secondary w-full">
                <h3 className="md:text-[22px] text-lg leading-none font-bold font-DM_Sans">
                  {item?.title}
                </h3>
                <p className="md:text-base text-sm font-normal text-description font-Satoshi mt-2 mb-11">
                  {item?.sub_title}
                </p>
                <Image
                  src={item?.image || "/images/pro-blog-1.png"}
                  alt="pro-blog"
                  width={260}
                  height={200}
                  className="object-cover w-full h-full max-h-[260px]"
                />
                <p className="md:text-base text-sm font-normal text-description font-Satoshi mt-2 mb-11">
                  {item?.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProBlog;
