import { prisma } from "@/lib/db";

export async function isCareerOnboardingComplete(
  candidateId: string,
  userId: string,
): Promise<boolean> {
  const [user, candidate, resumeCount] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { phone: true },
    }),
    prisma.candidate.findUnique({
      where: { id: candidateId },
      select: {
        headline: true,
        expectedSalary: true,
        noticePeriodDays: true,
        summary: true,
      },
    }),
    prisma.resume.count({ where: { candidateId } }),
  ]);

  if (!candidate || !user?.phone?.trim()) return false;
  if (resumeCount === 0) return false;
  if (candidate.expectedSalary == null) return false;
  if (candidate.noticePeriodDays == null) return false;
  if (!candidate.headline?.trim()) return false;
  if (!candidate.summary?.includes("currentLocation:")) return false;
  return true;
}
