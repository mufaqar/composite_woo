"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import Link from "next/link";

const steps = [
    { id: 0, title: "Plan Your Fencing Area", desc: "Follow our step-by-step process to calculate your fencing materials." },
    {
        id: 1,
        title: "Fence Area",
        desc: "Linear metreage of your fencing run?",
        fence_height: [
            { name: "2ft(0.6)", image: "/images/gro.png" },
            { name: "3ft(0.9)", image: "/images/gro.png" },
            { name: "4ft(1.2)", image: "/images/gro.png" },
            { name: "5ft(1.5)", image: "/images/gro.png" },
            { name: "6ft(1.83)", image: "/images/gro.png" },
            { name: "7ft(2.1)", image: "/images/gro.png" },
            { name: "8ft(2.4)", image: "/images/gro.png" },
        ],
    },
    {
        id: 2,
        title: "Fence Panel",
        desc: "Choose your preferred design",
        choose_panels: [
            {
                name: "Smooth fence panel",
                image: "/images/gro.png",
                rating: 4,
                regularPrice: 23.49,
                salePrice: 21.99,
                badges: {
                    best_seller: { label: "Best Seller", img: "/images/products-icon-1.svg" },
                    quality_assured: { label: "Quality Assured", img: "/images/products-icon-2.svg" },
                    on_sale: { label: "On Sale", img: "/images/products-icon-3.svg" },
                    delivery: { label: "Fast Delivery", img: "/images/products-icon-4.svg" },
                },
            },
            {
                name: "Slatted fence panel",
                image: "/images/gro.png",
                rating: 4,
                regularPrice: 23.49,
                salePrice: 21.99,
                badges: {
                    best_seller: { label: "Best Seller", img: "/images/products-icon-1.svg" },
                    quality_assured: { label: "Quality Assured", img: "/images/products-icon-2.svg" },
                    on_sale: { label: "On Sale", img: "/images/products-icon-3.svg" },
                    delivery: { label: "Fast Delivery", img: "/images/products-icon-4.svg" },
                },
            },
            {
                name: "Woodgrain fence panel",
                image: "/images/gro.png",
                rating: 4,
                regularPrice: 23.49,
                salePrice: 21.99,
                badges: {
                    best_seller: { label: "Best Seller", img: "/images/products-icon-1.svg" },
                    quality_assured: { label: "Quality Assured", img: "/images/products-icon-2.svg" },
                    on_sale: { label: "On Sale", img: "/images/products-icon-3.svg" },
                    delivery: { label: "Fast Delivery", img: "/images/products-icon-4.svg" },
                },
            },
        ],
    },
    {
        id: 3,
        title: "Posts",
        desc: "Choose from a number of posts and decking joist materials to give your decking the lift and sturdiness it deserves.",
        choose_posts: [
            {
                name: "Composite Posts",
                image: "/images/gro.png",
                rating: 4,
                regularPrice: 23.49,
                salePrice: 21.99,
                badges: {
                    best_seller: { label: "Best Seller", img: "/images/products-icon-1.svg" },
                    quality_assured: { label: "Quality Assured", img: "/images/products-icon-2.svg" },
                    on_sale: { label: "On Sale", img: "/images/products-icon-3.svg" },
                    delivery: { label: "Fast Delivery", img: "/images/products-icon-4.svg" },
                },
            },
            {
                name: "Timber Posts Treated 100mm x 100mm",
                image: "/images/gro.png",
                rating: 4,
                regularPrice: 23.49,
                salePrice: 21.99,
                badges: {
                    best_seller: { label: "Best Seller", img: "/images/products-icon-1.svg" },
                    quality_assured: { label: "Quality Assured", img: "/images/products-icon-2.svg" },
                    on_sale: { label: "On Sale", img: "/images/products-icon-3.svg" },
                    delivery: { label: "Fast Delivery", img: "/images/products-icon-4.svg" },
                },
            },
        ],
    },
    {
        id: 4,
        title: "Materials Required",
        desc: "Based on your measurements provided we have calculated what you will need",
        selected_items: [
            { name: "Fence Length", image: "/images/grooved.png", items: 0 },
            { name: "Fence Height:", image: "/images/grooved.png", items: 5 },
            { name: "Fence Panel:", image: "/images/grooved.png", items: 2 },
            { name: "Posts", image: "/images/grooved.png", items: 0 },
        ],
    },
];

interface FenceStepsProps {
    setCategory: (cat: string) => void;
    category: string;
}

