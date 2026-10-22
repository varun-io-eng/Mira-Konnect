import { prisma } from "@/lib/db";

export type CandidateCareerProfile = {
  headline: string;
  experienceYears: number;
  currentLocation: string;
  preferredLocation: string;
  resumeKeywords: string[];
};

function parseSummaryLine(summary: string, key: string): string | undefined {
  const prefix = `${key}: `;
  const line = summary
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l.startsWith(prefix));
  return line ? line.slice(prefix.length).trim() : undefined;
}

function parseExperienceYears(summary: string): number {
  const raw = parseSummaryLine(summary, "experience");
  if (!raw) return 0;
  const years = Number.parseInt(raw.match(/(\d+)\s*y/)?.[1] ?? "0", 10);
  const months = Number.parseInt(raw.match(/(\d+)\s*m/)?.[1] ?? "0", 10);
  return years + months / 12;
}

function resumeFileKeywords(fileName: string): string[] {
  const base = fileName.replace(/\.[^.]+$/, "");
  return base
    .split(/[\s_\-.,]+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 3 && !/^\d+$/.test(t))
    .slice(0, 6);
}

export async function getCandidateCareerProfile(
  candidateId: string,
): Promise<CandidateCareerProfile | null> {
  const candidate = await prisma.candidate.findUnique({
    where: { id: candidateId },
    include: {
      preferredLocations: { take: 1, orderBy: { id: "asc" } },
      resumes: { where: { isPrimary: true }, take: 1 },
    },
  });
  if (!candidate?.headline?.trim()) return null;

  const summary = candidate.summary ?? "";
  const preferred =
    candidate.preferredLocations[0]?.city?.trim() ||
    parseSummaryLine(summary, "preferredLocation") ||
    "";

  const current = parseSummaryLine(summary, "currentLocation") ?? "";
  const resumeName = candidate.resumes[0]?.fileName ?? "";

  return {
    headline: candidate.headline.trim(),
    experienceYears: parseExperienceYears(summary),
    currentLocation: current,
    preferredLocation: preferred,
    resumeKeywords: resumeFileKeywords(resumeName),
  };
}
