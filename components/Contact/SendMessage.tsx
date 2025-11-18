"use client";
import { FaMailBulk, FaMapPin, FaPhone } from "react-icons/fa";
import HeadingSection from "../HeadingSection";
import React from "react";


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
    icon: <FaMailBulk className="w-6 h-6" />,
    title: "Email",
    description: "support@compositewarehouse.co.uk",
  },
];

function Contact() {
  return (
    <section className="w-full flex justify-center py-20 px-4">
      <div className="container mx-auto px-4  text-center">
        {/* Heading */}
        <HeadingSection title="Send us a Message" desc="Contact Our Expert Team Regarding Your Project or Any  Sales Related Questions!" />

        {/* Grid from Array */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {contacts.map((item) => (
            <div
              key={item.id}
              className="border border-[#E4E4E4] rounded-lg p-6 flex flex-col items-start text-left"
            >
              <div className="bg-[#00DFA21C] text-[#00DFA2] p-3 rounded-full">
                {item.icon}
              </div>
              <h3 className="mt-4 font-semibold  text-[28px] text-title font-DM_Sans">{item.title}</h3>
              <p className="mt-2 text-xl text-description font-Satoshi break-all">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;






