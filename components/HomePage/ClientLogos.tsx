"use client";
import React from "react";
import Image from "next/image";
import AnimateOnScroll, { useAutoDelay } from "../Animation";
const logos = [
  { id: 1, src: "/images/logo-1.png", alt: "Logo 1" },
  { id: 2, src: "/images/logo-2.png", alt: "Logo 2" },
  { id: 3, src: "/images/logo-3.png", alt: "Logo 3" },
  { id: 4, src: "/images/logo-4.png", alt: "Logo 4" },
  { id: 5, src: "/images/logo-1.png", alt: "Logo 5" },
];
export default function ClientLogos() {
  const getDelay = useAutoDelay();
  return (
    <section className="py-10 bg-[#F6F6F6]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center gap-6">
          {logos.map((logo) => (
            <AnimateOnScroll key={logo.id} type="fade-up" delay={getDelay()}>
            <div className="flex justify-center grayscale hover:grayscale-0 transition"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
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