import { NextResponse } from "next/server";
import { wooApi } from "@/lib/woocommerce";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      billing,
      shipping,
      items,
      message,
      coupon, // e.g. "SUMMER10"
      shippingMethod, // e.g. { method_id: "flat_rate", method_title: "Flat Rate", total: "10.00" }
    } = body;

    if (!items?.length) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

   

       // 🧾 Line Items
    const line_items = items.map((item: any) => ({
      product_id: item.id,
      quantity: item.quantity,
      variation_id: item.variation_id || undefined,
    }));

    // ✅ Build billing structure for WooCommerce
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

    // ✅ Shipping data (if deliver to different address)
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

    // ✅ Coupon line (if applied)
     // 🧾 Coupon Line (if any)
    const coupon_lines = coupon
      ? [{ code: coupon }]
      : [];

    // ✅ Shipping line (if any selected)
    const shipping_lines = shippingMethod
      ? [
          {
            method_id: shippingMethod.method_id,
            method_title: shippingMethod.method_title,
            total: shippingMethod.total, // e.g. "5.00"
          },
        ]
      : [];

    // ✅ Build full order payload
    const orderPayload = {
      payment_method: "bacs", // change to "cod" or "stripe" later if needed
      payment_method_title: "Direct Bank Transfer",
      set_paid: false,
      billing: billingData,
      shipping: shippingData,
      line_items,
      coupon_lines,
      shipping_lines,
      customer_note: message || "",
    };

    console.log("🧾 WooCommerce order response:", JSON.stringify(data, null, 2));

    // ✅ Create WooCommerce order
    const { data } = await wooApi.post("orders", orderPayload);

    return NextResponse.json({ success: true, order: data }, { status: 201 });
  } catch (error: any) {
    console.error("❌ Error creating order:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
