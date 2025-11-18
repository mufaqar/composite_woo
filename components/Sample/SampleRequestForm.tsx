"use client";

import { useState } from "react";
import AccordionSection from "./AccordionSection";
import SampleForm from "./SampleForm";

const accordionData = [
  {
    title: "Select Composite Decking Boards Samples",
    description: "In total you can select up to 4 different samples",
    products: [
      { id: 1, name: "Dark Grey Wood Grain Composite Decking Board", image: "/images/dark.png", category: "Essential Collection" },
      { id: 2, name: "Black Grooved Composite Board", image: "/images/grooved.png", category: "Essential Collection" },
      { id: 3, name: "Essential Grey Grooved Composite Board", image: "/images/dark.png", category: "Essential Collection" },
      { id: 4, name: "Dark Grey Wood Grain Decking Board", image: "/images/grooved.png", category: "Essential Collection" },
    ],
  },
  {
    title: "Select Composite Fencing Samples",
    description: "Select up to 4 fencing samples",
    products: [
      { id: 5, name: "Classic Fencing Panel", image: "/images/dark.png", category: "Essential Collection" },
      { id: 6, name: "Modern Composite Fence", image: "/images/grooved.png", category: "Premium Collection" },
    ],
  },
  {
    title: "Select Composite Cladding Samples",
    description: "Select up to 4 cladding samples",
    products: [
      { id: 7, name: "Essential Cladding Panel", image: "/images/dark.png", category: "Essential Collection" },
      { id: 8, name: "Timeless Cladding Panel", image: "/images/grooved.png", category: "Timeless Collection" },
    ],
  },
  {
    title: "Select Artificial Grass Samples",
    description: "Select up to 4 grass samples",
    products: [
      { id: 9, name: "Luxury Artificial Grass", image: "/images/dark.png", category: "Luxury Range" },
      { id: 10, name: "Playground Grass", image: "/images/grooved.png", category: "Kids Collection" },
    ],
  },
];

export default function SampleRequestForm({RequestInfo}:any) {

  console.log("RequestInfo",RequestInfo);





  const [expanded, setExpanded] = useState<string[]>([]);
  const [selectedSamples, setSelectedSamples] = useState<string[]>([]); // ✅ now stores NAMES
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    postCode: "",
    projectType: "",
    filters: false,
    terms: false,
  });

  const handleAccordionToggle = (title: string) => {
    setExpanded((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  // ✅ Global selection limit (4 total) - using names
  const handleSampleSelect = (sampleName: string) => {
    setSelectedSamples((prev) => {
      if (prev.includes(sampleName)) {
        return prev.filter((name) => name !== sampleName);
      } else if (prev.length < 4) {
        return [...prev, sampleName];
      } else {
        alert("You can select up to 4 samples total.");
        return prev;
      }
    });
  };

  // ✅ Remove all selected samples
  const handleRemoveSample = () => {
    setSelectedSamples([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const selectedSampleNames = selectedSamples.map((id) => {
      const found = accordionData
        .flatMap((s) => s.products)
        .find((p) => p.name === id);
      return found ? found.name : "";
    });

    const response = await fetch("/api/send-sample", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formData,
        selectedSamples: selectedSampleNames.map((name) => ({ name })),
      }),
    });

    const data = await response.json();
    if (data.success) {
      alert("✅ Your sample request has been sent!");
      setSelectedSamples([]);
    } else {
      alert("❌ Failed to send email. Please try again.");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
};

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 flex md:flex-row flex-col gap-10">
        {/* Left - Accordions */}
        <div className="md:w-3/5">
          {RequestInfo.map((section:any,idx:number) => (
            <AccordionSection
              key={idx}
              title={section.title}
              description={section.description}
              products={section.samples}
              expanded={expanded.includes(section.title)}
              onToggle={() => handleAccordionToggle(section.title)}
              selectedSamples={selectedSamples}
              onSampleSelect={(title) => handleSampleSelect(title)}
            />
          ))}
        </div>

        {/* Right - Form */}
        <div className="md:w-2/5">
          <SampleForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            accordionData={accordionData}
            selectedSamples={selectedSamples}
            onRemoveSample={handleRemoveSample}
          />
        </div>
      </div>
    </section>
  );
}
