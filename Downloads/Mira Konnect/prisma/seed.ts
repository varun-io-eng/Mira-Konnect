/**
 * Mira Konnect demo seed — run after migrations.
 * Set IS_DEMO_SEED=true in production only for intentional demo environments.
 */
import { PrismaClient, RoleName, JobStatus, BlogStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sampleJobsContent } from "./sample-jobs-content";

const publisherEmail = (process.env.ADMIN_PUBLISH_EMAIL ?? "admin@gmail.com").toLowerCase();
const publisherPassword = process.env.ADMIN_PUBLISH_PASSWORD ?? "MiraKonnectPublish2026!";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Mira Konnect (demo data)...");

  const roles = await Promise.all(
    Object.values(RoleName).map((name) =>
      prisma.role.upsert({
        where: { name },
        update: {},
        create: { name, description: `${name} role` },
      }),
    ),
  );

  const roleByName = Object.fromEntries(roles.map((r) => [r.name, r.id])) as Record<
    RoleName,
    string
  >;

  const industries = [
    { name: "Pharmaceuticals & Lifesciences", slug: "pharmaceuticals-lifesciences" },
    { name: "Manufacturing & Engineering", slug: "manufacturing-engineering" },
    { name: "Hospitality", slug: "hospitality" },
    { name: "IT", slug: "it" },
    { name: "Gems & Jewellery", slug: "gems-jewellery" },
    { name: "Textiles", slug: "textiles" },
    { name: "Banking & Insurance", slug: "banking-insurance" },
    { name: "EdTech", slug: "edtech" },
    { name: "Digital Marketing", slug: "digital-marketing" },
    { name: "FMCG", slug: "fmcg" },
  ];

  const demoPasswordHash = await bcrypt.hash("Demo@12345", 12);
  const publisherPasswordHash = await bcrypt.hash(publisherPassword, 12);

  const demoUsers = [
    {
      email: "admin@mirakonnect.demo",
      name: "Mira Konnect Admin",
      role: RoleName.SUPER_ADMIN,
      kind: "admin" as const,
      passwordHash: demoPasswordHash,
    },
    {
      email: publisherEmail,
      name: "Job Publisher",
      role: RoleName.SUPER_ADMIN,
      kind: "admin" as const,
      passwordHash: publisherPasswordHash,
    },
    {
      email: "candidate@mirakonnect.demo",
      name: "Demo Candidate",
      role: RoleName.CANDIDATE,
      kind: "candidate" as const,
      passwordHash: demoPasswordHash,
    },
    {
      email: "employer@mirakonnect.demo",
      name: "Demo Employer",
      role: RoleName.EMPLOYER,
      kind: "employer" as const,
      passwordHash: demoPasswordHash,
    },
  ];

  for (const du of demoUsers) {
    const roleId = roleByName[du.role];
    if (!roleId) continue;
    await prisma.user.upsert({
      where: { email: du.email },
      update: { passwordHash: du.passwordHash, name: du.name },
      create: {
        email: du.email,
        name: du.name,
        passwordHash: du.passwordHash,
        roleId,
        ...(du.kind === "candidate"
          ? { candidate: { create: {} } }
          : du.kind === "employer"
            ? {
                employer: {
                  create: {
                    company: { create: { name: "Demo Industries Pvt Ltd" } },
                  },
                },
              }
            : {}),
      },
    });
  }

  for (const [i, ind] of industries.entries()) {
    await prisma.industry.upsert({
      where: { slug: ind.slug },
      update: {},
      create: {
        name: ind.name,
        slug: ind.slug,
        sortOrder: i,
        shortDescription: `Recruitment expertise for ${ind.name}.`,
      },
    });
  }

  for (const job of sampleJobsContent) {
    const industry = await prisma.industry.findUnique({
      where: { slug: job.industrySlug },
    });
    const data = {
      title: job.title,
      location: job.location,
      industryId: industry?.id ?? null,
      description: job.description,
      responsibilities: job.responsibilities,
      requirements: job.requirements,
      benefits: job.benefits,
      experienceMin: job.experienceMin,
      experienceMax: job.experienceMax ?? null,
      salaryDisplay: job.salaryDisplay,
      employmentType: job.employmentType,
      status: JobStatus.PUBLISHED,
      publishedAt: new Date(),
    };

    const record = await prisma.job.upsert({
      where: { slug: job.slug },
      update: data,
      create: { slug: job.slug, ...data },
    });

    await prisma.jobSkill.deleteMany({ where: { jobId: record.id } });
    if (job.skills.length > 0) {
      await prisma.jobSkill.createMany({
        data: job.skills.map((name) => ({ jobId: record.id, name })),
      });
    }
  }

  const blogPosts = [
    {
      title: "How to prepare for a structured HR interview",
      slug: "prepare-structured-hr-interview",
      excerpt: "Practical steps to present your experience clearly and confidently.",
      content:
        "Structured interviews focus on competencies and real examples. Prepare short stories that show impact, clarify your notice period, and research the employer's industry context. Mira Konnect recruiters can help you align your narrative with the role.",
    },
    {
      title: "What employers look for in early-career hires",
      slug: "employers-early-career-hires",
      excerpt: "Beyond grades: reliability, learning agility, and communication.",
      content:
        "Hiring managers value candidates who communicate clearly, follow through on commitments, and show curiosity. Highlight internships, projects, and teamwork. Mira Konnect supports employers with screening and shortlisting tailored to each role.",
    },
  ];

  for (const post of blogPosts) {
    await prisma.blog.upsert({
      where: { slug: post.slug },
      update: { status: BlogStatus.PUBLISHED, publishedAt: new Date() },
      create: {
        ...post,
        status: BlogStatus.PUBLISHED,
        publishedAt: new Date(),
      },
    });
  }

  console.log("Seed complete. Roles:", roleByName.SUPER_ADMIN ? "ok" : "missing");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
