import type { Metadata } from "next";

import Link from "next/link";

import { notFound } from "next/navigation";

import { Suspense } from "react";

import {

  Briefcase,

  Calendar,

  Hash,

  IndianRupee,

  MapPin,

  TrendingUp,

} from "lucide-react";

import { JobStatus, RoleName } from "@prisma/client";

import { JobDetailSidebar } from "@/components/jobs/job-detail-sidebar";

import type { ApplyFormPrefill } from "@/components/jobs/job-detail-apply-block";

import { JobJdSection } from "@/components/jobs/job-jd-section";

import { JobCard } from "@/components/jobs/job-card";

import { SaveJobButton } from "@/components/jobs/save-job-button";

import { getCurrentUser } from "@/lib/auth/get-user";

import {

  formatEmploymentType,

  formatExperience,

  formatPostedDate,

} from "@/lib/jobs/display";

import { prisma } from "@/lib/db";

import { siteConfig } from "@/lib/site-config";



type Props = { params: Promise<{ slug: string }> };



export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { slug } = await params;

  const job = await prisma.job.findUnique({ where: { slug } });

  if (!job || job.status !== JobStatus.PUBLISHED) return { title: "Job not found" };

  return {

    title: job.title,

    description: job.description.slice(0, 160),

  };

}



