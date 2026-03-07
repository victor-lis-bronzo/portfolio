"use client";

import { createContext, useContext } from "react";
import { MotionValue } from "framer-motion";

type ProjectsContextType = {
  scrollYProgress: MotionValue<number>;
};

export const ProjectsContext = createContext<ProjectsContextType | null>(null);

export function useProjectsContext() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error(
      "Projects compound components must be rendered within the Projects.Root component",
    );
  }
  return context;
}
