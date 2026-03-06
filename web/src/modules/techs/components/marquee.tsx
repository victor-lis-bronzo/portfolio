"use client";

import { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { TechsMarqueeProps } from "../_types/techs";

export function Marquee({
  children,
  className,
  speed = 1,
  direction = "left",
}: TechsMarqueeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const baseX = useMotionValue(0);

  // Speed factor that slows down heavily on hover
  const currentSpeed = isHovered ? speed * 0.1 : speed;

  const wrapPoint = -50;

  useAnimationFrame((t, delta) => {
    let moveBy = direction === "left" ? -1 : 1;
    // Multiplicador base para uma velocidade agradável no framerate padrão
    moveBy *= currentSpeed * (delta / 1000) * 20;

    let newX = baseX.get() + moveBy;

    if (direction === "left" && newX <= wrapPoint) {
      newX = 0;
    } else if (direction === "right" && newX >= 0) {
      newX = wrapPoint;
    }

    baseX.set(newX);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <div
      className={cn(
        "w-full overflow-hidden flex whitespace-nowrap py-4",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex gap-8 lg:gap-16 items-center px-4 w-max"
        style={{ x }}
      >
        <div className="flex gap-8 lg:gap-16 items-center shrink-0">
          {children}
        </div>
        <div className="flex gap-8 lg:gap-16 items-center shrink-0">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