export default async function JobDetailPage({ params }: Props) {

  const { slug } = await params;

  const job = await prisma.job.findUnique({

    where: { slug },

    include: { industry: true, skills: true },

  });



  if (!job || job.status !== JobStatus.PUBLISHED) notFound();



  const user = await getCurrentUser();

  const isCandidate = user?.role.name === RoleName.CANDIDATE && !!user.candidate;



  const [savedJob, existingApplication, resumeCount, currentRole] = await Promise.all([

    isCandidate && user.candidate

      ? prisma.savedJob.findUnique({

          where: {

            candidateId_jobId: { candidateId: user.candidate.id, jobId: job.id },

          },

        })

      : null,

    isCandidate && user.candidate

      ? prisma.application.findUnique({

          where: {

            candidateId_jobId: { candidateId: user.candidate.id, jobId: job.id },

          },

        })

      : null,

    isCandidate && user.candidate

      ? prisma.resume.count({ where: { candidateId: user.candidate.id } })

      : 0,

    isCandidate && user.candidate

      ? prisma.candidateExperience.findFirst({

          where: { candidateId: user.candidate.id, isCurrent: true },

          orderBy: { startDate: "desc" },

        })

      : null,

  ]);

  const applyPrefill: ApplyFormPrefill = (() => {

    if (!user) {

      return {

        firstName: "",

        lastName: "",

        email: "",

        phone: "",

        currentJobTitle: "",

        currentSalary: "",

        address: "",

      };

    }

    const nameParts = user.name.trim().split(/\s+/);

    const firstName = nameParts[0] ?? "";

    const lastName = nameParts.slice(1).join(" ");

    return {

      firstName,

      lastName,

      email: user.email,

      phone: user.phone ?? "",

      currentJobTitle: currentRole?.title ?? "",

      currentSalary:

        user.candidate?.expectedSalary != null ? String(user.candidate.expectedSalary) : "",

      address: "",

    };

  })();



  const related = await prisma.job.findMany({

    where: {

      status: JobStatus.PUBLISHED,

      id: { not: job.id },

      ...(job.industryId ? { industryId: job.industryId } : { location: job.location }),

    },

    include: { industry: true, skills: true },

    take: 4,

  });



  const posted = job.publishedAt ?? job.createdAt;

  const updated = job.updatedAt;

  const experience = formatExperience(job);

  const employmentLabel = formatEmploymentType(job.employmentType);



  const jobPostingJsonLd = {

    "@context": "https://schema.org",

    "@type": "JobPosting",

    title: job.title,

    description: job.description,

    datePosted: posted.toISOString(),

    employmentType: job.employmentType,

    hiringOrganization: {

      "@type": "Organization",

      name: siteConfig.name,

      sameAs: siteConfig.url,

    },

    jobLocation: {

      "@type": "Place",

      address: {

        "@type": "PostalAddress",

        addressLocality: job.location,

        addressCountry: "IN",

      },

    },

  };



  const sidebarRelated = related.slice(0, 3);



  return (

    <>

      <script

        type="application/ld+json"

        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }}

      />



      <div className="min-h-[60vh] bg-[#eef1f4] pb-12">

        <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">

          <nav className="text-sm text-mk-muted" aria-label="Breadcrumb">

            <Link href="/" className="hover:text-mk-navy">Home</Link>

            <span className="mx-2">/</span>

            <Link href="/jobs" className="hover:text-mk-navy">Jobs</Link>

            <span className="mx-2">/</span>

            <span className="text-mk-navy">{job.title}</span>

          </nav>



          <header className="mt-6 rounded-xl border border-mk-navy/10 bg-white p-6 shadow-sm sm:p-8">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

              <div className="min-w-0">

                <p className="text-xs font-bold uppercase tracking-wide text-mk-teal">

                  {employmentLabel}

                </p>

                <h1 className="mt-2 font-display text-2xl font-semibold text-mk-navy sm:text-3xl">

                  {job.title}

                </h1>

                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-mk-muted">

                  <span>Posted {formatPostedDate(posted)}</span>

                  <span>Updated {formatPostedDate(updated)}</span>

                </p>

              </div>

              <SaveJobButton

                jobId={job.id}

                jobSlug={job.slug}

                initialSaved={!!savedJob}

                isCandidate={isCandidate}

              />

            </div>



            <ul className="mt-6 flex flex-wrap gap-3 border-t border-mk-navy/8 pt-6 text-sm text-mk-slate">

              {job.salaryDisplay ? (

                <li className="flex items-center gap-2">

                  <IndianRupee className="h-4 w-4 text-mk-teal" aria-hidden />

                  <span className="font-semibold text-mk-navy">{job.salaryDisplay}</span>

                </li>

              ) : null}

              <li className="flex items-center gap-2">

                <MapPin className="h-4 w-4 text-mk-teal" aria-hidden />

                {job.location}

              </li>

              {job.industry ? (

                <li className="flex items-center gap-2">

                  <Briefcase className="h-4 w-4 text-mk-teal" aria-hidden />

                  {job.industry.name}

                </li>

              ) : null}

            </ul>

          </header>



          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px] lg:gap-10">

            <div className="min-w-0 space-y-6">

              <section className="rounded-xl border border-mk-navy/10 bg-white p-6 shadow-sm sm:p-8">

                <h2 className="font-display text-xl font-semibold text-mk-navy">Job detail</h2>

                <ul className="mt-5 grid gap-4 sm:grid-cols-2">

                  <li className="flex gap-3 text-sm">

                    <Hash className="h-5 w-5 shrink-0 text-mk-teal" aria-hidden />

                    <div>

                      <p className="font-semibold text-mk-navy">Job ID</p>

                      <p className="text-mk-muted">{job.slug}</p>

                    </div>

                  </li>

                  <li className="flex gap-3 text-sm">

                    <Briefcase className="h-5 w-5 shrink-0 text-mk-teal" aria-hidden />

                    <div>

                      <p className="font-semibold text-mk-navy">Job level</p>

                      <p className="text-mk-muted">{employmentLabel}</p>

                    </div>

                  </li>

                  {experience ? (

                    <li className="flex gap-3 text-sm">

                      <TrendingUp className="h-5 w-5 shrink-0 text-mk-teal" aria-hidden />

                      <div>

                        <p className="font-semibold text-mk-navy">Experience</p>

                        <p className="text-mk-muted">{experience}</p>

                      </div>

                    </li>

                  ) : null}

                  <li className="flex gap-3 text-sm">

                    <Calendar className="h-5 w-5 shrink-0 text-mk-teal" aria-hidden />

                    <div>

                      <p className="font-semibold text-mk-navy">Posted on</p>

                      <p className="text-mk-muted">{formatPostedDate(posted)}</p>

                    </div>

                  </li>

                </ul>

              </section>



              <JobJdSection title="Job description" body={job.description} />

              <JobJdSection title="Key responsibilities" body={job.responsibilities} />

              <JobJdSection title="Candidate profile" body={job.requirements} />

              {job.benefits ? <JobJdSection title="What we offer" body={job.benefits} /> : null}



              {job.skills.length > 0 ? (

                <section className="rounded-xl border border-mk-navy/10 bg-white p-6 shadow-sm sm:p-8">

                  <h2 className="font-display text-xl font-semibold text-mk-navy">Required skills</h2>

                  <ul className="mt-4 flex flex-wrap gap-2">

                    {job.skills.map((s) => (

                      <li

                        key={s.id}

                        className="rounded-full bg-[#eef1f4] px-3 py-1.5 text-sm font-medium text-mk-navy"

                      >

                        {s.name}

                      </li>

                    ))}

                  </ul>

                </section>

              ) : null}

            </div>



            <Suspense

              fallback={

                <div className="h-48 animate-pulse rounded-xl bg-white shadow-sm" aria-hidden />

              }

            >

              <JobDetailSidebar

                jobId={job.id}

                jobSlug={job.slug}

                jobTitle={job.title}

                applicationDeadline={job.applicationDeadline}

                isLoggedInCandidate={isCandidate}

                hasResume={resumeCount > 0}

                hasApplied={!!existingApplication}

                related={sidebarRelated}

                prefill={applyPrefill}

              />

            </Suspense>

          </div>



          {related.length > 0 ? (

            <section className="mt-14">

              <h2 className="font-display text-2xl font-semibold text-mk-navy">

                Other jobs you may like

              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                {related.map((j) => (

                  <JobCard key={j.id} job={j} variant="opening" />

                ))}

              </div>

            </section>

          ) : null}

        </div>

      </div>

    </>

  );

}


