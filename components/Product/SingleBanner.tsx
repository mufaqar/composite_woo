'use client';
import React from 'react'
import ProductGallery from './ProductGallery'
import BreadCrumb from './BreadCrumb'
import FenceConfigurator from './FenceConfigurator'
import CalculateArea from './CalculateArea'
import { usePathname } from 'next/navigation'

const SingleBanner = () => {
    const pathname = usePathname()

    return (
        <section className='pt-16 pb-20'>
            <div className='container mx-auto px-4'>
                <BreadCrumb title="vertical composite fencing panel" />
            </div>
            <div className='container mx-auto px-4 flex md:flex-row flex-col gap-6 items-center'>
                <div className='md:w-1/2 w-full'>
                    <ProductGallery />
                </div>
                <div className='md:w-1/2 w-full'>
                    <div className='pb-6 border-b border-[#D2D2D2] mb-10'>
                        <h1 className='md:text-[50px] leading-none text-[32px] font-medium text-title font-DM_Sans'>
                            Vertical Composite Fencing Panel
                        </h1>
                        <div className="flex items-center gap-1 text-yellow-500 text-lg mt-5">
                            {"★".repeat(5)}
                            <span className="md:text-lg text-sm font-bold text-title ml-1 ">371 Reviews</span>
                        </div>
                        <h4 className='md:text-5xl text-[28px] font-bold text-secondary font-DM_Sans my-8'>
                            €129.99
                        </h4>
                        <p className='md:text-xl text-sm font-normal text-description'>
                            Availability: <span className='text-primary'>In Stock</span>
                        </p>
                    </div>
                </div>
            </div>

            {pathname === "/demo-pro" && <CalculateArea />}
            {pathname === "/products/single" && <FenceConfigurator />}
        </section>
    )
}

export default SingleBanner
