import { cn } from "@/lib/utils";
import { EventsBaseProps } from "../_types/events";

export function EventDate({ children, className }: EventsBaseProps) {
  return (
    <div
      className={cn(
        "mb-3 w-fit rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
