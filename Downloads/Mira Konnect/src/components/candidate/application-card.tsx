import Link from "next/link";
import type { Application, Interview, Job } from "@prisma/client";
import { Calendar, MapPin, Video } from "lucide-react";
import { ApplicationStatusBadge } from "@/components/jobs/application-status-badge";
import { formatPostedDate } from "@/lib/jobs/display";

type AppWithRelations = Application & {
  job: Job;
  interviews: Interview[];
};

export function ApplicationCard({ application }: { application: AppWithRelations }) {
  const nextInterview = application.interviews[0];

  return (
    <article className="overflow-hidden rounded-xl border border-mk-navy/8 bg-white transition hover:border-mk-teal/30">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
        <div className="min-w-0 flex-1">
          <ApplicationStatusBadge status={application.status} />
          <h2 className="mt-3 font-display text-lg font-semibold text-mk-navy">
            <Link href={`/jobs/${application.job.slug}`} className="hover:text-mk-teal">
              {application.job.title}
            </Link>
          </h2>
          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-mk-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {application.job.location}
            </span>
            <span>Applied {formatPostedDate(application.createdAt)}</span>
          </p>
        </div>
        <Link
          href={`/jobs/${application.job.slug}`}
          className="shrink-0 text-sm font-semibold text-mk-teal hover:underline"
        >
          View job →
        </Link>
      </div>

      {nextInterview ? (
        <div className="border-t border-mk-navy/8 bg-mk-sand/40 px-5 py-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-wide text-mk-teal">Upcoming interview</p>
          <p className="mt-1 flex items-center gap-2 text-sm font-medium text-mk-navy">
            <Calendar className="h-4 w-4 text-mk-teal" aria-hidden />
            {nextInterview.scheduledAt.toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
            <span className="text-mk-muted">· {nextInterview.interviewType.replace(/_/g, " ")}</span>
          </p>
          {nextInterview.meetingLink ? (
            <a
              href={nextInterview.meetingLink}
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-mk-teal hover:underline"
            >
              <Video className="h-4 w-4" aria-hidden />
              Join meeting
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
