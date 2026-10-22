"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { JobStatus } from "@prisma/client";
import { logoutAction } from "@/actions/auth";
import { deleteJobAction } from "@/actions/jobs-admin";
import { PublishJobModal } from "@/components/admin/publish-job-modal";
import { SettingSunLogo } from "@/components/brand/setting-sun-logo";
import { HeroLivingScenes } from "@/components/motion/hero-living-scenes";
import { jobsPageHeroVisuals } from "@/components/marketing/page-hero-banner";
import { cn } from "@/lib/utils";

export type PublisherJobRow = {
  id: string;
  title: string;
  location: string;
  status: JobStatus;
  slug: string;
  updatedAt: string;
};

type IndustryOption = { id: string; name: string };

type AdminPublisherPortalProps = {
  jobs: PublisherJobRow[];
  industries: IndustryOption[];
  successSlug?: string;
};

export function AdminPublisherPortal({
  jobs,
  industries,
  successSlug,
}: AdminPublisherPortalProps) {
  const router = useRouter();
  const [addOpen, setAddOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const closeModal = useCallback(() => setAddOpen(false), []);

  async function handleDelete(job: PublisherJobRow) {
    const ok = window.confirm(`Remove "${job.title}" from the portal? This cannot be undone.`);
    if (!ok) return;
    setError(null);
    setDeletingId(job.id);
    const result = await deleteJobAction(job.id);
    setDeletingId(null);
    if (!result.ok) setError(result.error);
    else router.refresh();
  }

  const scenes = jobsPageHeroVisuals.scenes;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-mk-sand/20 to-white">
      <div className="relative min-h-[min(52vh,440px)] w-full overflow-hidden bg-mk-navy sm:min-h-[min(56vh,480px)]">
        <HeroLivingScenes
          scenes={scenes}
          intervalMs={jobsPageHeroVisuals.intervalMs ?? 10000}
          overlayClassName={jobsPageHeroVisuals.overlayClassName}
          priority
          sizes="100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071525]/95 via-[#071525]/45 to-[#071525]/25"
          aria-hidden
        />

        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <SettingSunLogo variant="light" layout="stacked" className="shrink-0" />
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Sign out
            </button>
          </form>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-6xl px-4 pb-10 pt-28 sm:px-6 sm:pb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#ffd166]">
            Publisher portal
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl lg:text-[2.75rem]">
            Publish a job opening
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/88 sm:text-lg">
            Add roles for hiring clients. Use + to create a posting; use − to remove it from the
            list.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-12">
        {successSlug ? (
          <div
            className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-950"
            role="status"
          >
            Job saved.{" "}
            <Link href={`/jobs/${successSlug}`} className="font-semibold text-mk-teal underline">
              View live posting
            </Link>
          </div>
        ) : null}
        {error ? (
          <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-mk-navy">Your job postings</h2>
            <p className="mt-1 text-sm text-mk-muted">{jobs.length} role{jobs.length === 1 ? "" : "s"}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAddOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-mk-teal text-white shadow-md transition hover:bg-mk-teal/90"
              aria-label="Add job"
            >
              <Plus className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <ul className="mt-6 space-y-3">
          {jobs.length === 0 ? (
            <li className="rounded-2xl border border-dashed border-mk-navy/15 bg-white/80 px-6 py-12 text-center">
              <p className="text-mk-slate">No jobs yet.</p>
              <button
                type="button"
                onClick={() => setAddOpen(true)}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-mk-navy px-5 py-2.5 text-sm font-semibold text-white"
              >
                <Plus className="h-4 w-4" aria-hidden />
                Add your first job
              </button>
            </li>
          ) : (
            jobs.map((job) => (
              <li
                key={job.id}
                className="flex items-center gap-3 rounded-2xl border border-mk-navy/10 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-mk-navy">{job.title}</p>
                  <p className="mt-0.5 text-sm text-mk-muted">
                    {job.location} · {job.status}
                  </p>
                </div>
                <Link
                  href={`/jobs/${job.slug}`}
                  className="hidden text-sm font-medium text-mk-teal hover:underline sm:inline"
                >
                  Preview
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(job)}
                  disabled={deletingId === job.id}
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-700 transition hover:bg-red-100 disabled:opacity-50",
                  )}
                  aria-label={`Delete ${job.title}`}
                >
                  <Minus className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </li>
            ))
          )}
        </ul>

        <p className="mt-10 text-center text-sm text-mk-muted">
          <Link href="/admin" className="font-medium text-mk-teal hover:underline">
            Full admin console
          </Link>
          {" · "}
          <Link href="/jobs" className="font-medium text-mk-teal hover:underline">
            Public careers page
          </Link>
        </p>
      </div>

      <PublishJobModal open={addOpen} industries={industries} onClose={closeModal} />
    </div>
  );
}
