import { getThemeOptions } from "@/lib/api/getHomeData";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaEnvelope, FaPhoneVolume } from "react-icons/fa6";

export const revalidate = 86400; // SSG + ISR

const socials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/109562640875230/posts/visit-composite-warehouse-uk-for-your-composite-decking-their-team-of-experts-wi/124346816063479/",
    icon: FaFacebookF,
  },
  { name: "Instagram", href: "#", icon: FaInstagram },
  { name: "YouTube", href: "#", icon: FaYoutube },
];

const Footer = async () => {
  const footerInfo = await getThemeOptions();

  return (
    <footer className="bg-black">
      <Image src="/images/square.png" alt="square" width={77} height={77} />
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <Link href="/">
            <Image src="/images/logo.png" alt="logo" width={148} height={74} />
          </Link>

          <p className="md:text-lg text-sm text-white mt-5">
            {footerInfo?.address}
          </p>
        </div>

        <div className="md:col-span-3 flex md:flex-row flex-col gap-4">
          {/* Products */}
          <div className="md:w-1/3 w-full">
            <h6 className="text-white font-bold mb-4">PRODUCTS</h6>
            <ul className="space-y-4">
              {footerInfo?.productMenu?.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item?.link || "#"}
                    className="text-white hover:text-primary"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div className="md:w-1/3 w-full">
            <h6 className="text-white font-bold mb-4">INFORMATION</h6>
            <ul className="space-y-4">
              {footerInfo?.informationMenu?.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item?.link || "#"}
                    className="text-white hover:text-primary"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:w-1/3 w-full">
            <h6 className="text-white font-bold mb-4">CONTACT US</h6>
            <Link
              href={`mailto:${footerInfo?.emailAddress}`}
              className="flex gap-2 text-white"
            >
              <FaEnvelope /> {footerInfo?.emailAddress}
            </Link>
            <Link
              href={`tel:${footerInfo?.tel}`}
              className="flex gap-2 text-white mt-3"
            >
              <FaPhoneVolume /> {footerInfo?.tel}
            </Link>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}{" "}
      <div className="container mx-auto px-4 border-t border-white/25 mt-[59px] py-6 flex flex-col md:flex-row justify-between items-center">
        {" "}
        <p className="md:text-base text-sm font-normal text-white">
          {" "}
          © 2025 Copyright CompositeWarehouse – Composite Supplier. All Rights
          Reserved.{" "}
        </p>{" "}
        {/* Social Icons */}{" "}
        <div className="flex gap-4 mt-4 md:mt-0">
          {" "}
          {socials.map((social, i) => {
            const Icon = social.icon;
            return (
              <Link
                key={i}
                href={social.href}
                className="text-white inline-flex md:w-12 md:h-12 w-8 h-8 items-center justify-center bg-[#343434] rounded-full hover:bg-primary transition-all duration-300 ease-in-out"
                aria-label={social.name}
              >
                {" "}
                <Icon />{" "}
              </Link>
            );
          })}{" "}
        </div>{" "}
      </div>
    </footer>
  );
};

export default Footer;
