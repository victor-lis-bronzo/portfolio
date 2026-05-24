import { cn } from "@/lib/utils";
import { ProjectsBaseProps } from "../_types/projects";

export function Grid({ children, className }: ProjectsBaseProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-8 md:px-24",
        className,
      )}
    >
      {children}
    </div>
  );
}
