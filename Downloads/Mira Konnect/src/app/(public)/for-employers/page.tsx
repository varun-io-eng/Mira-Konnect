import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "For Employers",
  description: "Hire talent with Mira Konnect — sourcing through onboarding support.",
};

export default function ForEmployersPage() {
  return (
    <>
      <PageHeader
        title="For Employers"
        description="Partner with Mira Konnect for confidential, professional recruitment across industries."
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-mk-slate leading-relaxed">
          We support your hiring lifecycle: sourcing, screening, shortlisting,
          interview scheduling, negotiation, background checks, and onboarding.
          Share your requirement and our HR team will respond promptly.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/contact" size="lg">Hire Talent</Button>
          <Button href="/services" variant="outline" size="lg">View services</Button>
        </div>
      </div>
    </>
  );
}
