import { getCurrentUser } from "@/lib/auth/get-user";
import { submitCandidateProfileForm } from "@/actions/profile";
import { ResumeUploadForm } from "@/components/forms/resume-upload-form";
import { PortalPageHeader } from "@/components/candidate/portal-page-header";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";

export const metadata = { title: "My profile" };

const inputClass =
  "mt-2 w-full rounded-xl border border-mk-navy/12 bg-white px-4 py-2.5 text-sm shadow-inner shadow-mk-navy/[0.02] focus:border-mk-teal focus:outline-none focus:ring-2 focus:ring-mk-teal/20";

export default async function CandidateProfilePage() {
  const user = await getCurrentUser();
  const c = user?.candidate;
  const resumes = c
    ? await prisma.resume.findMany({
        where: { candidateId: c.id },
        orderBy: { uploadedAt: "desc" },
      })
    : [];

  return (
    <div>
      <PortalPageHeader
        eyebrow="Your brand"
        title="Profile & resume"
        description="Recruiters see this information when you apply. Keep it current and accurate."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-mk-navy/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-lg font-semibold text-mk-navy">Personal details</h2>
          <form action={submitCandidateProfileForm} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-mk-navy" htmlFor="name">Full name</label>
              <input id="name" name="name" defaultValue={user?.name} className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium text-mk-navy" htmlFor="phone">Phone</label>
              <input id="phone" name="phone" defaultValue={user?.phone ?? ""} className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium text-mk-navy" htmlFor="headline">Professional headline</label>
              <input
                id="headline"
                name="headline"
                placeholder="e.g. HR Manager · Pharma · Ahmedabad"
                defaultValue={c?.headline ?? ""}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-mk-navy" htmlFor="summary">Summary</label>
              <textarea
                id="summary"
                name="summary"
                rows={4}
                placeholder="Brief overview of your experience and what you're looking for next."
                defaultValue={c?.summary ?? ""}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-mk-navy" htmlFor="noticePeriodDays">
                Notice period (days)
              </label>
              <input
                id="noticePeriodDays"
                name="noticePeriodDays"
                type="number"
                min={0}
                defaultValue={c?.noticePeriodDays ?? ""}
                className={inputClass}
              />
            </div>
            <Button type="submit">Save changes</Button>
          </form>
        </section>

        <section className="rounded-2xl border border-mk-navy/10 bg-white p-6 shadow-sm sm:p-8">
          <ResumeUploadForm resumes={resumes} />
        </section>
      </div>
    </div>
  );
}
