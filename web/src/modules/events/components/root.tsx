"use client";

import { createContext, useContext, useRef } from "react";
import { useScroll, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { EventsBaseProps } from "../_types/events";

type Direction = "ltr" | "rtl";

type EventsContextType = {
  scrollYProgress: MotionValue<number>;
  direction: Direction;
};

const EventsContext = createContext<EventsContextType | null>(null);

export function useEventsContext() {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("Events components must be used within an Events.Root");
  }
  return context;
}

type RootProps = EventsBaseProps & {
  direction?: Direction;
  containerHeight?: string;
};

export function Root({
  children,
  direction = "ltr",
  containerHeight = "300vh",
  className,
}: RootProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  return (
    <EventsContext.Provider value={{ scrollYProgress, direction }}>
      <section
        ref={targetRef}
        style={{ height: containerHeight }}
        className={cn("relative w-full", className)}
      >
        {children}
      </section>
    </EventsContext.Provider>
  );
}
