"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import type { HorizontalScrollRootProps } from "../_types/scroll";

export function Root({
  children,
  className,
  direction = "rtl",
}: HorizontalScrollRootProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    function calcRange() {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const overflow = trackWidth - viewportWidth;

      if (overflow <= 0) {
        setRange([0, 0]);
        return;
      }

      if (direction === "rtl") {
        setRange([viewportWidth * 0.2, -(overflow + viewportWidth * 0.2)]);
      } else {
        setRange([-(overflow + viewportWidth * 0.2), viewportWidth * 0.2]);
      }
    }

    calcRange();
    window.addEventListener("resize", calcRange);
    return () => window.removeEventListener("resize", calcRange);
  }, [direction, children]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], range);

  return (
    <section ref={sectionRef} className={cn("relative h-[300vh]", className)}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-6 px-8 will-change-transform"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
