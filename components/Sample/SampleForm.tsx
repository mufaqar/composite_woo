"use client";

import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";

interface SampleFormProps {
    formData: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    accordionData: any[];
    selectedSamples: string[];
    onRemoveSample: () => void;
}

export default function SampleForm({
    formData,
    onChange,
    onSubmit,
    accordionData,
    selectedSamples,
    onRemoveSample,
}: SampleFormProps) {
    const hasSamples = selectedSamples.length > 0;

    // ✅ Collect all products from all accordion sections
    const allProducts = accordionData.flatMap((section) => section.products);

    // ✅ Filter only selected products
    const selectedProducts = allProducts.filter((p) =>
        selectedSamples.includes(p.name)
    );

    return (
        <form onSubmit={onSubmit}
            className="bg-background/50 md:px-11 py-12 p-6 border border-[#E4E4E4]" >
            {hasSamples &&
                <div className="flex gap-5 md:mb-10 mb-6">
                    {selectedProducts.map((p, index) => (
                        <div key={p.id} className="relative w-20 h-20">
                            <span className="absolute -top-2 -right-2 bg-[#FE1B1B] rounded-full w-6 h-6 flex justify-center items-center text-white text-sm font-normal">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <Image
                                src={p.image}
                                alt={p.name}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={onRemoveSample}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm"
                    >
                        <RiDeleteBin6Line />
                    </button>
                </div>
            }

            {/* 🧾 Form Fields */}
            <div>
                <h3 className="md:text-[28px] md:leading-none text-lg font-semibold text-title font-DM_Sans mb-5">
                    Online Free Sample
                </h3>
                <p className="md:text-xl text-sm font-normal text-description font-Satoshi">
                    Where & to whom should we send your sample?
                </p>
            </div>

            <div className="grid grid-cols-1 gap-3 mt-8">
                {[
                    { name: "name", placeholder: "Name", type: "text" },
                    { name: "email", placeholder: "Email", type: "email" },
                    { name: "phone", placeholder: "Phone no.", type: "tel" },
                    { name: "address", placeholder: "Street Address", type: "text" },
                    { name: "city", placeholder: "Town / City", type: "text" },
                    { name: "country", placeholder: "Country", type: "text" },
                    { name: "postcode", placeholder: "Postal Code", type: "text" },
                    { name: "startdate", placeholder: "Project Start Date", type: "date" },
                ].map(({ name, placeholder, type }) => (
                    <input
                        key={name}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        onChange={onChange}
                        className="text-base font-normal text-description font-Satoshi placeholder:text-description border border-[#E4E4E4] bg-white rounded-full px-6 py-3.5 w-full outline-none focus:border-secondary"
                        required
                    />
                ))}
            </div>

            {/* 🧩 Checkboxes Section */}
            <div className=" pt-6 space-y-4">
                <h3 className="md:text-xl text-xs font-bold text-title font-DM_Sans capitalize">
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

                <label className="flex items-start gap-2 text-base font-normal text-description font-Satoshi my-4">
                    <input
                        type="checkbox"
                        name="terms"
                        checked={formData.terms}
                        onChange={onChange}
                        required
                    />
                    Add additional samples of composite decking at 3.6m length that are
                    similar or matching your choice for FREE
                </label>

                <h3 className="md:text-xl text-xs font-bold text-title font-DM_Sans capitalize">
                    Ts&Cs
                </h3>
                <label className="flex items-start gap-2 text-base font-normal text-description font-Satoshi">
                    <input
                        type="checkbox"
                        name="agreement"
                        checked={formData.agreement}
                        onChange={onChange}
                    />
                    I Allow Composite Warehouse to collect and use my information to
                    communicate with me about my order and relevant marketing messages in
                    accordance with their terms & conditions.
                </label>
            </div>

            <button
                type="submit"
                className="mt-6 w-fit bg-secondary text-white rounded-full px-6 py-3 font-bold hover:bg-primary transition-all"
            >
                Order Sample
            </button>
        </form>
    );
}
