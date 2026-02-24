"use client";

import { stepsDescriptions } from "@/constants/signupFields";
import { motion } from "framer-motion";

export default function ProgressBar({ currentStep }: { currentStep: number }) {
  const totalSteps = stepsDescriptions.length;
  // Adjusting for 0-based or 1-based index depending on your constant structure
  const currentDesc = stepsDescriptions[currentStep - 1] || "Complete";

  return (
    <div className="w-full max-w-md mx-auto mb-10">
      {/* Header Info */}
      <div className="flex justify-between items-end mb-4">
        <div className="text-left">
          <p className="text-xs font-bold uppercase tracking-widest text-logo/60 mb-1">
            Step {currentStep} of {totalSteps}
          </p>
          <motion.h3
            key={currentStep}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-foreground"
          >
            {currentDesc}
          </motion.h3>
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>

      {/* The Track */}
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const isCompleted = currentStep > i + 1;
          const isActive = currentStep === i + 1;

          return (
            <div
              key={i}
              className="relative h-1.5 w-full bg-muted rounded-full overflow-hidden"
            >
              {/* Background Fill Animation */}
              {(isCompleted || isActive) && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: "circOut",
                    delay: isActive ? 0.2 : 0,
                  }}
                  style={{ originX: 0 }}
                  className={`absolute inset-0 rounded-full ${
                    isCompleted ? "bg-logo/40" : "bg-logo"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
