"use client";

import { cn } from "@/lib/utils";
import { HeroBaseProps } from "../_types/hero";
import { motion } from "framer-motion";

export function Actions({ children, className }: HeroBaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      className={cn("flex flex-wrap gap-6 mt-8 relative z-30", className)}
    >
      {children}
    </motion.div>
  );
}
