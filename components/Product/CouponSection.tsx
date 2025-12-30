"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

interface CouponSectionProps {
  subTotal: number;
  setDiscount: (amount: number) => void;
  setCouponCode: (code: string) => void;
}
const CouponSection: React.FC<CouponSectionProps> = ({
  subTotal,
  setDiscount,
  setCouponCode,
}) => {
  const [couponCode, setLocalCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [couponAmount, setCouponAmount] = useState(0);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code.");
      return;
    }

    setLoading(true);
    setDiscount(0);
    setCouponAmount(0);

    try {
      const res = await fetch("/api/validate-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coupon_code: couponCode }),
      });

      const data = await res.json();

      if (data.status === "valid") {
        const { discount_type, amount } = data.coupon;

        let discountValue = 0;
        if (discount_type === "percent") {
          discountValue = (parseFloat(amount) / 100) * subTotal;
        } else {
          discountValue = parseFloat(amount);
        }

        setDiscount(discountValue);
        setCouponAmount(discountValue);
        toast.success(`Coupon applied! You saved Rs ${discountValue.toFixed(2)}`);
      } else {
        toast.error(data.message || "Invalid coupon code.");
      }
    } catch (error) {
      toast.error("Error validating coupon. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-12 py-6 bg-white border border-[#E4E4E4] rounded-lg mb-6">
      <p className="text-sm text-description mb-3">
        If you have a coupon code, please apply it below:
      </p>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => {
            setLocalCouponCode(e.target.value);
            setCouponCode(e.target.value); // share with parent
          }}
          className="flex-1 border border-[#E4E4E4] rounded-md p-3"
        />
        <button
          onClick={handleApplyCoupon}
          disabled={loading}
          className="bg-secondary text-white px-6 py-2 rounded-md disabled:opacity-60"
        >
          {loading ? "Checking..." : "Apply Coupon"}
        </button>
      </div>

      {couponAmount > 0 && (
        <p className="mt-2 text-green-600 text-sm">
          ✅ Coupon applied — You saved Rs {couponAmount.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default CouponSection;
