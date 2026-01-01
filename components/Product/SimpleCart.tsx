"use client";

import { WooProduct } from "@/lib/woocommerce-types";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";

interface SimpleCartProps {
  data: WooProduct;
}

const SimpleCart = ({ data }: SimpleCartProps) => {
  const dispatch = useDispatch();
  const [boards, setBoards] = useState(1); // ✅ Add quantity state

  // Convert WooCommerce price to number safely
  const pricePerBoard = parseFloat(data.price || "0");
  const totalPrice = (boards * pricePerBoard).toFixed(2);

  const handleAddToCart = () => {
    const productData = {
      id: data.id.toString(),
      title: data.name,
      price: parseFloat(totalPrice),
      quantity: boards,
      image: data.images?.[0]?.src || "/images/placeholder.png",
    };

    dispatch(addToCart(productData));
    // ✅ Smooth scroll to top (Mini Cart location)
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    // alert(`✅ ${boards} ${data.name} added to cart. Total: £${totalPrice}`);
  };

  return (
    <div className="container mx-auto flex md:flex-row flex-col gap-6">
      <div className=" w-full mt-10">
        <div className="bg-[#F6F6F654] border border-[#E4E4E4] md:px-10 py-11 px-6 mt-8">
          {/* Quantity / Boards Selector */}
          <div className="flex justify-between items-center mb-3">
            <p className="md:text-lg text-lg font-normal text-description font-Satoshi">
              Quantity
            </p>
            <div className="flex items-center border border-[#E4E4E4] bg-white rounded-full px-4 py-2">
              <button
                onClick={() => setBoards(Math.max(1, boards - 1))}
                className="px-2 md:text-lg text-sm font-normal text-description font-Satoshi"
              >
                -
              </button>
              <span className="px-3 w-6 text-center md:text-lg text-sm font-normal text-description font-Satoshi">
                {boards}
              </span>
              <button
                onClick={() => setBoards(boards + 1)}
                className="px-2 md:text-lg text-sm font-normal text-description font-Satoshi"
              >
                +
              </button>
            </div>
          </div>

          {/* Total Price */}
          <p className="mb-4 md:text-lg text-base font-semibold text-gray-700">
            Total: £{totalPrice}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-secondary text-white hover:bg-primary md:text-lg text-sm font-bold inline-flex w-fit md:px-7 md:py-[18px] px-5 py-2.5 rounded-4xl transition-all duration-300 ease-in-out"
            >
              Add to Basket
            </button>
            <Link
              href="/sample-product"
              className="md:text-lg text-sm font-bold text-secondary underline inline-flex"
            >
              Request A Free Sample
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCart;
