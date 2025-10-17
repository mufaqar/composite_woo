"use client";
import Link from "next/link";
import React, { useState } from "react";
import HeadingSection from "../HeadingSection";
import AnimateOnScroll, { useAutoDelay } from "../Animation";
import { HomeInfoProductRange } from "@/lib/gql-types";

interface Props {
  data?: HomeInfoProductRange;
}

const ProductRange = ({ data }: Props) => {
  const [active, setActive] = useState<number | null>(0);
  const getDelay = useAutoDelay();
  const products = data?.categoryInfo;

  return (
    <section className="pt-24">
      {/* Heading + Read More */}
      <HeadingSection title={data?.title} desc={data?.subTitle} readMore />
      <AnimateOnScroll type="fade-up" delay={getDelay()}>
        <div className="flex md:flex-row flex-col w-full mt-12">
          {products?.map((product, idx: number) => (
            <div
              key={idx}
              onClick={() => setActive(idx)}
              className={`
                            cursor-pointer  bg-cover bg-no-repeat 
                            flex flex-col justify-end  md:py-[70px] p-9 transition-all duration-500 ease-in-out
                            ${
                              active === idx
                                ? "md:w-1/2 w-full md:h-[587px] h-[350px] md:px-[70px]"
                                : "md:w-1/4 w-full md:h-[587px] h-[200px] md:px-[60px]"
                            }
                            `}
              style={{
                backgroundImage: `url(${product.image?.node?.mediaItemUrl})`,
              }}
            >
              <h3 className="md:text-[28px] md:leading-none text-lg font-semibold text-white font-DM_Sans">
                {product.title}
              </h3>
              <div className={`${active === idx ? "block" : "hidden"}`}>
                <p className="md:text-xl text-sm font-normal text-white mt-2.5">
                  {product.desc}
                </p>
                <div className="w-fit flex md:flex-row flex-col gap-5 mt-5">
                  <Link
                    href={`${product?.link}`}
                    className="md:text-base text-sm font-bold text-white inline-flex w-fit md:px-7 md:py-3 px-5 py-2 bg-secondary rounded-4xl hover:bg-primary border border-secondary hover:border-primary hover:text-white transition-all duration-300 ease-in-out"
                  >
                    View Decking Range
                  </Link>
                  <Link
                    href="/sample-product"
                    className="md:text-base text-sm font-bold text-white inline-flex w-fit md:px-7 md:py-3 px-5 py-2 bg-transparent rounded-4xl hover:bg-white border border-white hover:text-title transition-all duration-300 ease-in-out"
                  >
                    Order Free Sample
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimateOnScroll>
    </section>
  );
};

export default ProductRange;
