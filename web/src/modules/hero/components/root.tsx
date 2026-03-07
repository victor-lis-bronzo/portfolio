"use client";

import { cn } from "@/lib/utils";
import { HeroBaseProps } from "../_types/hero";
import { useScroll, useTransform, motion } from "framer-motion";

export function Root({ children, className }: HeroBaseProps) {
  const { scrollY } = useScroll();

  const scale = useTransform(scrollY, (y) => {
    const vh = typeof window !== "undefined" ? window.innerHeight : 1000;
    const progress = Math.min(Math.max(y / vh, 0), 1);
    return 1 - progress * 0.15;
  });

  const opacity = useTransform(scrollY, (y) => {
    const vh = typeof window !== "undefined" ? window.innerHeight : 1000;
    const progress = Math.min(Math.max(y / vh, 0), 1);
    return 1 - progress * 0.6;
  });

  return (
    <section
      className={cn(
        "sticky top-0 h-screen w-full bg-background overflow-hidden",
        className,
      )}
    >
      <motion.div
        style={{ scale, opacity }}
        className="w-full h-full origin-top flex items-center justify-center py-6 lg:py-14 px-2"
      >
        <div className="px-6 lg:px-12 w-full max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-12 items-center justify-between">
          {children}
        </div>
      </motion.div>
    </section>
  );
}
