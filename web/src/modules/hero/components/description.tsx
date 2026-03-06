"use client";

import { cn } from "@/lib/utils";
import { HeroBaseProps } from "../_types/hero";
import { motion } from "framer-motion";

export function Description({ children, className }: HeroBaseProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className={cn(
        "text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed font-medium",
        className,
      )}
    >
      {children}
    </motion.p>
  );
}
