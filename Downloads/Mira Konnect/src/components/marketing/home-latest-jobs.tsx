"use client";

import Link from "next/link";
import type { EmploymentType, Industry, Job } from "@prisma/client";
import { MapPin } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

type JobRow = Job & { industry: Industry | null };

function formatType(t: EmploymentType) {
  return t
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function JobRowCard({ job }: { job: JobRow }) {
  const meta = [
    job.location,
    job.industry?.name,
    formatType(job.employmentType),
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="group flex flex-col rounded-2xl border border-mk-navy/10 bg-white p-6 shadow-sm transition hover:border-mk-teal/40 hover:shadow-md"
    >
      <h3 className="font-display text-lg font-semibold text-mk-navy group-hover:text-mk-teal">
        {job.title}
      </h3>
      <p className="mt-2 flex items-start gap-1.5 text-sm text-mk-muted">
        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mk-teal" aria-hidden />
        <span>{meta}</span>
      </p>
      <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-mk-slate">
        {job.description}
      </p>
      <span className="mt-4 text-sm font-semibold text-mk-teal">
        View & apply <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
      </span>
    </Link>
  );
}

export function HomeLatestJobs({ jobs }: { jobs: JobRow[] }) {
  const latest = jobs.slice(0, 4);

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold text-mk-navy sm:text-4xl">
              Latest job openings
            </h2>
            <p className="mt-3 max-w-xl text-mk-slate">
              A few roles we&apos;re hiring for right now. See something you like? Open the
              listing and apply.
            </p>
          </div>
          <Button href="/jobs" variant="outline" className="shrink-0">
            View all jobs
          </Button>
        </Reveal>

        {latest.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-mk-navy/15 bg-mk-sand/40 p-8 text-center text-mk-slate">
            No openings published yet.{" "}
            <Link href="/contact" className="font-semibold text-mk-teal hover:underline">
              Contact us
            </Link>{" "}
            if you&apos;re hiring.
          </p>
        ) : (
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {latest.map((job) => (
              <StaggerItem key={job.id}>
                <JobRowCard job={job} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}
