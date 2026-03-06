"use client";

import { cn } from "@/lib/utils";
import { HeroBaseProps } from "../_types/hero";
import { motion } from "framer-motion";

export function Title({ children, className }: HeroBaseProps) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "text-[12vw] lg:text-[8xl] font-black uppercase tracking-tighter text-foreground leading-[0.85] z-20",
        className,
      )}
    >
      {children}
    </motion.h1>
  );
}
