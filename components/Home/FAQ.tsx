"use client";

import { FAQ_ITEMS } from "@/constants/landing";
import { useState } from "react";
import AccordionSection from "./Accordion";

export default function FAQ() {
  const [showFAQAnswer, setShowFAQAnswer] = useState<number | null>(null);

  const handleToggleAnswer = (id: number) => {
    setShowFAQAnswer((prev) => (prev !== id ? id : null));
  };

  return (
    <div className="pt-20 pb-10">
      <h2 className="text-[24px] text-center font-bold mb-4">
        Frequent Asked Questions
      </h2>
      <AccordionSection />
    </div>
  );
}
