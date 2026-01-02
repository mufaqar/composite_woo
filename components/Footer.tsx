"use client";

import { getThemeOptions } from "@/lib/api/getHomeData";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaEnvelope, FaPhoneVolume } from "react-icons/fa6";

// Footer Menus
const products = [
  { name: "Composite Decking", href: "/product-category/plastic-decking" },
  { name: "Composite Fencing", href: "/product-category/composite-fencing" },
  {
    name: "Composite Cladding",
    href: "/product-category/cladding-pvc-panels-uk",
  },
  { name: "Free Samples", href: "/sample-product" },
];

const information = [
  { name: "About Us", href: "/about" },
  { name: "FAQ", href: "/faqs" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-and-conditions/" },
];

// Social Icons
const socials = [
  { name: "Facebook", href: "https://www.facebook.com/109562640875230/posts/visit-composite-warehouse-uk-for-your-composite-decking-their-team-of-experts-wi/124346816063479/", icon: FaFacebookF },
  { name: "Instagram", href: "#", icon: FaInstagram },
  { name: "YouTube", href: "#", icon: FaYoutube },
];

const Footer = async () => {

   const footerInfo = await getThemeOptions();
   console.log("Footer Info:", footerInfo);
  return (
    <footer className="bg-black ">
      <Image src="/images/square.png" alt="aquare" width={77} height={77} />
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
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
             {footerInfo?.address}
            </p>
          </div>
        </div>

        <div className="md:col-span-3 flex md:flex-row flex-col gap-4">
          {/* Products */}
          <div className="md:w-1/3 w-full">
            <h6 className="text-sm font-bold text-white font-DM_Sans mb-4">
              PRODUCTS
            </h6>
            <ul className="space-y-4">
              {footerInfo?.productMenu.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.link}
                    className="text-base font-normal text-white hover:text-primary"
                  >
                    {item.title}
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
                  href={`mailto:${footerInfo?.emailAddress}`}
                  className="text-sm font-normal text-white hover:text-primary inline-flex gap-2 items-center"
                >
                  <span className="text-secondary">
                    <FaEnvelope />
                  </span>
                 {footerInfo?.emailAddress}
                </Link>
              </li>
              <li>
                <Link
                  href={`tel:${footerInfo?.tel}`}
                  className="text-sm font-normal text-white hover:text-primary inline-flex gap-2 items-center"
                >
                  <span className="text-secondary">
                    <FaPhoneVolume />
                  </span>
                {footerInfo?.tel}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 border-t border-white/25 mt-[59px] py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="md:text-base text-sm font-normal text-white">
          © 2025 Copyright CompositeWarehouse – Composite Supplier. All Rights Reserved.
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

