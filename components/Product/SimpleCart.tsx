"use client";

import { WooProduct } from "@/lib/woocommerce-types";
import Link from "next/link";
import React, { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";

interface CalculateAreaProps {
  data: WooProduct;
}
const SimpleCart = ({ data }: CalculateAreaProps) => {
  const [length, setLength] = useState(1);
  const [boards, setBoards] = useState(2);
  const dispatch = useDispatch();

  // Example price per board (adjust as needed)
  const pricePerBoard = parseFloat(data.price);
  const totalPrice = (boards * pricePerBoard).toFixed(2);

  const handleAddToCart = () => {
    const total = parseFloat(totalPrice);

    const productData = {
      id: data.id.toString(),
      title: data.name,
      price: total,
      quantity: boards,
      image: data.images?.[0]?.src || "/images/placeholder.png",
      options: {
        length: length.toString(),
        boards: boards.toString(),
        area: (length * boards).toFixed(1),
      },
    };

    dispatch(addToCart(productData));
    alert(`✅ Added ${boards} board(s) to cart. Total: £${total.toFixed(2)}`);
  };

  return (
    <div className="container mx-auto px-4 flex md:flex-row flex-col gap-6">
      <div className="md:w-1/2 w-full"></div>
      <div className="md:w-1/2 w-full md:-mt-[129px]">
        <div className="bg-[#F6F6F654] border border-[#E4E4E4] md:px-10 py-11 px-6 mt-8">
          {/* Buttons */}
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
