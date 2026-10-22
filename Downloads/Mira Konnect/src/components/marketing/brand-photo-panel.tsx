"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type BrandPhotoPanelProps = {
  src: string;
  alt: string;
  badge: string;
  caption: string;
  direction?: "left" | "right";
  className?: string;
};

export function BrandPhotoPanel({
  src,
  alt,
  badge,
  caption,
  direction = "left",
  className,
}: BrandPhotoPanelProps) {
  const reduce = useReducedMotion();
  const x = direction === "left" ? -28 : 28;

  return (
    <motion.div
      className={cn("relative", className)}
      initial={reduce ? false : { opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-mk-teal/20 via-transparent to-[#ffd166]/15 blur-xl"
          animate={{ opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      )}

      <motion.figure
        className="group relative overflow-hidden rounded-3xl bg-mk-navy shadow-2xl shadow-mk-navy/20 ring-1 ring-white/10"
        whileHover={reduce ? undefined : { y: -4 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      >
        <div className="absolute left-0 top-0 z-20 m-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-mk-navy shadow-md backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-mk-teal" aria-hidden />
            Mira Konnect
          </span>
        </div>

        <div className="absolute right-0 top-0 z-20 m-4">
          <span className="rounded-full bg-mk-teal/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-md">
            {badge}
          </span>
        </div>

        <div className="relative aspect-[4/5] w-full sm:aspect-[5/6]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-mk-navy/85 via-mk-navy/15 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-mk-teal/25 via-transparent to-transparent opacity-80" />
        </div>

        <figcaption className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-6">
          <p className="font-display text-lg font-semibold text-white sm:text-xl">{caption}</p>
          <p className="mt-1 text-sm text-white/75">
            Human-led recruitment across India
          </p>
        </figcaption>

        {!reduce && (
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
            initial={{ x: "-100%" }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.9 }}
          />
        )}
      </motion.figure>

      <div
        className="absolute -bottom-2 left-8 right-8 h-1 rounded-full bg-gradient-to-r from-mk-teal via-[#ffd166] to-mk-coral"
        aria-hidden
      />
    </motion.div>
  );
}
