import { cn } from "@/lib/utils";
import { HeroBaseProps } from "../../_types/hero";

export function Content({ children, className }: HeroBaseProps) {
  return <div className={cn("flex flex-col gap-6", className)}>{children}</div>;
}
