// src/modules/hero/components/card.tsx
import { cn } from "@/lib/utils/tailwind.cn";
import { HeroCardProps } from "../_types/hero";

export function Card({ children, className }: HeroCardProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-2xl aspect-[16/10] bg-gray-900/40 border border-white/10 rounded-xl p-4",
        "backdrop-blur-sm shadow-2xl shadow-foreground/20",

        "transform transition-all duration-700 ease-out hover:scale-[1.02]",

        "rounded-xl bg-gray-900/40 backdrop-blur-sm border border-white/10",

        "transform rotate-y-[-12deg] rotate-x-[5deg] hover:rotate-y-[-5deg] hover:rotate-x-[2deg] transition-all duration-500",
        className,
      )}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative h-full w-full flex flex-col gap-4">
        <div className="flex gap-2 px-1">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
        </div>

        <div className="flex-1 rounded-lg bg-[#0B0A15]/50 border border-white/5 overflow-hidden relative">
          {children}
        </div>
      </div>

      {/* Brilho/Reflexo ajustado */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
    </div>
  );
}
