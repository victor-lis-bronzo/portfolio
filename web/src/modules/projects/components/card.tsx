"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { ProjectData } from "../_types/projects";

type CardProps = {
  project: ProjectData;
  className?: string;
};

export function Card({ project, className }: CardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // For the individual card, we track its position within the viewport
  // to create the internal parallax effect for the image.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // When the card is horizontal scrolling, useScroll on the whole page won't directly map to the card's horizontal movement if it's based on a sticky track.
    // Actually, since the scroll is vertical and the track is sticky, the card's bounding box moves horizontally.
    // A simple trick for parallax inside a sticky horizontal scroll is just to use the global scrollYProgress from the context,
    // or we just bind it to the card's hover to keep it simple and performant, OR mapping from the main context.
  });

  // Let's create a subtle hover-based parallax instead or rely on the general scroll
  // Given we're in a compound component, tracking the main context might be easier for a forced parallax.

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative flex flex-col justify-end w-[85vw] md:w-[60vw] max-w-4xl h-[70vh] rounded-3xl overflow-hidden shrink-0 border border-white/20 bg-white/5 backdrop-blur-xl p-8 md:p-12 transition-colors hover:border-white/30 z-10",
        className,
      )}
    >
      {/* Background Image with Parallax / Zoom effect */}
      <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
        <div className="w-full h-full transform transition-transform duration-1000 group-hover:scale-110">
          {/* We use an img tag for simplicity or Next Image if domains are configured. Using img for generic urls from mock. */}
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover opacity-70 transition-opacity duration-700 group-hover:opacity-100"
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 max-lg:hidden">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white backdrop-blur-md border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            {project.title}
          </h3>
          <p className="text-gray-300 md:text-lg max-w-xl line-clamp-2">
            {project.description}
          </p>
        </div>

        {project.link && (
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              // "group/btn",
              "relative",
              "flex",
              "items-center",
              "gap-3",
              "px-6",
              "py-3",
              "rounded-full",
              "bg-secondary/0",
              "border",
              "border-white/20",
              "backdrop-blur-md",
              "transition-all",
              // "hover:border-white",
              "flex",
              "items-center",
              "justify-center",
              "min-w-fit",
              "hover:opacity-85",
            )}
          >
            <span className="text-sm font-semibold uppercase tracking-wider">
              Ver Projeto
            </span>
            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-current text-current">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
