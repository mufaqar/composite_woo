"use client";

import React, { useState } from "react";
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
  // ✅ State to hold all input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // ✅ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📝 Form Data Submitted:", formData);

    // Optional: clear form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="py-20 bg-[#F0FAF7] relative">
      <Image
        src="/images/contact-box.png"
        alt="boxes-right"
        width={232}
        height={155}
        className="md:w-[232px] md:h-[155px] w-[87.5px] h-[58.33] object-contain object-left absolute left-0 top-0"
      />

      <div className="container mx-auto px-4">
        <h2 className="md:text-6xl text-[33px] leading-none font-semibold text-title text-center font-DM_Sans">
          Fill the form below
        </h2>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-6 max-w-3xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="md:text-lg text-sm font-normal text-description mb-2 block"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="md:text-lg text-sm font-normal text-description mb-2 block"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="md:text-lg text-sm font-normal text-description mb-2 block"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="md:text-lg text-sm font-normal text-description mb-2 block"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#E4E4E4] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="md:text-base text-sm font-bold text-white inline-flex w-full justify-center md:px-7 md:py-3 px-5 py-2 bg-secondary rounded-4xl hover:bg-primary border border-secondary hover:border-primary hover:text-white transition-all duration-300 ease-in-out mx-auto max-w-[266px]"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
