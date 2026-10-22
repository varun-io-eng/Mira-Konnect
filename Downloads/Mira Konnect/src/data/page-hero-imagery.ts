import type { HeroScene } from "@/components/motion/hero-living-scenes";
import { jobsImages } from "@/data/jobs-imagery";

/** Top banners — original careers artwork only */
export const pageHeroImages = {
  intervalMs: 8000,
  overlayClassName:
    "bg-gradient-to-r from-[#071525]/82 via-[#071525]/40 to-[#071525]/12",
  scenes: jobsImages.scenes.map((s) => ({
    src: s.src,
    alt: s.alt,
    objectPosition: s.objectPosition ?? "center center",
  })) satisfies HeroScene[],
};
