"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { MapPin, Search } from "lucide-react";
import { findJobPath } from "@/lib/find-job";
import { cn } from "@/lib/utils";

type JobSearchFormProps = {
  variant?: "hero" | "compact";
  /** Home hero: sign in + career profile before showing matched listings */
  candidateFlow?: boolean;
  defaultQuery?: string;
  defaultLocation?: string;
  className?: string;
};

export function JobSearchForm({
  variant = "hero",
  candidateFlow = false,
  defaultQuery = "",
  defaultLocation = "",
  className,
}: JobSearchFormProps) {
  const router = useRouter();
  const [q, setQ] = useState(defaultQuery);
  const [location, setLocation] = useState(defaultLocation);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const filters = {
      q: q.trim() || undefined,
      location: location.trim() || undefined,
    };
    if (candidateFlow) {
      router.push(findJobPath(filters));
      return;
    }
    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    if (filters.location) params.set("location", filters.location);
    const qs = params.toString();
    router.push(qs ? `/jobs?${qs}` : "/jobs");
  }

  const isHero = variant === "hero";

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex w-full flex-col gap-3 sm:flex-row sm:items-stretch",
        isHero &&
          "rounded-2xl border border-mk-navy/10 bg-white p-3 shadow-lg shadow-mk-navy/5 sm:rounded-full sm:p-2",
        className,
      )}
      role="search"
      aria-label="Search jobs"
    >
      <label className="relative flex flex-1 items-center">
        <span className="sr-only">Job title, keywords, or skills</span>
        <Search
          className="pointer-events-none absolute left-4 h-5 w-5 text-mk-muted"
          aria-hidden
        />
        <input
          type="search"
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Job title, keywords, or skills"
          className={cn(
            "w-full rounded-xl border border-transparent bg-mk-sand/50 py-3.5 pl-12 pr-4 text-sm text-mk-navy outline-none transition-colors placeholder:text-mk-muted focus:border-mk-teal/40 focus:bg-white",
            isHero && "sm:rounded-full sm:bg-transparent sm:focus:bg-mk-sand/30",
          )}
        />
      </label>
      <label className="relative flex sm:max-w-[220px] sm:flex-1 items-center">
        <span className="sr-only">Location</span>
        <MapPin
          className="pointer-events-none absolute left-4 h-5 w-5 text-mk-muted"
          aria-hidden
        />
        <input
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or location"
          className={cn(
            "w-full rounded-xl border border-transparent bg-mk-sand/50 py-3.5 pl-12 pr-4 text-sm text-mk-navy outline-none transition-colors placeholder:text-mk-muted focus:border-mk-teal/40 focus:bg-white",
            isHero && "sm:rounded-full sm:bg-transparent sm:focus:bg-mk-sand/30",
          )}
        />
      </label>
      <button
        type="submit"
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl bg-mk-teal px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-mk-teal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mk-teal",
          isHero && "sm:rounded-full sm:px-10",
        )}
      >
        Find Jobs
      </button>
    </form>
  );
}
