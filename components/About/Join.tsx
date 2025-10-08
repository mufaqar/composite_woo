"use client";
import Link from "next/link";
import React from "react";

function Join() {
  return (
    <section className="w-full flex justify-center py-20 px-4">
      <div className="max-w-2xl text-center">
        {/* Top Small Text */}
        <p className="text-md font-semibold text-[#00DFA2] uppercase tracking-wide font-DM_Sans">
          Do you want to keep up-to-date?
        </p>

        {/* Heading */}
        <h2 className="text-6xl font-bold text-title mt-2 font-DM_Sans">
          Join Our Newsletter
        </h2>

        {/* Description */}
        <p className="mt-4 text-description font-DM_Sans">
          Join our happy customers and readers all over UK and Europe and get
          updated with the latest news in the composite decking industry.
        </p>

        {/* Input + Button */}
        <form className="mt-6 flex items-center justify-center">
          <div className="flex w-full max-w-md rounded-full border border-gray-300 overflow-hidden">
            <input
              type="email"
              placeholder="Enter your mail"
              className="flex-1 px-4 py-4 text-gray-700 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white font-medium px-6 py-3  hover:opacity-90 transition rounded-full "
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Join;
