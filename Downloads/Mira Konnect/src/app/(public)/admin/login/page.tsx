import type { Metadata } from "next";
import { PublisherAuthCard } from "@/components/auth/publisher-auth-card";
import { AdminPublisherLoginForm } from "@/components/admin/admin-publisher-login-form";

export const metadata: Metadata = {
  title: "Publisher sign in",
  description: "Sign in to publish jobs on Mira Konnect.",
  robots: { index: false, follow: false },
};

export default function AdminPublisherLoginPage() {
  return (
    <div className="bg-gradient-to-b from-mk-sand/40 via-white to-white py-10 sm:py-14 lg:py-16">
      <PublisherAuthCard>
        <AdminPublisherLoginForm />
      </PublisherAuthCard>
    </div>
  );
}
