"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import Link from "next/link";
interface ProductItem {
    name: string;
    image: string;
    rating?: number;
    badges?: Record<string, { label: string; img: string }>;
    regularPrice?: number;
    salePrice?: number;
}
const steps: {
    id: number;
    title: string;
    desc?: string;
    Styles?: ProductItem[];
    choose_material?: ProductItem[];
    choose_posts?: ProductItem[];
    decking_Types?: ProductItem[];
    selected_items?: { name: string; items: number; image: string }[];
}[] = [
        { id: 0, title: "Decking Area Calculator", desc: "Follow our step-by-step process to calculate Decking Area" },
        { id: 1, title: "Decking Styles", Styles: [{ name: "Grooved", image: "/images/grooved.png" }, { name: "Wood Grain", image: "/images/grooved.png" }, { name: "Natural Collection", image: "/images/grooved.png" }, { name: "Signature", image: "/images/grooved.png" }] },
        {
            id: 2, title: "Decking Area Calculator", choose_material: [
                { name: "Slim Hidden Fasteners – Decking Clips", image: "/images/gro.png", rating: 4, regularPrice: 23.49, salePrice: 21.99, badges: { best_seller: { label: "Best Seller", img: "/images/products-icon-1.svg" }, quality_assured: { label: "Quality Assured", img: "/images/products-icon-2.svg" }, on_sale: { label: "On Sale", img: "/images/products-icon-3.svg" }, delivery: { label: "Fast Delivery", img: "/images/products-icon-4.svg" } } },
                { name: "Plastic Decking Fasteners", image: "/images/gro.png", rating: 4, regularPrice: 23.49, salePrice: 21.99, badges: { best_seller: { label: "Best Seller", img: "/images/products-icon-1.svg" }, quality_assured: { label: "Quality Assured", img: "/images/products-icon-2.svg" }, on_sale: { label: "On Sale", img: "/images/products-icon-3.svg" }, delivery: { label: "Fast Delivery", img: "/images/products-icon-4.svg" } } },
            ]
        },
        { id: 3, title: "Fascia Boards Calculator", desc: "Fascia Boards are designed to be installed around the sides of your Decking area..." },
        { id: 4, title: "Bullnose / Picture Frame Edging", desc: "Select the sides of your Decking you would like to add a Bullnose Board to below..." },
        {
            id: 5, title: "Frame Materials", choose_material: [
                { name: "Slim Hidden Fasteners – Decking Clips", image: "/images/gro.png", rating: 4, regularPrice: 23.49, salePrice: 21.99, badges: { best_seller: { label: "Best Seller", img: "/images/products-icon-1.svg" }, quality_assured: { label: "Quality Assured", img: "/images/products-icon-2.svg" }, on_sale: { label: "On Sale", img: "/images/products-icon-3.svg" }, delivery: { label: "Fast Delivery", img: "/images/products-icon-4.svg" } } },
                { name: "Plastic Decking Fasteners", image: "/images/gro.png", rating: 4, regularPrice: 23.49, salePrice: 21.99, badges: { best_seller: { label: "Best Seller", img: "/images/products-icon-1.svg" }, quality_assured: { label: "Quality Assured", img: "/images/products-icon-2.svg" }, on_sale: { label: "On Sale", img: "/images/products-icon-3.svg" }, delivery: { label: "Fast Delivery", img: "/images/products-icon-4.svg" } } },
            ]
        },
        { id: 6, title: "Posts", choose_posts: [{ name: "Composite Posts", image: "/images/gro.png" }, { name: "Timber Posts Treated 100mm x 100mm", image: "/images/gro.png" }] },
        { id: 7, title: "Decking Type Clips", decking_Types: [{ name: "Composite Posts", image: "/images/gro.png" }, { name: "Timber Posts Treated 100mm x 100mm", image: "/images/gro.png" }] },
        { id: 8, title: "Materials Required", selected_items: [
            { name: "Decking Boards", image: "/images/grooved.png", items: 0 },
            { name: "Fasic Boards", image: "/images/grooved.png", items: 5 },
            { name: "Bullnose Boards", image: "/images/grooved.png", items: 2 },
            { name: "Frame Materials", image: "/images/grooved.png", items: 0 },
            { name: "Pack Of Clips", image: "/images/grooved.png", items: 0 },
            { name: "Start Clips", image: "/images/grooved.png", items: 0 },
            { name: "Posts", image: "/images/grooved.png", items: 0 },
        ] },
    ];

interface DeckingStepsProps {
    setCategory: (cat: string) => void;
    category: string;
}

