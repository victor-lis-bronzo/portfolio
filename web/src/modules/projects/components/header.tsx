"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProjectsBaseProps } from "../_types/projects";

export function Header({ children, className }: ProjectsBaseProps) {
  return (
    <div
      className={cn(
        "px-8 md:px-24 mb-12 flex flex-col gap-4 relative z-10",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="flex flex-col gap-2"
      >
        <span className="text-sm font-bold uppercase tracking-widest text-white/40">
          Portfolio
        </span>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none">
          {children || "Projetos Selecionados"}
        </h2>
      </motion.div>
    </div>
  );
}
