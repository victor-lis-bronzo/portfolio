import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Actions({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
      {children}
    </div>
  );
}
