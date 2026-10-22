import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms & Conditions" />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 text-sm text-mk-slate leading-relaxed space-y-4">
        <p>
          By using the Mira Konnect website and services, you agree to use the
          platform lawfully and provide accurate information. Full terms will be
          published before production launch.
        </p>
        <p>
          Job listings and recruitment outcomes depend on client requirements
          and candidate suitability. Mira Konnect does not guarantee placement.
        </p>
        <p>
          These terms may be updated; continued use constitutes acceptance of
          the revised terms where permitted by law.
        </p>
      </div>
    </>
  );
}
