"use client";

import { PageHeroBanner, jobsPageHeroVisuals } from "@/components/marketing/page-hero-banner";

type JobsCareersHeroProps = {
  openingCount?: number;
};

export function JobsCareersHero({ openingCount }: JobsCareersHeroProps) {
  return (
    <PageHeroBanner
      eyebrow="Job board"
      title="Careers"
      description="Browse verified openings, apply in minutes, and track every step with Mira Konnect recruiters."
      bottomFadeClass="from-mk-sand/90"
      visuals={jobsPageHeroVisuals}
    >
      {openingCount != null && openingCount > 0 ? (
        <p className="mt-5 inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-sm">
          {openingCount} active opening{openingCount === 1 ? "" : "s"} today
        </p>
      ) : null}
    </PageHeroBanner>
  );
}
