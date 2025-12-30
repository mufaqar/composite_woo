import Image from 'next/image'
import React from 'react'

const NewsLetter = () => {
    return (
        <section className="bg-[#003D2C] pt-20 relative">
            {/* Header */}
            <div className="container mx-auto px-4">
                <h3 className='text-lg font-bold text-primary font-Satoshi text-center mb-4'>
                    Do you want to keep up-to-date?
                </h3>
                <h2 className="md:text-6xl text-[34px] leading-none font-semibold text-white text-center font-DM_Sans">
                    Join Our Newsletter
                </h2>
                <p className="md:text-xl text-sm font-normal text-white text-center mt-5 max-w-[717px] mx-auto">
                    Join our happy customers and readers all over UK and Europe and get updated with the latest news in the composite decking industry.
                </p>
                <form className='max-w-[475px] mx-auto border md:border-[#B2B2B2] border-transparent rounded-full flex md:flex-row flex-col p-1.5 md:gap-0 gap-5 justify-center items-center mt-14'>
                    <label htmlFor='email' className='hidden'>
                        Email
                    </label>
                    <input name="email" id='email' type='email' placeholder='Enter your mail'
                        className='md:text-base text-sm font-normal text-white placeholder:text-white w-full border md:border-transparent border-[#B2B2B2] rounded-full outline-none px-6 md:py-1.5 py-3.5' />
                    <button className='md:text-base text-sm font-bold text-white inline-flex w-fit md:px-7 md:py-3 px-5 py-2 bg-secondary rounded-4xl hover:bg-primary border border-secondary hover:border-primary hover:text-white transition-all duration-300 ease-in-out'>
                        SUBSCRIBE
                    </button>
                </form>
            </div>

            <Image src="/images/boxes2.png" alt='boxes2' width={232} height={155} className='md:w-[232px] md:h-[155px] w-[87.5px] h-[58.33] ml-auto mr-0 ' />
        </section>
    )
}

export default NewsLetter