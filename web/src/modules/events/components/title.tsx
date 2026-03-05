import { cn } from "@/lib/utils";
import { EventsBaseProps } from "../_types/events";

export function Title({ children, className }: EventsBaseProps) {
  return (
    <h3
      className={cn(
        "text-2xl font-bold tracking-tight text-white sm:text-3xl",
        className,
      )}
    >
      {children}
    </h3>
  );
}
