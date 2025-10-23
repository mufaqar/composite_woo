"use client";

import { WooVariation } from "@/lib/woocommerce-types";
import Link from "next/link";
import { useState } from "react";

interface ProductVariationsProps {
  product_variations: WooVariation[];
  selectedVariation: WooVariation | null;
  onVariationChange: (variation: WooVariation | null) => void;
}

const ProductVariations = ({
  product_variations,
  selectedVariation,
  onVariationChange,
}: ProductVariationsProps) => {
  if (!product_variations || product_variations.length === 0) return null;

  // ✅ Group attributes by name
  const attributeGroups: Record<string, string[]> = {};
  product_variations.forEach((variation) => {
    variation.attributes.forEach((attr) => {
      if (!attributeGroups[attr.name]) attributeGroups[attr.name] = [];
      if (!attributeGroups[attr.name].includes(attr.option)) {
        attributeGroups[attr.name].push(attr.option);
      }
    });
  });

  // ✅ State to track selected attributes
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});

  // ✅ Function to handle selecting an attribute option
  const handleAttributeSelect = (attributeName: string, option: string) => {
    const updated = { ...selectedAttributes, [attributeName]: option };
    setSelectedAttributes(updated);

    // Find variation that matches all selected attributes
    const matchedVariation = product_variations.find((variation) =>
      variation.attributes.every(
        (attr) =>
          updated[attr.name] && updated[attr.name] === attr.option
      )
    );

    onVariationChange(matchedVariation || null);
  };

  const displayPrice = selectedVariation
    ? parseFloat(selectedVariation.price || "0")
    : parseFloat(product_variations[0]?.price || "0");

  return (
    <div className="container mx-auto px-4 flex md:flex-row flex-col gap-6">
      <div className="md:w-1/2 w-full" />
      <div className="md:w-1/2 w-full md:-mt-[129px]">
        <div className="bg-[#F6F6F654] border border-[#E4E4E4] md:px-10 py-11 px-6 mt-8">
          <h3 className="text-[28px] leading-none font-semibold text-title font-DM_Sans mb-5">
            Options
          </h3>

          {/* ✅ Attribute Buttons */}
          {Object.entries(attributeGroups).map(([attributeName, options]) => (
            <div key={attributeName} className="space-y-2 mb-4">
              <label className="md:text-lg text-lg font-normal text-description font-Satoshi capitalize">
                {attributeName}:
              </label>
              <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                  const isSelected = selectedAttributes[attributeName] === option;
                  return (
                    <button
                      key={option}
                      onClick={() => handleAttributeSelect(attributeName, option)}
                      className={`flex items-center border rounded-full px-4 py-2 transition-colors
                        ${
                          isSelected
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-description border-[#E4E4E4] hover:border-primary"
                        }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* ✅ Price Display */}
          <div className="mt-4 mb-6">
            <p className="text-lg font-semibold text-gray-800">
              Price: <span className="text-primary">£{displayPrice.toFixed(2)}</span>
            </p>
            {selectedVariation?.sku && (
              <p className="text-sm text-gray-500">SKU: {selectedVariation.sku}</p>
            )}
          </div>

          {/* ✅ Buttons */}
          <div className="flex items-center gap-4">
            <button
              disabled={!selectedVariation}
              className={`${
                selectedVariation
                  ? "bg-secondary hover:bg-primary text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } md:text-lg text-sm font-bold inline-flex w-fit md:px-7 md:py-[18px] px-5 py-2.5 rounded-4xl transition-all duration-300 ease-in-out`}
            >
              {selectedVariation ? "Add to Basket" : "Select Options"}
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

export default ProductVariations;
