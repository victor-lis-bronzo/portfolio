"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ParallaxImage({ src, alt, className }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden w-full h-full", className)}
    >
      <motion.img
        style={{ y, scale: 1.2 }}
        src={src}
        alt={alt}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
  );
}
