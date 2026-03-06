"use client";

import { cn } from "@/lib/utils";
import { EventsBaseProps } from "../_types/events";

export function Root({ children, className }: EventsBaseProps) {
  return (
    <section
      className={cn(
        "relative w-full py-24 bg-background overflow-hidden",
        className,
      )}
    >
      {children}
    </section>
  );
}
