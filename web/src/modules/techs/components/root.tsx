import { cn } from "@/lib/utils/tailwind.cn";
import { TechsBaseProps } from "../_types/techs";

export function Root({ children, className }: TechsBaseProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-background py-24 flex flex-col gap-12 z-10",
        className,
      )}
    >
      {children}
    </section>
  );
}
