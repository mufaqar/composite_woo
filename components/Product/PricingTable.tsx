"use client";
import { CompareProps } from "@/lib/woocommerce-types";
import Link from "next/link";
import React, { useState } from "react";

const PricingTable = ({ cat_info }: CompareProps) => {
  const [selected, setSelected] = useState("");

  return (
    <div className="w-full border rounded-xl overflow-hidden">

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="bg-[#003D2C] border-b border-[#E5E5E5] md:text-xl text-base font-bold text-center text-white px-4 py-4">
              Features
            </th>
            <th className="border-b border-[#E5E5E5] md:text-xl text-base font-bold text-center px-4 py-4">
              Select
            </th>
            <th className="border-b border-[#E5E5E5] md:text-xl text-base font-bold text-center px-4 py-4">
              Details
            </th>
          </tr>
        </thead>

        <tbody className="text-description text-sm md:text-base">
          <tr className="border-b border-[#E5E5E5]">
            {/* FEATURE */}
            <td className="bg-[#003D2C] text-white text-center px-4 py-4">
              Feature
            </td>

            {/* SELECT */}
            <td className="text-center px-4 py-4">
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="p-2 rounded-md text-black w-full max-w-[180px]"
              >
                <option value="finish">Finish</option>
                <option value="colour">Colour</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </td>

            {/* DYNAMIC CONTENT (ONE TD ONLY) */}
            <td className="text-center px-4 py-4">
              {selected === "finish" && (
                  <h3 className="font-semibold">Finish</h3>
                 
              )}

              {selected === "colour" && (
                  <h3 className="font-semibold">Colour</h3>
                
              )}

              {selected === "maintenance" && (
                  <h3 className="font-semibold">Maintenance</h3>
                  
              )}
            </td>

          </tr>
          <tr className="border-b border-[#E5E5E5]">
            {/* FEATURE */}
            <td className="bg-[#003D2C] text-white text-center px-4 py-4">
              Feature
            </td>

            {/* SELECT */}
            <td className="text-center px-4 py-4">
            </td>

            {/* DYNAMIC CONTENT (ONE TD ONLY) */}
            <td className="text-center px-4 py-4">
              {selected === "finish" && (
                <p className="font-semibold">Finish</p>

              )}

              {selected === "colour" && (
               <p className="font-semibold">colour</p>
              )}

              {selected === "maintenance" && (
               <p className="font-semibold">maintenance</p>
              )}
            </td>

          </tr>
           <tr className="border-b border-[#E5E5E5]">
            {/* FEATURE */}
            <td className="bg-[#003D2C] text-white text-center px-4 py-4">
              Feature
            </td>

            {/* SELECT */}
            <td className="text-center px-4 py-4">
            </td>

            {/* DYNAMIC CONTENT (ONE TD ONLY) */}
            <td className="text-center px-4 py-4">
              {selected === "finish" && (
                <p className="font-semibold">Finish</p>

              )}

              {selected === "colour" && (
               <p className="font-semibold">colour</p>
              )}

              {selected === "maintenance" && (
               <p className="font-semibold">maintenance</p>
              )}
            </td>

          </tr>
          <tr className="border-b border-[#E5E5E5]">
            {/* FEATURE */}
            <td className="bg-[#003D2C] text-white text-center px-4 py-4">
              Feature
            </td>

            {/* SELECT */}
            <td className="text-center px-4 py-4">
            </td>

            {/* DYNAMIC CONTENT (ONE TD ONLY) */}
            <td className="text-center px-4 py-4">
              {selected === "finish" && (
                <p className="font-semibold">Finish</p>

              )}

              {selected === "colour" && (
               <p className="font-semibold">colour</p>
              )}

              {selected === "maintenance" && (
               <p className="font-semibold">maintenance</p>
              )}
            </td>

          </tr>
          <tr className="border-b border-[#E5E5E5]">
            {/* FEATURE */}
            <td className="bg-[#003D2C] text-white text-center px-4 py-4">
              Feature
            </td>

            {/* SELECT */}
            <td className="text-center px-4 py-4">
            </td>

            {/* DYNAMIC CONTENT (ONE TD ONLY) */}
            <td className="text-center px-4 py-4">
              {selected === "finish" && (
               <Link href="#" className="md:text-base text-sm font-bold text-white inline-flex w-fit md:px-7 md:py-3 px-5 py-2 bg-secondary rounded-4xl hover:bg-primary border border-secondary hover:border-primary hover:text-white transition-all duration-300 ease-in-out mt-5">
                    View Product
                  </Link>

              )}

              {selected === "colour" && (
               <Link href="#" className="md:text-base text-sm font-bold text-white inline-flex w-fit md:px-7 md:py-3 px-5 py-2 bg-secondary rounded-4xl hover:bg-primary border border-secondary hover:border-primary hover:text-white transition-all duration-300 ease-in-out mt-5">
                    View Product
                  </Link>
              )}

              {selected === "maintenance" && (
                <Link href="#" className="md:text-base text-sm font-bold text-white inline-flex w-fit md:px-7 md:py-3 px-5 py-2 bg-secondary rounded-4xl hover:bg-primary border border-secondary hover:border-primary hover:text-white transition-all duration-300 ease-in-out mt-5">
                    View Product
                  </Link>
              )}
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PricingTable;
