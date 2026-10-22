import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { EmploymentType, JobStatus, Prisma } from "@prisma/client";
import { JobSearchBar } from "@/components/jobs/job-search-bar";
import { JobSidebar } from "@/components/jobs/job-sidebar";
import { JobsCareersHero } from "@/components/jobs/jobs-careers-hero";
import { JobsFindFlow } from "@/components/jobs/jobs-find-flow";
import { JobsResultsPanel } from "@/components/jobs/jobs-results-panel";
import { isCareerOnboardingComplete } from "@/lib/candidate/career-onboarding";
import { RoleName } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth/get-user";
import { getCandidateCareerProfile } from "@/lib/candidate/career-profile";
import {
  FIND_JOB_VALUE,
  MATCHED_VALUE,
  jobSearchFiltersFromSearchParams,
  jobsListingPathFromSearchParams,
  loginPathForFindJob,
} from "@/lib/find-job";
import { buildJobSearchWhere } from "@/lib/jobs/build-job-search-where";
import { prisma } from "@/lib/db";
import type { JobsCandidateContext } from "@/components/jobs/jobs-list-types";

export const metadata: Metadata = {
  title: "Careers · Current Openings",
  description: "Search and apply for roles managed by Mira Konnect.",
};

type Props = {
  searchParams: Promise<{
    q?: string;
    location?: string;
    industry?: string;
    type?: string;
    sort?: string;
    perPage?: string;
    page?: string;
    find?: string;
    matched?: string;
  }>;
};

export default async function JobsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const {
    q,
    location,
    industry: industrySlug,
    type,
    sort,
    perPage: perPageRaw,
    page: pageRaw,
    find,
    matched,
  } = sp;
  const findMode = find === FIND_JOB_VALUE;
  const matchedMode = matched === MATCHED_VALUE;

  const user = await getCurrentUser();
  const isCandidate = user?.role.name === RoleName.CANDIDATE && !!user.candidate;

  const searchFilters = jobSearchFiltersFromSearchParams(sp);

  if (findMode && !isCandidate) {
    redirect(loginPathForFindJob(searchFilters));
  }

  if (findMode && isCandidate && user.candidate) {
    const onboardingDone = await isCareerOnboardingComplete(user.candidate.id, user.id);
    if (onboardingDone) {
      redirect(jobsListingPathFromSearchParams(sp, { matched: true }));
    }
  }

  const query = q?.trim();
  const loc = location?.trim();
  const employmentType =
    type && Object.values(EmploymentType).includes(type as EmploymentType)
      ? (type as EmploymentType)
      : undefined;

  const perPage = [15, 30, 50].includes(Number(perPageRaw))
    ? Number(perPageRaw)
    : 15;
  const page = Math.max(1, parseInt(pageRaw ?? "1", 10) || 1);

  let industryId: string | undefined;
  if (industrySlug) {
    const ind = await prisma.industry.findUnique({ where: { slug: industrySlug } });
    industryId = ind?.id;
  }

  const onboardingComplete =
    isCandidate && user.candidate
      ? await isCareerOnboardingComplete(user.candidate.id, user.id)
      : false;

  const careerProfile =
    matchedMode && isCandidate && user.candidate && onboardingComplete
      ? await getCandidateCareerProfile(user.candidate.id)
      : null;

  const baseWhere = buildJobSearchWhere(
    {
      q: query,
      location: loc,
      industryId,
      employmentType,
    },
    null,
  );

  let where: Prisma.JobWhereInput = careerProfile
    ? buildJobSearchWhere(
        {
          q: query,
          location: loc,
          industryId,
          employmentType,
        },
        careerProfile,
      )
    : baseWhere;

  let personalizedResults = Boolean(careerProfile);
  let filteredCount = await prisma.job.count({ where });
  if (personalizedResults && filteredCount === 0) {
    where = baseWhere;
    personalizedResults = false;
    filteredCount = await prisma.job.count({ where });
  }

  const orderBy: Prisma.JobOrderByWithRelationInput[] =
    sort === "title"
      ? [{ title: "asc" }]
      : [{ publishedAt: "desc" }, { createdAt: "desc" }];

  const publishedCount = await prisma.job.count({ where: { status: JobStatus.PUBLISHED } });

  const [jobs, industries, resumeCount, applications] = await Promise.all([
    prisma.job.findMany({
      where,
      include: { industry: true, skills: true },
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.industry.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
      select: { slug: true, name: true },
    }),
    isCandidate && user.candidate
      ? prisma.resume.count({ where: { candidateId: user.candidate.id } })
      : Promise.resolve(0),
    isCandidate && user.candidate
      ? prisma.application.findMany({
          where: { candidateId: user.candidate.id },
          select: { jobId: true },
        })
      : Promise.resolve([]),
  ]);

  const candidate: JobsCandidateContext = {
    isLoggedInCandidate: isCandidate,
    hasResume: resumeCount > 0,
    appliedJobIds: applications.map((a) => a.jobId),
  };

  const jobRows = jobs.map((j) => ({
    id: j.id,
    slug: j.slug,
    title: j.title,
    description: j.description,
    responsibilities: j.responsibilities,
    requirements: j.requirements,
    benefits: j.benefits,
    location: j.location,
    employmentType: j.employmentType,
    experienceMin: j.experienceMin,
    experienceMax: j.experienceMax,
    industry: j.industry,
    skills: j.skills,
    postedAtIso: (j.publishedAt ?? j.createdAt).toISOString(),
  }));

  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-[#eef1f4]" />}>
      <JobsFindFlow
        isLoggedInCandidate={isCandidate}
        onboardingComplete={onboardingComplete}
        defaultName={user?.name}
        defaultPhone={user?.phone ?? undefined}
        searchQuery={query}
        searchLocation={loc}
      >
        <div className="min-h-[60vh] bg-[#eef1f4]">
          <JobsCareersHero openingCount={publishedCount} />

          <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-20">
            <Suspense fallback={<div className="h-14 animate-pulse bg-white" />}>
              <JobSearchBar
                industries={industries}
                defaultQuery={query ?? ""}
                defaultLocation={loc ?? ""}
                defaultIndustry={industrySlug ?? ""}
              />
            </Suspense>

            <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
              <div className="w-full shrink-0 lg:w-[280px]">
                <Suspense fallback={<div className="h-64 animate-pulse bg-white" />}>
                  <JobSidebar industries={industries} selectedIndustrySlug={industrySlug ?? ""} />
                </Suspense>
              </div>
              <Suspense fallback={<div className="min-h-[320px] flex-1 animate-pulse bg-white" />}>
                <JobsResultsPanel
                  jobs={jobRows}
                  totalCount={filteredCount}
                  page={page}
                  perPage={perPage}
                  candidate={candidate}
                  personalized={personalizedResults}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </JobsFindFlow>
    </Suspense>
  );
}
