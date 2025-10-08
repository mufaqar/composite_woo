"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

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

const CompositPanel = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-16 bg-[#F0FAF7] relative ">
            <Image
                src="/images/boxes-right.png"
                alt="boxes-right"
                width={232}
                height={155}
                className=" md:w-[100px] md:h-[155px] w-[87.5px] h-[58.33] absolute top-0"
            />

            <div className="container mx-auto px-4 flex md:flex-row flex-col gap-6 mt-10">
                {/* Left Side */}
                <div className="md:w-1/2 w-full md:ml-12">
                    <Image
                        src="/images/fence-panel.png"
                        alt="fence-panel"
                        width={509}
                        height={598}
                        className=""
                    />
                </div>
                {/* Right Side */}
                <div className="md:w-1/2 w-full ">
                    <h2 className="md:text-6xl text-[34px] leading-none font-semibold text-title font-DM_Sans">
                        Composite Fencing Panels
                    </h2>
                    <p className='md:text-xl text-sm font-normal text-description'>
                        Composite fencing is quickly becoming one of the most widely used fencing materials in the UK today. Homeowners now understand the benefits of its low maintenance attributes.
                    </p>
                    <div className="mt-6 divide-y divide-[#D6D6D6]">
                        {faqs.map((item, index) => (
                            <div key={index}
                                className="flex items-start gap-2 py-3 cursor-pointer"
                                onClick={() =>
                                    setActiveIndex(activeIndex === index ? -1 : index)
                                }
                            >
                                <div className="relative w-[22px] md:w-[48px]">
                                    <Image
                                        src="/images/shield.png"
                                        alt="shield"
                                        width={48}
                                        height={48}
                                        className="min-w-[22px] min-h-[22px] md:min-w-[48px] md:min-h-[48px]"
                                    />
                                    <span className="absolute md:w-10 md:h-10 w-[22px] h-[22px] bg-primary/20 rounded-full -bottom-2"></span>
                                </div>
                                <div className='w-full'>
                                    <h3 className="md:text-[28px] text-lg font-semibold text-title font-DM_Sans">
                                        {item.title}
                                    </h3>
                                    {activeIndex === index && (
                                        <p className="md:text-xl text-sm font-normal text-description mt-3">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                                <div className={`text-primary w-[22px] md:w-[48px] flex justify-end`}>
                                    <FaChevronDown className={`${activeIndex === index ? "rotate-180" : ""} transition-all ease-in-out duration-300`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompositPanel;
