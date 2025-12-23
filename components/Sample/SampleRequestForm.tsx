"use client";

import { useState, useMemo, useEffect } from "react";
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

  // ⭐ GENERATE UNIQUE IDS ONLY ONCE
  const sectionsWithUniqueIds = useMemo(() => {
    return RequestInfo.map((section: any, idx: number) => ({
      ...section,
      uid: section.id || `accordion-${idx}`,
      products: section.products.map((p: any) => ({
        ...p,
        uniqueId: crypto.randomUUID(), // ⭐ stable per product
      })),
    }));
  }, [RequestInfo]);

  const handleAccordionToggle = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (sectionsWithUniqueIds.length > 0) {
      setExpanded([sectionsWithUniqueIds[0].uid]);
    }
  }, [sectionsWithUniqueIds]);

  const handleSampleSelect = (productUniqueId: string) => {
    setSelectedSamples((prev) => {
      if (prev.includes(productUniqueId)) {
        return prev.filter((id) => id !== productUniqueId);
      }
      if (prev.length < 4) {
        return [...prev, productUniqueId];
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
      const selectedSampleNames = selectedSamples.map((uid) => {
        const found = sectionsWithUniqueIds
          .flatMap((s: any) => s.products)
          .find((p: any) => p.uniqueId === uid);

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
          {sectionsWithUniqueIds.map((section: any) => (
            <AccordionSection
              key={section.uid}
              id={section.uid}
              title={section.title}
              description={section.description}
              products={section.products}
              expanded={expanded.includes(section.uid)}
              onToggle={() => handleAccordionToggle(section.uid)}
              selectedSamples={selectedSamples}
              onSampleSelect={handleSampleSelect}
            />
          ))}
        </div>

        {/* Right side - Form */}
        <div className="md:w-2/5">
          <SampleForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            accordionData={sectionsWithUniqueIds}
            selectedSamples={selectedSamples}
            onRemoveSample={handleRemoveSample}
          />
        </div>
      </div>
    </section>
  );
}
