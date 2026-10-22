import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { industries } from "@/data/industries";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ind = industries.find((i) => i.slug === slug);
  if (!ind) return { title: "Recruitment Services" };
  return {
    title: `${ind.name} Recruitment Services`,
    description: `Recruitment and staffing for ${ind.name} — Mira Konnect, India.`,
  };
}

export default async function IndustryRecruitmentPage({ params }: Props) {
  const { slug } = await params;
  const ind = industries.find((i) => i.slug === slug);
  if (!ind) notFound();
  redirect(`/industries?sector=${slug}`);
}
