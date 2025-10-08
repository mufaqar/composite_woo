import React from 'react'

const Compare = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="overflow-x-auto bg-[#F0FAF7] rounded-[20px] p-3">
                    <table className="w-full border-collapse overflow-hidden">
                        <thead>
                            <tr>
                                <th className="bg-[#003D2C] border-b border-[#E5E5E5] md:text-xl text-base font-bold text-center text-white px-4 py-4 rounded-t-[20px]">
                                    Features & Appearance
                                </th>
                                <th className="border-b border-[#E5E5E5] md:text-xl text-base font-bold text-center text-title px-4 py-4">
                                    Essential Grooved
                                </th>
                                <th className="border-b border-[#E5E5E5] md:text-xl text-base font-bold text-center text-title px-4 py-4">
                                    Essential Wood Grain
                                </th>
                                <th className="border-b border-[#E5E5E5] md:text-xl text-base font-bold text-center text-title px-4 py-4">
                                    Capped Dual Colour
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-description text-sm md:text-base">
                            <tr className="border-b border-[#E5E5E5]">
                                <td className="bg-[#003D2C] md:text-lg text-sm font-normal text-white text-center px-4 py-4">
                                    Finish
                                </td>
                                <td className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">Thick/Thin Grooved</td>
                                <td className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">Wood Grain/ Thin Grooved</td>
                                <td className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">Narrow grooved</td>
                            </tr>

                            <tr className="border-b border-[#E5E5E5]">
                                <td className="bg-[#003D2C] md:text-lg text-sm font-normal text-white text-center px-4 py-4">
                                    Colour
                                </td>
                                <td className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">Anthracite Grey, Grey, Black</td>
                                <td className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">Anthracite Grey & Grey</td>
                                <td className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">Anthracite Grey, Grey, Teak & Chocolate</td>
                            </tr>

                            <tr className="border-b border-[#E5E5E5]">
                                <td className="bg-[#003D2C] md:text-lg text-sm font-normal text-white text-center px-4 py-4">
                                    Maintenance
                                </td>
                                <td className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">Low level cleaning</td>
                                <td className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">Low level cleaning</td>
                                <td className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">Low level cleaning</td>
                            </tr>

                            <tr className="border-b border-[#E5E5E5]">
                                <td className="bg-[#003D2C] md:text-lg text-sm font-normal text-white text-center px-4 py-4">
                                    Scratch Resistance
                                </td>
                                <td className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">Moderate</td>
                                <td className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">High</td>
                                <td className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">High</td>
                            </tr>

                            <tr>
                                <td className="bg-[#003D2C] md:text-lg text-sm font-normal text-white text-center px-4 py-4 rounded-b-[20px]">
                                    Slip Resistance
                                </td>
                                <td className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">
                                    High (thick grooved), High (thin grooved)
                                </td>
                                <td className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">High</td>
                                <td className="md:text-lg text-sm font-normal text-description text-center px-4 py-4">High</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Compare