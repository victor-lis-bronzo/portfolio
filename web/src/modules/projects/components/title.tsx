"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProjectsBaseProps } from "../_types/projects";
import { useProjectsContext } from "../context";

export function Title({ children, className }: ProjectsBaseProps) {
  const { scrollYProgress } = useProjectsContext();

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden z-0">
      <motion.h2
        className={cn(
          "text-[15vw] md:text-[20vw] font-black uppercase tracking-tighter text-white/3 select-none whitespace-nowrap",
          className,
        )}
      >
        {children}
      </motion.h2>
    </div>
  );
}
