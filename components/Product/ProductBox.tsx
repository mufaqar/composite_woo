import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiHeart } from "react-icons/ci";

const ProductBox = ({ data }: any) => {
  console.log(data);
  return (
    <div>
      <div className="group">
        <div className="relative ">
          <button className="absolute top-2.5 right-2.5 bg-white p-2 rounded-full shadow cursor-pointer z-[3]">
            <CiHeart className="w-7 h-7 text-description" />
          </button>
          <Image
            src={data.images[0].src || "/no-image.jpg"}
            width={400}
            height={400}
            alt={data.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition bg-black/50">
            <Link
              href={`/product/${data.slug}`}
              className="px-5 py-2 bg-secondary text-white font-semibold rounded-full hover:bg-primary"
            >
              View product
            </Link>
            <button className="px-5 py-2 bg-white text-black hover:text-white font-semibold rounded-full hover:bg-primary">
              Get Free Sample
            </button>
          </div>
        </div>
        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500 text-lg mt-5">
          {"★".repeat(4)}
          <span className="text-description ml-1 ">{data.rating}</span>
        </div>

        {/* Title */}
        <Link  href={`/product/${data.slug}`} className="text-lg font-bold mt-2 text-black">
          {data.name}
        </Link>
        <div
          className="md:text-base text-sm font-normal text-description font-Satoshi"
          dangerouslySetInnerHTML={{ __html: data.short_description }}
        />
      </div>
      <div className="mt-4">
        {/* Icons row */}
        <div className="flex gap-3 mt-3">
          <button className="flex flex-col justify-center items-center group relative w-fit">
            <span className="bg-primary min-w-[81px] w-full text-white text-xs font-normal font-Satoshi px-1.5 py-0.5 rounded translate-y-8 transition-all ease-in-out duration-300 hidden group-hover:block absolute group-hover:-translate-y-10">
              fast Delivery
            </span>
            <span className="w-13 h-13 bg-[#00DFA21C] rounded-full flex items-center justify-center text-primary p-2">
              <Image
                src="/images/products-icon-4.svg"
                width={500}
                height={500}
                alt="Picture"
              />
            </span>
          </button>
          <button className="flex flex-col justify-center items-center group relative w-fit">
            <span className="bg-primary min-w-[81px] w-full text-white text-xs font-normal font-Satoshi px-1.5 py-0.5 rounded translate-y-8 transition-all ease-in-out duration-300 hidden group-hover:block absolute group-hover:-translate-y-10">
              fast Delivery
            </span>
            <span className="w-13 h-13 bg-[#00DFA21C] rounded-full flex items-center justify-center text-primary p-2">
              <Image
                src="/images/products-icon-1.svg"
                width={500}
                height={500}
                alt="Picture"
              />
            </span>
          </button>
          <button className="flex flex-col justify-center items-center group relative w-fit">
            <span className="bg-primary min-w-[81px] w-full text-white text-xs font-normal font-Satoshi px-1.5 py-0.5 rounded translate-y-8 transition-all ease-in-out duration-300 hidden group-hover:block absolute group-hover:-translate-y-10">
              fast Delivery
            </span>
            <span className="w-13 h-13 bg-[#00DFA21C] rounded-full flex items-center justify-center text-primary p-2">
              <Image
                src="/images/products-icon-3.svg"
                width={500}
                height={500}
                alt="Picture"
              />
            </span>
          </button>
          <button className="flex flex-col justify-center items-center group relative w-fit">
            <span className="bg-primary min-w-[81px] w-full text-white text-xs font-normal font-Satoshi px-1.5 py-0.5 rounded translate-y-8 transition-all ease-in-out duration-300 hidden group-hover:block absolute group-hover:-translate-y-10">
              fast Delivery
            </span>
            <span className="w-13 h-13 bg-[#00DFA21C] rounded-full flex items-center justify-center text-primary p-2">
              <Image
                src="/images/products-icon-2.svg"
                width={500}
                height={500}
                alt="Picture"
              />
            </span>
          </button>
        </div>
        {/* Price */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-description line-through">{data.price}</span>
          <span className="text-title font-semibold text-md">
            {data.sale_price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
