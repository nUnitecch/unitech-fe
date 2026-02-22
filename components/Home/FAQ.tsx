"use client";

import { FAQ_ITEMS } from "@/constants/landing";
import { useState } from "react";

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
      <ul className="grid grid-cols-1 gap-x-5 gap-y-8">
        {FAQ_ITEMS.map((faq) => (
          <li key={faq.id} className="w-full shadow-md">
            <div className="flex w-full items-center gap-2 shadow-xs p-3">
              <span
                className="px-1 inline-block"
                onClick={() => handleToggleAnswer(faq.id)}
              >
                {showFAQAnswer === faq.id ? "-" : "+"}
              </span>
              <h4 className="text-[16px] font-regular">{faq.question}</h4>
            </div>
            <p
              className={`transition-all duration-300 ${
                showFAQAnswer === faq.id
                  ? "h-auto py-3 px-5"
                  : "h-0 overflow-hidden"
              }`}
            >
              {faq.answer}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
