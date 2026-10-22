import type { EmploymentType, Prisma } from "@prisma/client";
import { JobStatus } from "@prisma/client";
import type { CandidateCareerProfile } from "@/lib/candidate/career-profile";

export type JobSearchQueryInput = {
  q?: string;
  location?: string;
  industryId?: string;
  employmentType?: EmploymentType;
};

function textSearchClause(term: string): Prisma.JobWhereInput {
  return {
    OR: [
      { title: { contains: term, mode: "insensitive" } },
      { description: { contains: term, mode: "insensitive" } },
      { department: { contains: term, mode: "insensitive" } },
      { skills: { some: { name: { contains: term, mode: "insensitive" } } } },
    ],
  };
}

export function buildPersonalizedJobConstraints(
  profile: CandidateCareerProfile,
): Prisma.JobWhereInput {
  const and: Prisma.JobWhereInput[] = [];

  const expYears = Math.floor(profile.experienceYears);
  and.push({
    OR: [
      { AND: [{ experienceMin: null }, { experienceMax: null }] },
      {
        AND: [
          {
            OR: [{ experienceMin: null }, { experienceMin: { lte: expYears } }],
          },
          {
            OR: [{ experienceMax: null }, { experienceMax: { gte: expYears } }],
          },
        ],
      },
    ],
  });

  const terms = new Set<string>();
  for (const part of profile.headline.split(/[\s/&+,()]+/)) {
    const t = part.trim();
    if (t.length >= 3) terms.add(t);
  }
  for (const kw of profile.resumeKeywords) terms.add(kw);

  const keywordClauses: Prisma.JobWhereInput[] = [];
  for (const term of [...terms].slice(0, 10)) {
    keywordClauses.push(textSearchClause(term));
  }
  if (keywordClauses.length > 0) {
    and.push({ OR: keywordClauses });
  }

  return { AND: and };
}

export function buildJobSearchWhere(
  input: JobSearchQueryInput,
  profile?: CandidateCareerProfile | null,
): Prisma.JobWhereInput {
  const query = input.q?.trim();
  const loc = input.location?.trim();

  const and: Prisma.JobWhereInput[] = [];

  if (query) {
    and.push(textSearchClause(query));
  }

  if (loc) {
    and.push({ location: { contains: loc, mode: "insensitive" } });
  } else if (profile?.preferredLocation) {
    and.push({
      location: { contains: profile.preferredLocation, mode: "insensitive" },
    });
  }

  if (input.industryId) {
    and.push({ industryId: input.industryId });
  }
  if (input.employmentType) {
    and.push({ employmentType: input.employmentType });
  }

  if (profile) {
    and.push(buildPersonalizedJobConstraints(profile));
  }

  return {
    status: JobStatus.PUBLISHED,
    AND: and.length > 0 ? and : undefined,
  };
}
