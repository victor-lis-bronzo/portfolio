import { cn } from "@/lib/utils";
import { ProjectsBaseProps } from "../_types/projects";

export function Root({ children, className }: ProjectsBaseProps) {
  return (
    <section className={cn("relative w-full bg-background", className)}>
      {children}
    </section>
  );
}
