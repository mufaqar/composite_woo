"use client";
import Image from "next/image";
import React from "react";
import AnimateOnScroll, { useAutoDelay } from "../Animation";

function CompositeWarehouse() {
  const getDelay = useAutoDelay();
  return (
    <section className="py-20  ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 container mx-auto px-4">
        <div>
          <AnimateOnScroll type="fade-up" delay={getDelay()}>
            <h2 className="md:text-6xl text-[34px] leading-none font-semibold text-title font-DM_Sans">
              Composite warehouse – Home Of WPC Composite Decking
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll type="fade-up" delay={getDelay()}>
            <p className="md:text-xl text-sm font-normal text-description mt-10">
              Composite fencing is quickly becoming one of the most widely used
              fencing materials in the UK today. Homeowners now understand the
              benefits of its low maintenance attributes. It is not only modern
              and attractive but also durable, which means that you will avoid
              the hassle of installing and maintaining your fence panels every
              year.
            </p>
          </AnimateOnScroll>
        </div>
        <div>
          <AnimateOnScroll type="fade-up" delay={getDelay()}>
            <Image
              src="/images/CompositeWarehouse.png"
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
