import { cn } from "@/lib/utils";
import { HeroBaseProps } from "../_types/hero";

export function Actions({ children, className }: HeroBaseProps) {
  return (
    <div className={cn("flex flex-wrap gap-4 mt-4", className)}>{children}</div>
  );
}
