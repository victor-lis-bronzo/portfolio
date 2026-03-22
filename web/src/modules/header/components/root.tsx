import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Root({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </header>
  );
}
