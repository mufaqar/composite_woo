// components/VariableOptions.tsx

import { WooVariation } from "@/lib/woocommerce-types";
import Link from "next/link";

interface ProductVariationsProps {
  product_variations: WooVariation[];
  selectedVariation: WooVariation | null;
  onVariationChange: (variation: WooVariation) => void;
}

const ProductVariations = ({
  product_variations,
  selectedVariation,
  onVariationChange,
}: ProductVariationsProps) => {
  if (!product_variations || product_variations.length === 0) {
    return null;
  }

  // Group attributes by name
  const attributeGroups: { [key: string]: string[] } = {};

  product_variations.forEach((variation) => {
    variation.attributes.forEach((attr) => {
      if (!attributeGroups[attr.name]) {
        attributeGroups[attr.name] = [];
      }
      if (!attributeGroups[attr.name].includes(attr.option)) {
        attributeGroups[attr.name].push(attr.option);
      }
    });
  });

  return (
    <div className="container mx-auto px-4 flex md:flex-row flex-col gap-6">
      <div className="md:w-1/2 w-full" />
      <div className="md:w-1/2 w-full md:-mt-[129px]">
        <div className="bg-[#F6F6F654] border border-[#E4E4E4] md:px-10 py-11 px-6 mt-8">
          <h3 className="text-[28px] leading-none font-semibold text-title font-DM_Sans mb-5">
            Options
          </h3>

          {/* ✅ Attribute Options */}
          {Object.entries(attributeGroups).map(([attributeName, options]) => (
            <div key={attributeName} className="space-y-2 mb-4">
              <label className="md:text-lg text-lg font-normal text-description font-Satoshi">
                {attributeName}:
              </label>
              <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                  const isSelected = selectedVariation?.attributes?.some(
                    (attr) =>
                      attr.name === attributeName && attr.option === option
                  );

                  return (
                    <button
                      key={option}
                      onClick={() => {
                        const variation = product_variations.find((v) =>
                          v.attributes.some(
                            (attr) =>
                              attr.name === attributeName &&
                              attr.option === option
                          )
                        );
                        if (variation) onVariationChange(variation);
                      }}
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

          {/* ✅ Action Buttons */}
          <div className="flex items-center gap-4 mt-6">
            <button
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

export default ProductVariations;
