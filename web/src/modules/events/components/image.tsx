import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export function EventImage({ className, alt, ...props }: ImageProps) {
  return (
    <Image
      alt={alt}
      fill
      className={cn(
        "object-cover transition-transform duration-700 group-hover:scale-105",
        className,
      )}
      sizes="(max-width: 768px) 300px, 500px"
      {...props}
    />
  );
}
