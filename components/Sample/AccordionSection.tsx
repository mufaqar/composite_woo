"use client";

import { FaChevronDown } from "react-icons/fa";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
}

interface AccordionSectionProps {
  title: string;
  description: string;
  products: Product[];
  expanded: boolean;
  onToggle: () => void;
  selectedSamples: string[];
  onSampleSelect: (id: string) => void;
}

export default function AccordionSection({
  title,
  description,
  products,
  expanded,
  onToggle,
  selectedSamples,
  onSampleSelect,
}: AccordionSectionProps) {
  return (
    <div className="md:mb-10 mb-6 md:pb-10 pb-6 border-b border-[#C6C6C6]">
      <h2 className="md:text-3xl text-2xl leading-none font-semibold text-title font-DM_Sans mb-5 flex justify-between items-start"
        onClick={onToggle}
      >
        {title}
        <span className={`min-w-11 min-h-11 text-sm flex items-center justify-center rounded-full bg-primary text-title transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        ><FaChevronDown />
        </span>
      </h2>
      <p className="md:text-xl text-sm font-normal text-description mb-2">{description}</p>

      {expanded && (
        <div className="grid sm:grid-cols-3 gap-4 mt-12">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              category={product.category}
              isSelected={selectedSamples.includes(product.name)}
              onSelect={() => onSampleSelect(product.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
