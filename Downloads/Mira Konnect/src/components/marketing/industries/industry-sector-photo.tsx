"use client";

import { SceneIndustryFocus } from "@/components/illustrations/mira-scene-illustrations";
import { IndustryImagePanel } from "@/components/marketing/industries/industry-image-panel";
import { cn } from "@/lib/utils";
import { useState } from "react";

type IndustrySectorPhotoProps = {
  src: string;
  alt: string;
  slug: string;
  className?: string;
};

/** One landscape photo per panel — fills the frame, no letterboxing strip. */
export function IndustrySectorPhoto({ src, alt, slug, className }: IndustrySectorPhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <SceneIndustryFocus
        slug={slug}
        className={cn(
          "h-[260px] w-full rounded-2xl sm:h-[300px] lg:h-[360px]",
          className,
        )}
      />
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <IndustryImagePanel
        src={src}
        alt={alt}
        fit="cover"
        panelClassName="h-[280px] sm:h-[340px] lg:h-[420px]"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 720px"
        quality={95}
        unoptimized
        priority
        onError={() => setFailed(true)}
      />
    </div>
  );
}
