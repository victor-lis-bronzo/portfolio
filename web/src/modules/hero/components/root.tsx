import { cn } from "@/lib/utils";
import { HeroBaseProps } from "../_types/hero";

export function Root({ children, className }: HeroBaseProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden py-6 lg:py-14",
        className,
      )}
    >
      <div className="px-8 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {children}
      </div>
    </section>
  );
}
