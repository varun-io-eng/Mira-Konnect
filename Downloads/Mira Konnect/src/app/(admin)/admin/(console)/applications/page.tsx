import { getCurrentUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";
import { ApplicationStatusSelect } from "@/components/admin/application-status-select";
import { ScheduleInterviewForm } from "@/components/admin/schedule-interview-form";

export const metadata = { title: "Applications" };

export default async function AdminApplicationsPage() {
  await getCurrentUser();
  const applications = await prisma.application.findMany({
    include: {
      job: true,
      candidate: {
        include: {
          user: true,
          resumes: { where: { isPrimary: true }, take: 1 },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-mk-navy">Applications</h1>
      <ul className="mt-6 space-y-4">
        {applications.map((app) => (
          <li key={app.id} className="rounded-xl border bg-white p-4">
            <p className="font-semibold">{app.candidate.user.name}</p>
            <p className="text-sm text-mk-muted">{app.job.title}</p>
            <ApplicationStatusSelect applicationId={app.id} current={app.status} />
            {app.candidate.resumes[0] ? (
              <a
                href={`/api/resumes/${app.candidate.resumes[0].id}`}
                className="mt-2 inline-block text-sm text-mk-teal hover:underline"
              >
                View resume
              </a>
            ) : (
              <p className="mt-2 text-xs text-mk-muted">No resume on file</p>
            )}
            <ScheduleInterviewForm applicationId={app.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
