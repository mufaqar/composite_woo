// components/VariableOptions.tsx

import { WooVariation } from "@/lib/woocommerce-types";

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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Options</h3>

      {Object.entries(attributeGroups).map(([attributeName, options]) => (
        <div key={attributeName} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 capitalize">
            {attributeName}:
          </label>
          <div className="flex flex-wrap gap-2">
            {options.map((option) => {
              const isSelected = selectedVariation?.attributes?.some(
                (attr) => attr.name === attributeName && attr.option === option
              );

              return (
                <button
                  key={option}
                  onClick={() => {
                    // Find variation with this attribute
                    const variation = product_variations.find((v) =>
                      v.attributes.some(
                        (attr) =>
                          attr.name === attributeName && attr.option === option
                      )
                    );
                    if (variation) {
                      onVariationChange(variation);
                    }
                  }}
                  className={`
                    px-4 py-2 border rounded-md text-sm font-medium transition-colors
                    ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }
                  `}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductVariations;
