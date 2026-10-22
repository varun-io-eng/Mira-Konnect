"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type BrandVisualPanelProps = {
  badge?: string;
  direction?: "left" | "right";
  className?: string;
  children: ReactNode;
  delay?: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function BrandVisualPanel({
  direction = "left",
  className,
  children,
  delay = 0,
}: BrandVisualPanelProps) {
  const reduce = useReducedMotion();
  const enterX = direction === "left" ? -96 : 96;

  return (
    <motion.div
      className={cn("relative flex h-full min-h-0 flex-col", className)}
      initial={reduce ? false : { opacity: 0, x: enterX, scale: 0.92 }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease }}
    >
      <motion.figure
        className="group relative flex h-full min-h-[220px] flex-1 flex-col overflow-hidden rounded-3xl shadow-2xl shadow-mk-navy/20 ring-1 ring-white/10 lg:min-h-0"
        whileHover={reduce ? undefined : { y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      >
        <div className="pointer-events-none absolute bottom-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20">
          <span className="h-2 w-2 rounded-full bg-[#ffd166] shadow-[0_0_8px_#ffd166]" aria-hidden />
        </div>

        <div className="relative min-h-[220px] w-full flex-1 lg:min-h-0">{children}</div>
      </motion.figure>

      <div
        className="absolute -bottom-1 left-12 right-12 h-px rounded-full bg-gradient-to-r from-transparent via-mk-teal/60 to-transparent"
        aria-hidden
      />
    </motion.div>
  );
}
