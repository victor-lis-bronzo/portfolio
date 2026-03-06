import { cn } from "@/lib/utils";
import { HeroBaseProps } from "../_types/hero";

export function Visuals({ children, className }: HeroBaseProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center lg:justify-end perspective-[1200px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
