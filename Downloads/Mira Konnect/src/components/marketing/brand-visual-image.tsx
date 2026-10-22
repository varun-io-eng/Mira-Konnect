"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type BrandVisualImageProps = {
  src: string;
  alt: string;
  /** Soft color wash to tie image to Mira Konnect palette */
  tint?: "teal" | "coral" | "neutral";
  className?: string;
  priority?: boolean;
};

export function BrandVisualImage({
  src,
  alt,
  tint = "teal",
  className,
  priority,
}: BrandVisualImageProps) {
  const reduce = useReducedMotion();

  const tintClass =
    tint === "coral"
      ? "from-mk-coral/20 via-transparent to-mk-navy/30"
      : tint === "neutral"
        ? "from-mk-navy/25 via-transparent to-transparent"
        : "from-mk-teal/25 via-transparent to-mk-navy/35";

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-mk-navy", className)}>
      <motion.div
        className="absolute inset-[-4%] h-[108%] w-[108%]"
        animate={
          reduce
            ? undefined
            : {
                scale: [1, 1.06, 1],
                x: ["0%", "-1.5%", "0%"],
                y: ["0%", "-1%", "0%"],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </motion.div>

      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-t",
          tintClass,
        )}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-mk-navy/40 via-transparent to-transparent opacity-70"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
        aria-hidden
      />
    </div>
  );
}
