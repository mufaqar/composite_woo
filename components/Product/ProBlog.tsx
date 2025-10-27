"use client";

import Image from "next/image";
import React from "react";
import HeadingSection from "../HeadingSection";
import PostBox from "../Blogs/PostBox";
import { blogsData } from "@/data/blogData";
import { Post } from "@/lib/gql-types";

interface Props {
  data: Post[];
}

const ProBlog = ({ data }: Props) => {
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
      <HeadingSection
        title="Latest Blog"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua "
        readMore
      />

      <div className="container mx-auto px-4 flex md:flex-row flex-col gap-6 items-center mt-16">
        <div className="md:w-1/2 w-full">
          <Image
            src="/images/pro-blog.png"
            alt="pro-blog"
            width={509}
            height={598}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="md:w-1/2 w-full flex md:flex-row flex-col gap-5">
          {data.slice(0, 2).map((item, idx) => {
            return (
              <div key={idx} className="pt-5 border-t border-secondary w-full">
                <PostBox data={item} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProBlog;
