"use client";

import React, { useRef } from "react";
import { HTMLMotionProps, motion, useInView } from "framer-motion";

interface FadeInViewType extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

const fadeInVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function FadeInView({
  children,
  className,
  ...props
}: FadeInViewType) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      variants={fadeInVariants}
      initial="hidden"
      animate={inView ? "visible" : ""}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface FadeFeatureInView extends FadeInViewType {}

export function FadeFeatureInView({
  children,
  className,
  ...props
}: FadeFeatureInView) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={
        inView && {
          opacity: 1,
          y: 0,
        }
      }
      transition={{ duration: 0.3 }}
      {...props}
      className={`${className}`}
    >
      {children}
    </motion.div>
  );
}
