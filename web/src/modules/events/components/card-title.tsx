import { cn } from "@/lib/utils";
import { EventsBaseProps } from "../_types/events";

export function CardTitle({ children, className }: EventsBaseProps) {
  return (
    <h3
      className={cn(
        "text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors",
        className,
      )}
    >
      {children}
    </h3>
  );
}
