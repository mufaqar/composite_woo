"use client";

import { JSX, useState } from "react";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { WooProduct } from "@/lib/woocommerce-types";

type Option = {
  id: string;
  label: string;
  image?: string;
  color?: string;
};

type Step = {
  id: number;
  title: string;
  label: string;
  options?: Option[];
  selected?: string;
  setSelected?: (id: string) => void;
  content?: JSX.Element;
};


interface FenceProps {
  data: WooProduct;
}

export default function FenceConfigurator({data}:FenceProps) {

  console.log("DD",data);
  const dispatch = useDispatch();
  const [openSteps, setOpenSteps] = useState<number[]>([1]);

  const toggleStep = (step: number) => {
    setOpenSteps((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    );
  };

  // STATES
  const [unit, setUnit] = useState<"cm" | "ft">("cm");
  const [height, setHeight] = useState("220cm");
  const [postType, setPostType] = useState("composite");
  const [slatType, setSlatType] = useState("classic");
  const [slatColour, setSlatColour] = useState("darkgrey");
  const [panelTrim, setPanelTrim] = useState("");
  const [screenstyle, setScreenstyle] = useState("");
  const [postcolor, setPostColour] = useState("");
  const [installation, setInstallation] = useState("");
  const [quantity, setQuantity] = useState(1);

  const basePrice = parseFloat(data.price);
  const totalPrice = basePrice * quantity;

  // OPTIONS (same as before)
  const heightsCM: Option[] = [
    { id: "220cm", label: "220cm" },
    { id: "190cm", label: "190cm" },
    { id: "160cm", label: "160cm" },
    { id: "140cm", label: "140cm" },
    { id: "120cm", label: "120cm" },
    { id: "100cm", label: "100cm" },
  ];

  const heightsFT: Option[] = [
    { id: "7ft", label: "7 ft" },
    { id: "6ft", label: "6 ft" },
    { id: "5ft", label: "5 ft" },
    { id: "4ft", label: "4 ft" },
    { id: "3ft", label: "3 ft" },
  ];

  const posts: Option[] = [
    { id: "aluminium", label: "Our Aluminium Posts", image: "/images/comp1.png" },
    { id: "composite", label: "Our Composite Posts", image: "/images/comp2.png" },
    { id: "concrete", label: "Your Concrete Posts", image: "/images/comp3.png" },
  ];

  const slats: Option[] = [
    { id: "classic", label: "Classic", image: "/images/comslat7.png" },
    { id: "fusion", label: "Fusion", image: "/images/comslat2.png" },
    { id: "hudson", label: "Hudson", image: "/images/comslat3.png" },
    { id: "vinto", label: "Vinto", image: "/images/comslat4.png" },
    { id: "ripple", label: "Ripple", image: "/images/comslat5.png" },
    { id: "aspen", label: "Aspen", image: "/images/comslat7.png" },
    { id: "linea", label: "Linea", image: "/images/comslat6.png" },
  ];

  const colours: Option[] = [
    { id: "black", label: "Black", image: "/images/color1.png" },
    { id: "grey", label: "Grey", image: "/images/color2.png" },
    { id: "darkgrey", label: "Dark Grey", image: "/images/color3.png" },
    { id: "midstone", label: "Mid Stone", image: "/images/color4.png" },
    { id: "lightstone", label: "Light Stone", image: "/images/color5.png" },
  ];

  const panelTrims: Option[] = [
    { id: "upgradedtrim", label: "Upgraded Trim", image: "/images/paneltrim1.png" },
    { id: "standardtrim", label: "Standard Trim", image: "/images/paneltrim2.png" },
  ];

  const screenstyles: Option[] = [
    { id: "fullslats", label: "Full Slats", image: "/images/screen1.png" },
    { id: "straighttop", label: "Straight Top", image: "/images/screen2.png" },
    { id: "curvedtop", label: "Curved Top", image: "/images/screen3.png" },
  ];

  const postcolors: Option[] = [
    { id: "black", label: "Black", image: "/images/color1.png" },
    { id: "darkgrey", label: "Dark Grey", image: "/images/color3.png" },
  ];

  const installations: Option[] = [
    { id: "solidconcrete", label: "Solid / Concrete", image: "/images/installation1.png" },
    { id: "timberdecking", label: "Timber / Decking", image: "/images/installation2.png" },
    { id: "sunkintoground", label: "Sunk Into Ground", image: "/images/installation3.png" },
  ];

  const getLabel = (options: Option[], id: string) =>
    options.find((opt) => opt.id === id)?.label || "None";

  const renderOptions = (
    options: Option[],
    selected: string,
    setSelected: (id: string) => void,
    gridCols = "grid-cols-4"
  ) => (
    <div className={`grid ${gridCols} gap-4 mt-3`}>
      {options.map((opt) => (
        <div
          key={opt.id}
          onClick={() => setSelected(opt.id)}
          className="cursor-pointer text-center transition-all ease-in-out w-full"
        >
          {opt.image && (
            <div
              className={`relative mb-2 border-3 ${selected === opt.id ? "border-secondary" : "border-transparent"
                }`}
            >
              {selected === opt.id && (
                <span className="absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center rounded-full bg-secondary text-white">
                  <FaCheck />
                </span>
              )}
              <Image
                src={opt.image}
                alt={opt.label}
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <span className="text-sm md:text-base text-description font-Satoshi">
            {opt.label}
          </span>
        </div>
      ))}
    </div>
  );

  const steps: Step[] = [
    {
      id: 1,
      title: "Step 1",
      label: `Post Height: ${getLabel(unit === "cm" ? heightsCM : heightsFT, height)}`,
      content: (
        <div>
          <div className="flex gap-2 mt-4 divide-x divide-[#E4E4E4]">
            <button
              onClick={() => setUnit("cm")}
              className={`${unit === "cm" ? "text-secondary" : "text-description"} md:text-lg text-sm font-normal hover:text-secondary px-4`}
            >
              CM
            </button>
            <button
              onClick={() => setUnit("ft")}
              className={`${unit === "ft" ? "text-secondary" : "text-description"} md:text-lg text-sm font-normal hover:text-secondary px-4`}
            >
              FT
            </button>
          </div>
          <div className="flex gap-1 mt-4 flex-wrap">
            {(unit === "cm" ? heightsCM : heightsFT).map((h) => (
              <button
                key={h.id}
                onClick={() => setHeight(h.id)}
                className={`md:text-lg text-sm font-normal px-4 py-2 rounded-full border hover:bg-primary hover:text-white ${height === h.id
                    ? "bg-primary text-white"
                    : "bg-white text-description border-transparent"
                  }`}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>
      ),
    },
    { id: 2, title: "Step 2", label: `Post Type: ${getLabel(posts, postType)}`, options: posts, selected: postType, setSelected: setPostType },
    { id: 3, title: "Step 3", label: `Slat Type: ${getLabel(slats, slatType)}`, options: slats, selected: slatType, setSelected: setSlatType },
    { id: 4, title: "Step 4", label: `Slat Colour: ${getLabel(colours, slatColour)}`, options: colours, selected: slatColour, setSelected: setSlatColour },
    { id: 5, title: "Step 5", label: "Upgrade and add our Top & Bottom Panel Trim", options: panelTrims, selected: panelTrim, setSelected: setPanelTrim },
    { id: 6, title: "Step 6", label: `Screen Style: ${getLabel(screenstyles, screenstyle)}`, options: screenstyles, selected: screenstyle, setSelected: setScreenstyle },
    { id: 7, title: "Step 7", label: `Post Colour: ${getLabel(postcolors, postcolor)}`, options: postcolors, selected: postcolor, setSelected: setPostColour },
    { id: 8, title: "Step 8", label: `Installation Method: ${getLabel(installations, installation)}`, options: installations, selected: installation, setSelected: setInstallation },
  ];

  const handleAddToCart = () => {
    const productData = {
      id: data.id.toString(),
      title: data.name,
      price: totalPrice,
      basePrice,
      quantity,
      image: data.images?.[0]?.src || "/images/comslat7.png",
      options: {
        height,
        postType,
        slatType,
        slatColour,
        panelTrim,
        screenstyle,
        postcolor,
        installation,
      },
    };

    dispatch(addToCart(productData));
    alert(`✅ Added ${quantity} item(s) to cart. Total: €${totalPrice.toFixed(2)}`);
  };

  return (
    <div className="container mx-auto px-4 flex md:flex-row flex-col gap-6 ">
      {/* Summary */}
      <div className="md:w-1/2 w-full">
        {/* <h3 className="font-semibold mb-2">Your Selection:</h3>
        {steps.map((step) => (
          <p key={step.id}>{step.label}</p>
        ))}
        <p className="mt-4 font-bold text-lg text-secondary">
          Total: €{totalPrice.toFixed(2)}
        </p> */}
      </div>

      {/* Configurator */}
      <div className="md:w-1/2 w-full space-y-6 md:-mt-[129px]">
        <div className='py-3.5 bg-background'>
          <h3 className='md:text-3xl text-xl font-medium text-title text-center font-DM_Sans capitalize'>
            fence configurator
          </h3>
          <p className='md:text-lg text-sm font-normal text-description text-center font-Satoshi'>
            use specs below
          </p>
        </div>
        {steps.map((step) => (
          <div key={step.id} className={`border border-[#E4E4E4] p-2 ${openSteps.includes(step.id) ? "pb-9" : ""}`}>
            <button
              onClick={() => toggleStep(step.id)}
              className="w-full flex justify-between items-center bg-[#003D2C] text-white py-4 px-7 text-xs md:text-lg font-Satoshi"
            >
              <span>{step.title}</span>
              <p className="text-white">{step.label}</p>
              <span>{openSteps.includes(step.id) ? "−" : "+"}</span>
            </button>
            <div className={`transition-all duration-300 overflow-hidden ${openSteps.includes(step.id) ? "max-h-full" : "max-h-0 "}`}>
              {step.content
                ? step.content
                : step.options &&
                renderOptions(step.options, step.selected || "", step.setSelected!)}
            </div>
          </div>
        ))}

        {/* Quantity & Add to Cart */}
        <div>
          <h3 className="md:text-xl text-sm font-bold mb-5">Quantity</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-[#B2B2B2] rounded-full px-4 py-3">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-2 text-lg">-</button>
              <span className="px-4 text-lg font-bold">{quantity.toString().padStart(2, "0")}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="px-2 text-lg">+</button>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white rounded-full px-6 py-3 font-bold hover:bg-primary transition-all"
            >
              Add To Cart {/* — €{totalPrice.toFixed(2)} */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
