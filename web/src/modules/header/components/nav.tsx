import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Nav({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("hidden md:flex items-center gap-8", className)}
      {...props}
    >
      {children}
    </nav>
  );
}
