"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { HeroBaseProps } from "../_types/hero";
import { useScroll, useTransform, motion } from "framer-motion";

export function Root({ children, className }: HeroBaseProps) {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(1000);

  useEffect(() => {
    setVh(window.innerHeight);
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scale = useTransform(scrollY, [0, vh], [1, 0.85]);
  const opacity = useTransform(scrollY, [0, vh], [1, 0.4]);

  return (
    <section className={cn("sticky top-0 h-screen w-full -z-10", className)}>
      <motion.div
        style={{ scale, opacity }}
        className="w-full h-full origin-top flex items-center justify-center py-6 lg:py-14 overflow-hidden"
      >
        <div className="px-8 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {children}
        </div>
      </motion.div>
    </section>
  );
}