export default function FencingSteps({ category, setCategory }: FenceStepsProps) {
    const sliderRef = useRef<any>(null);
    const [step, setStep] = useState(0);
    const [form, setForm] = useState({ length: 0, width: 0 });
    const [stepInputs, setStepInputs] = useState<{ [key: string]: any }>({});
    const [selectedOptions, setSelectedOptions] = useState<{ fence_panels?: string; posts?: string }>({});

    // ✅ Safely assign arrays
    const stepsData = {
        fence_panels: steps[2]?.choose_panels ?? [],
        clading_posts: steps[3]?.choose_posts ?? [],
        selected_items: steps[4]?.selected_items ?? [],
        fence_heights: steps[1]?.fence_height ?? [],
    };

    const [selectedItems, setSelectedItems] = useState(stepsData.selected_items);

    const area = form.length * form.width;

    const setLength = (v: number) => setForm(p => ({ ...p, length: v }));
    const setWidth = (v: number) => setForm(p => ({ ...p, width: v }));

    const selectPanels = (name: string) => setSelectedOptions(prev => ({ ...prev, fence_panels: name }));
    const selectPosts = (name: string) => setSelectedOptions(prev => ({ ...prev, posts: name }));
    const updateItemCount = (index: number, count: number) =>
        setSelectedItems(prev => {
            const copy = [...prev];
            copy[index] = { ...copy[index], items: count };
            return copy;
        });

    const next = () => {
        if ([0, 1, 2].includes(step)) {
            const formEl = document.querySelector("form");
            if (formEl) {
                const formData = new FormData(formEl as HTMLFormElement);
                const currentStepData = Object.fromEntries(formData.entries());
                setStepInputs(prev => ({ ...prev, [`step${step}`]: currentStepData }));
            }
        }

        if (step === 3) console.log("✅ Fence Panels:", selectedOptions.fence_panels);
        if (step === 4) console.log("✅ Posts:", selectedOptions.posts);
        if (step === 5) {
            console.log("✅ Final Materials:", selectedItems);
            console.log("🔥 FULL DATA:", { steps: stepInputs, selections: selectedOptions, fence_panels: selectedItems });
            return;
        }

        setStep(prev => prev + 1);
    };

    const prev = () => setStep(prev => (prev > 0 ? prev - 1 : 0));

    const selected_sum_count = selectedItems.reduce((sum, item) => sum + item.items, 0);
    const showContinue = step !== 5 || selected_sum_count === 0;

    const settings = { dots: false, infinite: false, speed: 600, slidesToShow: 1, slidesToScroll: 1, arrows: false, swipe: false };

    return (
        <section className="bg-[#F6F6F6] py-16">
            {/* Heading */}
            <div className="container mx-auto px-4 mb-12 text-center">
                <h2 className="md:text-6xl text-[33px] font-semibold text-title font-DM_Sans">{steps[step].title}</h2>
                {steps[step].desc && <p className="md:text-xl text-sm text-description max-w-[786px] mx-auto mt-4">{steps[step].desc}</p>}
            </div>

            {/* Step 0 */}
            {step === 0 && (
                <div className="divide-x divide-[#E4E4E4] border-y border-[#E4E4E4] flex md:flex-row flex-col items-center">
                    {/* Form */}
                    <div className="md:w-1/2 w-full bg-[#F0FAF7] md:p-[50px] p-10">
                        <div className="bg-white py-[27px] px-[34px] border border-[#E4E4E4] rounded-[20px]">
                            <h3 className="md:text-[32px] text-[28px] font-semibold text-title mb-4">Details</h3>
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                    <div>
                                        <label htmlFor="category" className="text-base font-normal text-description mb-2 block">Product Category</label>
                                        <select onChange={(e) => setCategory(e.target.value)} value={category} name="category" className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                                            <option value="cladding">Cladding</option>
                                            <option value="decking">Decking</option>
                                            <option value="fencing">Fencing</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="a" className="text-base font-normal text-description mb-2 block">A</label>
                                        <input id="a" name="a" type="number" placeholder="4" className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                    <div>
                                        <label htmlFor="b" className="text-base font-normal text-description mb-2 block">B</label>
                                        <input id="b" name="b" type="number" placeholder="4" className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                    <div>
                                        <label htmlFor="c" className="text-base font-normal text-description mb-2 block">C</label>
                                        <input id="c" name="c" type="number" placeholder="4" className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                    <div>
                                        <label htmlFor="d" className="text-base font-normal text-description mb-2 block">D</label>
                                        <input id="d" name="d" type="number" placeholder="4" className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                </div>
                                <div className="mt-6 w-full px-6 py-7 border border-[#E4E4E4] rounded-[20px] bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 flex items-center justify-between">
                                    <div>
                                        <p className="md:text-[26px] text-xl font-normal text-description">Total Cladding Area</p>
                                        <div className="flex items-center gap-3 mt-9">
                                            <Image src="/images/pform.png" alt="board" className="object-contain" width={127} height={101} />
                                            <p className="md:text-[32px] md:leading-none text-[28px] font-medium text-title font-DM_Sans capitalize">153 Boards</p>
                                        </div>
                                    </div>

                                    <div className="bg-secondary text-white rounded-full px-4 py-2 md:text-[26px] text-xl font-bold">
                                        {area || 0} M
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Slider */}
                    <div className="md:w-1/2 w-full relative md:px-[50px] px-10">
                        <Slider ref={sliderRef} {...settings} className="!relative !h-full !w-fit !mx-auto">
                            <div className="p-5 relative">
                                <Image src="/images/b.png" alt="board" className="object-contain" width={478} height={717} />
                            </div>
                        </Slider>
                        <div className="flex items-center justify-center gap-5 mt-4">
                            <button className="opacity-30" onClick={() => sliderRef.current?.slickPrev()}><HiArrowLongLeft size={32} /></button>
                            <button onClick={() => sliderRef.current?.slickNext()}><HiArrowLongRight size={32} /></button>
                        </div>
                    </div>
                </div>
            )}
            {/* Step 1: Fence Height */}
            {step === 1 && (
                <div className="divide-x divide-[#E4E4E4] border-y border-[#E4E4E4] flex md:flex-row flex-col items-center">
                    <div className="md:w-1/2 w-full bg-[#F0FAF7] md:p-[50px] p-10">
                        <div className="bg-white py-[27px] px-[34px] border border-[#E4E4E4] rounded-[20px]">
                            <h3 className="md:text-[32px] text-[28px] font-semibold text-title mb-4">Details</h3>
                            <form className="space-y-6">
                                <div className="">
                                    <label htmlFor="meters" className="text-base font-normal text-description mb-2 block">Meters</label>
                                    <input type="number" name="meters" placeholder="0" className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
                                </div>
                                <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                                    {stepsData.fence_heights.map((item, index) => (
                                        <div key={index} className="cursor-pointer">
                                            <button onClick={() => selectPanels(item.name)} className={`w-full text-lg font-semibold px-5 py-4 rounded-full 
                                         ${selectedOptions.fence_panels !== item.name ? "border border-[#E4E4E4] bg-transparent text-description" : "bg-secondary border-secondary text-white"}`}>
                                                {item.name}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 w-full px-6 py-7 border border-[#E4E4E4] rounded-[20px] bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 flex items-center justify-between">
                                    <div>
                                        <p className="md:text-[26px] text-xl font-normal text-description">Total Cladding Area</p>
                                        <div className="flex items-center gap-3 mt-9">
                                            <Image src="/images/pform.png" alt="board" className="object-contain" width={127} height={101} />
                                            <p className="md:text-[32px] md:leading-none text-[28px] font-medium text-title font-DM_Sans capitalize">153 Boards</p>
                                        </div>
                                    </div>

                                    <div className="bg-secondary text-white rounded-full px-4 py-2 md:text-[26px] text-xl font-bold">
                                        {area || 0} M
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full relative md:px-[50px] px-10">
                        <Image src="/images/clad2.png" alt="board" className="object-contain" width={478} height={717} />
                    </div>
                </div>
            )}
            {step === 2 && stepsData.fence_panels.length > 0 && (
                <div className="border-y border-[#E4E4E4] py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                            {stepsData.fence_panels.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => selectPanels(item.name)}>
                                    {/* Image + Wishlist */}
                                    <div className="w-full relative bg-white">
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className={`absolute top-2.5 left-4 p-2 rounded-full shadow z-10
                                                            ${selectedOptions.fence_panels !== item.name ? "border-2 border-secondary text-white bg-white"
                                                    : "bg-secondary text-white"
                                                }`}>
                                            <FaCheck />
                                        </button>
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            type="button"
                                            className="absolute top-2.5 right-2.5 bg-white p-2 rounded-full shadow z-10"
                                        >
                                            <CiHeart className="w-6 h-6 text-description" />
                                        </button>

                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={400}
                                            height={400}
                                            className="w-full h-[220px] object-contain p-4"
                                        />
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 text-yellow-500 mt-1.5 px-4">
                                        {"★".repeat(item.rating)}
                                    </div>

                                    {/* Title */}
                                    <div className="px-4 mt-1">
                                        <p className="text-lg font-bold text-black">
                                            {item.name}
                                        </p>
                                    </div>

                                    {/* Badges */}
                                    <div className="flex gap-3 px-4 mt-2 flex-wrap">
                                        {Object.entries(item.badges).map(([key, badge]) => (
                                            <div key={key} className="relative group">
                                                {/* Tooltip */}
                                                <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                                    {badge.label}
                                                </span>

                                                {/* Icon */}
                                                <span className="w-10 h-10 bg-[#00DFA21C] rounded-full flex items-center justify-center">
                                                    <Image
                                                        src={badge.img}
                                                        alt={badge.label}
                                                        width={24}
                                                        height={24}
                                                    />
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Price */}
                                    <div className="px-4 py-4 flex items-center gap-2">
                                        <span className="text-description line-through">
                                            £{item.regularPrice}
                                        </span>
                                        <span className="text-title text-xl font-semibold">
                                            £{item.salePrice}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {step === 3 && stepsData.clading_posts.length > 0 && (
                <div className="border-y border-[#E4E4E4] py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                            {stepsData.clading_posts.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => selectPosts(item.name)}>
                                    {/* Image + Wishlist */}
                                    <div className="w-full relative bg-white">
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className={`absolute top-2.5 left-4 p-2 rounded-full shadow z-10
                                                            ${selectedOptions.posts !== item.name ? "border-2 border-secondary text-white bg-white"
                                                    : "bg-secondary text-white"
                                                }`}>
                                            <FaCheck />
                                        </button>
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            type="button"
                                            className="absolute top-2.5 right-2.5 bg-white p-2 rounded-full shadow z-10"
                                        >
                                            <CiHeart className="w-6 h-6 text-description" />
                                        </button>

                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={400}
                                            height={400}
                                            className="w-full h-[220px] object-contain p-4"
                                        />
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 text-yellow-500 mt-1.5 px-4">
                                        {"★".repeat(item.rating)}
                                    </div>

                                    {/* Title */}
                                    <div className="px-4 mt-1">
                                        <p className="text-lg font-bold text-black">
                                            {item.name}
                                        </p>
                                    </div>

                                    {/* Badges */}
                                    <div className="flex gap-3 px-4 mt-2 flex-wrap">
                                        {Object.entries(item.badges).map(([key, badge]) => (
                                            <div key={key} className="relative group">
                                                {/* Tooltip */}
                                                <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                                    {badge.label}
                                                </span>

                                                {/* Icon */}
                                                <span className="w-10 h-10 bg-[#00DFA21C] rounded-full flex items-center justify-center">
                                                    <Image
                                                        src={badge.img}
                                                        alt={badge.label}
                                                        width={24}
                                                        height={24}
                                                    />
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Price */}
                                    <div className="px-4 py-4 flex items-center gap-2">
                                        <span className="text-description line-through">
                                            £{item.regularPrice}
                                        </span>
                                        <span className="text-title text-xl font-semibold">
                                            £{item.salePrice}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {step === 4 && selectedItems.length > 0 && (
                <div className="border-y border-[#E4E4E4] py-12">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            {selectedItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="md:w-1/5 w-full">
                                    <div className="w-full relative bg-[#f0f0f0]">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={400}
                                            height={400}
                                            className="w-full h-[220px] object-contain p-4"
                                        />
                                    </div>
                                    {/* Title */}
                                    <div className="px-4 mt-1">
                                        <p className="text-lg font-bold text-black text-center">
                                            {item.name}
                                        </p>
                                        <p className="text-lg font-bold text-secondary text-center">
                                            {item.items}
                                        </p>
                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            )}
            {/* Navigation Buttons */}
            {showContinue ? (
                <div className="max-w-[316px] mx-auto px-4 flex justify-between mt-8">
                    <button type="button" onClick={prev} className="w-10 h-10 rounded-full border flex items-center justify-center"><FaChevronLeft size={14} /></button>
                    <button type="button" onClick={next} className="text-lg font-semibold px-5 py-2 bg-secondary text-white rounded-full hover:bg-primary">Continue</button>
                    <button type="button" onClick={next} className="w-10 h-10 rounded-full border flex items-center justify-center"><FaChevronRight size={14} /></button>
                </div>
            ) : (
                <div className="max-w-[380px] mx-auto px-4 flex justify-between mt-8">
                    <Link href="/products" className="text-lg font-semibold px-5 py-2 bg-secondary text-white rounded-full hover:bg-primary">Explore Products</Link>
                    <Link href="/" className="text-lg font-semibold px-5 py-2 bg-[#003D2C] text-white rounded-full hover:bg-primary">Free Sample</Link>
                </div>
            )}
        </section>
    );
}
