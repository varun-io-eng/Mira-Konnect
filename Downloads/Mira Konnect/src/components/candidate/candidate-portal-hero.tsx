"use client";

import { HeroLivingScenes } from "@/components/motion/hero-living-scenes";
import { pageHeroImages } from "@/data/page-hero-imagery";

export function CandidatePortalHero() {
  return (
    <div className="relative min-h-[min(44vh,380px)] w-full overflow-hidden bg-mk-navy sm:min-h-[min(48vh,420px)]">
      <HeroLivingScenes
        scenes={pageHeroImages.scenes}
        intervalMs={pageHeroImages.intervalMs}
        overlayClassName={pageHeroImages.overlayClassName}
        priority
        sizes="100vw"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071525]/92 via-[#071525]/40 to-[#071525]/15"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-8 pt-24 sm:px-6 sm:pb-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/75">
          Your career hub
        </p>
        <p className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
          Candidate portal
        </p>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-white/88">
          Applications, profile, and saved roles—managed in one professional workspace.
        </p>
      </div>
    </div>
  );
}
