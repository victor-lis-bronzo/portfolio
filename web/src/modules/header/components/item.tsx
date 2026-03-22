import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnchorHTMLAttributes } from "react";

interface ItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  active?: boolean;
}

export function Item({
  href,
  active,
  className,
  children,
  ...props
}: ItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        active ? "text-foreground" : "text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
