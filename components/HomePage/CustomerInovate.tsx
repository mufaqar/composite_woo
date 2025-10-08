"use client";
import Image from "next/image";
import AnimateOnScroll, { useAutoDelay } from "../Animation";

export default function CustomerInnovate() {
  const getDelay = useAutoDelay();
  return (
    <section className="mb-32 2xl:mb-32">
      <div className="flex md:flex-row flex-col-reverse items-start gap-6">
        {/* Left Image */}
        <div className="md:w-[45%] w-full md:z-[3] z-0">
          <Image
            src="/images/innovate.png" // replace with your image in /public
            alt="Composite fencing"
            width={644}
            height={802}
            className="w-full"
          />
        </div>

        {/* Right Content */}
        <div className="md:w-[55%] w-full md:px-0 px-4">
          <div className="px-4 pt-16 2xl:px-[100px]">
            {/* Heading */}
            <AnimateOnScroll type="fade-up" delay={getDelay()}>
              <h2 className="md:text-6xl text-[34px] leading-none font-semibold text-title font-DM_Sans">
                We Listen to Our Customers to Innovate and Improve
              </h2>
            </AnimateOnScroll>
            {/* Paragraph */}
            <AnimateOnScroll type="fade-up" delay={getDelay()}>
              <p className="md:text-xl text-sm font-normal text-description mt-5">
                At Composite Warehouse, your feedback is invaluable. We actively
                listen to your needs and suggestions, which drives our commitment to
                continuous improvement and the introduction of new, high-quality
                products like our composite fencing range, specifically designed
                based on customer demand for a durable and stylish alternative.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll type="fade-up" delay={getDelay()}>
              <p className="md:text-xl text-sm font-normal text-description mt-5">
                Your insights help us ensure we’re always offering the best solutions
                for your outdoor projects.
              </p>
            </AnimateOnScroll>
          </div>

          {/* Testimonial block */}
          <div className="bg-[#003D2C] md:w-[calc(100%+100px)] md:py-[39px] px-7 py-9  md:-ml-[100px] mt-[50px] -mb-[50px] md:mb-0 2xl:mt-[160px] 2xl:-mb-[160px] relative md:z-0 z-[3]">
            <AnimateOnScroll type="fade-up" delay={getDelay()}>
              <div className="md:pl-[100px] flex md:flex-row flex-col items-start">
                <p className="md:text-[28px] text-lg font-normal font-DM_Sans text-white max-w-[561px] mx-auto">
                  “I mentioned I was looking for composite fencing that could fit into my
                  existing posts, and Composite Warehouse delivered! So happy with the
                  new range.”
                </p>
                <Image src="/images/qoute.png" alt="qoute" width={168} height={131} className="ml-auto mr-0" />
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll type="fade-up" delay={getDelay()}>
              <p className="md:text-xl text-base italic font-normal font-DM_Sans text-white md:text-end text-start">- Customer Name</p>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
