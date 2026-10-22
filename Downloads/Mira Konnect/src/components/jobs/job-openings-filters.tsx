"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";
import { Search } from "lucide-react";
import { EmploymentType } from "@prisma/client";
import { formatEmploymentType } from "@/lib/jobs/display";
import { cn } from "@/lib/utils";

const selectClass =
  "w-full appearance-none rounded-none border border-mk-navy/15 bg-white py-3 pl-3 pr-8 text-sm text-mk-navy outline-none focus:border-mk-teal focus:ring-1 focus:ring-mk-teal/30";

type Props = {
  industries: { slug: string; name: string }[];
  locations: string[];
  defaultQuery?: string;
  defaultLocation?: string;
  defaultIndustry?: string;
  defaultType?: string;
};

export function JobOpeningsFilters({
  industries,
  locations,
  defaultQuery = "",
  defaultLocation = "",
  defaultIndustry = "",
  defaultType = "",
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(defaultQuery);

  const pushFilters = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      const qs = params.toString();
      router.push(qs ? `/jobs?${qs}` : "/jobs");
    },
    [router, searchParams],
  );

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    pushFilters({
      q: String(data.get("q") ?? "").trim(),
      location: String(data.get("location") ?? ""),
      industry: String(data.get("industry") ?? ""),
      type: String(data.get("type") ?? ""),
    });
  }

  function onSelectChange(name: string, value: string) {
    pushFilters({
      q: (searchParams.get("q") ?? q).trim(),
      location: name === "location" ? value : searchParams.get("location") ?? "",
      industry: name === "industry" ? value : searchParams.get("industry") ?? "",
      type: name === "type" ? value : searchParams.get("type") ?? "",
    });
  }

  return (
    <form onSubmit={onSubmit} className="mt-8" role="search" aria-label="Filter job openings">
      <div className="grid grid-cols-1 gap-0 border border-mk-navy/15 sm:grid-cols-2 lg:grid-cols-4">
        <label className="relative border-b border-mk-navy/15 sm:border-b-0 sm:border-r lg:border-r">
          <span className="sr-only">Search</span>
          <Search
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mk-muted"
            aria-hidden
          />
          <input
            type="search"
            name="q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className={cn(selectClass, "border-0 pr-10")}
          />
        </label>

        <label className="relative border-b border-mk-navy/15 sm:border-b-0 lg:border-r">
          <span className="sr-only">Job category</span>
          <select
            name="industry"
            defaultValue={defaultIndustry}
            onChange={(e) => onSelectChange("industry", e.target.value)}
            className={cn(selectClass, "border-0")}
          >
            <option value="">All Job Categories</option>
            {industries.map((ind) => (
              <option key={ind.slug} value={ind.slug}>{ind.name}</option>
            ))}
          </select>
        </label>

        <label className="relative border-b border-mk-navy/15 sm:border-b-0 sm:border-r lg:border-r">
          <span className="sr-only">Job type</span>
          <select
            name="type"
            defaultValue={defaultType}
            onChange={(e) => onSelectChange("type", e.target.value)}
            className={cn(selectClass, "border-0")}
          >
            <option value="">All Job Types</option>
            {Object.values(EmploymentType).map((t) => (
              <option key={t} value={t}>{formatEmploymentType(t)}</option>
            ))}
          </select>
        </label>

        <label className="relative">
          <span className="sr-only">Job location</span>
          <select
            name="location"
            defaultValue={defaultLocation}
            onChange={(e) => onSelectChange("location", e.target.value)}
            className={cn(selectClass, "border-0")}
          >
            <option value="">All Job Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit" className="sr-only">Apply search</button>
    </form>
  );
}
