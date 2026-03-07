"use client";

import { motion, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProjectsBaseProps } from "../_types/projects";
import { useProjectsContext } from "../context";

export function Track({ children, className }: ProjectsBaseProps) {
  const { scrollYProgress } = useProjectsContext();

  // Move the track horizontally from 0% (x: 0) to -100% of its inner width
  // Wait, framer-motion x: "-100%" translates by its own width.
  // We want to translate it by (its width - window width) to stop at the last card.
  // The easiest way is mapping 0..1 to "0%".."-100%" on a container that stretches all cards out,
  // but if we do -100%, it will slide completely off screen.
  // A common GSAP technique: x = "-100vw * (cards - 1)" or similar.
  // If the inner content is exactly the width it needs to be, we can use useTransform
  // with x: `calc(-100% + 100vw)`.
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["calc(0% + 0vw)", "calc(-100% + 100vw)"],
  );

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
      <motion.div
        style={{ x }}
        className={cn("flex w-max gap-8 px-8 md:px-24", className)}
      >
        {children}
      </motion.div>
    </div>
  );
}
