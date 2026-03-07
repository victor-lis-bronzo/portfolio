"use client";

import { cn } from "@/lib/utils/tailwind.cn";
import { TechsBaseProps } from "../_types/techs";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function Title({ children, className }: TechsBaseProps) {
  return (
    <div className="w-full mx-auto px-8 lg:px-24">
      <RevealOnScroll>
        <h2
          className={cn(
            "text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4",
            className,
          )}
        >
          {children}
        </h2>
      </RevealOnScroll>
    </div>
  );
}
