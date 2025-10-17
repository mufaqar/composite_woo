"use client";
import React from "react";
import ProductGallery from "./ProductGallery";
import BreadCrumb from "./BreadCrumb";
import FenceConfigurator from "./FenceConfigurator";
import { WooImage, WooProduct } from "@/lib/woocommerce-types";
import CalculateArea from "./CalculateArea";

interface SingleBannerProps {
  data: WooProduct;
  images: WooImage[];
}

const SingleBanner = ({ data }: SingleBannerProps) => {
  const productType = data?.acf?.product_type;
  const rating = data.rating_count || 0;

  // Extract WooCommerce price info
  const regularPrice = data.regular_price;
  const salePrice = data.sale_price;
  const isOnSale = !!salePrice && salePrice !== regularPrice;
  const stockStatus = data.stock_status;

  return (
    <section className="pt-16 pb-20">
      <div className="container mx-auto px-4">
        <BreadCrumb title={data.name} />
      </div>
      <div className="container mx-auto px-4 flex md:flex-row flex-col gap-6 items-center">
        <div className="md:w-1/2 w-full">
          <ProductGallery images={data.images} />
        </div>
        <div className="md:w-1/2 w-full">
          <div className="pb-6 border-b border-[#D2D2D2] mb-10">
            <h1 className="md:text-[50px] leading-none text-[32px] font-medium text-title font-DM_Sans">
              {data.name}
            </h1>
            <div className="flex items-center gap-1 text-yellow-500 text-lg mt-5">
              {"★".repeat(5)}
              <span className="md:text-lg text-sm font-bold text-title ml-1 ">
                {rating} Reviews
              </span>
            </div>

            <div className="my-8">
              {isOnSale ? (
                <div className="flex items-center gap-3">
                  <h4 className="md:text-5xl text-[28px] font-bold text-secondary font-DM_Sans">
                    £{salePrice}
                  </h4>
                  <span className="md:text-2xl text-lg font-normal text-gray-400 line-through">
                    £{regularPrice}
                  </span>
                </div>
              ) : (
                <h4 className="md:text-5xl text-[28px] font-bold text-secondary font-DM_Sans">
                  £{regularPrice || data.price}
                </h4>
              )}
            </div>

            <p className="md:text-xl text-sm font-normal text-description">
              Availability:
              <span
                className={
                  stockStatus === "instock"
                    ? "text-primary"
                    : stockStatus === "outofstock"
                    ? "text-red-500"
                    : "text-yellow-500"
                }
              >
                {stockStatus === "instock"
                  ? "In Stock"
                  : stockStatus === "outofstock"
                  ? "Out of Stock"
                  : "Backorder"}
              </span>
            </p>
          </div>
        </div>
      </div>
      {productType === "Decking" ? (
        <CalculateArea data={data} />
      ) : (
        <FenceConfigurator data={data} />
      )}
    </section>
  );
};

export default SingleBanner;
