import { cn } from "@/lib/utils";
import { HeroBaseProps } from "../_types/hero";

export function Description({ children, className }: HeroBaseProps) {
  return (
    <p
      className={cn(
        "text-lg text-gray-400 max-w-lg leading-relaxed",
        className,
      )}
    >
      {children}
    </p>
  );
}
