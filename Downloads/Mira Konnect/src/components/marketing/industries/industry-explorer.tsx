"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { IndustrySpecializationView } from "@/components/marketing/industries/industry-specialization-view";
import { industries } from "@/data/industries";

type IndustryExplorerProps = {
  initialSlug?: string;
};

export function IndustryExplorer({ initialSlug }: IndustryExplorerProps) {
  const searchParams = useSearchParams();
  const sectorParam = searchParams.get("sector") ?? initialSlug;
  const defaultSlug = industries[0]?.slug ?? "";

  const slug = useMemo(() => {
    if (sectorParam && industries.some((i) => i.slug === sectorParam)) return sectorParam;
    return defaultSlug;
  }, [sectorParam, defaultSlug]);

  return <IndustrySpecializationView slug={slug} />;
}
