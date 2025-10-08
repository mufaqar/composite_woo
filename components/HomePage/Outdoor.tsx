"use client";

import Image from "next/image";
import React from "react";
import OutDoorSlider from "./OutdoorSlider";
import Link from "next/link";
import HeadingSection from "../HeadingSection";
import AnimateOnScroll, { useAutoDelay } from "../Animation";

const Outdoor = () => {
  const getDelay = useAutoDelay();
  return (
    <section className="py-16 bg-[#F0FAF7] relative ">
      <Image
        src="/images/boxes2.png"
        alt="boxes2"
        width={232}
        height={155}
        className="md:w-[232px] md:h-[155px] w-[87.5px] h-[58.33] -rotate-90 md:-ml-10 md:-mt-6 md:block hidden"
      />
      {/* Heading + Read More */}
      <HeadingSection title="Create Your Dream Outdoor Space: Inspiration & Ideas" desc="Imagine the possibilities for your garden or outdoor area with our
          versatile composite materials. Browse our gallery for inspiration and
          discover how Composite Warehouse can help you bring your vision to
          life." />
      <AnimateOnScroll type="fade-up" delay={getDelay()}>
        <OutDoorSlider />
      </AnimateOnScroll>
      <AnimateOnScroll type="fade-up" delay={getDelay()}>
        <div className='w-fit mx-auto flex md:flex-row flex-col gap-5 mt-5'>
          <Link href="#" className='primary_btn'>
            View Our Project Gallery
          </Link>
        </div>
      </AnimateOnScroll>
    </section>
  );
};

export default Outdoor;
