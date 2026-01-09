import React from "react";
import HeadingSection from "../HeadingSection";
import Image from "next/image";
import Link from "next/link";
import { WooCategory } from "@/lib/woocommerce-types";

interface Props {
  cat_info: WooCategory;
}

const FollowInsta = ({ cat_info }: Props) => {
  const gallery: string[] = cat_info?.social_gallery || [];



  if (!gallery.length) return null;

  return (
    <section className="md:py-20 py-16">
      {/* Heading */}
      <HeadingSection
        title={cat_info?.social_title}
        desc={cat_info?.social_desc}
      />

      <div className="container mx-auto px-4 flex md:flex-row flex-col gap-6 mt-10">
        {/* Left Big Image */}
        {gallery[0] && (
          <div className="flex-shrink-0">
            <Image
              src={gallery[0]}
              alt="Instagram gallery image"
              width={610}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Right Grid (next 4 images) */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          {gallery.slice(1, 5).map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Instagram gallery image ${index + 2}`}
              width={295}
              height={212}
              className="w-full h-full object-cover"
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="w-fit mx-auto flex md:flex-row flex-col gap-5 mt-10">
        <Link href={cat_info?.social_link || "#"} target="_blank" className="primary_btn capitalize">
         {cat_info?.social_text || "Follow Us on Instagram"}
        </Link>
      </div>
    </section>
  );
};

export default FollowInsta;
