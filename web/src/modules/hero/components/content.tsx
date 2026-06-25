import { cn } from "@/lib/utils";
import { HeroBaseProps } from "../_types/hero";

export function Content({ children, className }: HeroBaseProps) {
  return (
    <div className={cn("flex flex-col gap-6 flex-1 w-full lg:w-1/2 lg:max-w-xl", className)}>
      {children}
    </div>
  );
}
