import type { Metadata } from "next";
import { AccountAuthCard } from "@/components/auth/account-auth-card";
import { FindJobAuthCard } from "@/components/auth/find-job-auth-card";
import { PublisherAuthCard } from "@/components/auth/publisher-auth-card";
import { AdminPublisherLoginForm } from "@/components/admin/admin-publisher-login-form";
import { LoginForm } from "@/components/forms/auth-forms";
import { findJobPath, isFindJobRedirect } from "@/lib/find-job";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Mira Konnect account.",
};

type Props = { searchParams: Promise<{ next?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const { next } = await searchParams;
  const findJob = isFindJobRedirect(next);
  const continueNext = next ?? findJobPath();
  const publisherLogin =
    typeof next === "string" && (next.startsWith("/admin") || next.includes("/admin/"));

  return (
    <div className="bg-gradient-to-b from-mk-sand/40 via-white to-white py-10 sm:py-14 lg:py-16">
      {publisherLogin ? (
        <PublisherAuthCard>
          <AdminPublisherLoginForm />
        </PublisherAuthCard>
      ) : findJob ? (
        <FindJobAuthCard mode="login" next={continueNext}>
          <LoginForm next={continueNext} variant="jobSeeker" />
        </FindJobAuthCard>
      ) : (
        <AccountAuthCard mode="login" next={next}>
          <LoginForm next={next} variant="jobSeeker" />
        </AccountAuthCard>
      )}
    </div>
  );
}
