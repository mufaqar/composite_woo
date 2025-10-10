"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";

interface CheckoutSummaryProps {
    onSubmit: () => void;
}

export default function CheckoutSummary({ onSubmit }: CheckoutSummaryProps) {
    const { items } = useSelector((state: RootState) => state.cart);

    const subTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 0;
    const total = subTotal + shipping;

    return (
        <div className="flex flex-col justify-between items-between h-full">
            <div>
                <h3 className="md:text-[32px] md:leading-none text-[28px] font-semibold text-title font-DM_Sans capitalize mb-6">Your Order</h3>
                {items.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className="flex md:flex-row flex-col items-center border-b border-[#E4E4E4] md:pb-10 md:mb-10 pb-6 mb-6"
                        >
                            <div className="flex flex-row gap-4 items-center">
                                {/* Product Image */}
                                <div className="bg-background overflow-hidden w-[100px] h-[93px]">
                                    <Image
                                        src={item.image || "/images/feature1.png"}
                                        alt={item.title}
                                        width={99}
                                        height={93}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <p className="md:text-base text-sm font-medium text-title font-DM_Sans">
                                    {item.title}
                                </p>
                            </div>
                            {/* Product Info */}
                            <div className="">
                                {/* Quantity and Price */}
                                <div className="pb-3 flex items-center md:justify-start justify-between gap-4">
                                    <div className="flex items-center justify-center w-fit border border-[#B2B2B2] px-4 py-1.5">
                                        <h4 className="md:text-xl text-base text-description font-bold text-center">
                                            €{item.price.toFixed(2)}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}

                <div className="border-b border-[#E4E4E4] md:pb-10 md:mb-10 pb-6 mb-6">
                    <div className="flex justify-between">
                        <h3 className="md:text-lg text-xs font-normal text-description font-Satoshi capitalize">
                            sub total:
                        </h3>
                        <h4 className="md:text-xl text-base text-title font-bold">
                            €{subTotal.toFixed(2)}
                        </h4>
                    </div>
                    <div className="flex justify-between mt-6">
                        <h3 className="md:text-lg text-xs font-normal text-description font-Satoshi capitalize">
                            shipping:
                        </h3>
                        <h4 className="md:text-xl text-base text-title font-bold">
                            free
                        </h4>
                    </div>
                </div>
                <div className="flex justify-between md:mb-10 mb-6">
                    <h3 className="md:text-lg text-xs font-bold text-description font-Satoshi capitalize">
                        Total:
                    </h3>
                    <h4 className="md:text-xl text-secondary font-bold">
                        €{total.toFixed(2)}
                    </h4>
                </div>
                <p className="text-sm font-normal text-description font-Satoshi md:mb-14 mb-8">
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our  <Link href="#">privacy policy</Link>.
                </p>
            </div>

            <button
                onClick={onSubmit}
                className="w-full bg-secondary text-white font-semibold py-3 rounded-full hover:bg-primary transition-all"
            >
                Place Order
            </button>
        </div>
    );
}
