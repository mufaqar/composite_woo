"use client";
import { CompareProps } from "@/lib/woocommerce-types";
import Link from "next/link";
import React, { useState } from "react";

const PricingTable = ({ cat_info }: CompareProps) => {
  const [selected, setSelected] = useState("");

  return (
    <div className="container mx-auto px-4">
      <div className="overflow-x-auto">
        <div className="md:w-2/3 w-full mx-auto flex md:flex-row flex-row items-center bg-[#F0FAF7] rounded-t-[20px] px-3 pt-3">
          <h3 className="md:w-1/3 w-full md:text-xl text-base font-bold text-center text-title px-4 py-3">
            Maintenance Type
          </h3>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="md:w-2/3 w-full px-4 py-3 border border-[#E5E5E5] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="finish">Finish</option>
            <option value="colour">Colour</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div className="md:w-2/3 w-full mx-auto flex md:flex-row flex-row bg-[#F0FAF7] rounded-b-[20px] px-3 pb-3">
          {selected !== "" && (
            <div className="md:w-1/3 w-full bg-[#003D2C] rounded-t-[20px]">
              <ul className="divide-y divide-[#E5E5E5]">
                <li className="md:text-xl text-base font-bold text-center text-white px-4 py-4 min-h-[70px]">
                  Features
                </li>
                <li className="md:text-lg text-xs font-normal text-center text-white px-4 py-4 min-h-[70px]">
                  Finish
                </li>
                <li className="md:text-lg text-xs font-normal text-center text-white px-4 py-4 min-h-[70px]">
                  Colour
                </li>
                <li className="md:text-lg text-xs font-normal text-center text-white px-4 py-4 min-h-[70px]">
                  Maintenance
                </li>
                <li className="md:text-lg text-xs font-normal text-center text-white px-4 py-4 min-h-[70px]">
                  Scratch Resistance
                </li>
                <li className="md:text-lg text-xs font-normal text-center text-white px-4 py-4 min-h-[70px]">
                  Slip Resistance
                </li>
              </ul>
            </div>
          )}
          <div className="md:w-2/3 w-full text-center">
            {selected === "finish" && (
              <ul className="divide-y divide-[#E5E5E5]">
                <li className="md:text-xl text-base font-bold text-center text-title px-4 py-4 min-h-[70px]">
                  Finish
                </li>
                <li className="md:text-lg text-xs font-normal text-description text-center px-4 py-4 min-h-[70px]">
                  Wood Grain/ Thin Grooved
                </li>
                <li className="md:text-lg text-xs font-normal text-description text-center px-4 py-4 min-h-[70px]">
                  Wood Grain/ Thin Grooved
                </li>
                <li className="md:text-lg text-xs font-normal text-description text-center px-4 py-4 min-h-[70px]">
                  Wood Grain/ Thin Grooved
                </li>
                <li className="md:text-lg text-xs font-normal text-description text-center px-4 py-4 min-h-[70px]">
                  Wood Grain/ Thin Grooved
                </li>
                <li className="md:text-lg text-xs font-normal text-description text-center px-4 py-4 min-h-[70px]">
                  Wood Grain/ Thin Grooved
                </li>
                <li>
                  <Link href="#" className="md:text-base text-sm font-bold text-white inline-flex w-fit md:px-7 md:py-3 px-5 py-2 bg-secondary rounded-4xl hover:bg-primary border border-secondary hover:border-primary hover:text-white transition-all duration-300 ease-in-out mt-5">
                    View Product
                  </Link>
                </li>
              </ul>
            )}

            {selected === "colour" && (
              <ul className="divide-y divide-[#E5E5E5]">
                <li className="md:text-xl text-base font-bold text-center text-title px-4 py-4 min-h-[70px]">
                  Color
                </li>
                <li className="md:text-lg text-xs font-normal text-description text-center px-4 py-4 min-h-[70px]">
                  Wood Grain/ Thin Grooved
                </li>
                <li className="md:text-lg text-xs font-normal text-description text-center px-4 py-4 min-h-[70px]">
                  Wood Grain/ Thin Grooved
                </li>
                <li className="md:text-lg text-xs font-normal text-description text-center px-4 py-4 min-h-[70px]">
                  Wood Grain/ Thin Grooved
                </li>
                <li className="md:text-lg text-xs font-normal text-description text-center px-4 py-4 min-h-[70px]">
                  Wood Grain/ Thin Grooved
                </li>
                <li className="md:text-lg text-xs font-normal text-description text-center px-4 py-4 min-h-[70px]">
                  Wood Grain/ Thin Grooved
                </li>
                <li>
                  <Link href="#" className="md:text-base text-sm font-bold text-white inline-flex w-fit md:px-7 md:py-3 px-5 py-2 bg-secondary rounded-4xl hover:bg-primary border border-secondary hover:border-primary hover:text-white transition-all duration-300 ease-in-out mt-5">
                    View Product
                  </Link>
                </li>
              </ul>
            )}

            {selected === "maintenance" && (
              <ul className="divide-y divide-[#E5E5E5]">
                <li className="md:text-xl text-base font-bold text-center text-title px-4 py-4 min-h-[70px]">
                  Maintenance
                </li>
                <li className="md:text-lg text-xs font-normal text-description text-center px-4 py-4 min-h-[70px]">
                  Wood Grain/ Thin Grooved
                </li>
                <li className="md:text-lg text-xs font-normal text-description text-center px-4 py-4 min-h-[70px]">
                  Wood Grain/ Thin Grooved
                </li>
                <li className="md:text-lg text-xs font-normal text-description text-center px-4 py-4 min-h-[70px]">
                  Wood Grain/ Thin Grooved
                </li>
                <li className="md:text-lg text-xs font-normal text-description text-center px-4 py-4 min-h-[70px]">
                  Wood Grain/ Thin Grooved
                </li>
                <li className="md:text-lg text-xs font-normal text-description text-center px-4 py-4 min-h-[70px]">
                  Wood Grain/ Thin Grooved
                </li>
                <li>
                  <Link href="#" className="md:text-base text-sm font-bold text-white inline-flex w-fit md:px-7 md:py-3 px-5 py-2 bg-secondary rounded-4xl hover:bg-primary border border-secondary hover:border-primary hover:text-white transition-all duration-300 ease-in-out mt-5">
                    View Product
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PricingTable;
