"use client";

import { CompareProps } from "@/lib/woocommerce-types";
import React from "react";

const Compare = ({ cat_info }: CompareProps) => {
  const features = cat_info?.features || [];


  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto bg-[#F0FAF7] rounded-[20px] p-3">
          <table className="w-full border-collapse overflow-hidden">
            <thead>
              <tr>
                <th className="bg-[#003D2C] border-b border-[#E5E5E5] md:text-xl text-base font-bold text-center text-white px-4 py-4 rounded-t-[20px]">
                  Features & Appearance
                </th>
                <th className="border-b border-[#E5E5E5] md:text-xl text-base font-bold text-center text-title px-4 py-4">
                  Essential Grooved
                </th>
                <th className="border-b border-[#E5E5E5] md:text-xl text-base font-bold text-center text-title px-4 py-4">
                  Essential Wood Grain
                </th>
                <th className="border-b border-[#E5E5E5] md:text-xl text-base font-bold text-center text-title px-4 py-4">
                  Capped Dual Colour
                </th>
              </tr>
            </thead>

            <tbody className="text-description text-sm md:text-base">
              {features.map((item, index) => (
                <tr key={index} className="border-b border-[#E5E5E5]">
                  <td className="bg-[#003D2C] md:text-lg text-sm font-normal text-white text-center px-4 py-4">
                    {item.title}
                  </td>
                  <td className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">
                    {item.options?.col1 || "-"}
                  </td>
                  <td className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">
                    {item.options?.col2 || "-"}
                  </td>
                  <td className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">
                    {item.options?.col3 || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Compare;
