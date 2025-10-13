import { NextResponse } from "next/server";
import { wooApi } from "@/lib/woocommerce";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { billing, items, message } = body;

    if (!items?.length) {
      return NextResponse.json(
        { error: "No items in cart" },
        { status: 400 }
      );
    }

    // ✅ Convert cart items to WooCommerce line_items
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

    const orderPayload = {
      payment_method: "bacs", // or "cod", "paypal" etc.
      payment_method_title: "Direct Bank Transfer",
      set_paid: false,
      billing: billingData,
      shipping: billingData, // you can replace if deliverDifferent = true
      line_items,
      customer_note: message || "",
    };

    // ✅ Create order in WooCommerce
    const { data } = await wooApi.post("orders", orderPayload);

    return NextResponse.json(
      { success: true, order: data },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating order:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
