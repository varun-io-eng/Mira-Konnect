"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, Search } from "lucide-react";

type JobSearchBarProps = {
  industries: { slug: string; name: string }[];
  defaultQuery?: string;
  defaultLocation?: string;
  defaultIndustry?: string;
};

const fieldClass =
  "w-full border-0 bg-white py-3.5 pl-4 pr-3 text-sm text-mk-navy outline-none placeholder:text-mk-muted";

export function JobSearchBar({
  industries,
  defaultQuery = "",
  defaultLocation = "",
  defaultIndustry = "",
}: JobSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(defaultQuery);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams(searchParams.toString());
    const query = String(data.get("q") ?? "").trim();
    const location = String(data.get("location") ?? "");
    const industry = String(data.get("industry") ?? "");
    if (query) params.set("q", query);
    else params.delete("q");
    if (location) params.set("location", location);
    else params.delete("location");
    if (industry) params.set("industry", industry);
    else params.delete("industry");
    const qs = params.toString();
    router.push(qs ? `/jobs?${qs}` : "/jobs");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-mk-navy/15 bg-white shadow-sm"
      role="search"
      aria-label="Search jobs"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <label className="border-b border-mk-navy/10 lg:border-b-0 lg:border-r">
          <span className="sr-only">Job title, keywords, or phrase</span>
          <input
            type="search"
            name="q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Job Title, Keywords, or Phrase"
            className={fieldClass}
          />
        </label>
        <label className="relative border-b border-mk-navy/10 lg:border-b-0 lg:border-r">
          <span className="sr-only">City, state or location</span>
          <MapPin
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mk-muted"
            aria-hidden
          />
          <input
            type="text"
            name="location"
            defaultValue={defaultLocation}
            placeholder="City, State or ZIP"
            className={`${fieldClass} pl-10`}
          />
        </label>
        <label className="border-b border-mk-navy/10 lg:border-b-0 lg:border-r">
          <span className="sr-only">Select sector</span>
          <select name="industry" defaultValue={defaultIndustry} className={`${fieldClass} cursor-pointer`}>
            <option value="">Select Sector</option>
            {industries.map((ind) => (
              <option key={ind.slug} value={ind.slug}>{ind.name}</option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="flex items-center justify-center bg-[#1e4d7b] px-8 py-3.5 text-white transition hover:bg-mk-navy"
          aria-label="Search jobs"
        >
          <Search className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </form>
  );
}
