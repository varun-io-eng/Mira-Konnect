"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type IndustryImagePanelProps = {
  src: string;
  alt: string;
  /** Tailwind height classes for the panel shell */
  panelClassName?: string;
  /** contain = full artwork visible; cover = fill fixed-height panel (home cards only) */
  fit?: "cover" | "contain";
  sizes: string;
  quality?: number;
  unoptimized?: boolean;
  priority?: boolean;
  onError?: () => void;
};

/**
 * Fixed-height panel for home sector cards (contain artwork).
 */
export function IndustryImagePanel({
  src,
  alt,
  panelClassName = "h-[300px] sm:h-[340px] lg:h-[420px]",
  fit = "contain",
  sizes,
  quality = 90,
  unoptimized = false,
  priority = false,
  onError,
}: IndustryImagePanelProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "w-full rounded-2xl bg-mk-sand/40 ring-1 ring-mk-navy/10",
          panelClassName,
        )}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#eef3f8] via-white to-[#f4f7fa]",
        "shadow-lg shadow-mk-navy/[0.07] ring-1 ring-mk-navy/10",
        panelClassName,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          "object-center",
          fit === "contain" ? "object-contain p-3 sm:p-4" : "object-cover",
        )}
        sizes={sizes}
        quality={quality}
        priority={priority}
        unoptimized={unoptimized}
        onError={() => {
          setFailed(true);
          onError?.();
        }}
      />
    </div>
  );
}
