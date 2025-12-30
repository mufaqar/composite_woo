import { NextRequest, NextResponse } from "next/server";
import { getAllProducts } from "@/lib/woocommerce-api";
import {
  filterCalculatorProducts,
  ProductType,
  DeckingVariant,
  CladdingType,
  CladdingSize,
} from "@/lib/product-filters";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") as ProductType | null;
    const variant = searchParams.get("variant") as
      | DeckingVariant
      | CladdingType
      | null;
    const size = searchParams.get("size") as CladdingSize | null;

    if (!type) {
      return NextResponse.json(
        { message: "Product type is required (decking or cladding)" },
        { status: 400 }
      );
    }

    // Fetch all products (consider increasing per_page for better filtering)
    const allProducts = await getAllProducts(100);

    if (!allProducts || allProducts.length === 0) {
      return NextResponse.json({ products: [] });
    }

    // Apply filters
    const filters: {
      type: ProductType;
      variant?: DeckingVariant | CladdingType;
      size?: CladdingSize;
    } = { type };

    if (variant) filters.variant = variant;
    if (size) filters.size = size;

    const filteredProducts = filterCalculatorProducts(allProducts, filters);

    return NextResponse.json({
      products: filteredProducts,
      count: filteredProducts.length,
      filters,
    });
  } catch (error: any) {
    console.error("Error filtering products:", error.message);
    return NextResponse.json(
      { message: "Failed to filter products", error: error.message },
      { status: 500 }
    );
  }
}
