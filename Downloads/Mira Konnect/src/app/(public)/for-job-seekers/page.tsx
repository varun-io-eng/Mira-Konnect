import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "For Job Seekers",
  description: "Career support, job matching, and interview resources from Mira Konnect.",
};

export default function ForJobSeekersPage() {
  return (
    <>
      <PageHeader
        title="For Job Seekers"
        description="Discover roles, prepare confidently, and work with recruiters who respect your privacy."
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-mk-slate leading-relaxed">
          Mira Konnect offers job matching, resume guidance, interview preparation,
          and career support. Browse open positions or reach out to our team for
          guidance on your next move.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/jobs" size="lg">Find Jobs</Button>
          <Button href="/blog" variant="outline" size="lg">Career resources</Button>
        </div>
      </div>
    </>
  );
}
