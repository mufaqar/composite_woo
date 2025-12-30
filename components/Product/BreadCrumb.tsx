import Link from 'next/link'
import React from 'react'
import { FaChevronRight } from 'react-icons/fa6'

const BreadCrumb = ({title}:any) => {
    return (
        <ul className='flex items-center gap-2 mb-8'>
            <li>
                <Link href="/" className={`md:text-xl text-sm font-normal text-description hover:text-secondary opacity-60`}>Home</Link>
            </li>
            <li><FaChevronRight className='text-secondary' /></li>
            <li>
                <Link href="/shop" className={`md:text-xl text-sm font-normal text-description hover:text-secondary opacity-60`}>Shop</Link>
            </li>
            <li><FaChevronRight className='text-secondary' /></li>
            <li>
                <span className={`md:text-xl text-sm font-normal text-description hover:text-secondary`}>{title}</span>
            </li>
        </ul>
    )
}

export default BreadCrumb