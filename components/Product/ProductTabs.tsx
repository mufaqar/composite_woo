"use client";

import Link from "next/link";
import React, { useState } from "react";

const tabs = [
    { id: "description", label: "Description" },
    { id: "faqs", label: "FAQs" },
    { id: "reviews", label: "Reviews" },
    { id: "shipping", label: "Shipping" },
    { id: "features", label: "Features" },
];

const ProductTabs = () => {
    const [activeTab, setActiveTab] = useState("description");

    return (
        <section className="md:py-20 py-16">
            <div className="container mx-auto px-4">
                {/* --- Tabs Header --- */}
                <div className="flex border-b border-[#E4E4E4]">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`md:text-[22px] md:leading-none text-sm font-bold md:px-6 px-1.5 py-3 border-b transition-all duration-200 whitespace-nowrap ${activeTab === tab.id
                                ? "text-title border-secondary opacity-100"
                                : "text-title opacity-50 hover:opacity-100 border-transparent hover:border-secondary"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* --- Tabs Content --- */}
                <div className="mt-6">
                    {activeTab === "description" && (
                        <div>
                            <h3 className="text-lg font-bold text-primary font-Satoshi mb-4">Description</h3>
                            <h2 className="md:text-6xl text-[34px] leading-none font-semibold text-title font-DM_Sans mb-7">
                                Vertical Composite Fencing 6ft by 6ft Units
                            </h2>
                            <p className="md:text-xl text-sm font-normal text-description font-Satoshi mb-5">
                                Introducing the first of its kind and seen in the U.K. our vertical fencing unit. Produced to focus on the traditional fence panel. This in product boast the benefits of composite fencing with its low maintenance solution as well as providing a strong, durable and weather-resistant fence unit.
                                Our 6ft by 6ft vertical composite fencing units can we slide into place using aluminium fencing post or even slide into your existing concrete posts.<br />
                                Composite fencing is a fastly growing trend due to its ability to resist termite damage, low water absorption and its fade resistance properties.
                                Finally, a fencing solution that requires low upkeep with no regular painting or maintenance needed.<br />
                                Our vertical fence panel is lightweight and easy to install, meaning less labour intense work and can easily be fitted by a DIY home improver.
                                Cleaning and maintaining your vertical fencing panel is simple and easy. Some hot soapy water and a soft brush regularly during the season will ensure a long-lasting fencing unit with no painting.
                            </p>
                            <p className="md:text-xl text-sm font-normal text-description font-Satoshi mb-5">
                                You don’t have to sand, oil, and paint the fence so that it will last long. Also, this fencing will not cost you much money to maintain. And maintaining it requires little time.
                            </p>
                            <p className="md:text-xl text-sm font-normal text-description font-Satoshi">
                                Ensure your garden stands out from the crowd. With this brand new and never been seen vertical fence panel, not only a low maintenance solution, but traditional in design ensuring a modern but traditional feel to your new garden make over.
                            </p>
                            <div className="bg-[#F6F6F654] border border-[#E4E4E4] md:px-12 px-4 py-12 ">
                                <h3 className="md:text-[22px] md:leading-none text-sm font-bold text-title mb-5">
                                    Here are some reasons our customers rated this vertical composite fencing panel.
                                </h3>
                                <ul className="md:text-xl text-sm font-normal text-description font-Satoshi flex flex-col gap-5 list-disc list-inside md:mb-14 mb-9">
                                    <li>
                                        Our composite fencing is a long-lasting, low-maintenance fencing solution.
                                    </li>
                                    <li>
                                        A vertical fencing unit with fade resistance properties.
                                    </li>
                                    <li>
                                        A vertical composite fence that gives your yard the privacy it deserves.
                                    </li>
                                    <li>
                                        Composite fencing is lightweight and easy to install.
                                    </li>
                                    <li>
                                        Rich in colour with modern appeal.
                                    </li>
                                    <li>
                                        It is easy to maintain with a texture that will not absorb water and stains.
                                    </li>
                                </ul>
                                <h4 className="md:text-[22px] md:leading-none text-sm font-bold text-title mb-5">
                                    How to install composite fencing
                                </h4>
                                <Link href="#" className="md:text-[22px] md:leading-none text-sm font-bold text-secondary underline">
                                    How Do I Install a Composite Fence?
                                </Link>
                            </div>
                        </div>
                    )}

                    {activeTab === "faqs" && (
                        <div>
                            <h3 className="text-lg font-bold text-primary font-Satoshi mb-4">FAQs</h3>
                            <p className="text-description">Here we can add frequently asked questions...</p>
                        </div>
                    )}

                    {activeTab === "reviews" && (
                        <div>
                            <h3 className="text-lg font-bold text-primary font-Satoshi mb-4">Reviews</h3>
                            <p className="text-description">Customer reviews will appear here.</p>
                        </div>
                    )}

                    {activeTab === "shipping" && (
                        <div>
                            <h3 className="text-lg font-bold text-primary font-Satoshi mb-4">Shipping</h3>
                            <p className="text-description">
                                Shipping information and delivery estimates go here.
                            </p>
                        </div>
                    )}

                    {activeTab === "features" && (
                        <div>
                            <h3 className="text-lg font-bold text-primary font-Satoshi mb-4">Features</h3>
                            <ul className="list-disc pl-5 text-description space-y-1">
                                <li>Durable and weather-resistant</li>
                                <li>Easy installation</li>
                                <li>Low maintenance</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductTabs;
