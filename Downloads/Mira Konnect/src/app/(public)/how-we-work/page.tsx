import type { Metadata } from "next";
import { HowWeWorkCycleSection } from "@/components/marketing/how-we-work-cycle";
import { PageHeader } from "@/components/marketing/page-header";

export const metadata: Metadata = {
  title: "How We Work",
  description: "Mira Konnect end-to-end recruitment cycle for employers and candidates.",
};

export default function HowWeWorkPage() {
  return (
    <>
      <PageHeader
        title="How We Work"
        description="A clear, ethical recruitment workflow from first brief to joining."
        bottomFadeClass="from-[#eef1f4]"
        className="min-h-[min(44vh,440px)] sm:min-h-[min(48vh,480px)]"
      />
      <div className="border-b border-mk-navy/5 bg-[#eef1f4]">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pb-14 lg:pt-7">
          <HowWeWorkCycleSection />
        </div>
      </div>
    </>
  );
}
