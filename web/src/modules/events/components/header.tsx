import { cn } from "@/lib/utils";
import { EventsBaseProps } from "../_types/events";

export function Header({ children, className }: EventsBaseProps) {
  return (
    <div className={cn("px-8 lg:px-24 w-full mx-auto mb-8", className)}>
      {children}
    </div>
  );
}
