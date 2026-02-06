"use client";
import React, { useState } from "react";
import CladdingSteps from "./CladdingSteps";
import DeckingSteps from "./DeckingSteps";
import FencingSteps from "./FencingSteps";


export default function StepsForm() {
  const [category, setCategory] = useState<string>("cladding"); // state lifted up

    return (
        <>
            {/* Render the right component and pass setCategory */}
      {category === "cladding" && <CladdingSteps category={category} setCategory={setCategory} />}
      {category === "decking" && <DeckingSteps category={category} setCategory={setCategory} />}
      {category === "fencing" && <FencingSteps category={category} setCategory={setCategory} />}
        </>
    );
}
