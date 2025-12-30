"use client";
import Image from "next/image";
import React from "react";
import AnimateOnScroll, { useAutoDelay } from "./Animation";

const Banner = ({ title, img, desc }: any) => {
  const getDelay = useAutoDelay();
  return (
    <section className="bg-[#003D2C] relative">
      <div className="flex md:flex-row flex-col gap-8 items-stretch">
        <div className="md:w-1/2 w-full">
          <Image
            src={img}
            alt="blog"
            width={720}
            height={426}
            className="w-full h-full"
          />
        </div>
        <div className="md:w-1/2 w-full md:px-16 px-4 py-16 flex flex-col justify-center">
          <AnimateOnScroll type="fade-up" delay={getDelay()}>
            <h1 className="md:text-7xl text-[38px] leading-none font-medium text-white font-DM_Sans capitalize">
              {title}
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll type="fade-up" delay={getDelay()}>
            <p className="md:text-xl text-sm font-normal text-white mt-5 max-w-[95%] font-Satoshi">
              {desc}
            </p>
          </AnimateOnScroll>
        </div>
      </div>
      <Image
        src="/images/boxes-right.png"
        alt="boxes-right"
        width={232}
        height={155}
        className="md:w-[232px] md:h-[155px] w-[87.5px] h-[58.33] object-contain object-right  absolute right-0 bottom-0"
      />
    </section>
  );
};

export default Banner;
