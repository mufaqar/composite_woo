"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBars, FaPhoneVolume } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import CartMini from "./CartMini";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { openCart } from "@/redux/slices/cartSlice";
import { getMenuItems, MenuItemType } from "@/lib/queries/getMenus";


const Header = () => {
  const [mblMenu, setMblMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state: any) => state.cart.isCartOpen);

  // Fetch menu dynamically on client-side
  useEffect(() => {
    const fetchMenu = async () => {
      const items = await getMenuItems();
      setMenuItems(items);
    };
    fetchMenu();
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        pathname === "/" && !isScrolled
          ? "bg-transparent border-transparent"
          : "bg-white border-[#D2D2D2]"
      } border-b py-3.5 sticky top-0 z-50`}
    >
      <div className="container mx-auto px-4 flex flex-row gap-5 items-center justify-between relative">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image src="/images/logo.png" alt="logo" width={148} height={74} />
          </Link>
        </div>

        {/* Menu */}
        <div className="md:order-none order-2">
          {/* Mobile menu button */}
          <button
            onClick={() => setMblMenu(!mblMenu)}
            className={`${
              pathname === "/" && !isScrolled
                ? "text-white border-white/30 bg-white/20"
                : "text-[#003D2C] border-black/65 hover:text-white bg-white"
            } hover:bg-primary hover:border-primary text-2xl md:hidden inline-flex w-[49px] h-[49px] items-center justify-center rounded-full border-2 transition-all duration-300 ease-in-out`}
          >
            {mblMenu ? <IoMdClose /> : <FaBars />}
          </button>

          {/* Nav */}
          <nav
            className={`md:static absolute top-20 left-0 right-0 md:p-0 p-4 transition-all duration-300 ease-in-out ${
              pathname === "/" && !isScrolled ? "md:bg-transparent bg-title" : "md:bg-transparent bg-white"
            } ${mblMenu ? "block" : "hidden"} md:block`}
          >
            <ul className="flex md:flex-row flex-col gap-6">
              {menuItems.length === 0 && <li>Loading menu...</li>}
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.id}>
                    <Link
                      onClick={() => setMblMenu(false)}
                      href={item.path}
                      className={`text-sm font-medium md:p-0 transition-all duration-300 ease-in-out ${
                        isActive
                          ? "text-primary"
                          : pathname === "/" && !isScrolled
                          ? "text-white hover:text-white/70"
                          : "text-title hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Right side buttons */}
        <div className="flex gap-2.5 items-center">
          <button
            onClick={() => dispatch(openCart())}
            className={`${
              pathname === "/" && !isScrolled
                ? "text-white border-white/30 bg-white/20"
                : "text-[#003D2C] border-black/65 hover:text-white bg-white"
            } hover:bg-primary hover:border-primary text-2xl inline-flex w-[49px] h-[49px] items-center justify-center rounded-full border-2 transition-all duration-300 ease-in-out`}
          >
            <FaShoppingCart size={20} />
          </button>

          <Link
            href="#"
            className={`${
              pathname === "/" && !isScrolled
                ? "text-white border-white/30 bg-white/20"
                : "text-[#003D2C] border-black/65 hover:text-white bg-white"
            } hover:bg-primary hover:border-primary text-2xl inline-flex w-[49px] h-[49px] items-center justify-center rounded-full border-2 transition-all duration-300 ease-in-out`}
          >
            <FaPhoneVolume />
          </Link>

          <Link
            href="/sample-product"
            className={`${
              pathname === "/" && !isScrolled
                ? "bg-white hover:text-white text-title"
                : "bg-secondary text-white"
            } hover:bg-primary text-lg font-bold md:inline-flex w-fit md:px-7 md:py-[18px] px-5 py-2.5 rounded-4xl transition-all duration-300 ease-in-out hidden`}
          >
            Request a Free Sample
          </Link>
        </div>

        {isCartOpen && <CartMini />}
      </div>
    </header>
  );
};

export default Header;
