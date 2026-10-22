import { JobStatus } from "@prisma/client";
import { createJobAction } from "@/actions/jobs-admin";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { JobStatusButtons } from "@/components/admin/job-status-buttons";

export const metadata = { title: "Manage jobs" };

const inputClass = "mt-1 w-full rounded-lg border border-mk-navy/15 px-3 py-2 text-sm";

export default async function AdminJobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { updatedAt: "desc" },
    include: { industry: true },
  });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl font-semibold text-mk-navy">Jobs</h1>
        <form
          action={async (fd) => {
            await createJobAction(fd);
          }}
          className="mt-6 max-w-lg space-y-4 rounded-2xl border bg-white p-6"
        >
          <div>
            <label className="text-sm font-medium" htmlFor="title">Title</label>
            <input id="title" name="title" required className={inputClass} />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="location">Location</label>
            <input id="location" name="location" required className={inputClass} />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="description">Description</label>
            <textarea id="description" name="description" required rows={4} className={inputClass} />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="publish" /> Publish immediately
          </label>
          <Button type="submit">Create job</Button>
        </form>
      </div>
      <ul className="space-y-3">
        {jobs.map((job) => (
          <li key={job.id} className="rounded-xl border bg-white p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-mk-navy">{job.title}</p>
                <p className="text-sm text-mk-muted">{job.location} · {job.status}</p>
              </div>
              <JobStatusButtons jobId={job.id} status={job.status} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
