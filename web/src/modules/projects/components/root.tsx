"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProjectsBaseProps } from "../_types/projects";
import { ProjectsContext } from "../context";

export function Root({ children, className }: ProjectsBaseProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Track the scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <ProjectsContext.Provider value={{ scrollYProgress }}>
      <section
        ref={containerRef}
        className={cn("relative w-full bg-background h-[300vh]", className)}
      >
        {children}
      </section>
    </ProjectsContext.Provider>
  );
}
