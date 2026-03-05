"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { EventsBaseProps } from "../_types/events";
import { useEventsContext } from "./root";

export function List({ children, className }: EventsBaseProps) {
  const { scrollYProgress, direction } = useEventsContext();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // We mount logic to prevent hydration mismatch for width/scroll calculations
  useEffect(() => {
    setShouldAnimate(true);
  }, []);

  // Frame motion string transforms.
  // The magic here is mapping the progress [0, 1] to ["0%", "calc(-100% + 100vw)"]
  // This pushes the motion div to the left exactly until the right edge of its content hits the right edge of the screen.
  // If direction is rtl, we map it backwards.

  // Note: For perfect precision on all window sizes, we rely on CSS calc.
  // Next/FramerMotion handles inline CSS calc smoothly.

  const ltrTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "calc(-100% + 100vw)"],
  );

  const rtlTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ["calc(-100% + 100vw)", "0%"],
  );

  const xTransform = direction === "ltr" ? ltrTransform : rtlTransform;

  return (
    <div
      className={cn(
        "sticky top-0 flex h-screen items-center overflow-hidden",
        className,
      )}
    >
      <motion.div
        style={{ x: shouldAnimate ? xTransform : 0 }}
        className="flex gap-8 px-8 w-max"
      >
        {children}
      </motion.div>
    </div>
  );
}
