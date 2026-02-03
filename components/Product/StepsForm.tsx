"use client"
import Image from "next/image";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";


const steps = [
    { id: 1, title: "Design & Calculate" },
    { id: 2, title: "Choose Boards" },
    { id: 3, title: "Substructure" },
    { id: 4, title: "Fixings" },
    { id: 5, title: "Summary" },
];

export default function StepsForm() {
    const sliderRef = useRef<any>(null);

    const [step, setStep] = useState(0);
    const [form, setForm] = useState({
        length: 0,
        width: 0,
        boardType: "Composite",
        substructure: "Aluminium",
        fixings: "Hidden",
    });

    /* ---------------- FUNCTIONS ---------------- */

    const setLength = (value: number) => {
        setForm((prev) => ({ ...prev, length: value }));
    };

    const setWidth = (value: number) => {
        setForm((prev) => ({ ...prev, width: value }));
    };

    const next = () => {
        if (step < steps.length - 1) {
            setStep((prev) => prev + 1);
            sliderRef.current?.slickNext();
        }
    };

    const prev = () => {
        if (step > 0) {
            setStep((prev) => prev - 1);
            sliderRef.current?.slickPrev();
        }
    };

    /* ---------------- CALCULATIONS ---------------- */

    const area = form.length * form.width;

    // Example logic: 1 board covers 0.36 m²
    const boardCoverage = 0.36;
    const totalBoards =
        area > 0 ? Math.ceil(area / boardCoverage) : 0;

    /* ---------------- SLIDER ---------------- */

    const settings = {
        dots: false,
        infinite: false,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        swipe: false,
    };

    return (
        <section className="bg-[#F6F6F6] py-16">
            <div className="container mx-auto px-4 mb-12">
                <h2 className="md:text-6xl text-[33px] leading-none font-semibold text-title text-center font-DM_Sans">
                    Design and Calculate
                </h2>
            </div>
            {/* Step 1 */}
            <div className="divide-x divide-[#E4E4E4] border-y border-[#E4E4E4] flex md:flex-row flex-col items-center">
                <div className="md:w-1/2 w-full bg-[#F0FAF7] md:p-[50px] p-10">
                    <div className="bg-white py-[27px] px-[34px] border border-[#E4E4E4] rounded-[20px]">
                        <h3 className="md:text-[32px] md:leading-none text-[28px] font-semibold text-title font-DM_Sans capitalize mb-4">Details</h3>
                        <form className="space-y-6">
                            <div className="flex gap-6">
                                <select className="md:w-1/2 w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                                    <option>Product Category</option>
                                    <option>Cladding</option>
                                    <option>Decking</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Smooth"
                                    className="md:w-1/2 w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Installation Type"
                                className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                            />

                            <select className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                                <option>Cladding Board Size (Length)</option>
                            </select>

                            <input
                                type="number"
                                placeholder="Cladding board Size (Size)"
                                className="w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                onChange={(e) => setWidth(Number(e.target.value))}
                            />

                            <div className="flex gap-6">
                                <input
                                    type="number"
                                    placeholder="Enter Length In Meters"
                                    className="md:w-1/2 w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    onChange={(e) => setLength(Number(e.target.value))}
                                />
                                <input
                                    type="number"
                                    placeholder="Enter Width In Meters"
                                    className="md:w-1/2 w-full text-base font-normal text-description placeholder:text-description px-4 py-4 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    onChange={(e) => setWidth(Number(e.target.value))}
                                />
                            </div>
                            <div className="mt-6 w-full px-6 py-7 border border-[#E4E4E4] rounded-[20px] bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 flex items-center justify-between">
                                <div>
                                    <p className="md:text-[26px] text-xl font-normal text-description">Total Cladding Area</p>
                                    <div className="flex items-center gap-3 mt-9">
                                        <Image src="/images/pform.png" alt="board" className="object-contain" width={127} height={101} />
                                        <p className="md:text-[32px] md:leading-none text-[28px] font-medium text-title font-DM_Sans capitalize">153 Boards</p>
                                    </div>
                                </div>

                                <div className="bg-secondary text-white rounded-full px-4 py-2 md:text-[26px] text-xl font-bold">
                                    {area || 0} M
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="md:w-1/2 w-full relative md:px-[50px] px-10">
                    {/* Its a slider for images  */}
                    <Slider ref={sliderRef} {...settings} className="!relative !h-full !w-fit !mx-auto">
                        <div className="p-5 relative">
                            <div className="bg-[#595959] w-full h-0.5 absolute top-5 left-0 flex justify-between items-center">
                                <FaChevronLeft size={14} className="ml-[-2px]" />
                                <p className="md:text-xl text-base font-normal text-description uppercase pt-[40px] mt-[-60px]">Width</p>
                                <FaChevronRight size={14} className="mr-[-2px]" />
                            </div>
                            <Image src="/images/b.png" alt="board" className="object-contain" width={478} height={717} />
                            <div className="bg-[#595959] w-full h-0.5 absolute top-1/2 -translate-1/2 left-[95%] flex justify-between items-center -rotate-90">
                                <FaChevronLeft size={14} className="ml-[-2px]" />
                                <p className="md:text-xl text-base font-normal text-description uppercase pt-[40px] mt-[-10px]">length</p>
                                <FaChevronRight size={14} className="mr-[-2px]" />
                            </div>
                        </div>
                    </Slider>
                    {/* Arrows */}
                    <div className="flex items-center justify-center gap-5">
                        <button className="opacity-30"
                            onClick={() => sliderRef.current?.slickPrev()}>
                            <HiArrowLongLeft size={32} />
                        </button>
                        <button
                            onClick={() => sliderRef.current?.slickNext()}>
                            <HiArrowLongRight size={32} />
                        </button>
                    </div>
                </div>
            </div>
            {/* Step 2 */}
            {/* Navigation */}
            <div className="max-w-[316px] mx-auto px-4 flex justify-between mt-8">
                <button
                    onClick={prev}
                    disabled={step === 0}
                    className="w-10 h-10 rounded-full border flex items-center justify-center opacity-30"
                >
                    <FaChevronLeft size={14} />
                </button>
                <button className="text-lg font-semibold px-5 py-2 bg-secondary text-white rounded-full hover:bg-primary">
                    Continue
                </button>
                <button
                    onClick={next}
                    disabled={step === steps.length - 1}
                    className="w-10 h-10 rounded-full border flex items-center justify-center"
                >
                    <FaChevronRight size={14} />
                </button>
            </div>
        </section>
    );
}
