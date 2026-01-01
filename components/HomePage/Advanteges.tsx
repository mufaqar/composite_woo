"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import AnimateOnScroll, { useAutoDelay } from '../Animation';
import { HomeInfoAdvanteges } from '@/lib/gql-types';

const faqs = [
    {
        title: "Uncompromising Quality Standards",
        description:
            "We source only the finest composite materials, ensuring exceptional durability and a premium finish that lasts for years.",
    },
    {
        title: "Innovative Designs",
        description:
            "Our products are crafted with cutting-edge technology and modern aesthetics for the perfect blend of style and strength.",
    },
    {
        title: "Customer-First Approach",
        description:
            "We put our customers at the heart of everything, offering guidance and solutions tailored to your needs.",
    },
];

interface Props {
    data?: HomeInfoAdvanteges;
}


const Advanteges = ({ data }: Props) => {
    const getDelay = useAutoDelay();
    const [activeIndex, setActiveIndex] = useState(0);
    const options = data?.options ?? [];
    console.log("Advanteges data:", data);

    return (
        <section className="bg-background relative ">
            <div className="flex md:flex-row flex-col gap-0">
                {/* Left Side */}
                <div className="md:w-1/2 w-full 2xl:px-[100px] px-4 md:py-16 py-8">
                    <AnimateOnScroll type="fade-up" delay={getDelay()}>
                        <h4 className="text-lg font-bold text-primary font-DM_Sans md:block hidden mb-4">
                            {data?.subTitle}
                        </h4>
                    </AnimateOnScroll>
                    <AnimateOnScroll type="fade-up" delay={getDelay()}>
                        <h2 className="md:text-6xl text-[34px] leading-none font-semibold text-title font-DM_Sans">
                            {data?.title}
                        </h2>
                    </AnimateOnScroll>
                    <div className="mt-6 divide-y divide-[#D6D6D6]">
                        {options?.map((item: any, index: number) => (
                            <AnimateOnScroll key={index} type="fade-up" delay={getDelay()}>
                                <div className="flex items-start gap-2 py-3 cursor-pointer"
                                    onClick={() =>
                                        setActiveIndex(activeIndex === index ? -1 : index)
                                    }
                                >
                                    <div className="relative w-[22px] md:w-[48px]">
                                        <Image
                                            src={item.icon.node.mediaItemUrl}
                                            alt="shield"
                                            width={48}
                                            height={48}
                                            className="min-w-[22px] min-h-[22px] md:min-w-[48px] md:min-h-[48px]"
                                        />
                                        <span className="absolute md:w-10 md:h-10 w-[22px] h-[22px] bg-primary/20 rounded-full -bottom-2"></span>
                                    </div>
                                    <div>
                                        <h3 className="md:text-[28px] text-lg font-semibold text-title font-DM_Sans">
                                            {item.title}
                                        </h3>
                                        {activeIndex === index && (
                                            <p className="md:text-xl text-sm font-normal text-description mt-3">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>

                {/* Right Side */}
                <div className="md:w-1/2 w-full">
                    <Image
                        src={data?.icon?.node.mediaItemUrl || "/images/advantage.png"}
                        alt="advantage"
                        width={605}
                        height={627}
                        className="h-full w-full object-cover object-center"
                    />
                </div>
            </div>
        </section>
    );
};

export default Advanteges;
