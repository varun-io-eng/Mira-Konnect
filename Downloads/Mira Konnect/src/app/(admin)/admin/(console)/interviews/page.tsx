import { getCurrentUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";

export const metadata = { title: "Interviews" };

export default async function AdminInterviewsPage() {
  await getCurrentUser();
  const interviews = await prisma.interview.findMany({
    include: {
      application: {
        include: {
          job: true,
          candidate: { include: { user: true } },
        },
      },
    },
    orderBy: { scheduledAt: "asc" },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-mk-navy">Interviews</h1>
      {interviews.length === 0 ? (
        <p className="mt-4 text-mk-slate">Schedule interviews from the Applications page.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {interviews.map((iv) => (
            <li key={iv.id} className="rounded-xl border bg-white p-4">
              <p className="font-semibold">{iv.application.candidate.user.name}</p>
              <p className="text-sm text-mk-muted">{iv.application.job.title}</p>
              <p className="mt-2 text-sm">
                {iv.scheduledAt.toLocaleString("en-IN")} · {iv.interviewType.replace(/_/g, " ")} ·{" "}
                {iv.status}
              </p>
              {iv.meetingLink ? (
                <a href={iv.meetingLink} className="mt-1 inline-block text-sm text-mk-teal hover:underline">
                  Meeting link
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
