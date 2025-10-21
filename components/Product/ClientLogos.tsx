"use client";
import React from "react";
import Image from "next/image";
import { Inspiration } from "@/lib/gql-types";

interface Props {
  data?: Inspiration[];
}

export default function ClientLogos({data}:Props) {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="md:text-[28px] md:leading-none text-lg font-semibold text-title text-center font-DM_Sans capitalize">
          featured on
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center gap-6 mt-10">
          {data?.map((logo, idx) => (
            <div
              key={idx}
              className="flex justify-center grayscale hover:grayscale-0 transition"
            >
              <Image
                src={logo.featuredImage?.node.sourceUrl || "/images/logo-1.png"}
                alt={logo.title || "Client Logo"}
                width={150}
                height={80}
                className="h-auto w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}