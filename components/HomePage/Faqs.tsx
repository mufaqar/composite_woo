'use client'

import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'


interface FAQs {
  question: string;
  answer: string;
}

const faqs: FAQs[] = [
  {
    question: "Add Commonly Asked Questions Here",
    answer:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text.",
  },
  {
    question: "Add Commonly Asked Questions Here",
    answer:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text.",
  },
  {
    question: "Add Commonly Asked Questions Here",
    answer:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text.",
  },
];


const FaqsSection = () => {
    const [open, setOpen] = useState(false)

    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index) // close if same, else open new
    }


    return (
        <section className='md:py-20 py-16'>
          
            <div className={`${open ? "block" : "hidden"} container mx-auto md:px-0 px-4 mt-10 space-y-[20px]`}>
                {faqs.map((faq, idx) => (
                    <div key={idx}>
                        <div className="py-4 max-w-[1024px] mx-auto">
                            {/* Question row */}
                            <div
                                className="flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out"
                                onClick={() => toggleFaq(idx)}
                            >
                                <h3 className="text-xl font-poppins font-semibold mb-4 text-black">{faq.question}</h3>
                                <FaChevronDown
                                    className={`text-primary transform transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""
                                        }`}
                                />
                            </div>
                            {/* Answer */}
                            {openIndex === idx && (
                                <p className="mt-2 font-poppins text-black transition-all duration-300 ease-in-out">
                                    {faq.answer}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FaqsSection