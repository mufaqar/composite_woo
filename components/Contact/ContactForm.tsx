"use client";
import React from "react";

import Image from "next/image";
import { FaEnvelope, FaMapPin } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";

const contacts = [
  {
    id: 1,
    icon: <FaMapPin className="w-6 h-6" />,
    title: "Composite Warehouse",
    description: (
      <>
        Unit 11 Grosvenor Garage,
        <br />
        Woolston, Warrington WA1 4SF
      </>
    ),
  },
  {
    id: 2,
    icon: <FaPhone className="w-6 h-6" />,
    title: "Phone",
    description: "01925 407884",
  },
  {
    id: 3,
    icon: <FaEnvelope className="w-6 h-6" />,
    title: "Email",
    description: "support@compositewarehouse.co.uk",
  },
];

function ContactForm() {
  return (
    <section className="w-full flex justify-center py-12 px-4 bg-[#F0FAF7] relative">
      <Image
        src="/images/contact-box.png"
        alt="boxes-right"
        width={232}
        height={155}
        className="md:w-[232px] md:h-[155px] w-[87.5px] h-[58.33] object-contain object-left  absolute left-0 top-0"
      />
      <div className="container mx-auto px-4  text-center">
        <h3 className="mt-4 font-semibold md:text-6xl  text-title font-DM_Sans">Fill the form below</h3>

        {/* Contact Form */}
        <form className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">

          {/* Name */}
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {/* Subject */}
          <input
            type="text"
            placeholder="Subject"
            className="w-full px-4 py-3 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 md:col-span-2"
          />

          {/* Message */}
          <textarea
           
            placeholder="Message"
            className="w-full px-4 py-3 border border-gray-300 rounded-md  bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 md:col-span-2"
          ></textarea>

          {/* Button */}
          <button
            type="submit"
            className="bg-[#F06F38] text-white font-medium px-6 py-3 rounded-full hover:opacity-90 transition md:col-span-2 tex-center mx-auto"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;



