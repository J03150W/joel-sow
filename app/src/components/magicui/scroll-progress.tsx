"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion"; // use 'framer-motion', not 'motion/react'
import React, { useRef } from "react";

interface ScrollProgressProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  ScrollProgressProps
>(({ className, ...props }, ref) => {
  const targetRef = useRef(null);

  // track only scroll progress of the target element
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"], // starts at 0 when target enters, 1 when it leaves
  });

  return (
    <>
      {/* Target section */}
      <div ref={targetRef} className="relative w-screen">
        {props.children}
      </div>

      {/* Progress bar fixed in the center of the screen */}
      <motion.div
        ref={ref}
        className={cn(
          "fixed top-1/4 -translate-x-1/2 -translate-y-1/2 h-3 w-full origin-left rounded-md bg-gradient-to-r from-[#d0d0d0] via-[#eaeaea] to-[#ffffff] z-50",
          className
        )}
        style={{
          scaleX: scrollYProgress,
        }}
      />
    </>
  );
});

ScrollProgress.displayName = "ScrollProgress";
