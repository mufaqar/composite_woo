'use client';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AnimateOnScroll, { useAutoDelay } from '../Animation'

const Hero = () => {
  const getDelay = useAutoDelay();
  return (
    <section className="bg-[url('/images/hero.jpg')] bg-black/40 bg-blend-overlay bg-cover bg-no-repeat flex items-center justify-center md:pt-[350px] pt-[300px] pb-[100px] relative mt-[-102px]">
      <Image src="/images/boxes1.png" alt='boxes1' width={185} height={249} className='absolute left-0 md:top-[154px] top-28 md:w-[185px] md:h-[249px] w-[94px] h-[126px]' />
      <div className='max-w-[1170px] mx-auto px-4'>
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <h1 className='md:text-7xl text-[38px] leading-none font-medium text-white text-center font-DM_Sans'>
            Transform Your <b>Outdoor Space</b> With Premium, Low-Maintenance Composite Materials
          </h1>
        </AnimateOnScroll>
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <p className='md:text-lg text-sm font-normal text-white text-center mt-5 max-w-[840px] mx-auto'>
            Discover our extensive range of high-quality composite decking, fencing, and cladding, designed for durability, style, and lasting beauty. Enjoy free UK mainland delivery and our price match guarantee.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <div className='w-fit mx-auto flex md:flex-row flex-col gap-5 mt-10'>
            <Link href="/category/decking" className='primary_btn'>
              Explore Composite Decking
            </Link>
            <Link href="#" className='secondary_btn'>
              Discover Composite Fencing
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
      <Image src="/images/boxes2.png" alt='boxes2' width={232} height={155} className='absolute right-0 bottom-0 md:w-[232px] md:h-[155px] w-[87.5px] h-[58.33]' />
    </section>
  )
}

export default Hero