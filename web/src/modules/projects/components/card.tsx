"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProjectData } from "../_types/projects";

type CardProps = {
  project: ProjectData;
  index?: number;
  className?: string;
};

export function Card({ project, index = 0, className }: CardProps) {
  const isWide = index % 3 === 0;

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl aspect-[4/3] min-h-full cursor-pointer",
        "border border-white/10 bg-white/5",
        isWide && "lg:col-span-2 aspect-[4/3] lg:aspect-[8/3]",
        className,
      )}
    >
      {/* Background Image with Zoom effect */}
      <img
        src={project.imageUrl}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:blur-[2px] group-hover:brightness-[80%] group-hover:scale-105"
      />

      {/* Gradient Overlay for better contrast */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/90 group-hover:via-black/50" /> */}

      {/* Content wrapper anchored to bottom */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col z-10">
        {/* Project Title */}
        <h3 className="px-6 pb-5 text-xl md:text-2xl font-bold text-white tracking-tight">
          {project.title}
        </h3>

        {/* Tech Pills Overlay - expands from 0 height on hover */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <div className="overflow-hidden">
            <div className="flex flex-wrap gap-2 px-6 pb-6 w-[90%] md:w-3/4">
              {project.techs.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("block w-full", isWide && "lg:col-span-2")}
      >
        {content}
      </a>
    );
  }

  return content;
}
