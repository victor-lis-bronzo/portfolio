import type { ReactNode } from "react";

export type ScrollDirection = "ltr" | "rtl";

export type HorizontalScrollRootProps = {
  children: ReactNode;
  className?: string;
  direction?: ScrollDirection;
};

export type HorizontalScrollCardProps = {
  children: ReactNode;
  className?: string;
};
