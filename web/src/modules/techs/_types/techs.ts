export interface TechItemProps {
  id: string;
  name: string;
}

export interface TechsBaseProps {
  children: React.ReactNode;
  className?: string;
}

export interface TechsMarqueeProps extends TechsBaseProps {
  speed?: number;
  direction?: "left" | "right";
}
