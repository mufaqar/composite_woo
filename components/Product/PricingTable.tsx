"use client";
import { CompareProps } from "@/lib/woocommerce-types";
import Link from "next/link";
import React, { useState } from "react";

const PricingTable = ({ cat_info }: CompareProps) => {
  const [selected, setSelected] = useState("");

  return (
    <div className="container mx-auto px-4">
      <div className="overflow-x-auto bg-[#F0FAF7] rounded-[20px] p-3 flex md:flex-row flex-row">
        <div className="md:w-1/3 w-full bg-[#003D2C] rounded-t-[20px]">
          <ul className="divide-y divide-[#E5E5E5]">
            <li className="md:text-xl text-base font-bold text-center text-white px-4 py-4">
              Features
            </li>
            <li className="md:text-lg text-sm font-normal text-center text-white px-4 py-4">
              Finish
            </li>
            <li className="md:text-lg text-sm font-normal text-center text-white px-4 py-4">
              Colour
            </li>
            <li className="md:text-lg text-sm font-normal text-center text-white px-4 py-4">
              Maintenance
            </li>
            <li className="md:text-lg text-sm font-normal text-center text-white px-4 py-4">
              Scratch Resistance
            </li>
            <li className="md:text-lg text-sm font-normal text-center text-white px-4 py-4">
              Slip Resistance
            </li>
          </ul>
        </div>
        <div className="md:w-1/3 w-full text-center px-4 py-4">
          <h3 className="md:text-xl text-base font-bold text-center text-title px-4 py-4">
            Maintenance Type
          </h3>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full px-4 py-3 border border-[#E5E5E5] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="finish">Finish</option>
            <option value="colour">Colour</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div className="md:w-1/3 w-full text-center px-4 py-4">
          {selected === "finish" && (
            <ul className="divide-y divide-[#E5E5E5]">
              <li className="md:text-xl text-base font-bold text-center text-title px-4 py-4">
                Finish
              </li>
              <li className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">
                Wood Grain/ Thin Grooved
              </li>
              <li className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">
                Wood Grain/ Thin Grooved
              </li>
              <li className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">
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
              <li className="md:text-xl text-base font-bold text-center text-title px-4 py-4">
                Color
              </li>
              <li className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">
                Wood Grain/ Thin Grooved
              </li>
              <li className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">
                Wood Grain/ Thin Grooved
              </li>
              <li className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">
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
             <li className="md:text-xl text-base font-bold text-center text-title px-4 py-4">
              Maintenance
            </li>
              <li className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">
                Wood Grain/ Thin Grooved
              </li>
              <li className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">
                Wood Grain/ Thin Grooved
              </li>
              <li className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">
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
  );
};

export default PricingTable;
