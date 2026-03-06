"use client";

import { cn } from "@/lib/utils";
import { EventsBaseProps } from "../_types/events";
import { motion } from "framer-motion";

export function Card({ children, className }: EventsBaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative w-full border-b border-white/10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between transition-colors hover:bg-white/5 cursor-pointer",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
