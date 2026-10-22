"use client";

import Link from "next/link";
import { SunsetMark } from "@/components/brand/sunset-mark";
import { cn } from "@/lib/utils";

type SettingSunLogoProps = {
  className?: string;
  showWordmark?: boolean;
  variant?: "light" | "dark";
  /** Mark above “Mira Konnect” (site header) */
  layout?: "inline" | "stacked";
};

export function SettingSunLogo({
  className,
  showWordmark = true,
  variant = "dark",
  layout = "inline",
}: SettingSunLogoProps) {
  const primaryText = variant === "light" ? "text-white" : "text-mk-navy";
  const secondaryText = variant === "light" ? "text-white/85" : "text-mk-teal";
  const stacked = layout === "stacked";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex",
        stacked ? "flex-col items-center gap-0.5" : "items-center gap-3",
        className,
      )}
      aria-label="Mira Konnect home"
    >
      <SunsetMark size={stacked ? "compact" : "banner"} />
      {showWordmark ? (
        stacked ? (
          <span
            className={cn(
              "text-center font-display text-[10px] font-semibold leading-tight tracking-tight sm:text-[11px]",
              primaryText,
            )}
          >
            Mira{" "}
            <span className={cn("font-semibold", secondaryText)}>Konnect</span>
          </span>
        ) : (
          <span className="flex flex-col leading-none">
            <span
              className={cn(
                "font-display text-lg font-semibold tracking-tight sm:text-xl",
                primaryText,
              )}
            >
              Mira{" "}
              <span className={cn("font-semibold", secondaryText)}>Konnect</span>
            </span>
            <span
              className={cn(
                "mt-1 text-[9px] font-medium uppercase tracking-[0.28em]",
                variant === "light" ? "text-white/60" : "text-mk-muted",
              )}
            >
              Recruitment
            </span>
          </span>
        )
      ) : null}
    </Link>
  );
}
