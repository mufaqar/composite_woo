"use client";
import React from "react";
import Image from "next/image";
import AnimateOnScroll, { useAutoDelay } from "../Animation";
import { Inspiration } from "@/lib/gql-types";

interface Props {
  data?: Inspiration[];
}
export default function ClientLogos( {data}:Props) {
  const getDelay = useAutoDelay();

  console.log("ClientLogos data:", data);
  return (
    <section className="py-10 bg-[#F6F6F6]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center gap-6">
          {data?.map((logo,idx) => (
            <AnimateOnScroll key={idx} type="fade-up" delay={getDelay()}>
            <div className="flex justify-center grayscale hover:grayscale-0 transition"
            >
              <Image
                src={logo?.featuredImage?.node.mediaItemUrl || "/images/logo-1.png"}
                alt={logo.title || "Client Logo"}
                width={150}
                height={80}
                className="h-auto w-auto object-contain"
              />
            </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}