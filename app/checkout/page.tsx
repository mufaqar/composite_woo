"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import CheckoutSummary from "@/components/Checkout/CheckoutSummary";
import BreadCrumb from "@/components/Product/BreadCrumb";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { items } = useSelector((state: RootState) => state.cart);

  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    countryRegion: "",
    streetAddress: "",
    townCity: "",
    postcode: "",
    phone: "",
    email: "",
  });

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    countryRegion: "",
    streetAddress: "",
    townCity: "",
    postcode: "",
  });

  const [message, setMessage] = useState("");
  const [deliverDifferent, setDeliverDifferent] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: "billing" | "shipping" = "billing"
  ) => {
    const { name, value } = e.target;
    if (type === "billing") {
      setBilling((prev) => ({ ...prev, [name]: value }));
    } else {
      setShipping((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleOrderSubmit = async () => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      billing,
      shipping: deliverDifferent ? shipping : billing,
      items,
      message,
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Order placed successfully!");
        console.log("Order created:", result.order);
      } else {
        alert("❌ " + (result.error?.message || "Order failed"));
      }
    } catch (error) {
      console.error("Order submission failed:", error);
      alert("⚠️ Failed to submit order.");
    }
  };

  return (
    <main>
      {/* Breadcrumb */}
      <section className="pt-16">
        <div className="container mx-auto px-4">
          <BreadCrumb title="Checkout" />
        </div>

        {/* Returning Customer */}
        <div className="container mx-auto px-4 md:px-12 py-7 bg-[#F0FAF7] flex md:flex-row flex-col gap-4 items-center justify-between md:mb-8 mb-4">
          <h3 className="md:text-xl text-xs font-bold text-title font-DM_Sans capitalize">
            Returning customer?
          </h3>
          <button
            onClick={() => setShowLogin(!showLogin)}
            className="md:text-lg text-sm font-medium text-secondary font-DM_Sans underline inline-flex items-center gap-2"
          >
            {showLogin ? "Hide login form" : "Click here to login"}
          </button>
        </div>

        {/* Login Form */}
        {showLogin && (
          <div className="container mx-auto px-4 md:px-12 py-6 bg-white border border-[#E4E4E4] rounded-lg mb-6">
            {/* You can import a LoginForm component here */}
            <p className="text-sm text-description mb-2">
              Please login with your WooCommerce account to continue.
            </p>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-[#E4E4E4] rounded-md p-3 mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-[#E4E4E4] rounded-md p-3 mb-3"
            />
            <button className="bg-secondary text-white px-6 py-2 rounded-md">
              Login
            </button>
          </div>
        )}

        {/* Coupon Toggle */}
        <div className="container mx-auto px-4 md:px-12 py-7 bg-[#F0FAF7] flex md:flex-row flex-col gap-4 items-center justify-between">
          <h3 className="md:text-xl text-xs font-bold text-title font-DM_Sans capitalize">
            Have a coupon?
          </h3>
          <button
            onClick={() => setShowCoupon(!showCoupon)}
            className="md:text-lg text-sm font-medium text-secondary font-DM_Sans underline inline-flex items-center gap-2"
          >
            {showCoupon ? "Hide coupon" : "Click here to enter your code"}
          </button>
        </div>

        {/* Coupon Form */}
        {showCoupon && (
          <div className="container mx-auto px-4 md:px-12 py-6 bg-white border border-[#E4E4E4] rounded-lg mb-6">
            <p className="text-sm text-description mb-3">
              If you have a coupon code, please apply it below:
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="flex-1 border border-[#E4E4E4] rounded-md p-3"
              />
              <button className="bg-secondary text-white px-6 py-2 rounded-md">
                Apply Coupon
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Checkout Section */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="flex md:flex-row flex-col gap-5 mt-10">
            {/* Billing Form */}
            <div className="md:w-3/5 bg-background/30 md:px-11 py-12 p-6 border border-[#E4E4E4]">
              <CheckoutForm formData={billing} onChange={handleChange} />
            </div>

            {/* Summary */}
            <div className="md:w-2/5 bg-background/30 md:px-11 py-12 p-6 border border-[#E4E4E4]">
              <CheckoutSummary onSubmit={handleOrderSubmit} />
            </div>
          </div>

          {/* Deliver to Different Address + Notes */}
          <div className="flex md:flex-row flex-col gap-5 mt-10">
            <div className="md:w-3/5 bg-[#F0FAF7] md:px-11 py-12 p-6 border border-[#E4E4E4]">
              <div className="flex items-center justify-between">
                <label
                  className="md:text-base text-sm font-medium text-title font-DM_Sans"
                  htmlFor="another_delivery"
                >
                  Deliver to a different address?
                </label>
                <input
                  name="another_delivery"
                  type="checkbox"
                  checked={deliverDifferent}
                  onChange={(e) => setDeliverDifferent(e.target.checked)}
                />
              </div>
              {/* Shipping Fields */}
              {deliverDifferent && (
                <div className="flex md:flex-row flex-col gap-5 mt-10">
                  <div className="">
                    <h3 className="text-lg font-semibold mb-4">
                      Shipping Information
                    </h3>
                    <CheckoutForm
                      formData={shipping}
                      onChange={(e) => handleChange(e, "shipping")}
                    />
                  </div>
                </div>
              )}

              <div className="mt-10">
                <label
                  className="md:text-base text-sm font-medium text-title font-DM_Sans"
                  htmlFor="message"
                >
                  Order Notes (optional)
                </label>
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="text-base font-normal text-description font-Satoshi placeholder:text-description border border-[#E4E4E4] bg-white rounded-[20px] px-6 py-3.5 w-full outline-none focus:border-secondary min-h-[202px] mt-8"
                  placeholder="Notes about your order, e.g. special delivery instructions"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
