import { cn } from "@/lib/utils";
import { HeroBaseProps } from "../../_types/hero";

export function Title({ children, className }: HeroBaseProps) {
  return (
    <h1
      className={cn(
        "text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]",
        className,
      )}
    >
      {children}
    </h1>
  );
}