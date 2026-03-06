"use client";

import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { motion, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export function EventImage({ className, alt, ...props }: ImageProps) {
  const imgRef = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { damping: 25, stiffness: 200 });
  const y = useSpring(0, { damping: 25, stiffness: 200 });

  useEffect(() => {
    const parent = imgRef.current?.closest(".group");

    if (!parent) return;

    const handleMouseEnter = () => parent.classList.add("is-hovered");
    const handleMouseLeave = () => parent.classList.remove("is-hovered");
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      x.set(mouseEvent.clientX - 150); // 300px width / 2
      y.set(mouseEvent.clientY - 150); // 300px height / 2
    };

    parent.addEventListener("mouseenter", handleMouseEnter);
    parent.addEventListener("mouseleave", handleMouseLeave);
    parent.addEventListener("mousemove", handleMouseMove);

    return () => {
      parent.removeEventListener("mouseenter", handleMouseEnter);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      parent.removeEventListener("mousemove", handleMouseMove);
    };
  }, [x, y]);

  return (
    <motion.div
      ref={imgRef}
      style={{ x, y }}
      className={cn(
        "fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none z-50 opacity-0 transition-opacity duration-300 group-[.is-hovered]:opacity-100 overflow-hidden rounded-xl",
        className,
      )}
    >
      <Image alt={alt} fill className="object-cover" sizes="300px" {...props} />
    </motion.div>
  );
}
