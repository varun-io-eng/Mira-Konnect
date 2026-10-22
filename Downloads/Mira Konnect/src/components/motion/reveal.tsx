"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  /** Slide distance in px (horizontal directions use larger default) */
  distance?: number;
  /** Subtle zoom-in while entering */
  scale?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance,
  scale = false,
}: RevealProps) {
  const reduce = useReducedMotion();
  const d =
    distance ??
    (direction === "left" || direction === "right" ? 72 : 32);

  const offset = {
    up: { y: d, x: 0 },
    down: { y: -d, x: 0 },
    left: { x: -d, y: 0 },
    right: { x: d, y: 0 },
  }[direction];

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset, scale: scale ? 0.94 : 1 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  staggerMs = 0.12,
}: {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: staggerMs } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const hidden =
    direction === "left"
      ? { opacity: 0, x: -48, y: 0 }
      : direction === "right"
        ? { opacity: 0, x: 48, y: 0 }
        : { opacity: 0, y: 24, x: 0 };

  return (
    <motion.div
      className={className}
      variants={{
        hidden,
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.6, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