export default function DeckingSteps({ category, setCategory }: DeckingStepsProps) {
    const sliderRef = useRef<any>(null);
    const [step, setStep] = useState(0);
    const [form, setForm] = useState({ length: 0, width: 0 });
    const [stepInputs, setStepInputs] = useState<{ [key: string]: any }>({});

    // Selections for each step
    const [selectedOptions, setSelectedOptions] = useState({
        step2Material: "",
        step5Material: "",
        step6Posts: "",
        step7DeckingType: ""
    });

    // Final materials count (step 8)
    const [selectedItems, setSelectedItems] = useState(steps[8].selected_items || []);

    const area = form.length * form.width;

    const setLength = (v: number) => setForm(p => ({ ...p, length: v }));
    const setWidth = (v: number) => setForm(p => ({ ...p, width: v }));

    // Step selection handlers
    const selectMaterial = (stepKey: keyof typeof selectedOptions, name: string) => {
        setSelectedOptions(prev => ({ ...prev, [stepKey]: name }));
    };

    const selectPosts = (stepKey: keyof typeof selectedOptions, name: string) => {
        setSelectedOptions(prev => ({ ...prev, [stepKey]: name }));
    };

    // Step 8 item count update
    const updateItemCount = (index: number, count: number) => {
        setSelectedItems(prev => {
            const copy = [...prev];
            copy[index] = { ...copy[index], items: count };
            return copy;
        });
    };

    // Next step
    const next = () => {
        // Capture form fields for steps with forms
        if (step === 0 || step === 3 || step === 4) {
            const formEl = document.querySelector("form");
            if (formEl) {
                const formData = new FormData(formEl as HTMLFormElement);
                const currentStepData = Object.fromEntries(formData.entries());
                setStepInputs(prev => ({ ...prev, [`step${step}`]: currentStepData }));
                console.log(`✅ Step ${step} Submitted:`, currentStepData);
            }
        }

        // Step 2 Material
        if (step === 2) console.log("✅ Selected Material:", selectedOptions.step2Material);
        if (step === 5) console.log("✅ Selected Frame Material:", selectedOptions.step5Material);
        if (step === 6) console.log("✅ Selected Posts:", selectedOptions.step6Posts);
        if (step === 7) console.log("✅ Selected Decking Type:", selectedOptions.step7DeckingType);

        // Step 8 final
        if (step === 8) {
            console.log("✅ Final Materials Count:", selectedItems);
            console.log("🔥 FULL DATA:", { steps: stepInputs, selections: selectedOptions, materials: selectedItems });
            return; // or navigate elsewhere
        }

        setStep(prev => prev + 1);
    };

    // Previous step
    const prev = () => setStep(prev => (prev > 0 ? prev - 1 : 0));

    const selected_sum_count = selectedItems.reduce((sum, item) => sum + item.items, 0);
    const showContinue = step !== 8 || selected_sum_count === 0;

    const settings = { dots: false, infinite: false, speed: 600, slidesToShow: 1, slidesToScroll: 1, arrows: false, swipe: false };

    return (
        <section className="bg-[#F6F6F6] py-16">
            {/* HTML/JSX unchanged below */}
            <div className="container mx-auto px-4 mb-12">
                <h2 className="md:text-6xl text-[33px] leading-none font-semibold text-title text-center font-DM_Sans">
                    {steps[step].title}
                </h2>
                {steps[step].desc && (
                    <p className="md:text-xl text-sm font-normal text-description text-center max-w-[786px] mx-auto mt-4">
                        {steps[step].desc}
                    </p>
                )}
            </div>

            {/* Step 1 */}
            {step === 0 && <div className="divide-x divide-[#E4E4E4] border-y border-[#E4E4E4] flex md:flex-row flex-col items-center">
                <div className="md:w-1/2 w-full bg-[#F0FAF7] md:p-[50px] p-10">
                    <div className="bg-white py-[27px] px-[34px] border border-[#E4E4E4] rounded-[20px]">
                        <h3 className="md:text-[32px] md:leading-none text-[28px] font-semibold text-title font-DM_Sans capitalize mb-4">Details</h3>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                <select
                                    onChange={(e) => setCategory(e.target.value)}
                                    value={category}
                                    name="category" className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                                    <option value="cladding">Cladding</option>
                                    <option value="decking">Decking</option>
                                    <option value="fencing">Fencing</option>
                                </select>
                                <select
                                    onChange={(e) => setCategory(e.target.value)}
                                    value=""
                                    name="decking_collection" id="decking_collection" className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                                    <option value="home_choice">Home Choice</option>
                                    <option value="exclusive">Exclusive</option>
                                    <option value="signature">Signature</option>
                                </select>
                                <select
                                    value=""
                                    name="decking_size" id="decking_size" className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                                    <option value="classic">Classic</option>
                                    <option value="classic_groove">Classic Groove</option>
                                    <option value="capped_dual_color">Capped dual color</option>
                                </select>
                                <select
                                    value=""
                                    name="dbsl" id="dbsl" className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                                    <option data-parent="166" data-id="176" value="3.6">3.6</option>
                                    <option data-parent="166" data-id="180" value="4">4.0</option>
                                </select>
                                <select
                                    value=""
                                    name="dbsw" id="dbsw" className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                                    <option data-parent="176" data-id="177" value="0.138">138</option>
                                    <option data-parent="176" data-id="178" value="0.14">140</option>
                                    <option data-parent="176" data-id="179" value="0.15">150</option>
                                </select>
                                <input
                                    name="length"
                                    type="number"
                                    placeholder="Enter Length In Meters"
                                    className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    onChange={(e) => setLength(Number(e.target.value))}
                                />
                            </div>

                            <div className="flex gap-6">
                                <input
                                    name="width"
                                    type="number"
                                    placeholder="Enter Width In Meters"
                                    className="md:w-1/2 w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    onChange={(e) => setWidth(Number(e.target.value))}
                                />
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
                    {/* Its a slider for images  */}
                    <Slider ref={sliderRef} {...settings} className="!relative !h-full !w-fit !mx-auto">
                        <div className="p-5 relative">
                            <div className="bg-[#595959] w-full h-0.5 absolute top-5 left-0 flex justify-between items-center">
                                <FaChevronLeft size={14} className="ml-[-2px]" />
                                <p className="md:text-xl text-base font-normal text-description uppercase pt-[40px] mt-[-60px]">Width</p>
                                <FaChevronRight size={14} className="mr-[-2px]" />
                            </div>
                            <Image src="/images/b.png" alt="board" className="object-contain" width={478} height={717} />
                            <div className="bg-[#595959] w-full h-0.5 absolute top-1/2 -translate-1/2 left-[95%] flex justify-between items-center -rotate-90">
                                <FaChevronLeft size={14} className="ml-[-2px]" />
                                <p className="md:text-xl text-base font-normal text-description uppercase pt-[40px] mt-[-10px]">length</p>
                                <FaChevronRight size={14} className="mr-[-2px]" />
                            </div>
                        </div>
                    </Slider>
                    {/* Arrows */}
                    <div className="flex items-center justify-center gap-5">
                        <button className="opacity-30"
                            onClick={() => sliderRef.current?.slickPrev()}>
                            <HiArrowLongLeft size={32} />
                        </button>
                        <button
                            onClick={() => sliderRef.current?.slickNext()}>
                            <HiArrowLongRight size={32} />
                        </button>
                    </div>
                </div>
            </div>}
            {step === 1 && steps[step].Styles && (
                <div className="divide-x divide-[#E4E4E4] border-y border-[#E4E4E4] flex md:flex-row flex-col items-center">
                    <div className="md:w-1/2 w-full bg-[#F0FAF7] md:p-[50px] p-10">
                        <div className="grid md:grid-cols-2 grid-cols-1 items-center justify-center gap-6">
                            {steps[step].Styles?.map((item, index) => (
                                <div key={index}>
                                    <div className="w-full relative bg-[#f0f0f0]">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={400}
                                            height={400}
                                            className="w-full h-[220px] object-contain p-4"
                                        />
                                    </div>
                                    <div className="px-4 mt-1">
                                        <p className="text-lg font-bold text-black text-center">{item.name}</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className="md:w-1/2 w-full relative md:px-[50px] px-10">
                        <Image src="/images/clad2.png" alt="board" className="object-contain" width={478} height={717} />
                    </div>
                </div>
            )}
            {step === 2 && steps[step].choose_material && (
                <div className="border-y border-[#E4E4E4] py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                            {steps[step].choose_material.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => selectMaterial('step2Material', item.name)}>
                                    {/* Image + Wishlist */}
                                    <div className="w-full relative bg-white">
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className={`absolute top-2.5 left-4 p-2 rounded-full shadow z-10
                                                ${selectedOptions.step2Material !== item.name ? "border-2 border-secondary text-white bg-white"
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
                                        {item.rating && "★".repeat(item.rating)}
                                    </div>

                                    {/* Title */}
                                    <div className="px-4 mt-1">
                                        <p className="text-lg font-bold text-black">
                                            {item.name}
                                        </p>
                                    </div>

                                    {/* Badges */}
                                    <div className="flex gap-3 px-4 mt-2 flex-wrap">
                                        {item.badges &&
                                            Object.entries(item.badges).map(([key, badge]) => (
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
                            )
                            )}
                        </div>
                    </div>
                </div>
            )}
            {step === 3 && <div className="divide-x divide-[#E4E4E4] border-y border-[#E4E4E4] flex md:flex-row flex-col items-center">
                <div className="md:w-1/2 w-full bg-[#F0FAF7] md:p-[50px] p-10">
                    <div className="bg-white py-[27px] px-[34px] border border-[#E4E4E4] rounded-[20px]">
                        <h3 className="md:text-[32px] md:leading-none text-[28px] font-semibold text-title font-DM_Sans capitalize mb-4">Details</h3>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                <div>
                                    <label htmlFor="a" className="text-base font-normal text-description mb-2 block">A</label>
                                    <input
                                        id="a"
                                        name="a"
                                        type="number"
                                        placeholder="4"
                                        className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="b" className="text-base font-normal text-description mb-2 block">B</label>
                                    <input
                                        id="b"
                                        name="b"
                                        type="number"
                                        placeholder="4"
                                        className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="c" className="text-base font-normal text-description mb-2 block">C</label>
                                    <input
                                        id="c"
                                        name="c"
                                        type="number"
                                        placeholder="4"
                                        className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="d" className="text-base font-normal text-description mb-2 block">D</label>
                                    <input
                                        id="d"
                                        name="d"
                                        type="number"
                                        placeholder="4"
                                        className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 w-full px-6 py-7 border border-[#E4E4E4] rounded-[20px] bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 flex items-center justify-between">
                                <div>
                                    <p className="md:text-[26px] text-xl font-normal text-description">Total Area</p>
                                    <p className="text-base font-normal text-description">For 16.00 ㎡ Area you will need</p>
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
            </div>}
            {step === 4 && <div className="divide-x divide-[#E4E4E4] border-y border-[#E4E4E4] flex md:flex-row flex-col items-center">
                <div className="md:w-1/2 w-full bg-[#F0FAF7] md:p-[50px] p-10">
                    <div className="bg-white py-[27px] px-[34px] border border-[#E4E4E4] rounded-[20px]">
                        <h3 className="md:text-[32px] md:leading-none text-[28px] font-semibold text-title font-DM_Sans capitalize mb-4">Details</h3>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                <div className="md:col-span-2">
                                    <label htmlFor="edgetype" className="text-base font-normal text-description mb-2 block">Type</label>
                                    <select id="edgetype" name="edgetype" className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                                        <option>Type</option>
                                        <option>Bullnose</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="a" className="text-base font-normal text-description mb-2 block">A</label>
                                    <input
                                        id="a"
                                        name="a"
                                        type="number"
                                        placeholder="4"
                                        className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="b" className="text-base font-normal text-description mb-2 block">B</label>
                                    <input
                                        id="b"
                                        name="b"
                                        type="number"
                                        placeholder="4"
                                        className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="c" className="text-base font-normal text-description mb-2 block">C</label>
                                    <input
                                        id="c"
                                        name="c"
                                        type="number"
                                        placeholder="4"
                                        className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="d" className="text-base font-normal text-description mb-2 block">D</label>
                                    <input
                                        id="d"
                                        name="d"
                                        type="number"
                                        placeholder="4"
                                        className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 w-full px-6 py-7 border border-[#E4E4E4] rounded-[20px] bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 flex items-center justify-between">
                                <div>
                                    <p className="md:text-[26px] text-xl font-normal text-description">Total Area</p>
                                    <p className="text-base font-normal text-description">For 1.30 ㎡ Area you will need</p>
                                    <div className="flex items-center gap-3 mt-9">
                                        <Image src="/images/pform.png" alt="board" className="object-contain" width={127} height={101} />
                                        <p className="md:text-[32px] md:leading-none text-[28px] font-medium text-title font-DM_Sans capitalize">2 Boards</p>
                                    </div>
                                </div>

                                <div className="bg-secondary text-white rounded-full px-4 py-2 md:text-[26px] text-xl font-bold">
                                    1.30 m<sup className="text-base leading-0">2</sup>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="md:w-1/2 w-full relative md:px-[50px] px-10">
                    <Image src="/images/edgetype.png" alt="board" className="object-contain" width={478} height={717} />
                </div>
            </div>}
            {step === 5 && steps[step].choose_material && (
                <div className="border-y border-[#E4E4E4] py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                            {steps[step].choose_material.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => selectMaterial('step2Material', item.name)}>
                                    {/* Image + Wishlist */}
                                    <div className="w-full relative bg-white">
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className={`absolute top-2.5 left-4 p-2 rounded-full shadow z-10
                                                ${selectedOptions.step2Material !== item.name ? "border-2 border-secondary text-white bg-white"
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
                                        {item.rating && "★".repeat(item.rating)}
                                    </div>

                                    {/* Title */}
                                    <div className="px-4 mt-1">
                                        <p className="text-lg font-bold text-black">
                                            {item.name}
                                        </p>
                                    </div>

                                    {/* Badges */}
                                    <div className="flex gap-3 px-4 mt-2 flex-wrap">
                                        {item.badges &&
                                            Object.entries(item.badges).map(([key, badge]) => (
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
                            )
                            )}
                        </div>
                    </div>
                </div>
            )}
            {step === 6 && steps[step].choose_posts && (
                <div className="border-y border-[#E4E4E4] py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                            {steps[step].choose_posts.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => selectPosts('step6Posts', item.name)}>
                                        {/* Image + Wishlist */}
                                        <div className="w-full relative bg-white">
                                            <button
                                                onClick={(e) => e.stopPropagation()}
                                                className={`absolute top-2.5 left-4 p-2 rounded-full shadow z-10
                                                ${selectedOptions.step6Posts !== item.name ? "border-2 border-secondary text-white bg-white"
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
                                            {item.rating && "★".repeat(item.rating)}
                                        </div>

                                        {/* Title */}
                                        <div className="px-4 mt-1">
                                            <p className="text-lg font-bold text-black">
                                                {item.name}
                                            </p>
                                        </div>

                                        {/* Badges */}
                                        <div className="flex gap-3 px-4 mt-2 flex-wrap">
                                            {item.badges &&
                                                Object.entries(item.badges).map(([key, badge]) => (
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
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
            {step === 7 && steps[step].decking_Types && (
                <div className="border-y border-[#E4E4E4] py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                            {steps[step].decking_Types.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => selectPosts('step7DeckingType', item.name)}>
                                        {/* Image + Wishlist */}
                                        <div className="w-full relative bg-white">
                                            <button
                                                onClick={(e) => e.stopPropagation()}
                                                className={`absolute top-2.5 left-4 p-2 rounded-full shadow z-10
                                                ${selectedOptions.step7DeckingType !== item.name ? "border-2 border-secondary text-white bg-white"
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
                                            {item.rating && "★".repeat(item.rating)}
                                        </div>

                                        {/* Title */}
                                        <div className="px-4 mt-1">
                                            <p className="text-lg font-bold text-black">
                                                {item.name}
                                            </p>
                                        </div>

                                        {/* Badges */}
                                        <div className="flex gap-3 px-4 mt-2 flex-wrap">
                                            {item.badges &&
                                                Object.entries(item.badges).map(([key, badge]) => (
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
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
            {step === 8 && selectedItems && (
                <div className="border-y border-[#E4E4E4] py-12">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            {selectedItems.map((item, index) => {
                                return (
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
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
            {showContinue ? (
                <div className="max-w-[316px] mx-auto px-4 flex justify-between mt-8">
                    <button type="button" onClick={prev} className="w-10 h-10 rounded-full border flex items-center justify-center">
                        <FaChevronLeft size={14} />
                    </button>
                    <button type="button" onClick={next} className="text-lg font-semibold px-5 py-2 bg-secondary text-white rounded-full hover:bg-primary">
                        Continue
                    </button>
                    <button type="button" onClick={next} className="w-10 h-10 rounded-full border flex items-center justify-center">
                        <FaChevronRight size={14} />
                    </button>
                </div>
            ) : (
                <div className="max-w-[380px] mx-auto px-4 flex justify-between mt-8">
                    <Link href="#" onClick={next} className="text-lg font-semibold px-5 py-2 bg-secondary text-white rounded-full hover:bg-primary">
                        Explore Products
                    </Link>
                    <Link href="/" onClick={next} className="text-lg font-semibold px-5 py-2 bg-[#003D2C] text-white rounded-full hover:bg-primary">
                        Free Sample
                    </Link>
                </div>
            )}
        </section>
    );
}