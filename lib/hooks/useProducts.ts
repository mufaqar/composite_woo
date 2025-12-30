import { useQuery } from "@tanstack/react-query";
import { WooProduct } from "../woocommerce-types";
import {
  ProductType,
  DeckingVariant,
  CladdingType,
  CladdingSize,
} from "../product-filters";

interface FilteredProductsResponse {
  products: WooProduct[];
  count: number;
  filters: {
    type: ProductType;
    variant?: DeckingVariant | CladdingType;
    size?: CladdingSize;
  };
}

interface UseProductsOptions {
  type: ProductType;
  variant?: DeckingVariant | CladdingType;
  size?: CladdingSize;
  enabled?: boolean;
}

/**
 * Hook to fetch filtered products using React Query
 * Implements automatic caching and dedupe
 */
export function useFilteredProducts(options: UseProductsOptions) {
  const { type, variant, size, enabled = true } = options;

  const queryKey = ["products", "filter", type, variant, size].filter(Boolean);

  return useQuery<FilteredProductsResponse>({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams({ type });
      if (variant) params.append("variant", variant);
      if (size) params.append("size", size);

      const response = await fetch(`/api/woo/products/filter?${params}`);

      if (!response.ok) {
        throw new Error("Failed to fetch filtered products");
      }

      return response.json();
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to fetch products by type only (initial load)
 */
export function useProductsByType(type: ProductType, enabled = true) {
  return useFilteredProducts({ type, enabled });
}

/**
 * Hook to fetch decking products by variant
 */
export function useDeckingProducts(
  variant: DeckingVariant | null,
  enabled = true
) {
  return useFilteredProducts({
    type: "decking",
    variant: variant || undefined,
    enabled: enabled && !!variant,
  });
}

/**
 * Hook to fetch cladding products by type only (size affects formula, not filtering)
 */
export function useCladdingProducts(
  claddingType: CladdingType | null,
  enabled = true
) {
  return useFilteredProducts({
    type: "cladding",
    variant: claddingType || undefined,
    enabled: enabled && !!claddingType,
  });
}
