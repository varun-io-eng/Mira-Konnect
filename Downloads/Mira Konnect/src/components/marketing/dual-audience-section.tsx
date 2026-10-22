"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const employerServices = [
  "Talent sourcing",
  "Screening & shortlisting",
  "Interview scheduling",
  "Onboarding support",
];

const candidateServices = [
  "Job matching",
  "Resume guidance",
  "Interview preparation",
  "Career guidance",
];

export function DualAudienceSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-mk-navy">
            Built for employers and job seekers
          </h2>
        </Reveal>
        <Stagger className="mt-12 grid gap-8 md:grid-cols-2">
          <StaggerItem>
            <article className="h-full rounded-2xl border border-mk-navy/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg">
              <h3 className="text-xl font-semibold text-mk-navy">For employers</h3>
              <ul className="mt-4 space-y-2 text-sm text-mk-slate">
                {employerServices.map((s) => (
                  <li key={s} className="flex gap-2">
                    <span className="text-mk-teal">•</span>
                    {s}
                  </li>
                ))}
              </ul>
              <Button href="/for-employers" variant="secondary" className="mt-6">
                Hire Talent
              </Button>
            </article>
          </StaggerItem>
          <StaggerItem>
            <article className="h-full rounded-2xl border border-mk-navy/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg">
              <h3 className="text-xl font-semibold text-mk-navy">For job seekers</h3>
              <ul className="mt-4 space-y-2 text-sm text-mk-slate">
                {candidateServices.map((s) => (
                  <li key={s} className="flex gap-2">
                    <span className="text-mk-teal">•</span>
                    {s}
                  </li>
                ))}
              </ul>
              <Button href="/jobs" className="mt-6">Find Jobs</Button>
            </article>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
