"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import HeadingSection from "./HeadingSection";
import AnimateOnScroll, { useAutoDelay } from "./Animation";
import { usePathname } from "next/navigation";

const FaqsSection = ({ faqs, title }: any) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const getDelay = useAutoDelay();
  const pathname = usePathname();
  return (
    <section className="md:py-20 py-16 bg-background">
      {/* Heading + Read More */}
      <HeadingSection title={title} desc="" />
      <div className="max-w-[804px] mx-auto px-4 mt-10">
        {faqs?.map((faq: any, idx: number) => (
          <AnimateOnScroll key={idx} type="fade-up" delay={getDelay()}>
            <div
              className={`${
                openIndex === idx ? "border" : "border-b"
              } md:py-8 md:px-5 py-4 max-w-[1024px] mx-auto border-[#E7EAEE]`}
            >
              {/* Question row */}
              <div
                className="flex justify-between items-center cursor-pointer transition-all duration-300"
                onClick={() => toggleFaq(idx)}
              >
                <h3 className="md:text-lg text-sm font-semibold text-title font-DM_Sans">
                  {faq.title}
                </h3>
                <FaChevronDown
                  className={`md:text-base text-sm font-normal text-description mt-3 transform transition-transform duration-300 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === idx ? "max-h-40 mt-5" : "max-h-0"
                }`}
              >
                <div
                  className="text-description"
                  dangerouslySetInnerHTML={{ __html: faq.content }}
                />
              </div>
            </div>
          </AnimateOnScroll>
        ))}

        {pathname !== "/faqs" && (
          <AnimateOnScroll type="fade-up" delay={getDelay()}>
            <div className="w-fit mx-auto flex md:flex-row flex-col gap-5 mt-10">
              <Link href="/faqs" className="primary_btn">
                View All FAQs
              </Link>
            </div>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
};

export default FaqsSection;
