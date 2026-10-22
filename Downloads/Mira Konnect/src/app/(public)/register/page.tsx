import type { Metadata } from "next";
import Link from "next/link";
import { FindJobAuthCard } from "@/components/auth/find-job-auth-card";
import { RegisterForm } from "@/components/forms/auth-forms";
import { findJobPath, isFindJobRedirect } from "@/lib/find-job";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a Mira Konnect candidate or employer account.",
};

type Props = { searchParams: Promise<{ next?: string }> };

export default async function RegisterPage({ searchParams }: Props) {
  const { next } = await searchParams;
  const findJob = isFindJobRedirect(next);
  const continueNext = next ?? findJobPath();
  const loginHref = `/login?next=${encodeURIComponent(continueNext)}`;

  return (
    <>
      <div className="mx-auto max-w-md px-4 py-8 sm:px-6 sm:py-12">
        {findJob ? (
          <FindJobAuthCard mode="register" next={continueNext}>
            <RegisterForm next={continueNext} variant="jobSeeker" />
          </FindJobAuthCard>
        ) : (
          <>
            <RegisterForm next={next} />
            <p className="mt-6 text-center text-sm text-mk-slate">
              Already have an account?{" "}
              <Link href={loginHref} className="font-semibold text-mk-teal hover:underline">
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </>
  );
}
