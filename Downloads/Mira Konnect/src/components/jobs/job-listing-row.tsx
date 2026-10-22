"use client";



import Link from "next/link";

import { Calendar, Filter, MapPin } from "lucide-react";

import { SunsetMark } from "@/components/brand/sunset-mark";

import {

  formatEmploymentType,

  formatPostedRelative,

} from "@/lib/jobs/display";

import type { JobListItem } from "@/components/jobs/jobs-list-types";

import { cn } from "@/lib/utils";



type JobListingRowProps = {

  job: JobListItem;

  postedAt: Date;

  hasApplied: boolean;

};



export function JobListingRow({ job, postedAt, hasApplied }: JobListingRowProps) {

  const sector = job.industry?.name ?? "General";

  const employmentLabel = formatEmploymentType(job.employmentType).toUpperCase();



  return (

    <article className="border-b border-mk-navy/10 bg-white transition">

      <div className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-5">

        <Link

          href={`/jobs/${job.slug}`}

          className="flex min-w-0 flex-1 items-start gap-4 sm:items-center sm:gap-5"

        >

          <SunsetMark size="list" className="shrink-0" />

          <div className="min-w-0 flex-1">

            <h2 className="font-display text-lg font-bold leading-snug text-[#1e4d7b] hover:text-mk-teal sm:text-xl">

              {job.title}

            </h2>

            <ul className="mt-2 space-y-1.5 text-sm text-mk-muted">

              <li className="flex items-center gap-2">

                <MapPin className="h-4 w-4 shrink-0 text-mk-slate/70" aria-hidden />

                {job.location}

              </li>

              <li className="flex items-center gap-2">

                <Calendar className="h-4 w-4 shrink-0 text-mk-slate/70" aria-hidden />

                {formatPostedRelative(postedAt)}

              </li>

              <li className="flex items-center gap-2">

                <Filter className="h-4 w-4 shrink-0 text-mk-slate/70" aria-hidden />

                {sector}

              </li>

            </ul>

          </div>

        </Link>

        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">

          <span

            className="inline-block rounded-sm bg-[#1e4d7b] px-4 py-2 text-xs font-bold tracking-wide text-white"

          >

            {employmentLabel}

          </span>

          {hasApplied ? (

            <span

              className={cn(

                "rounded-sm px-4 py-2 text-xs font-bold uppercase tracking-wide",

                "cursor-not-allowed bg-mk-sand text-mk-muted",

              )}

            >

              Applied

            </span>

          ) : (

            <Link

              href={`/jobs/${job.slug}`}

              className="rounded-sm border-2 border-[#1e4d7b] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#1e4d7b] transition hover:bg-[#1e4d7b] hover:text-white"

            >

              Apply

            </Link>

          )}

        </div>

      </div>

    </article>

  );

}


