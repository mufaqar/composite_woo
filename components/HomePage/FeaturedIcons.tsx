'use client';
import Image from "next/image";
import React from "react";
import AnimateOnScroll, { useAutoDelay } from "../Animation";

const features = [
    {
        id: 1,
        label: "Free UK Mainland Delivery",
        desc: "Spend and Save With Free Delivery On All Boards",
        icon: "/images/products-icon-2.svg",
    },
    {
        id: 2,
        label: "We Price Match",
        desc: "on all products",
        icon: "/images/dollar.png",
    },
    {
        id: 3,
        label: "Get Free Samples",
        desc: "We dispatch within 48hrs",
        icon: "/images/aesthetic.png",
    },
];

const FeaturedIcons = () => {
    const getDelay = useAutoDelay();
    return (
        <section className="py-5 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center md:gap-8 gap-2">
                    {features.map((feature) => (
                        <AnimateOnScroll key={feature.id} type="fade-up" delay={getDelay()}>
                            <div className="flex items-center md:gap-4 gap-2 w-fit"
                            >
                                <span className="md:min-w-[79px] md:min-h-[79px] min-w-[35px] min-h-[35px] rounded-full bg-primary/20 flex items-center justify-center">
                                    <Image
                                        src={feature.icon}
                                        alt={feature.label}
                                        width={46}
                                        height={46}
                                        className="md:w-[46px] md:h-[46px] w-[20px] h-[20px]"
                                    />
                                </span>
                                <div>
                                    <h3 className="md:text-xl text-lg font-bold text-title font-DM_Sans">
                                        {feature.label}
                                    </h3>
                                    <p className="md:text-sm text-sm font-normal text-description">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedIcons;
