import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";
import { BlogResourcesView } from "@/components/marketing/blog/blog-resources-view";

export const metadata: Metadata = {
  title: "Resources & Blog",
  description:
    "Recruitment insights, resume and interview guidance, and HR resources from Mira Konnect.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Resources"
        description="Recruitment insights, career advice, and interview tips — with trusted references and video guides."
      />
      <BlogResourcesView />
    </>
  );
}
