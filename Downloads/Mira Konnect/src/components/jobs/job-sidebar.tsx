"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Building2, Mail } from "lucide-react";

type JobSidebarProps = {
  industries: { slug: string; name: string }[];
  selectedIndustrySlug?: string;
};

export function JobSidebar({ industries, selectedIndustrySlug = "" }: JobSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);

  function onAlertSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  function applyIndustryFilter(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) params.set("industry", slug);
    else params.delete("industry");
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `/jobs?${qs}` : "/jobs");
  }

  return (
    <aside className="space-y-6">
      <div className="overflow-hidden border border-mk-navy/10 bg-white shadow-sm">
        <div className="flex items-center gap-2 bg-[#1e4d7b] px-4 py-3 text-white">
          <Mail className="h-5 w-5 shrink-0" aria-hidden />
          <h2 className="text-sm font-bold uppercase tracking-wide">Email Me New Jobs</h2>
        </div>
        {submitted ? (
          <p className="p-4 text-sm leading-relaxed text-mk-slate">
            Thanks! Our team will confirm your job alert by email shortly.
          </p>
        ) : (
          <form onSubmit={onAlertSubmit} className="space-y-3 p-4">
            <label className="block">
              <span className="sr-only">Job alert name</span>
              <input
                type="text"
                name="alertName"
                required
                placeholder="Job alert name..."
                className="w-full border border-mk-navy/15 px-3 py-2.5 text-sm outline-none focus:border-mk-teal"
              />
            </label>
            <label className="block">
              <span className="sr-only">Email</span>
              <input
                type="email"
                name="email"
                required
                placeholder="example@email.com"
                className="w-full border border-mk-navy/15 px-3 py-2.5 text-sm outline-none focus:border-mk-teal"
              />
            </label>
            <fieldset className="space-y-2 text-sm text-mk-slate">
              <legend className="sr-only">Alert frequency</legend>
              {["Daily", "Weekly", "Monthly"].map((freq) => (
                <label key={freq} className="flex items-center gap-2">
                  <input type="radio" name="frequency" value={freq} defaultChecked={freq === "Weekly"} />
                  {freq}
                </label>
              ))}
            </fieldset>
            <button
              type="submit"
              className="w-full bg-[#1e4d7b] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-mk-navy"
            >
              Create alert
            </button>
          </form>
        )}
      </div>

      <div className="overflow-hidden border border-mk-navy/10 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-mk-navy/8 bg-mk-sand/40 px-4 py-3">
          <Building2 className="h-5 w-5 shrink-0 text-[#1e4d7b]" aria-hidden />
          <h2 className="text-sm font-bold uppercase tracking-wide text-mk-navy">Filter by industry</h2>
        </div>
        <div className="p-4">
          <label className="block text-xs font-medium text-mk-muted" htmlFor="sidebar-industry">
            Industry / sector
          </label>
          <select
            id="sidebar-industry"
            className="mt-1.5 w-full border border-mk-navy/15 bg-white px-3 py-2.5 text-sm text-mk-navy outline-none focus:border-mk-teal"
            value={selectedIndustrySlug}
            onChange={(e) => applyIndustryFilter(e.target.value)}
          >
            <option value="">All industries</option>
            {industries.map((ind) => (
              <option key={ind.slug} value={ind.slug}>{ind.name}</option>
            ))}
          </select>
          {selectedIndustrySlug ? (
            <button
              type="button"
              onClick={() => applyIndustryFilter("")}
              className="mt-3 text-xs font-semibold text-mk-teal hover:underline"
            >
              Clear industry filter
            </button>
          ) : null}
        </div>
      </div>

      <div className="border border-mk-navy/10 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-mk-navy">Locations</h2>
        <label className="mt-3 block text-xs font-medium text-mk-muted">Country</label>
        <select
          className="mt-1 w-full border border-mk-navy/15 bg-white px-3 py-2.5 text-sm text-mk-navy"
          defaultValue="india"
          aria-label="Country"
        >
          <option value="india">India</option>
        </select>
      </div>
    </aside>
  );
}
