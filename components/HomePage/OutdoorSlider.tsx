"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";

interface SlideImage {
    src: string;
    title: string;
    description: string;
}

interface Slide {
    id: number;
    images: SlideImage[];
}

const slides: Slide[] = [
    {
        id: 1,
        images: [
            {
                src: "/images/slide1.png",
                title: "Modern Deck Design",
                description: "A clean and stylish outdoor deck with contemporary furniture."
            }
        ]
    },
    {
        id: 2,
        images: [
            {
                src: "/images/slide2.png",
                title: "Cozy Outdoor Lounge Top",
                description: "Relax with an elevated lounge surrounded by greenery."
            },
            {
                src: "/images/slide3.png",
                title: "Cozy Outdoor Lounge Bottom",
                description: "Lower section lounge with warm lighting and comfort."
            }
        ]
    },
    {
        id: 3,
        images: [
            {
                src: "/images/slide4.png",
                title: "Classic Patio",
                description: "Traditional outdoor space designed for family gatherings."
            }
        ]
    },
    {
        id: 4,
        images: [
            {
                src: "/images/slide5.png",
                title: "Nature Inspired Top",
                description: "Blending wood textures with greenery."
            },
            {
                src: "/images/slide6.png",
                title: "Nature Inspired Bottom",
                description: "Natural stone with cozy seating arrangement."
            }
        ]
    },
    {
        id: 5,
        images: [
            {
                src: "/images/slide7.png",
                title: "Waterfront Deck",
                description: "Enjoy the beautiful lake view with a simple, elegant deck."
            }
        ]
    }
];

const OutDoorSlider: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<SlideImage | null>(null);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 600,
        slidesToShow: 5,
        slidesToScroll: 1,
        rows: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    rows: 1
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    rows: 5
                }
            }
        ]
    };

    return (
        <>
            <Slider {...settings} className="!w-full mt-10">
                {slides.map((slide) => (
                    <div key={slide.id}>
                        <div className="flex items-center justify-center w-full md:h-[620px] px-2 md:py-0 py-2">
                            {/* Case: slide has 2 images */}
                            {slide.images.length === 2 ? (
                                <div className="grid md:grid-cols-1 grid-cols-2 gap-4 w-full">
                                    {slide.images.map((img, index) => (
                                        <div
                                            onClick={() => setSelectedImage(img)}
                                            key={index}
                                            className="h-[290px] w-full relative group overflow-hidden cursor-pointer"
                                        >
                                            <Image
                                                src={img.src}
                                                alt={`slide-${slide.id}-${index}`}
                                                width={290}
                                                height={298}
                                                className="object-cover w-full h-full"
                                            />

                                            {/* Overlay */}
                                            <div
                                                className="
                          absolute inset-0 
                          bg-gradient-to-t from-black via-black/30 
                          flex flex-col justify-end px-4 py-9 
                          opacity-0 translate-y-5
                          transition-all duration-500 ease-in-out 
                          group-hover:opacity-100 group-hover:translate-y-0
                        "
                                            >
                                                <h3 className="md:text-[26px] leading-none text-base font-semibold text-white font-DM_Sans">
                                                    {img.title}
                                                </h3>
                                                <p className="md:text-base text-sm font-normal text-white font-Satoshi mt-2">
                                                    {img.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                // Case: slide has 1 image
                                <div
                                    onClick={() => setSelectedImage(slide.images[0])}
                                    className="h-[426px] w-full relative group overflow-hidden cursor-pointer"
                                >
                                    <Image
                                        src={slide.images[0].src}
                                        alt={`slide-${slide.id}`}
                                        width={237}
                                        height={426}
                                        className="object-cover w-full h-full"
                                    />

                                    {/* Overlay */}
                                    <div
                                        className="
                      absolute inset-0 
                      bg-gradient-to-t from-black via-black/30 
                      flex flex-col justify-end px-4 py-9 
                      opacity-0 translate-y-5
                      transition-all duration-500 ease-in-out 
                      group-hover:opacity-100 group-hover:translate-y-0
                    "
                                    >
                                        <h3 className="md:text-[26px] leading-none text-base font-semibold text-white font-DM_Sans">
                                            {slide.images[0].title}
                                        </h3>
                                        <p className="md:text-base text-sm font-normal text-white font-Satoshi mt-2">
                                            {slide.images[0].description}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </Slider>

            {/* Popup */}
            {selectedImage && (
                <div
                    onClick={() => setSelectedImage(null)} // close only when clicking the backdrop
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-opacity duration-500"
                >
                    <div
                        onClick={(e) => e.stopPropagation()} // stop clicks inside the popup from closing
                        className={`bg-white w-fit rounded-xl shadow-lg relative transform transition-all duration-500 ease-in-out
        ${selectedImage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
      `}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 right-3 text-description hover:text-black text-xl"
                        >
                            ✕
                        </button>

                        <div className="px-5 py-8">
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                width={450}
                                height={290}
                                className="max-w-[450px] max-h-[450px] w-full h-full object-cover"
                            />
                            <h2 className="text-xl font-semibold font-DM_Sans mt-3">
                                {selectedImage.title}
                            </h2>
                            <p className="text-description font-Satoshi mt-1">
                                {selectedImage.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OutDoorSlider;
