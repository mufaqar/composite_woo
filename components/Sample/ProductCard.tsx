"use client";

import Image from "next/image";

interface ProductCardProps {
    id: number;
    name: string;
    image: string;
    category: string;
    isSelected: boolean;
    onSelect: () => void;
}

export default function ProductCard({
    id,
    name,
    image,
    category,
    isSelected,
    onSelect,
}: ProductCardProps) {
    return (
        <div onClick={onSelect} className="cursor-pointer">
            <div className={`border-3 overflow-hidden transition-all ${isSelected ? "border-secondary" : "border-transparent"}`}
            >
                <Image src={image} alt={name} width={227} height={231} className="w-full" />
            </div>
            <h4 className="md:text-base text-xs font-bold text-title font-DM_Sans capitalize text-center mt-5">
                {name} – {category}
            </h4>
        </div>
    );
}
