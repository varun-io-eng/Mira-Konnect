"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroLivingScenes } from "@/components/motion/hero-living-scenes";
import { pageHeroImages } from "@/data/page-hero-imagery";
import { jobsImages } from "@/data/jobs-imagery";
import { cn } from "@/lib/utils";
import type { HeroScene } from "@/components/motion/hero-living-scenes";

export type PageHeroVisuals = {
  scenes: HeroScene[];
  videoSrc?: string;
  posterSrc?: string;
  overlayClassName?: string;
  intervalMs?: number;
};

type PageHeroBannerProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
  bottomFadeClass?: string;
  visualOnly?: boolean;
  /** Shorter band (e.g. home testimonials) */
  compact?: boolean;
  visuals?: PageHeroVisuals;
  children?: ReactNode;
};

const defaultVisuals: PageHeroVisuals = {
  scenes: [...pageHeroImages.scenes],
  intervalMs: pageHeroImages.intervalMs,
  overlayClassName: pageHeroImages.overlayClassName,
};

/** Careers / jobs listing — original scenes + optional hero video */
export const jobsPageHeroVisuals: PageHeroVisuals = {
  scenes: [...jobsImages.scenes],
  videoSrc: jobsImages.video,
  posterSrc: jobsImages.scenes[0]?.src,
  intervalMs: 10000,
  overlayClassName: defaultVisuals.overlayClassName,
};

export function PageHeroBanner({
  title,
  description,
  eyebrow = "Mira Konnect",
  className,
  bottomFadeClass = "from-white",
  visualOnly = false,
  compact = false,
  visuals,
  children,
}: PageHeroBannerProps) {
  const reduce = useReducedMotion();
  const v = visuals ?? defaultVisuals;
  const minH = compact
    ? "min-h-[min(42vh,440px)] sm:min-h-[min(46vh,480px)]"
    : "min-h-[min(52vh,520px)] sm:min-h-[min(56vh,560px)]";

  return (
    <section className={cn("relative isolate w-full overflow-hidden", minH, className)}>
      <HeroLivingScenes
        scenes={v.scenes}
        videoSrc={v.videoSrc}
        posterSrc={v.posterSrc ?? v.scenes[0]?.src}
        priority
        intervalMs={v.intervalMs ?? defaultVisuals.intervalMs ?? 10000}
        overlayClassName={v.overlayClassName ?? defaultVisuals.overlayClassName}
        sizes="100vw"
      />

      {!reduce && (
        <>
          <motion.div
            className="pointer-events-none absolute -left-20 top-1/4 h-56 w-56 rounded-full bg-mk-teal/25 blur-3xl"
            animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute right-0 top-1/3 h-64 w-64 rounded-full bg-[#ffd166]/20 blur-3xl"
            animate={{ opacity: [0.25, 0.45, 0.25], scale: [1.05, 1, 1.05] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            aria-hidden
          />
        </>
      )}

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071525]/70 via-transparent to-[#ffd166]/8"
        aria-hidden
      />

      {!visualOnly ? (
        <div
          className={cn(
            "relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8",
            minH,
            compact ? "pt-20 pb-12 sm:pt-24 sm:pb-14" : "pt-24 pb-14 sm:pt-28 sm:pb-16",
          )}
        >
          <div className="max-w-xl sm:max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ffd166]">{eyebrow}</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">{description}</p>
            ) : null}
            {children}
          </div>
        </div>
      ) : null}

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t to-transparent",
          bottomFadeClass,
        )}
        aria-hidden
      />
    </section>
  );
}
