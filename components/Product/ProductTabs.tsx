"use client";

import { WooProduct } from "@/lib/woocommerce-types";
import Link from "next/link";
import React, { useState } from "react";

const tabs = [
  { id: "description", label: "Description" },
  { id: "faqs", label: "FAQs" },
  { id: "reviews", label: "Reviews" },
  { id: "shipping", label: "Shipping" },
  { id: "features", label: "Features" },
];

interface SingleBannerProps {
  data: WooProduct;
}

const ProductTabs = ({ data }: SingleBannerProps) => {
  const [activeTab, setActiveTab] = useState("description");

  //console.log(data);

  return (
    <section className="md:py-20 py-16">
      <div className="container mx-auto px-4">
        {/* --- Tabs Header --- */}
        <div className="flex border-b border-[#E4E4E4]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`md:text-[22px] md:leading-none text-sm font-bold md:px-6 px-1.5 py-3 border-b transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-title border-secondary opacity-100"
                  : "text-title opacity-50 hover:opacity-100 border-transparent hover:border-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* --- Tabs Content --- */}
        <div className="mt-6">
          {activeTab === "description" && (
            <div>
              <h3 className="text-lg font-bold text-primary font-Satoshi mb-4">
                Description
              </h3>
              <div
                className="post_content"
                dangerouslySetInnerHTML={{ __html: data.description || "" }}
              />
            </div>
          )}

          {activeTab === "faqs" && (
            <div>
              <h3 className="text-lg font-bold text-primary font-Satoshi mb-4">
                FAQs
              </h3>
              <p className="text-description">
                Here we can add frequently asked questions...
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h3 className="text-lg font-bold text-primary font-Satoshi mb-4">
                Reviews
              </h3>
              <p className="text-description">
                Customer reviews will appear here.
              </p>
            </div>
          )}

          {activeTab === "shipping" && (
            <div>
              <h3 className="text-lg font-bold text-primary font-Satoshi mb-4">
                Shipping
              </h3>
              <p className="text-description">
                Shipping information and delivery estimates go here.
              </p>
            </div>
          )}

          {activeTab === "features" && (
            <div>
              <h3 className="text-lg font-bold text-primary font-Satoshi mb-4">
                Features
              </h3>
              <ul className="list-disc pl-5 text-description space-y-1">
                <li>Durable and weather-resistant</li>
                <li>Easy installation</li>
                <li>Low maintenance</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductTabs;
