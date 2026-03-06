"use client";

import { cn } from "@/lib/utils";
import { TechItemProps } from "../_types/techs";

interface ItemProps extends TechItemProps {
  className?: string;
}

export function Item({ name, className }: ItemProps) {
  return (
    <div
      className={cn(
        "cursor-default transition-all duration-500 ease-out",
        "text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter whitespace-nowrap",
        "text-transparent",
        "hover:text-primary hover:scale-[1.05] hover:-translate-y-2",
        className,
      )}
      style={{
        WebkitTextStroke: "1px rgba(255,255,255,0.2)",
      }}
      onMouseEnter={(e) => {
        // Remove stroke on hover for a clean solid look
        e.currentTarget.style.setProperty("-webkit-text-stroke", "0px");
      }}
      onMouseLeave={(e) => {
        // Restore stroke
        e.currentTarget.style.setProperty(
          "-webkit-text-stroke",
          "1px rgba(255,255,255,0.2)",
        );
      }}
    >
      {name}
    </div>
  );
}
