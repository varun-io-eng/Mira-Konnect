import type { Metadata } from "next";
import { AboutPageContent } from "@/components/marketing/about/about-page-sections";
import { PageHeader } from "@/components/marketing/page-header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} — professional recruitment and staffing across India.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="About Mira Konnect"
        description="We connect employers and job seekers with integrity, confidentiality, and a human-first approach to recruitment."
      />
      <AboutPageContent />
    </>
  );
}
