"use client";

import { useState } from "react";
import AccordionSection from "./AccordionSection";
import SampleForm from "./SampleForm";

export default function SampleRequestForm({ RequestInfo }: any) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selectedSamples, setSelectedSamples] = useState<string[]>([]);
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
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const handleSampleSelect = (sampleName: string) => {
    setSelectedSamples((prev) => {
      if (prev.includes(sampleName)) {
        return prev.filter((name) => name !== sampleName);
      }
      if (prev.length < 4) {
        return [...prev, sampleName];
      }
      alert("You can select up to 4 samples total.");
      return prev;
    });
  };

  const handleRemoveSample = () => setSelectedSamples([]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const selectedSampleNames = selectedSamples.map((sampleName) => {
        const found = RequestInfo.flatMap((s: any) => s.products).find(
          (p: any) => p.name === sampleName
        );
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

      const result = await response.json();
      if (result.success) {
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

        {/* Left side - Accordions */}
        <div className="md:w-3/5">
          {RequestInfo.map((section: any, idx: number) => (
            <AccordionSection
              key={idx}
              title={section.title}
              description={section.description}
              products={section.products}   // <-- FIXED
              expanded={expanded.includes(section.title)}
              onToggle={() => handleAccordionToggle(section.title)}
              selectedSamples={selectedSamples}
              onSampleSelect={(title) => handleSampleSelect(title)}
            />
          ))}
        </div>

        {/* Right side - Form */}
        <div className="md:w-2/5">
          <SampleForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            accordionData={RequestInfo}  // now contains products
            selectedSamples={selectedSamples}
            onRemoveSample={handleRemoveSample}
          />
        </div>

      </div>
    </section>
  );
}
