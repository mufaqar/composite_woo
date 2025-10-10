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

  const [message, setMessage] = useState(""); // ✅ new
  const [deliverDifferent, setDeliverDifferent] = useState(false); // ✅ new

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async () => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // ✅ Include everything in orderData
    const orderData = {
      billing,
      items,
      message,
      deliverDifferent,
    };

    console.log("🛍️ Order Submitted:", orderData);

    // try {
    //   const res = await fetch("/api/order", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(orderData),
    //   });

    //   if (res.ok) {
    //     alert("✅ Order placed successfully!");
    //   } else {
    //     alert("❌ Something went wrong. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Order submission failed:", error);
    //   alert("⚠️ Failed to submit order. Check console for details.");
    // }
  };

  return (
    <main>
      {/* Header & Login Section */}
      <section className="pt-16">
        <div className="container mx-auto px-4">
          <BreadCrumb title="Checkout" />
        </div>

        <div className="container mx-auto px-4 md:px-12 py-7 bg-[#F0FAF7] flex md:flex-row flex-col gap-4 items-center justify-between md:mb-8 mb-4">
          <h3 className="md:text-xl text-xs font-bold text-title font-DM_Sans capitalize">
            Returning customer?
          </h3>
          <Link
            href="/login"
            className="md:text-lg text-sm font-medium text-secondary font-DM_Sans underline inline-flex items-center gap-2"
          >
            Click here to login
          </Link>
        </div>

        <div className="container mx-auto px-4 md:px-12 py-7 bg-[#F0FAF7] flex md:flex-row flex-col gap-4 items-center justify-between">
          <h3 className="md:text-xl text-xs font-bold text-title font-DM_Sans capitalize">
            Have a coupon?
          </h3>
          <button className="md:text-lg text-sm font-medium text-secondary font-DM_Sans underline inline-flex items-center gap-2">
            Click here to enter your code
          </button>
        </div>
      </section>

      {/* Checkout Section */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="flex md:flex-row flex-col gap-5 mt-10">
            {/* Left - Form */}
            <div className="md:w-3/5 bg-background/30 md:px-11 py-12 p-6 border border-[#E4E4E4]">
              <CheckoutForm formData={billing} onChange={handleChange} />
            </div>

            {/* Right - Summary */}
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

              <div className="mt-10">
                <label
                  className="md:text-base text-sm font-medium text-title font-DM_Sans"
                  htmlFor="message"
                >
                  Other notes (optional)
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
