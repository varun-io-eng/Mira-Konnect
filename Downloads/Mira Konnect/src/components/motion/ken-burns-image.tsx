"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type KenBurnsImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  objectPosition?: string;
  overlayClassName?: string;
};

export function KenBurnsImage({
  src,
  alt,
  priority,
  className,
  objectPosition = "center",
  overlayClassName,
}: KenBurnsImageProps) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          style={{ objectPosition }}
          sizes="100vw"
        />
      </motion.div>
      {overlayClassName ? <div className={cn("absolute inset-0", overlayClassName)} /> : null}
    </div>
  );
}
