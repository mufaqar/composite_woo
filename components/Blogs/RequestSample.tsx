import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RequestSample = () => {
    return (
        <section className="bg-[#003D2C] pt-20 relative">
            <div className="container mx-auto px-4">
                <h3 className='text-lg font-bold text-primary font-Satoshi text-center mb-4'>
                    Do you want to have a sample?
                </h3>
                <h2 className="md:text-6xl text-[34px] leading-none font-semibold text-white text-center font-DM_Sans">
                    Get A Sample from us
                </h2>
                <p className="md:text-xl text-sm font-normal text-white text-center mt-5 max-w-[717px] mx-auto">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <Link href="/sample-product" className='md:text-base text-sm font-bold text-white flex w-fit md:px-7 md:py-3 px-5 py-2 bg-secondary rounded-4xl hover:bg-primary border border-secondary hover:border-primary hover:text-white transition-all duration-300 ease-in-out mx-auto md:mt-14 mt-8'>
                    Request a Free Sample
                </Link>
            </div>

            <Image src="/images/boxes2.png" alt='boxes2' width={232} height={155} className='md:w-[232px] md:h-[155px] w-[87.5px] h-[58.33] ml-auto mr-0 ' />
        </section>
    )
}

export default RequestSample