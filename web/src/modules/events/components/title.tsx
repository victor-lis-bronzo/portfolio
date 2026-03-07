import { cn } from "@/lib/utils";
import { EventsBaseProps } from "../_types/events";

export function Title({ children, className }: EventsBaseProps) {
  return (
    <h2
      className={cn(
        "text-4xl md:text-5xl font-bold text-white mb-4",
        className,
      )}
    >
      {children}
    </h2>
  );
}
