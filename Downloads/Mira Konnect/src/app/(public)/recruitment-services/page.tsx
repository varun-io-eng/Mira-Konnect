import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/marketing/page-header";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Recruitment Services in India",
  description:
    "HR recruitment, staffing, and talent acquisition services from Mira Konnect across Gujarat and India.",
};

export default function RecruitmentServicesPage() {
  return (
    <>
      <PageHeader
        title="Recruitment Services"
        description="Professional recruitment consultancy and staffing support for businesses across India, including Gujarat and Ahmedabad."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="max-w-3xl text-mk-slate">
          Mira Konnect provides talent acquisition, HR recruitment services,
          and job consultancy for employers seeking reliable hiring partners.
          Explore industry-focused pages below.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.slice(0, 6).map((ind) => (
            <li key={ind.slug}>
              <Link
                href={`/recruitment-services/${ind.slug}`}
                className="block rounded-xl border border-mk-navy/10 p-5 hover:border-mk-teal/40"
              >
                <span className="font-medium text-mk-navy">{ind.name}</span>
                <span className="mt-1 block text-sm text-mk-muted">
                  Industry recruitment
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
