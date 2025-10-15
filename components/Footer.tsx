"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaEnvelope, FaPhoneVolume } from "react-icons/fa6";

// Footer Menus
const products = [
  { name: "Composite Decking", href: "/product-category/plastic-decking" },
  { name: "Composite Fencing", href: "/product-category/composite-fencing" },
  { name: "Composite Cladding", href: "/product-category/cladding-pvc-panels-uk" },
  { name: "Free Samples", href: "/sample-product" },
];

const information = [
  { name: "About Us", href: "/about" },
  { name: "Customer Reviews", href: "#" },
  { name: "Advice Centre", href: "#" },
  { name: "FAQ", href: "/faqs" },
  { name: "Delivery & Returns", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Terms & Conditions", href: "#" },
];

// Social Icons
const socials = [
  { name: "Facebook", href: "#", icon: FaFacebookF },
  { name: "Instagram", href: "#", icon: FaInstagram },
  { name: "YouTube", href: "#", icon: FaYoutube },
];

const Footer = () => {
  return (
    <footer className="bg-black ">
      <Image src="/images/square.png" alt="aquare" width={77} height={77} />
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="">
          <div className="max-w-[380px]">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={148}
                height={74}
              />
            </Link>
            <p className="md:text-lg text-sm font-normal text-white mt-5">
              Lorem ipsum dolor sit amet, consectetur adip elit.Posuere dolor
              massa, pellentesque.
            </p>
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-4">
          {/* Products */}
          <div className="md:w-1/3 w-full">
            <h6 className="text-sm font-bold text-white font-DM_Sans mb-4">
              PRODUCTS
            </h6>
            <ul className="space-y-4">
              {products.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-base font-normal text-white hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div className="md:w-1/3 w-full">
            <h6 className="text-sm font-bold text-white font-DM_Sans mb-4">
              INFORMATION
            </h6>
            <ul className="space-y-4">
              {information.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-base font-normal text-white hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:w-1/3 w-full">
            <h6 className="text-sm font-bold text-white font-DM_Sans mb-4">
              CONTACT US
            </h6>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-sm font-normal text-white hover:text-primary inline-flex gap-2 items-center"
                >
                  <span className="text-secondary">
                    <FaEnvelope />
                  </span>
                  yourcompany@email.com
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm font-normal text-white hover:text-primary inline-flex gap-2 items-center"
                >
                  <span className="text-secondary">
                    <FaPhoneVolume />
                  </span>
                  +1 627 8907 1264
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 border-t border-white/25 mt-[59px] py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="md:text-base text-sm font-normal text-white">
          © 2025 Copyright Company.com
        </p>

        {/* Social Icons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          {socials.map((social, i) => {
            const Icon = social.icon;
            return (
              <Link
                key={i}
                href={social.href}
                className="text-white inline-flex md:w-12 md:h-12 w-8 h-8 items-center justify-center bg-[#343434] rounded-full hover:bg-primary transition-all duration-300 ease-in-out"
                aria-label={social.name}
              >
                <Icon />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
