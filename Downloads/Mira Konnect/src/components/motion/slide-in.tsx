"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SlideFrom = "left" | "right" | "up";

type SlideInProps = {
  children: ReactNode;
  from: SlideFrom;
  className?: string;
  delay?: number;
  /** Horizontal travel in px (left/right) */
  distance?: number;
  once?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function SlideIn({
  children,
  from,
  className,
  delay = 0,
  distance = 88,
  once = true,
}: SlideInProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const initial = {
    opacity: 0,
    x: from === "left" ? -distance : from === "right" ? distance : 0,
    y: from === "up" ? 48 : 0,
    scale: from === "up" ? 1 : 0.97,
    filter: "blur(8px)",
  };

  return (
    <motion.div
      className={cn(className)}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Alternating left / right for grid items */
export function slideFromIndex(index: number): SlideFrom {
  return index % 2 === 0 ? "left" : "right";
}
