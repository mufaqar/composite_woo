"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { closeCart, removeFromCart } from "@/redux/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

export default function CartMini() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const subTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="absolute right-2 top-full w-[360px] bg-white shadow-xl border border-[#E4E4E4] p-5 z-50">
        <p className="text-sm text-title font-medium">Your basket is empty.</p>
      </div>
    );
  }

  return (
    <div className="absolute right-2 top-full w-[360px] bg-white shadow-xl border border-[#E4E4E4] p-5 z-50">
      <button
        onClick={() => dispatch(closeCart())}
        className="text-title hover:text-primary transition absolute top-2 right-2"
      >
        <IoClose size={24} />
      </button>
      {/* Cart Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 pb-4 border-b border-[#E4E4E4]"
          >
            <Image
              src={item.image || "/images/feature1.png"}
              alt={item.title}
              width={70}
              height={70}
              className="border object-cover"
            />

            <div className="flex-1">
              <p className="text-sm font-semibold text-title leading-snug">
                {item.title}
              </p>
              <p className="text-sm text-description mt-1">
                {item.quantity} × £{item.price.toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-secondary hover:text-primary transition"
            >
              <IoClose size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Subtotal */}
      <div className="flex items-center justify-between py-4">
        <span className="text-sm font-bold text-title tracking-wide">
          SUBTOTAL:
        </span>
        <span className="text-lg font-bold text-secondary">
          £{subTotal.toFixed(2)}
        </span>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Link
          href="/cart"
          className="block rounded-full text-center bg-title text-white py-3 text-sm font-bold hover:bg-primary transition"
        >
          View Basket
        </Link>

        <Link
          href="/checkout"
          className="block rounded-full text-center bg-secondary text-white py-3 text-sm font-bold hover:bg-primary transition"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
