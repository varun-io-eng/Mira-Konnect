import type { EmploymentType } from "@prisma/client";

export type JobListItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
  benefits: string | null;
  location: string;
  employmentType: EmploymentType;
  experienceMin: number | null;
  experienceMax: number | null;
  industry: { name: string } | null;
  skills: { id: string; name: string }[];
};

export type JobsCandidateContext = {
  isLoggedInCandidate: boolean;
  hasResume: boolean;
  appliedJobIds: string[];
};
