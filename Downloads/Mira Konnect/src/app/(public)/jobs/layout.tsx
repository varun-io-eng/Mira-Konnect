import { RoleName } from "@prisma/client";
import { JobsCandidateHeader } from "@/components/jobs/jobs-candidate-header";
import { SiteHeader } from "@/components/marketing/site-header";
import { getCurrentUser } from "@/lib/auth/get-user";

export default async function JobsLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  const isCandidate = user?.role.name === RoleName.CANDIDATE && !!user.candidate;

  return (
    <>
      {isCandidate ? (
        <JobsCandidateHeader name={user.name} />
      ) : (
        <SiteHeader overlay={false} />
      )}
      {children}
    </>
  );
}
