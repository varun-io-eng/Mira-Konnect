import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 text-sm text-mk-slate leading-relaxed space-y-4">
        <p>
          Mira Konnect respects your privacy. This policy will be expanded with
          full legal text before production launch. We collect information you
          provide when applying for jobs, registering an account, or contacting
          us, and use it only for recruitment and related services.
        </p>
        <p>
          Candidate data is visible only to authorized Mira Konnect staff and
          client representatives involved in your application. We do not sell
          personal data.
        </p>
        <p>
          For questions, contact us through the Contact page. Future versions
          will support data export and account deletion requests.
        </p>
      </div>
    </>
  );
}
