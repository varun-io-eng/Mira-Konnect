import Link from "next/link";
import { SettingSunLogo } from "@/components/brand/setting-sun-logo";
import { getPublisherEmail } from "@/lib/auth/publisher-credentials";

type PublisherAuthCardProps = {
  children: React.ReactNode;
};

export function PublisherAuthCard({ children }: PublisherAuthCardProps) {
  const publisherEmail = getPublisherEmail();

  return (
    <div className="mx-auto w-full max-w-md px-4 sm:px-6">
      <div className="overflow-hidden rounded-2xl border border-mk-navy/10 bg-white shadow-xl shadow-mk-navy/10">
        <div className="bg-gradient-to-br from-mk-navy via-[#1e4d7b] to-mk-teal px-5 py-5 text-white sm:px-6">
          <div className="flex flex-col items-center text-center">
            <SettingSunLogo variant="light" className="justify-center" />
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
              Publisher portal
            </p>
            <h1 className="mt-1 font-display text-xl font-semibold leading-snug sm:text-2xl">
              Sign in to publish jobs
            </h1>
            <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-white/85 sm:text-[13px]">
              Authorized Mira Konnect team only. Use{" "}
              <span className="font-medium text-white">{publisherEmail}</span> to post roles for
              hiring clients.
            </p>
          </div>
        </div>

        <div className="px-5 py-5 sm:px-6 sm:py-6">{children}</div>

      </div>

      <p className="mt-4 text-center text-xs text-mk-muted">
        Need to hire through Mira Konnect?{" "}
        <Link href="/contact" className="font-medium text-mk-navy hover:underline">
          Contact our HR team
        </Link>
      </p>
    </div>
  );
}
