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
const Outdoor = ({ data, post }: Props) => {

  //console.log("Outdoor posts:", post);
  const getDelay = useAutoDelay();
  return (
    <section className="py-16 bg-[#F0FAF7] relative ">
      <HeadingSection title={data?.title} desc={data?.subTitle} />
      <AnimateOnScroll type="fade-up" delay={getDelay()}>
        <OutDoorSlider data={post} />
      </AnimateOnScroll>
      <AnimateOnScroll type="fade-up" delay={getDelay()}>
        <div className="w-fit mx-auto flex md:flex-row flex-col gap-5 mt-5">
          <Link href="/project-gallery" className="primary_btn">
            View Our Project Gallery
          </Link>
        </div>
      </AnimateOnScroll>
    </section>
  );
};

export default Outdoor;
