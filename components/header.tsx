"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaBars, FaPhoneVolume } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

type MenuItem = {
  label: string;
  href: string;
};

const menuItems: MenuItem[] = [
  { label: "Decking", href: "/product-category/plastic-decking" },
  { label: "Fencing", href: "/product-category/composite-fencing" },
  { label: "Cladding", href: "/product-category/cladding-pvc-panels-uk" },
  {
    label: "Accessories",
    href: "/product-category/composite-deck-accessories/",
  },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Cart", href: "/cart" },
  { label: "Contact Us", href: "/contact" },
];

const Header = () => {
  const [mblMenu, setMblMenu] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={`${
        pathname === "/" ? "border-transparent " : "border-[#D2D2D2]"
      } border-b py-3.5 relative z-50`}
    >
      <div className="container mx-auto px-4 flex flex-row gap-5 items-center justify-between">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image src="/images/logo.png" alt="logo" width={148} height={74} />
          </Link>
        </div>

        {/* Menu */}
        <div>
          {/* Mobile menu button */}
          <button
            onClick={() => setMblMenu(!mblMenu)}
            className={`${
              pathname === "/"
                ? "text-white border-white/30 bg-white/20 "
                : "text-[#003D2C] border-black/65 hover:text-white bg-white"
            } hover:bg-primary hover:border-primary text-2xl md:hidden  inline-flex w-[59px] h-[59px] items-center justify-center rounded-full border-2 transition-all duration-300 ease-in-out`}
          >
            {mblMenu ? <IoMdClose /> : <FaBars />}
          </button>

          {/* Nav */}
          <nav
            className={`
              md:static absolute top-20 left-0 right-0 
              
              md:p-0 p-4 transition-all duration-300 ease-in-out
              ${
                pathname === "/"
                  ? "md:bg-transparent  bg-title"
                  : "md:bg-transparent bg-white "
              }
              ${mblMenu ? "block" : "hidden"} md:block
            `}
          >
            <ul className="flex md:flex-row flex-col gap-6">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`${
                      pathname === "/"
                        ? "text-white hover:text-white/70 "
                        : "text-title hover:text-primary"
                    } text-sm font-medium md:p-0 transition-all duration-300 ease-in-out`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Right side buttons */}
        <div className="md:flex gap-2.5 hidden">
          <Link
            href="#"
            className={`${
              pathname === "/"
                ? "text-white border-white/30 bg-white/20 "
                : "text-[#003D2C] border-black/65 hover:text-white bg-white"
            } hover:bg-primary hover:border-primary text-2xl inline-flex w-[59px] h-[59px] items-center justify-center rounded-full border-2 transition-all duration-300 ease-in-out`}
          >
            <FaPhoneVolume />
          </Link>
          <Link
            href="/sample-product"
            className={`${
              pathname === "/"
                ? "bg-white hover:text-white text-title"
                : "bg-secondary text-white"
            } hover:bg-primary text-lg font-bold  inline-flex w-fit md:px-7 md:py-[18px] px-5 py-2.5 rounded-4xl transition-all duration-300 ease-in-out`}
          >
            Request a Free Sample
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
