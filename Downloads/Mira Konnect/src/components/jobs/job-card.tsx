import Link from "next/link";
import type { EmploymentType, Industry, Job, JobSkill } from "@prisma/client";
import { ArrowRight, Briefcase, MapPin, TrendingUp } from "lucide-react";
import { SunsetMark } from "@/components/brand/sunset-mark";
import { Button } from "@/components/ui/button";
import {
  formatEmploymentType,
  formatExperience,
  formatPostedDate,
} from "@/lib/jobs/display";
import { cn } from "@/lib/utils";

type JobWithIndustry = Job & {
  industry: Industry | null;
  skills?: JobSkill[];
};

export function JobCard({
  job,
  variant = "opening",
}: {
  job: JobWithIndustry;
  variant?: "opening" | "rich";
}) {
  if (variant === "opening") {
    const categoryLine =
      job.industry?.name ?? job.department ?? formatEmploymentType(job.employmentType);
    const levelLine = formatExperience(job) ?? formatEmploymentType(job.employmentType);

    return (
      <article
        className="group flex h-full gap-4 rounded-xl border border-mk-navy/12 bg-white p-4 shadow-sm transition hover:border-mk-teal/35 hover:shadow-md sm:gap-5 sm:p-5"
      >
        <SunsetMark size="card" className="shrink-0 self-start" />
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <h2 className="font-display text-lg font-bold leading-snug text-[#1e4d7b] sm:text-xl">
              <Link href={`/jobs/${job.slug}`} className="hover:text-mk-teal">
                {job.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-mk-slate">{categoryLine}</p>
            <p className="mt-0.5 text-sm text-mk-muted">{levelLine}</p>
            <p className="mt-1 text-sm text-mk-slate">{job.location}</p>
          </div>
          <Link
            href={`/jobs/${job.slug}`}
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#c9a227] transition group-hover:gap-2 hover:text-[#a8861f]"
          >
            More Details
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </article>
    );
  }

  const posted = job.publishedAt ?? job.createdAt;
  const experience = formatExperience(job);
  const topSkills = job.skills?.slice(0, 3) ?? [];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-mk-navy/10 bg-white shadow-sm transition duration-200",
        "hover:-translate-y-0.5 hover:border-mk-teal/30 hover:shadow-lg hover:shadow-mk-teal/10",
      )}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-mk-teal via-[#5eead4] to-mk-navy opacity-0 transition group-hover:opacity-100" />
      <div className="flex flex-1 flex-col p-6">
        {job.industry ? (
          <p className="text-[11px] font-bold uppercase tracking-wider text-mk-teal">
            {job.industry.name}
          </p>
        ) : null}
        <h2 className="mt-2 font-display text-xl font-semibold leading-snug text-mk-navy">
          <Link href={`/jobs/${job.slug}`} className="hover:text-mk-teal">
            {job.title}
          </Link>
        </h2>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-mk-muted">
          <li className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {job.location}
          </li>
          <li className="inline-flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {formatEmploymentType(job.employmentType)}
          </li>
          {experience ? (
            <li className="inline-flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {experience}
            </li>
          ) : null}
        </ul>
        <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-mk-slate">
          {job.description}
        </p>
        {topSkills.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {topSkills.map((s) => (
              <li
                key={s.id}
                className="rounded-md bg-mk-sand/70 px-2 py-0.5 text-[11px] font-medium text-mk-navy"
              >
                {s.name}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-mk-navy/8 pt-4">
          <p className="text-xs text-mk-muted">Posted {formatPostedDate(posted)}</p>
          <div className="flex gap-2">
            <Button href={`/jobs/${job.slug}`} variant="outline" size="sm">
              Details
            </Button>
            <Button href={`/jobs/${job.slug}#apply`} size="sm" className="gap-1">
              Apply
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
