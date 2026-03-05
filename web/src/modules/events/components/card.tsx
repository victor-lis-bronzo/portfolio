import { cn } from "@/lib/utils";
import { EventsBaseProps } from "../_types/events";

export function Card({ children, className }: EventsBaseProps) {
  return (
    <div
      className={cn(
        "group relative h-[60vh] w-[300px] sm:w-[500px] shrink-0 overflow-hidden rounded-3xl bg-neutral-900 shadow-xl transition-all hover:shadow-2xl",
        className,
      )}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />
      {children}
    </div>
  );
}
