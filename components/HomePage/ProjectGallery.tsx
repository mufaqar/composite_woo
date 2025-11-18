"use client";

import Image from "next/image";
import React from "react";
import OutDoorSlider from "./OutdoorSlider";
import Link from "next/link";
import HeadingSection from "../HeadingSection";
import AnimateOnScroll, { useAutoDelay } from "../Animation";
import { HomeInfoSection, Inspiration, Post } from "@/lib/gql-types";

interface Props {
  data?: HomeInfoSection;
  post: Inspiration[];
}
const ProjectGallery = ({ data, post }: Props) => {


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
      <HeadingSection title={data?.title} desc={data?.subTitle} />
      <AnimateOnScroll type="fade-up" delay={getDelay()}>
        <OutDoorSlider data={post}/>
      </AnimateOnScroll>
      
    </section>
  );
};

export default ProjectGallery;
