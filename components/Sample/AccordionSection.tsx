"use client";

import { FaChevronDown } from "react-icons/fa";
import ProductCard from "./ProductCard";

interface Product {
  uniqueId: string;   // ⭐ NEW UNIQUE ID
  name: string;
  image?: string;
  category?: string;
}

interface AccordionSectionProps {
  title: string;
  id: string;
  description: string;
  products: Product[];
  expanded: boolean;
  onToggle: () => void;
  selectedSamples: string[];
  onSampleSelect: (uid: string) => void;
   disabled?: boolean;
}

export default function AccordionSection({
  title,
  id,
  description,
  products,
  expanded,
  onToggle,
  selectedSamples,
  onSampleSelect,
}: AccordionSectionProps) {
  const maxSelected = selectedSamples.length >= 4;

  return (
    <div className="md:mb-10 mb-6 md:pb-10 pb-6 border-b border-[#C6C6C6]">
      <h2
        className="md:text-3xl text-2xl font-semibold flex justify-between cursor-pointer"
        onClick={onToggle}
      >
        {title}
        <span
          className={`min-w-11 min-h-11 flex items-center justify-center rounded-full bg-primary transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        >
          <FaChevronDown />
        </span>
      </h2>

      <p className="md:text-xl text-sm mb-2">{description}</p>

      {expanded && (
        <div className="grid sm:grid-cols-3 gap-4 mt-12">
          {products.map((product) => (
            <ProductCard
              key={product.uniqueId}
              id={product.uniqueId}
              name={product.name}
              category=""
              image={product.image || "/images/sample.png"}
              isSelected={selectedSamples.includes(product.uniqueId)}
              disabled={maxSelected && !selectedSamples.includes(product.uniqueId)}
              onSelect={() => onSampleSelect(product.uniqueId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
