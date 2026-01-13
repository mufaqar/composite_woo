"use client"

import React, { useState } from "react"
import ProductBox from "./ProductBox"

interface Product {
    id: number
    title: string
    description: string
    image: string
    price?: string
    discountPrice?: string
    rating?: number
    buttons?: boolean
}

interface ProductSectionProps {
    data: Product[]
    readMore?: boolean
    categoryTitle?: string
    categoryDescription?: string
}

function ProductSection({ data, readMore, categoryTitle, categoryDescription }: ProductSectionProps) {
    const [visibleCount, setVisibleCount] = useState(6) // show 6 products by default
    const [isExpanded, setIsExpanded] = useState(false)

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 3) // load 3 more each time
    }

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-6">
                    {data.slice(0, visibleCount).map((item, index) => (
                        <React.Fragment key={item.id}>
                            {/* Repeat section after every 3 products */}
                            {(index + 0) % 3 === 0 && index + 1 < visibleCount && (
                                <div className="col-span-full">
                                    <CategoryHeader
                                        categoryTitle={categoryTitle}
                                        categoryDescription={categoryDescription}
                                        readMore={readMore}
                                        isExpanded={isExpanded}
                                        setIsExpanded={setIsExpanded}
                                    />
                                </div>
                            )}
                            <ProductBox data={item} />
                        </React.Fragment>
                    ))}
                </div>

                {/* Load More Button */}
                {visibleCount < data.length && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleLoadMore}
                            className="md:text-base text-sm font-bold text-white inline-flex w-fit md:px-7 md:py-3 px-5 py-2 bg-secondary rounded-4xl hover:bg-primary border border-secondary hover:border-primary hover:text-white transition-all duration-300 ease-in-out"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ProductSection



function CategoryHeader({
    categoryTitle,
    categoryDescription,
    readMore,
    isExpanded,
    setIsExpanded,
}: {
    categoryTitle?: string
    categoryDescription?: string
    readMore?: boolean
    isExpanded: boolean
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}) {
    if (!categoryTitle && !categoryDescription) return null

    return (
        <div className="container mx-auto px-4 flex md:flex-row flex-col gap-6 items-center mt-8">
            {categoryTitle && (
                <h2 className="md:text-6xl text-[33px] leading-none font-semibold text-title font-DM_Sans">
                    {categoryTitle}
                </h2>
            )}

            <div>
                {categoryDescription && (
                    <div
                        className="md:text-xl text-sm font-normal text-description post_content"
                        dangerouslySetInnerHTML={{
                            __html: readMore
                                ? isExpanded
                                    ? categoryDescription
                                    : `${categoryDescription.substring(0, 122)}...`
                                : categoryDescription,
                        }}
                    />
                )}

                {readMore && (
                    <span
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-2 font-bold text-secondary hover:underline transition cursor-pointer"
                    >
                        {isExpanded ? "SHOW LESS" : "READ MORE"}
                    </span>
                )}
            </div>
        </div>
    )
}
