"use client";

import { WooProduct } from "@/lib/woocommerce-types";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { useSearchParams } from "next/navigation";

interface DeckingCalculatorProps {
  data: WooProduct;
}

const formatNumber = (n: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);

const DeckingCalculator = ({ data }: DeckingCalculatorProps) => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  // Get values from query params or use defaults
  const [length, setLength] = useState<string>(
    searchParams.get("length") || "5"
  );
  const [width, setWidth] = useState<string>(searchParams.get("width") || "5");
  const [wastage, setWastage] = useState<string>(
    searchParams.get("wastage") || "10"
  );

  // Default sqm value (can be adjusted based on product attributes)
  const regularPrice = data.regular_price;
  const salePrice = data.sale_price;
  const isOnSale = !!salePrice && salePrice !== regularPrice;
  const realPrice = isOnSale ? salePrice : regularPrice;

  const sqmPerBoard = 0.6; // Default for decking boards

  // Calculate values
  const L = parseFloat(length) || 0;
  const W = parseFloat(width) || 0;
  const wastePct = Math.max(0, parseFloat(wastage) || 0);

  const area = L * W;
  const areaWithWaste = area * (1 + wastePct / 100);
  const boardsNeeded = Math.ceil(areaWithWaste / sqmPerBoard);

  // Pricing
  const pricePerBoard = parseFloat(realPrice) || 0;
  const totalPrice = boardsNeeded * pricePerBoard;

  const handleAddToCart = () => {
    const productData = {
      id: data.id.toString(),
      title: data.name,
      price: parseFloat(realPrice),
      quantity: boardsNeeded,
      image: data.images?.[0]?.src || "/images/placeholder.png",
      options: {
        length: length.toString(),
        width: width.toString(),
        wastage: wastage.toString(),
        boards: boardsNeeded.toString(),
        area: area.toFixed(2),
      },
    };

    dispatch(addToCart(productData));
    // ✅ Smooth scroll to top (Mini Cart location)
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    // alert(
    //   `✅ Added ${boardsNeeded} board(s) to cart. Total: £${totalPrice.toFixed(
    //     2
    //   )}`
    // );
  };

  const incrementValue = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    current: string,
    step: number = 1
  ) => {
    const val = parseFloat(current) || 0;
    setter((val + step).toFixed(1));
  };

  const decrementValue = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    current: string,
    step: number = 1,
    min: number = 0
  ) => {
    const val = parseFloat(current) || 0;
    setter(Math.max(min, val - step).toFixed(1));
  };

  return (
    <div className="w-full mt-10">
      <div className="bg-[#F6F6F654] border border-[#E4E4E4] md:px-10 py-11 px-6 mt-8">
        {/* Title */}
        <h3 className="text-[28px] leading-none font-semibold text-title font-DM_Sans mb-5">
          Calculate Your Materials
        </h3>

        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-3 gap-5">
          {/* Length Row */}
          <div className="flex justify-between items-center mb-3">
            <p className="md:text-lg text-sm font-normal text-description font-Satoshi">
              Length (m)
            </p>
            <div className="flex items-center border border-[#E4E4E4] bg-white rounded-full px-4 py-2">
              <input
                type="number"
                inputMode="decimal"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-16 text-center md:text-lg text-sm font-normal text-description font-Satoshi bg-transparent outline-none"
              />
              <span className="flex flex-col px-2 gap-0">
                <button
                  onClick={() => incrementValue(setLength, length, 0.5)}
                  className="text-secondary text-xs"
                >
                  <FaCaretUp />
                </button>
                <button
                  onClick={() => decrementValue(setLength, length, 0.5, 0.5)}
                  className="text-secondary text-xs"
                >
                  <FaCaretDown />
                </button>
              </span>
            </div>
          </div>

          {/* Width Row */}
          <div className="flex justify-between items-center mb-3">
            <p className="md:text-lg text-sm font-normal text-description font-Satoshi">
              Width (m)
            </p>
            <div className="flex items-center border border-[#E4E4E4] bg-white rounded-full px-4 py-2">
              <input
                type="number"
                inputMode="decimal"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-16 text-center md:text-lg text-sm font-normal text-description font-Satoshi bg-transparent outline-none"
              />
              <span className="flex flex-col px-2 gap-0">
                <button
                  onClick={() => incrementValue(setWidth, width, 0.5)}
                  className="text-secondary text-xs"
                >
                  <FaCaretUp />
                </button>
                <button
                  onClick={() => decrementValue(setWidth, width, 0.5, 0.5)}
                  className="text-secondary text-xs"
                >
                  <FaCaretDown />
                </button>
              </span>
            </div>
          </div>

          {/* Wastage Row */}
          <div className="flex justify-between items-center mb-3">
            <p className="md:text-lg text-sm font-normal text-description font-Satoshi">
              Wastage (%)
            </p>
            <div className="flex items-center border border-[#E4E4E4] bg-white rounded-full px-4 py-2">
              <input
                type="number"
                inputMode="decimal"
                value={wastage}
                onChange={(e) => setWastage(e.target.value)}
                className="w-16 text-center md:text-lg text-sm font-normal text-description font-Satoshi bg-transparent outline-none"
              />
              <span className="flex flex-col px-2 gap-0">
                <button
                  onClick={() => incrementValue(setWastage, wastage, 5)}
                  className="text-secondary text-xs"
                >
                  <FaCaretUp />
                </button>
                <button
                  onClick={() => decrementValue(setWastage, wastage, 5, 0)}
                  className="text-secondary text-xs"
                >
                  <FaCaretDown />
                </button>
              </span>
            </div>
          </div>

          {/* Total Area Row */}
          <div className="flex justify-between items-center mb-3">
            <p className="md:text-lg text-sm font-normal text-description font-Satoshi">
              Total Area
            </p>
            <div className="flex items-center border border-[#E4E4E4] bg-white rounded-full px-4 py-2">
              <p className="md:text-lg text-sm font-semibold text-description font-Satoshi">
                {formatNumber(area)} m²
              </p>
            </div>
          </div>

          {/* Area with Wastage Row */}
          <div className="flex justify-between items-center mb-3">
            <p className="md:text-lg text-sm font-normal text-description font-Satoshi">
              Area + Wastage
            </p>
            <div className="flex items-center border border-[#E4E4E4] bg-white rounded-full px-4 py-2">
              <p className="md:text-lg text-sm font-semibold text-description font-Satoshi">
                {formatNumber(areaWithWaste)} m²
              </p>
            </div>
          </div>

          {/* Boards Needed Row */}
          <div className="flex justify-between items-center mb-3">
            <p className="md:text-lg text-sm font-normal text-description font-Satoshi">
              Boards Needed
            </p>
            <div className="flex items-center border border-[#E4E4E4] bg-primary/10 rounded-full px-4 py-2">
              <p className="md:text-lg text-sm font-bold text-primary font-Satoshi">
                {boardsNeeded} boards
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mt-6 p-4 bg-white rounded-lg border border-[#E4E4E4]">
          <div className="flex justify-between items-center mb-3">
            <p className="md:text-lg text-sm font-normal text-description font-Satoshi">
              Price per Board
            </p>
            <p className="md:text-lg text-sm font-semibold text-description font-Satoshi">
              £{pricePerBoard.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-[#E4E4E4]">
            <p className="md:text-xl text-lg font-semibold text-title font-Satoshi">
              Total Price
            </p>
            <p className="md:text-2xl text-xl font-bold text-secondary font-Satoshi">
              £{formatNumber(totalPrice)}
            </p>
          </div>
        </div>

        {/* Info Note */}
        {/* <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-gray-600">
            💡 Calculation: {formatNumber(L)} × {formatNumber(W)} = {formatNumber(area)} m²
            {wastePct > 0 && ` + ${wastePct}% wastage = ${formatNumber(areaWithWaste)} m²`}
            . Each board covers {sqmPerBoard} m², so you need {boardsNeeded} boards (rounded up).
          </p>
        </div> */}

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            disabled={boardsNeeded === 0 || totalPrice === 0}
            className="bg-secondary text-white hover:bg-primary md:text-lg text-sm font-bold inline-flex w-fit md:px-7 md:py-[18px] px-5 py-2.5 rounded-4xl transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Buy Now - Add to Basket
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
  );
};

export default DeckingCalculator;
