import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiHeart } from "react-icons/ci";

const ProductBox = ({ data }: any) => {
  //console.log("Product Box",data);

  const regularPrice = data.regular_price || data.price;
  const salePrice = data.sale_price;

  const badges = data.acf.product_badges || [];
  //console.log("Badges:", badges);
  return (
    <div className="bg-background">
      <div className="group ">
        <div className="relative h-[300px]">
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
            <Link
              href="/sample-product"
              className="px-5 py-2 bg-white text-black hover:text-white font-semibold rounded-full hover:bg-primary"
            >
              Get Free Sample
            </Link>
          </div>
        </div>
        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500 text-lg mt-5 px-4">
          {"★".repeat(4)}
          <span className="text-description ml-1 ">{data.rating}</span>
        </div>

        <div className="px-4">
          <Link
            href={`/product/${data.slug}`}
            className="text-lg font-bold mt-2 text-black "
          >
            {data.name}
          </Link>
        </div>
      </div>
      <div className="mt-4 px-4">
        {/* Icons row */}
        <div className="flex gap-3 mt-3">
          {badges?.best_seller && (
            <button className="flex flex-col justify-center items-center group relative w-fit">
              <span className="bg-primary min-w-[81px] w-full text-white text-xs font-normal font-Satoshi px-1.5 py-0.5 rounded translate-y-8 transition-all ease-in-out duration-300 hidden group-hover:block absolute group-hover:-translate-y-10">
                {badges.best_seller}
              </span>

              <span className="w-13 h-13 bg-[#00DFA21C] rounded-full flex items-center justify-center text-primary p-2">
                <Image
                  src="/images/products-icon-4.svg"
                  width={500}
                  height={500}
                  alt="Fast Delivery"
                />
              </span>
            </button>
          )}

          {badges?.quality_assured && (
            <button className="flex flex-col justify-center items-center group relative w-fit">
              <span className="bg-primary min-w-[81px] w-full text-white text-xs font-normal font-Satoshi px-1.5 py-0.5 rounded translate-y-8 transition-all ease-in-out duration-300 hidden group-hover:block absolute group-hover:-translate-y-10">
                {badges.quality_assured}
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
          )}

          {badges?.on_sale && (
            <button className="flex flex-col justify-center items-center group relative w-fit">
              <span className="bg-primary min-w-[81px] w-full text-white text-xs font-normal font-Satoshi px-1.5 py-0.5 rounded translate-y-8 transition-all ease-in-out duration-300 hidden group-hover:block absolute group-hover:-translate-y-10">
                {badges.on_sale}
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
          )}
          {badges?.delivery && (
            <button className="flex flex-col justify-center items-center group relative w-fit">
              <span className="bg-primary min-w-[81px] w-full text-white text-xs font-normal font-Satoshi px-1.5 py-0.5 rounded translate-y-8 transition-all ease-in-out duration-300 hidden group-hover:block absolute group-hover:-translate-y-10">
                {badges.delivery}
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
          )}
        </div>
        {/* Price */}
        <div className="mt-3 flex items-center gap-2">
          {salePrice ? (
            <>
              <span className="text-description line-through">
                £{regularPrice}
              </span>
              <span className="text-title font-semibold text-xl">
                £{salePrice}
              </span>
            </>
          ) : (
            <span className="text-title font-semibold text-xl">
              £{regularPrice}
            </span>
          )}
        </div>

        <div className="flex md:flex-row flex-col items-center justify-center gap-3 py-4 ">
          <Link
            href={`/product/${data.slug}`}
            className="px-5 py-2 bg-secondary text-white font-semibold rounded-full hover:bg-primary"
          >
            View product
          </Link>
          <Link
            href="/sample-product"
            className="px-5 py-2 bg-white text-black hover:text-white font-semibold rounded-full hover:bg-primary"
          >
            Get Free Sample
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
