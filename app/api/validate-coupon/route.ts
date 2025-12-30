import { wooApi } from "@/lib/woocommerce";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const { coupon_code } = await req.json();

    if (!coupon_code) {
      return NextResponse.json(
        { status: "error", message: "Coupon code is required." },
        { status: 400 }
      );
    }

    console.log("🔍 Validating coupon:", coupon_code);

    const { data } = await wooApi.get("coupons", { code: coupon_code });

    if (!data?.length) {
      return NextResponse.json({
        status: "invalid",
        message: "Coupon not found or invalid.",
      });
    }

    const coupon = data[0];

    // Optional checks
    if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
      return NextResponse.json({
        status: "invalid",
        message: "Coupon usage limit reached.",
      });
    }

    if (coupon.date_expires && new Date(coupon.date_expires) < new Date()) {
      return NextResponse.json({
        status: "invalid",
        message: "Coupon expired.",
      });
    }

    return NextResponse.json({
      status: "valid",
      coupon: {
        code: coupon.code,
        amount: coupon.amount,
        discount_type: coupon.discount_type,
        date_expires: coupon.date_expires,
      },
    });
  } catch (error: any) {
    console.error("❌ Coupon validation error:", error?.response?.data || error.message);
    return NextResponse.json(
      { status: "error", message: "Failed to validate coupon.", details: error.message },
      { status: 500 }
    );
  }
}
