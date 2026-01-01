"use client";
import Image from "next/image";
import AnimateOnScroll, { useAutoDelay } from "../Animation";
import { HomeInfoCustomersInnovate } from "@/lib/gql-types";
import Link from "next/link";
interface Props {
  data?: HomeInfoCustomersInnovate;
}
export default function CustomerInnovate({ data }: Props) {
  const getDelay = useAutoDelay();
  return (
    <section className="">
      <div className="flex md:flex-row flex-col-reverse gap-0">
        {/* Left Image */}
        <div className="md:w-1/2 w-full">
          <Image
            src={
              data?.icon?.node.mediaItemUrl || "/images/customer-inovate.png"
            }
            alt="Composite fencing"
            width={644}
            height={802}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 w-full md:px-0 px-4 flex flex-col justify-between">
          <div className="px-4 pt-16 2xl:px-[100px] h-full flex flex-col justify-center">
            {/* Heading */}
            <AnimateOnScroll type="fade-up" delay={getDelay()}>
              <h2 className="md:text-6xl text-[34px] leading-none font-semibold text-title font-DM_Sans">
                {data?.title}
              </h2>
            </AnimateOnScroll>
            {/* Paragraph */}
            <AnimateOnScroll type="fade-up" delay={getDelay()}>
              <div
                className="md:text-xl text-sm font-normal text-description mt-5"
                dangerouslySetInnerHTML={{ __html: data?.description || "" }}
              />
            </AnimateOnScroll>
          </div>

          {/* Testimonial block */}
          <div className="bg-[#003D2C] md:py-10 py-9 2xl:px-[100px] px-5 mt-[50px]">
            <div className="max-w-[470px]">
              <AnimateOnScroll type="fade-up" delay={getDelay()}>
                <h4 className="text-lg md:text-xl font-semibold text-white">
                  ORDER FREE SAMPLE
                  {/* {data?.title} */}
                </h4>
                <p className="text-lg font-normal font-DM_Sans text-white my-6">
                  Not sure of the type of composite products or the colour you want for your outdoor space? Why not order our sample pack! We normally dispatch within 48 hours
                  {/* {data?.customerFeeback} */}
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll type="fade-up" delay={getDelay()}>
                <Link href="/sample-product" className="px-5 py-2 bg-secondary text-white font-semibold rounded-full hover:bg-primary">
                  REQUEST A SAMPLE
                </Link>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
