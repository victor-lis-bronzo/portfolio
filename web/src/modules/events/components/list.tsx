"use client";

import { cn } from "@/lib/utils";
import { EventsBaseProps } from "../_types/events";

export function List({ children, className }: EventsBaseProps) {
  return (
    <div
      className={cn(
        "w-full max-w-screen-2xl mx-auto px-6 lg:px-12 flex flex-col",
        className,
      )}
    >
      <div className="border-t border-white/10 w-full" />
      {children}
    </div>
  );
}
