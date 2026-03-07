import { cn } from "@/lib/utils";
import { EventsBaseProps } from "../_types/events";

export function Description({ children, className }: EventsBaseProps) {
  return (
    <p className={cn("text-xl text-gray-400 max-w-2xl", className)}>
      {children}
    </p>
  );
}
