"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart, removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";
import BreadCrumb from "@/components/Product/BreadCrumb";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

export default function CartPage() {
    const { items } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    const cartItems = useSelector((state: RootState) => state.cart.items);

    // Calculate subtotal
    const subTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const shipping = 0; // Free shipping
    const total = subTotal + shipping;

    // Handle increment/decrement of quantity
    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        dispatch(updateQuantity({ id, quantity: newQuantity }));
    };

    return (
        <>
            <section className="pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <BreadCrumb title="Cart" />
                </div>
            </section>

            <section className="pb-16">
                <div className="container mx-auto px-4 md:px-12 py-7 bg-[#F0FAF7] flex md:flex-row flex-col gap-4 items-center justify-between md:mb-20 mb-16">
                    <h3 className="md:text-xl text-xs font-bold text-title font-DM_Sans capitalize">
                        Dark Grey Wood Grain Composite Decking Board – Essential Collection has been added to your account
                    </h3>
                    <Link
                        href="/shop"
                        className="md:text-lg text-sm font-medium text-secondary font-DM_Sans underline inline-flex items-center gap-2">
                        Continue Shopping
                    </Link>
                </div>
                <div className="container mx-auto px-4">
                    <h1 className="md:text-[38px] leading-none text-[34px] text-title font-medium font-DM_Sans mb-7 capitalize">
                        Shopping Cart
                    </h1>


                    {items.length === 0 ? (
                        <div>
                            <p className="md:text-lg text-xs font-bold text-title font-DM_Sans capitalize">Your cart is empty.</p>
                        </div>
                    ) : (
                        <div className="flex md:flex-row flex-col gap-5">
                            <div className="md:w-2/3 w-full space-y-6">
                                {/* Table Header */}
                                <div className="grid md:grid-cols-6 grid-cols-1 border-b border-[#D2D2D2] md:mb-11 mb-5">
                                    <div className="md:col-span-3 pb-3">
                                        <h4 className="md:text-lg text-xs font-bold text-title font-DM_Sans capitalize">
                                            Product
                                        </h4>
                                    </div>
                                    <div className="pb-3">
                                        <h4 className="md:text-lg text-xs font-bold text-title font-DM_Sans capitalize md:block hidden">
                                            Price
                                        </h4>
                                    </div>
                                    <div className="pb-3">
                                        <h4 className="md:text-lg text-xs font-bold text-title font-DM_Sans capitalize md:block hidden">
                                            Quantity
                                        </h4>
                                    </div>
                                    <div className="pb-3">
                                        <h4 className="md:text-lg text-xs font-bold text-title font-DM_Sans capitalize md:block hidden">
                                            Subtotal
                                        </h4>
                                    </div>
                                </div>

                                {/* Cart Items */}
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="grid md:grid-cols-6 grid-cols-1 items-center relative border-b border-[#E0E0E0] pb-4"
                                    >
                                        {/* Product Info */}
                                        <div className="md:col-span-3 flex flex-row gap-4 items-center">
                                            <div className="bg-background overflow-hidden">
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

                                        {/* Price */}
                                        <div className="pb-3 flex items-center md:justify-start justify-between gap-4">
                                            <div className="flex items-center justify-center w-fit border border-[#B2B2B2] px-4 py-1.5">
                                                <h4 className="md:text-xl text-base text-description font-bold text-center">
                                                    €{item.price.toFixed(2)}
                                                </h4>
                                            </div>
                                        </div>

                                        {/* Quantity */}
                                        <div className="pb-3 flex items-center md:justify-start justify-between gap-4">
                                            <div className="flex items-center justify-center w-fit border border-[#B2B2B2] px-4 py-1.5">
                                                <button
                                                    className="px-1 text-lg text-secondary"
                                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                >
                                                    -
                                                </button>
                                                <span className="px-1 text-lg font-normal text-description">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    className="px-1 text-lg text-secondary"
                                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* Subtotal */}
                                        <div className="pb-3 flex items-center md:justify-start justify-between gap-4">
                                            <h4 className="md:text-xl text-base text-title font-bold text-center">
                                                €{(item.price * item.quantity).toFixed(2)}
                                            </h4>
                                        </div>

                                        {/* Remove */}
                                        <button onClick={() => dispatch(removeFromCart(item.id))}>
                                            <IoClose className="absolute md:top-[20%] -top-3 right-0 text-secondary text-2xl" />
                                        </button>
                                    </div>
                                ))}

                                <div>
                                    <div className="flex flex-row gap-6 justify-between">
                                        <label
                                            htmlFor="coupon"
                                            className="text-lg font-normal text-description font-Satoshi"
                                        >
                                            Select Coupon:
                                        </label>
                                        <select
                                            id="coupon"
                                            className="w-full max-w-[275px] border border-[#E4E4E4] outline-none px-3 py-2 md:text-lg font-normal text-description font-Satoshi"
                                        >
                                            <option>Apply A Voucher</option>
                                            <option value="DISCOUNT10">DISCOUNT10</option>
                                            <option value="SALE20">SALE20</option>
                                        </select>
                                    </div>
                                    <div className="w-full max-w-[275px] ml-auto flex items-center justify-between mt-8">
                                        <h3 className="md:text-lg text-xs font-normal text-description font-Satoshi capitalize">
                                            sub total:
                                        </h3>
                                        <h4 className="md:text-xl text-base text-title font-bold">
                                            €{subTotal.toFixed(2)}
                                        </h4>
                                    </div>
                                    <div className="w-full max-w-[275px] ml-auto flex items-center justify-between mt-4 border-b border-[#D2D2D2] md:pb-10 pb-8">
                                        <h3 className="md:text-lg text-xs font-normal text-description font-Satoshi capitalize">
                                            shipping:
                                        </h3>
                                        <h4 className="md:text-xl text-base text-title font-bold">
                                            free
                                        </h4>
                                    </div>
                                    <div className="flex items-center justify-between mt-8">
                                        <Link
                                            href="/shop"
                                            className="md:text-lg text-sm font-medium text-secondary font-DM_Sans inline-flex items-center gap-2"
                                        >
                                            <span className="text-xl">&lt;</span> Continue Shopping
                                        </Link>
                                        <div className="w-full max-w-[275px] ml-auto flex items-center justify-between mt-4">
                                            <h3 className="md:text-lg text-xs font-bold text-description font-Satoshi capitalize">
                                                Total:
                                            </h3>
                                            <h4 className="md:text-xl text-secondary font-bold">
                                                €{subTotal.toFixed(2)}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                {/* Clear Cart */}
                                <button
                                    onClick={() => dispatch(clearCart())}
                                    className="bg-black text-white px-6 py-3 rounded-full font-bold mt-6"
                                >
                                    Clear Cart
                                </button>
                            </div>
                            <div className="md:w-1/3 w-full bg-[#F6F6F654] border border-[#E4E4E4] px-6 py-8 flex flex-col justify-between">
                                <div>
                                    <h3 className="md:text-[32px] md:leading-none text-[28px] font-semibold text-title font-DM_Sans capitalize border-b border-[#D2D2D2] pb-[18px]">
                                        basket totals
                                    </h3>
                                    <div className="flex items-center justify-between border-b border-[#D2D2D2] md:py-10 py-8">
                                        <h3 className="md:text-lg text-xs font-bold text-description font-Satoshi capitalize">
                                            sub total:
                                        </h3>
                                        <h4 className="md:text-xl text-base text-title font-bold">
                                            €{subTotal.toFixed(2)}
                                        </h4>
                                    </div>
                                    <div className="flex flex-col border-b border-[#D2D2D2] md:py-10 py-8 space-y-4">
                                        <h3 className="md:text-lg text-xs font-bold text-description font-Satoshi capitalize">
                                            shipping:
                                        </h3>
                                        <p className="text-sm font-normal text-description font-Satoshi">
                                            Shipping options will be updated during checkout.
                                        </p>
                                        <p className="text-sm font-normal text-description font-Satoshi">
                                            <strong>Please note: </strong> additional delivery charges could be incurred for Highlands and Islands. We will contact you to arrange before delivery.
                                        </p>
                                        <p className="text-sm font-normal text-description font-Satoshi">
                                            <strong>Collection </strong> (Free)
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between md:py-10 py-8">
                                        <h3 className="md:text-lg text-xs font-bold text-description font-Satoshi capitalize">
                                            Total:
                                        </h3>
                                        <h4 className="md:text-xl text-base text-title font-bold">
                                            €{subTotal.toFixed(2)}
                                        </h4>
                                    </div>
                                </div>

                                <button className="w-full bg-secondary text-white rounded-full px-6 py-3 font-bold hover:bg-primary transition-all">
                                    Proceed To Checkout
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </section>
        </>
    );
}
