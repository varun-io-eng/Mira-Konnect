"use client";

import { sunsetLogoSrc } from "@/lib/brand-assets";
import { cn } from "@/lib/utils";

type SunsetMarkProps = {
  className?: string;
  size?: "sm" | "md" | "lg" | "compact" | "banner" | "card" | "list" | "strip";
};

/** M mark is ~3:2 — avoid square boxes that clip the artwork */
const sizeClass: Record<Exclude<SunsetMarkProps["size"], undefined>, string> = {
  sm: "h-9 w-[3.4rem]",
  md: "h-10 w-[3.75rem]",
  lg: "h-12 w-[4.5rem]",
  compact: "h-7 w-[2.65rem] sm:h-8 sm:w-[3rem]",
  banner: "h-10 w-[3.75rem] sm:h-11 sm:w-[4.15rem]",
  card: "h-14 w-[5.25rem] sm:h-16 sm:w-[6rem]",
  list: "h-14 w-[5.25rem] sm:h-16 sm:w-[6rem]",
  strip: "h-12 w-[4.5rem]",
};

export function SunsetMark({ className, size = "md" }: SunsetMarkProps) {
  return (
    <span
      className={cn("relative inline-block shrink-0 leading-none", sizeClass[size], className)}
      aria-hidden
    >
      <img
        src={sunsetLogoSrc}
        alt="Mira Konnect"
        className="block h-full w-full object-contain object-center"
        decoding="async"
        draggable={false}
      />
    </span>
  );
}
