import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import localFont from "next/font/local"
import ClientProvider from "./ClientProvider";

// Define the font with multiple weights
const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/Satoshi-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
})


const dm_Sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-sans", // 👈 overwrite Tailwind's font-sans variable
});

export const metadata: Metadata = {
  title: "Composite Warehouse",
  description: "Composite Fancy Products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dm_Sans.className} ${satoshi.variable} antialiased`}>
        <ClientProvider>
          <Header />
          {children}
        </ClientProvider>
        <Footer />
      </body>
    </html>
  );
}
