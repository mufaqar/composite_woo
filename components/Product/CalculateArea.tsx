"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

const CalculateArea = () => {
    const [length, setLength] = useState(1);
    const [boards, setBoards] = useState(2);

    // Example price per board (adjust as needed)
    const pricePerBoard = 24.99;
    const totalPrice = (boards * pricePerBoard).toFixed(2);

    return (
        <div className="container mx-auto px-4 flex md:flex-row flex-col gap-6">
            <div className="md:w-1/2 w-full"></div>
            <div className="md:w-1/2 w-full md:-mt-[129px]">
                <p className="md:text-xl text-sm font-normal text-description font-Satoshi">
                    Our dark grey wood grain composite decking board is created to achieve the perfect mix in quailty and affordability, each composite board is reversible with a wood grain pattern on one side and a thin traditional groove on the other.
                </p>
                <div className="bg-[#F6F6F654] border border-[#E4E4E4] md:px-10 py-11 px-6 mt-8">
                    {/* Title */}
                    <h3 className="text-[28px] leading-none font-semibold text-title font-DM_Sans mb-5">Calculate Your Area</h3>

                    <div className="grid md:grid-cols-2 grid-cols-1 md:gap-14 gap-5">
                        {/* Size Row */}
                        <div className="flex justify-between items-center mb-3">
                            <p className="md:text-lg text-lg font-normal text-description font-Satoshi">Size</p>
                            <div className="flex items-center border border-[#E4E4E4] bg-white rounded-full px-4 py-2">
                                <p className="md:text-lg text-sm font-normal text-description text-center font-Satoshi">4000mm (4m)</p>
                            </div>
                        </div>

                        {/* Length Row */}
                        <div className="flex justify-between items-center mb-3">
                            <p className="md:text-lg text-sm font-normal text-description text-center font-Satoshi">Length (m)</p>
                            <div className="flex items-center border border-[#E4E4E4] bg-white rounded-full px-4 py-2">
                                <span className="px-6 w-6 md:text-lg text-lg font-normal text-description text-center font-Satoshi">
                                    {length}
                                </span>
                                <span className="flex flex-col px-2 gap-0">
                                    <button
                                        onClick={() => setLength(length + 1)}
                                        className="text-secondary text-xs"
                                    >
                                        <FaCaretUp />
                                    </button>
                                    <button
                                        onClick={() => setLength(Math.max(1, length - 1))}
                                        className="text-secondary text-xs"
                                    >
                                        <FaCaretDown />
                                    </button>
                                </span>
                            </div>
                        </div>

                        {/* Area Row */}
                        <div className="flex justify-between items-center mb-3">
                            <p className="md:text-lg text-lg font-normal text-description text-center font-Satoshi">Actual area (1 SQM)</p>
                            <p className="md:text-lg text-sm font-normal text-description text-center font-Satoshi">
                                {(length * boards).toFixed(1)} SQM
                            </p>
                        </div>

                        {/* Boards Row */}
                        <div className="flex justify-between items-center mb-3">
                            <p className="md:text-lg text-lg font-normal text-description text-center font-Satoshi">Boards</p>
                            <div className="flex items-center border border-[#E4E4E4] bg-white rounded-full px-4 py-2">
                                <button
                                    onClick={() => setBoards(Math.max(1, boards - 1))}
                                    className="px-2 md:text-lg text-sm font-normal text-description text-center font-Satoshi"
                                >
                                    -
                                </button>
                                <span className="px-3 w-6 md:text-lg text-sm font-normal text-description text-center font-Satoshi">
                                    {boards}
                                </span>
                                <button
                                    onClick={() => setBoards(boards + 1)}
                                    className="px-2 md:text-lg text-sm font-normal text-description text-center font-Satoshi"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Total Price Row */}
                        <div className="flex justify-between items-center mb-6">
                            <p className="md:text-lg text-lg font-normal text-description text-center font-Satoshi">Total Price</p>
                            <div className="flex items-center border border-[#E4E4E4] bg-white rounded-full px-4 py-2">
                                <p className="md:text-lg text-sm font-bold text-secondary text-center font-Satoshi">£{totalPrice}</p>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-4">
                        <button className="bg-secondary text-white hover:bg-primary md:text-lg text-sm font-bold inline-flex w-fit md:px-7 md:py-[18px] px-5 py-2.5 rounded-4xl transition-all duration-300 ease-in-out">
                            Add to basket
                        </button>
                        <Link href="/sample-product" className="md:text-lg text-sm font-bold text-secondary underline inline-flex">
                            Request A Free Sample
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CalculateArea;