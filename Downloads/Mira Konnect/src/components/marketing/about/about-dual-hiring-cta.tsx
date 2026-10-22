"use client";

import { Building2, Users } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { findJobPath } from "@/lib/find-job";

const viewJobsButtonClass = "bg-white text-mk-navy hover:bg-mk-sand";

export function AboutDualHiringCta() {
  return (
    <section className="grid md:grid-cols-2">
      <Reveal direction="left" className="h-full" scale>
        <div className="relative h-full overflow-hidden bg-mk-navy px-8 py-14 text-white lg:px-12 lg:py-16">
          <Building2 className="absolute bottom-6 right-6 h-16 w-16 text-white/10" aria-hidden />
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Industries hiring</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85">
            Sector playbooks for pharma, manufacturing, IT, hospitality, and more—built around how
            you actually evaluate talent.
          </p>
          <Button href={findJobPath()} className={`mt-8 ${viewJobsButtonClass}`}>
            View jobs
          </Button>
        </div>
      </Reveal>
      <Reveal direction="right" className="h-full" scale delay={0.08}>
        <div className="relative h-full overflow-hidden bg-mk-teal px-8 py-14 text-white lg:px-12 lg:py-16">
          <Users className="absolute bottom-6 right-6 h-16 w-16 text-white/10" aria-hidden />
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Roles & careers</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90">
            Verified openings, transparent steps, and recruiter support when you are ready to move.
          </p>
          <Button href={findJobPath()} className={`mt-8 ${viewJobsButtonClass}`}>
            View jobs
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
