import { cn } from "@/lib/utils";
import { EventsBaseProps } from "../_types/events";

export function Content({ children, className }: EventsBaseProps) {
  return (
    <div
      className={cn(
        "absolute bottom-0 z-20 flex w-full flex-col justify-end p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
