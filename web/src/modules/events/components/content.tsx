import { cn } from "@/lib/utils";
import { EventsBaseProps } from "../_types/events";

export function Content({ children, className }: EventsBaseProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center justify-between gap-4 w-full relative z-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
