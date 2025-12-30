import { WooProduct } from "./woocommerce-types";

export type ProductType = "decking" | "cladding";
export type DeckingVariant = "grooved" | "woodgrain" | "capped";
export type CladdingType = "smooth" | "woodgrain";
export type CladdingSize = "2.5" | "3.6";

/**
 * Multi-strategy product filtering that checks:
 * 1. Product name (case-insensitive)
 * 2. Product attributes
 * 3. ACF custom fields
 */
export function filterProductsByType(
  products: WooProduct[],
  type: ProductType
): WooProduct[] {
  const typeKeyword = type === "decking" ? "decking" : "cladding";

  // Keywords to exclude accessories and non-board products
  const excludeKeywords = [
    "clip",
    "screw",
    "fastener",
    "fixing",
    "edging",
    "trim",
    "starter",
    "end cap",
    "joist",
    "support",
    "bracket",
    "tool",
    "cleaner",
    "oil",
    "kit",
    "accessories"
  ];

  return products.filter((product) => {
    const productName = product.name?.toLowerCase() || "";

    // Exclude accessories and non-board products
    const isAccessory = excludeKeywords.some(keyword =>
      productName.includes(keyword)
    );

    if (isAccessory) {
      return false;
    }

    // For decking, must include "board" or "deck" or "composite" in the name
    if (type === "decking") {
      const isDeckingBoard =
        productName.includes("decking board") ||
        productName.includes("deck board") ||
        productName.includes("composite decking") ||
        productName.includes("composite board") ||
        productName.includes("composite") ||
        (productName.includes("decking") && productName.includes("board")) ||
        (productName.includes("composite") && productName.includes("board"));

      if (!isDeckingBoard) {
        return false;
      }
    }

    // Strategy 1: Check product name
    const nameMatch = productName.includes(typeKeyword);

    // Strategy 2: Check ACF product_type field
    const acfMatch = product.acf?.product_type?.toLowerCase() === typeKeyword;

    // Strategy 3: Check categories
    const categoryMatch = product.categories?.some(
      (cat) =>
        cat.name?.toLowerCase().includes(typeKeyword) ||
        cat.slug?.toLowerCase().includes(typeKeyword)
    );

    return nameMatch || acfMatch || categoryMatch;
  });
}

/**
 * Filter products by decking variant (grooved, woodgrain, capped)
 */
export function filterByDeckingVariant(
  products: WooProduct[],
  variant: DeckingVariant
): WooProduct[] {
  const variantKeywords: Record<DeckingVariant, string[]> = {
    grooved: ["grooved", "groove"],
    woodgrain: ["wood grain", "woodgrain", "wood-grain"],
    capped: ["capped", "cap"],
  };

  const keywords = variantKeywords[variant];

  return products.filter((product) => {
    // Strategy 1: Check product name
    const nameMatch = keywords.some((keyword) =>
      product.name?.toLowerCase().includes(keyword)
    );

    // Strategy 2: Check product attributes
    const attributeMatch = product.attributes?.some((attr) =>
      keywords.some(
        (keyword) =>
          attr.name?.toLowerCase().includes(keyword) ||
          attr.options?.some((opt) => opt.toLowerCase().includes(keyword))
      )
    );

    // Strategy 3: Check short description
    const descMatch = keywords.some((keyword) =>
      product.short_description?.toLowerCase().includes(keyword)
    );

    return nameMatch || attributeMatch || descMatch;
  });
}

/**
 * Filter products by cladding type (smooth or woodgrain)
 */
export function filterByCladdingType(
  products: WooProduct[],
  type: CladdingType
): WooProduct[] {
  const typeKeywords: Record<CladdingType, string[]> = {
    smooth: ["smooth"],
    woodgrain: ["wood grain", "woodgrain", "wood-grain"],
  };

  const keywords = typeKeywords[type];

  return products.filter((product) => {
    const nameMatch = keywords.some((keyword) =>
      product.name?.toLowerCase().includes(keyword)
    );

    const attributeMatch = product.attributes?.some((attr) =>
      keywords.some(
        (keyword) =>
          attr.name?.toLowerCase().includes(keyword) ||
          attr.options?.some((opt) => opt.toLowerCase().includes(keyword))
      )
    );

    const descMatch = keywords.some((keyword) =>
      product.short_description?.toLowerCase().includes(keyword)
    );

    return nameMatch || attributeMatch || descMatch;
  });
}

/**
 * Filter products by cladding size (2.5m or 3.6m)
 */
export function filterByCladdingSize(
  products: WooProduct[],
  size: CladdingSize
): WooProduct[] {
  const sizePatterns = size === "2.5" ? ["2.5", "2.5m"] : ["3.6", "3.6m"];

  return products.filter((product) => {
    // Check name for size
    const nameMatch = sizePatterns.some((pattern) =>
      product.name?.toLowerCase().includes(pattern)
    );

    // Check dimensions
    const dimensionMatch =
      product.dimensions?.length &&
      sizePatterns.some((pattern) =>
        product.dimensions.length.includes(pattern.replace("m", ""))
      );

    // Check attributes
    const attributeMatch = product.attributes?.some((attr) =>
      sizePatterns.some(
        (pattern) =>
          attr.name?.toLowerCase().includes("length") &&
          attr.options?.some((opt) => opt.includes(pattern))
      )
    );

    return nameMatch || dimensionMatch || attributeMatch;
  });
}

/**
 * Get sqm value for a product variant
 */
export function getProductSqmValue(
  type: ProductType,
  variant: DeckingVariant | CladdingType,
  size?: CladdingSize
): number {
  if (type === "decking") {
    // All decking variants have 0.6 sqm
    return 0.6;
  }

  // Cladding sqm values
  if (variant === "smooth") {
    return size === "2.5" ? 0.368 : 0.53;
  } else {
    // woodgrain cladding has two possible values per size
    // Return the first value as default
    return size === "2.5" ? 0.368 : 0.53;
  }
}

/**
 * Complete filtering function for calculator
 */
export function filterCalculatorProducts(
  products: WooProduct[],
  filters: {
    type: ProductType;
    variant?: DeckingVariant | CladdingType;
    size?: CladdingSize;
  }
): WooProduct[] {
  let filtered = filterProductsByType(products, filters.type);

  if (filters.type === "decking" && filters.variant) {
    filtered = filterByDeckingVariant(
      filtered,
      filters.variant as DeckingVariant
    );
  }

  if (filters.type === "cladding") {
    if (filters.variant) {
      filtered = filterByCladdingType(
        filtered,
        filters.variant as CladdingType
      );
    }
    if (filters.size) {
      filtered = filterByCladdingSize(filtered, filters.size);
    }
  }

  return filtered;
}
