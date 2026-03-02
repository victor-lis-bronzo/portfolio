import { ReactNode } from "react";

export type HeroBaseProps = {
  children: ReactNode;
  className?: string;
};

export type HeroCardProps = HeroBaseProps & {
  rotation?: { x: number; y: number };
};
