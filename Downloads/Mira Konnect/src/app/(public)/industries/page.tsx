import type { Metadata } from "next";
import { Suspense } from "react";
import { IndustryExplorer } from "@/components/marketing/industries/industry-explorer";
import { PageHeader } from "@/components/marketing/page-header";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Mira Konnect provides recruitment support across pharmaceuticals, manufacturing, IT, hospitality, and more.",
};

type Props = {
  searchParams: Promise<{ sector?: string }>;
};

export default async function IndustriesPage({ searchParams }: Props) {
  const { sector } = await searchParams;
  const validSector =
    sector && industries.some((i) => i.slug === sector) ? sector : undefined;

  return (
    <>
      <PageHeader
        eyebrow="Sector expertise"
        title="Industries we serve"
        description="How we hire, what roles we support, and how Mira Konnect can help your team in each sector."
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-mk-sand/50" />}>
          <IndustryExplorer initialSlug={validSector} />
        </Suspense>
      </div>
    </>
  );
}
