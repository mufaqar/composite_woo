import { NextResponse } from "next/server";
import { wooApi } from "@/lib/woocommerce";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { billing, shipping, items, message, couponCode, shippingMethod } = body;

    if (!items?.length) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    // 🧾 Line Items
    const line_items = items.map((item: any) => ({
      product_id: item.id,
      quantity: item.quantity,
      variation_id: item.variation_id || undefined,
    }));

    // 🧾 Billing
    const billingData = {
      first_name: billing.firstName,
      last_name: billing.lastName,
      company: billing.companyName,
      address_1: billing.streetAddress,
      city: billing.townCity,
      postcode: billing.postcode,
      country: billing.countryRegion,
      email: billing.email,
      phone: billing.phone,
    };

    // 🧾 Shipping
    const shippingData = shipping
      ? {
          first_name: shipping.firstName,
          last_name: shipping.lastName,
          company: shipping.companyName,
          address_1: shipping.streetAddress,
          city: shipping.townCity,
          postcode: shipping.postcode,
          country: shipping.countryRegion,
        }
      : billingData;

    // 🧾 Coupon (optional)
    const coupon_lines = couponCode ? [{ code: couponCode }] : [];

    // 🧾 Shipping (optional)
    const shipping_lines = shippingMethod
      ? [
          {
            method_id: shippingMethod.method_id,
            method_title: shippingMethod.method_title,
            total: shippingMethod.total,
          },
        ]
      : [];

    // 🧾 Complete Order
    const orderPayload = {
      payment_method: "bacs",
      payment_method_title: "Direct Bank Transfer",
      set_paid: false,
      billing: billingData,
      shipping: shippingData,
      line_items,
      coupon_lines,
      shipping_lines,
      customer_note: message || "",
    };

    const { data } = await wooApi.post("orders", orderPayload);

    console.log("✅ WooCommerce Order Created:", data);

    return NextResponse.json({ success: true, order: data }, { status: 201 });
  } catch (error: any) {
    console.error("❌ Error creating order:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
