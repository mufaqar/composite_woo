import React from 'react'
import HeadingSection from '../HeadingSection'
import Image from 'next/image'
import Link from 'next/link'

const FollowInsta = () => {
    return (
        <section className="md:py-20 py-16">
            {/* Heading + Read More */}
            <HeadingSection title="Composite warehouse Are On Social Media" desc="Need more decking inspiration? Follow us on Instagram for our very latest decking design ideas and case studies." />
            <div className='container mx-auto px-4 flex md:flex-row flex-col gap-6 mt-10'>
                <div>
                    <Image src="/images/gallery1.png" alt='gallery1' width={610} height={450} />
                </div>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                    <Image src="/images/gallery2.png" alt='gallery2' width={295} height={212} />
                    <Image src="/images/gallery3.png" alt='gallery3' width={295} height={212} />
                    <Image src="/images/gallery4.png" alt='gallery4' width={295} height={212} />
                    <Image src="/images/gallery5.png" alt='gallery5' width={295} height={212} />
                </div>
            </div>
            <div className='w-fit mx-auto flex md:flex-row flex-col gap-5 mt-10'>
                <Link href="#" className='primary_btn capitalize'>
                    follow us on instagram
                </Link>
            </div>
        </section>
    )
}

export default FollowInsta