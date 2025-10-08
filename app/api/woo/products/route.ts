import { NextResponse } from "next/server";
import { wooApi } from "@/lib/woocommerce";

export async function GET() {
  try {
    const { data } = await wooApi.get("products", { per_page: 10 });
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("WooCommerce API Error:", error.response?.data || error.message);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
