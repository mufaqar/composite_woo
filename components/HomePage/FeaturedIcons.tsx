'use client';
import Image from "next/image";
import React from "react";
import AnimateOnScroll, { useAutoDelay } from "../Animation";

const features = [
    {
        id: 1,
        label: "Durability",
        icon: "/images/shield.png",
    },
    {
        id: 2,
        label: "Low Maintenance",
        icon: "/images/dollar.png",
    },
    {
        id: 3,
        label: "Aesthetic Variety",
        icon: "/images/aesthetic.png",
    },
    {
        id: 4,
        label: "Eco-Friendly",
        icon: "/images/leefs.png",
    },
];

const FeaturedIcons = () => {
    const getDelay = useAutoDelay();
    return (
        <section className="py-5 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-row flex-wrap md:gap-8 gap-2">
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
                                <h3 className="md:text-[28px] text-lg font-bold text-title font-DM_Sans">
                                    {feature.label}
                                </h3>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedIcons;
