import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollContextType {
  scrollYProgress: MotionValue<number>;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("HorizontalScroll components must be used within a HorizontalScroll.Root");
  }
  return context;
};

interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
}

const Root = ({ children, className, height = "250vh", ...props }: RootProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  return (
    <ScrollContext.Provider value={{ scrollYProgress }}>
      <section ref={targetRef} style={{ height }} className={cn("relative w-full bg-transparent overflow-clip", className)} {...props}>
        <div className="sticky top-0 h-screen flex flex-col md:flex-row items-center overflow-hidden">
          {children}
        </div>
      </section>
    </ScrollContext.Provider>
  );
};

const Header = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("w-full md:w-[40%] flex flex-col justify-center px-6 md:px-12 lg:px-24 mb-8 md:mb-0 shrink-0", className)} {...props}>
      {children}
    </div>
  );
};

const Title = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h2 className={cn("text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-4 text-white", className)} {...props}>
      {children}
    </h2>
  );
};

const Description = ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={cn("text-lg text-muted-foreground max-w-md", className)} {...props}>
      {children}
    </p>
  );
};

const Content = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { scrollYProgress } = useScrollContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const updateScrollRange = () => {
      if (contentRef.current && contentRef.current.parentElement) {
        const scrollWidth = contentRef.current.scrollWidth;
        const parentWidth = contentRef.current.parentElement.offsetWidth;

        // Calculate the necessary translation. We subtract parentWidth from scrollWidth to know the overflow.
        // We add a padding offset so it doesn't clip the last card directly against the screen.
        const range = Math.min(0, -(scrollWidth - parentWidth) - 48);
        setScrollRange(range);
      }
    };

    updateScrollRange();

    // Listen for resize events
    window.addEventListener("resize", updateScrollRange);

    // Observer for DOM mutations (like images loading inside the cards)
    const observer = new ResizeObserver(updateScrollRange);
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateScrollRange);
      observer.disconnect();
    };
  }, [children]);

  // Map scroll progress to X-axis translation
  const x = useTransform(scrollYProgress, [0, 1], [0, scrollRange]);

  return (
    <div className={cn("w-full md:w-[60%] flex items-center overflow-hidden pl-6 md:pl-0", className)} {...props}>
      <motion.div ref={contentRef} style={{ x }} className="flex gap-6 pr-12 w-max">
        {children}
      </motion.div>
    </div>
  );
};

const Card = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md shadow-lg",
        "w-[320px] sm:w-[400px] h-[400px] sm:h-[480px] shrink-0 p-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const HorizontalScroll = {
  Root,
  Header,
  Title,
  Description,
  Content,
  Card,
};
