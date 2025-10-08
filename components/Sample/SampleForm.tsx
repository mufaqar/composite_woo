"use client";

import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";

interface FormData {
    name: string;
    email: string;
    address: string;
    phone: string;
    postCode: string;
    projectType: string;
    filters: boolean;
    terms: boolean;
}

interface SampleFormProps {
    formData: FormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export default function SampleForm({ formData, onChange, onSubmit }: SampleFormProps) {
    return (
        <form onSubmit={onSubmit} className="bg-background/50 border border-[#E4E4E4] md:py-12 md:px-7 p-6 space-y-4">
            <div>
                <div className="flex gap-5">
                    <div className={`relative transition-all ${formData ? "" : ""}`}>
                        <span className="absolute -top-2 -right-2 bg-[#FE1B1B] rounded-full w-6 h-6 flex justify-center items-center text-white text-sm font-normal font-Satoshi">01</span>
                        <Image src="/images/dark.png" alt={`name`} width={74} height={74} className="w-full" />
                    </div>
                    <div className={`relative transition-all ${formData ? "" : ""}`}>
                        <span className="absolute -top-2 -right-2 bg-[#FE1B1B] rounded-full w-6 h-6 flex justify-center items-center text-white text-sm font-normal font-Satoshi">01</span>
                        <Image src="/images/dark.png" alt={`name`} width={74} height={74} className="w-full" />
                    </div>
                    <div className={`relative transition-all ${formData ? "" : ""}`}>
                        <span className="absolute -top-2 -right-2 bg-[#FE1B1B] rounded-full w-6 h-6 flex justify-center items-center text-white text-sm font-normal font-Satoshi">01</span>
                        <Image src="/images/dark.png" alt={`name`} width={74} height={74} className="w-full" />
                    </div>
                    <div className={`relative transition-all ${formData ? "" : ""}`}>
                        <span className="absolute -top-2 -right-2 bg-[#FE1B1B] rounded-full w-6 h-6 flex justify-center items-center text-white text-sm font-normal font-Satoshi">01</span>
                        <Image src="/images/dark.png" alt={`name`} width={74} height={74} className="w-full" />
                    </div>
                    <button>
                        <RiDeleteBin6Line className="text-[#FE1B1B]" />
                    </button>
                </div>
            </div>
            <div>
                <h3 className="md:text-[28px] md:leading-none text-lg font-semibold text-title font-DM_Sans mb-5">Online Free Sample</h3>
                <p className="md:text-xl text-sm font-normal text-description font-Satoshi">
                    Where & to whom should we send your sample?
                </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    onChange={onChange}
                    className="text-base font-normal text-description font-Satoshi placeholder:text-description border border-[#E4E4E4] bg-white rounded-full px-6 py-3.5 w-full outline-none focus:border-secondary"
                    required
                />
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={onChange}
                    className="text-base font-normal text-description font-Satoshi placeholder:text-description border border-[#E4E4E4] bg-white rounded-full px-6 py-3.5 w-full outline-none focus:border-secondary"
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Phone no."
                    onChange={onChange}
                    className="text-base font-normal text-description font-Satoshi placeholder:text-description border border-[#E4E4E4] bg-white rounded-full px-6 py-3.5 w-full outline-none focus:border-secondary"
                    required
                />
                <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Street Address"
                    onChange={onChange}
                    className="text-base font-normal text-description font-Satoshi placeholder:text-description border border-[#E4E4E4] bg-white rounded-full px-6 py-3.5 w-full outline-none focus:border-secondary"
                    required
                />
                <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Town / City"
                    onChange={onChange}
                    className="text-base font-normal text-description font-Satoshi placeholder:text-description border border-[#E4E4E4] bg-white rounded-full px-6 py-3.5 w-full outline-none focus:border-secondary"
                    required
                />
                <input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Country"
                    onChange={onChange}
                    className="text-base font-normal text-description font-Satoshi placeholder:text-description border border-[#E4E4E4] bg-white rounded-full px-6 py-3.5 w-full outline-none focus:border-secondary"
                    required
                />
                <input
                    type="text"
                    name="postcode"
                    id="postcode"
                    placeholder="Postal Code"
                    onChange={onChange}
                    className="text-base font-normal text-description font-Satoshi placeholder:text-description border border-[#E4E4E4] bg-white rounded-full px-6 py-3.5 w-full outline-none focus:border-secondary"
                    required
                />
                <input
                    type="date"
                    name="startdate"
                    id="startdate"
                    placeholder="Project Start Date"
                    onChange={onChange}
                    className="text-base font-normal text-description font-Satoshi placeholder:text-description border border-[#E4E4E4] bg-white rounded-full px-6 py-3.5 w-full outline-none focus:border-secondary"
                    required
                />
            </div>

            <div className="border-t border-[#C6C6C6] pt-3 space-y-2">
                <h3 className="md:text-base text-xs font-bold text-title font-DM_Sans capitalize mb-8">
                    Recommended Fitters Quote
                </h3>
                <label className="flex items-start gap-2 text-base font-normal text-description font-Satoshi">
                    <input
                        type="checkbox"
                        name="filters"
                        checked={formData.filters}
                        onChange={onChange}
                    />
                    Yes I Would Like To Get Quotes From Our Recommended Fitters Near You?
                </label>

                <label className="flex items-start gap-2 text-base font-normal text-description font-Satoshi my-10">
                    <input
                        type="checkbox"
                        name="terms"
                        checked={formData.terms}
                        onChange={onChange}
                        required
                    />
                    Add additional samples of composite decking at 3.6m length that are similar or matching your choice for FREE
                </label>

                 <h3 className="md:text-base text-xs font-bold text-title font-DM_Sans capitalize mb-8">
                    Ts&Cs
                </h3>
                <label className="flex items-start gap-2 text-base font-normal text-description font-Satoshi">
                    <input
                        type="checkbox"
                        name="filters"
                        checked={formData.filters}
                        onChange={onChange}
                    />
                    I Allow Composite warehouse to collect and use my information to communicate with me about my order and relevant marketing message in accordance with their terms & conditions
                </label>
            </div>

            <button
                type="submit"
                className="w-fit bg-secondary text-white rounded-full px-6 py-3 font-bold hover:bg-primary transition-all"
            >
                Order Sample
            </button>
        </form>
    );
}
