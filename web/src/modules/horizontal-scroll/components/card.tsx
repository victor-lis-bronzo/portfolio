import { cn } from "@/lib/utils";
import type { HorizontalScrollCardProps } from "../_types/scroll";

export function Card({ children, className }: HorizontalScrollCardProps) {
  return (
    <div
      className={cn(
        "relative flex-shrink-0 w-80 min-h-[280px] rounded-2xl p-6",
        "bg-gray-900/50 backdrop-blur-md border border-white/10",
        "shadow-xl shadow-black/20",
        "transition-all duration-300 ease-out",
        "hover:scale-[1.03] hover:border-primary/30 hover:shadow-primary/10 hover:shadow-2xl",
        className,
      )}
    >
      {children}

      {/* Reflexo sutil */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
