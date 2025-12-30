"use client";
import Image from "next/image";
import React from "react";
import AnimateOnScroll, { useAutoDelay } from "../Animation";

function CompositeWarehouse({ data }: any) {
  const getDelay = useAutoDelay();
  return (
    <section className="py-20  ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 container mx-auto px-4">
        <div>
          <AnimateOnScroll type="fade-up" delay={getDelay()}>
            <h2 className="md:text-6xl text-[34px] leading-none font-semibold text-title font-DM_Sans">
              {data.title}
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll type="fade-up" delay={getDelay()}>
            <p className="md:text-xl text-sm font-normal text-description mt-10">
              {data.description}
            </p>
          </AnimateOnScroll>
        </div>
        <div>
          <AnimateOnScroll type="fade-up" delay={getDelay()}>
            <Image
              src={data.image}
              alt="advantage"
              width={605}
              height={627}
              className="md:w-full w-fit  overflow-x-hidden"
            />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

export default CompositeWarehouse;
