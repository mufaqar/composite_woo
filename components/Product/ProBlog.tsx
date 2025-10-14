"use client";

import Image from "next/image";
import React from "react";
import HeadingSection from "../HeadingSection";
import PostBox from "../Blogs/PostBox";
import { blogsData } from "@/data/blogData";

const ProBlog = () => {
    return (
        <section className="py-16 bg-[#F0FAF7] relative ">
            <Image
                src="/images/boxes-right.png"
                alt="boxes-right"
                width={232}
                height={155}
                className=" md:w-[100px] md:h-[155px] w-[87.5px] h-[58.33] absolute top-0"
            />
            {/* Heading + Read More */}
            <HeadingSection title="Lorem ipsum dolor sit amet." desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua " readMore />

            <div className="container mx-auto px-4 flex md:flex-row flex-col gap-6 items-center mt-16">
                <div className="md:w-1/2 w-full">
                    <Image src="/images/pro-blog.png" alt="pro-blog" width={509} height={598} className="object-cover w-full h-full" />
                </div>
                <div className="md:w-1/2 w-full flex md:flex-row flex-col gap-5">
                    {blogsData.slice(0, 2).map((item) => {
                        return <div key={item.id} className="pt-5 border-t border-secondary w-full">
                            <h3 className="md:text-[22px] text-lg leading-none font-bold font-DM_Sans">
                                Lorem ipsum dolor sit amet
                            </h3>
                            <p className="md:text-base text-sm font-normal text-description font-Satoshi mt-2 mb-11">
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            {/* <PostBox data={item} /> */}
                        </div>
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProBlog;
