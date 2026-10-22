"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollRevealImageProps = {
  src: string;
  alt: string;
  className?: string;
  direction?: "left" | "right";
};

export function ScrollRevealImage({
  src,
  alt,
  className,
  direction = "left",
}: ScrollRevealImageProps) {
  const reduce = useReducedMotion();
  const x = direction === "left" ? -48 : 48;

  return (
    <motion.div
      className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-mk-navy/15 ring-1 ring-mk-navy/10",
        className,
      )}
      initial={reduce ? false : { opacity: 0, x, scale: 0.96 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative h-full w-full"
        whileHover={reduce ? undefined : { scale: 1.04 }}
        transition={{ duration: 0.5 }}
      >
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-mk-navy/25 via-transparent to-mk-teal/10" />
      <motion.div
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
        initial={{ x: "-100%" }}
        whileInView={{ x: "200%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
