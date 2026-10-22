import { AdminPublisherPortal } from "@/components/admin/admin-publisher-portal";
import { prisma } from "@/lib/db";

export const metadata = {
  title: "Publish a job",
  description: "Mira Konnect publisher portal — post roles to the careers page.",
};

type Props = { searchParams: Promise<{ success?: string; slug?: string }> };

export default async function AdminPublishPage({ searchParams }: Props) {
  const { success, slug } = await searchParams;

  const [jobs, industries] = await Promise.all([
    prisma.job.findMany({
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        location: true,
        status: true,
        slug: true,
        updatedAt: true,
      },
    }),
    prisma.industry.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  return (
    <AdminPublisherPortal
      jobs={jobs.map((j) => ({
        ...j,
        updatedAt: j.updatedAt.toISOString(),
      }))}
      industries={industries}
      successSlug={success === "1" && slug ? slug : undefined}
    />
  );
}
