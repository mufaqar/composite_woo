import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PostBox = ({ data }: any) => {
    return (
        <div className="">
            {/* Image */}
            <div className="relative w-full">
                <Image
                    src={data.image}
                    alt={data.title}
                    width={400}
                    height={400}
                />
            </div>

            {/* Content */}
            <div className="mt-4 hover:bg-[#D2D2D7] p-2">
                <p className="text-sm text-description font-DM_Sans flex items-center gap-2">
                    <span className="text-red-500 text-lg">•</span>
                    {data.date}
                    <span className="text-description">|</span>
                    <Link href="#" className="text-primary font-medium">{data.category}</Link>
                </p>
                <Link href="#" className="md:text-[22px] text-lg leading-none font-normal font-DM_Sans inline-flex mt-3 mb-4">
                    {data.title}
                </Link>
                <div className="py-2 border-t border-[#D2D2D7]">
                    <p className="text-sm text-description ">
                        {data.readTime}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PostBox