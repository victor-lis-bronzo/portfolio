import { cn } from "@/lib/utils";
import { EventsBaseProps } from "../_types/events";

export function EventDate({ children, className }: EventsBaseProps) {
  return (
    <div
      className={cn(
        "w-fit rounded-full border border-primary/20 bg-primary/10 px-6 py-2 text-sm font-semibold uppercase tracking-widest text-primary backdrop-blur-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
