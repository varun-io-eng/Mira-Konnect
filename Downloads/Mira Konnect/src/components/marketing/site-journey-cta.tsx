import { Button } from "@/components/ui/button";

type SiteJourneyCtaProps = {
  className?: string;
};

export function SiteJourneyCta({ className }: SiteJourneyCtaProps) {
  return (
    <section
      className={
        className ??
        "mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-2xl border border-[#1e4d7b]/15 bg-gradient-to-r from-[#e8f2fc] to-[#dceef5] px-6 py-8 sm:flex-row sm:items-center sm:px-10"
      }
      aria-label="Hire or apply"
    >
      <h2 className="font-display text-xl font-semibold text-mk-navy sm:text-2xl">
        Start your journey with us!
      </h2>
      <div className="flex flex-wrap gap-3">
        <Button href="/contact" size="md" className="min-w-[7.5rem]">
          Hire Now
        </Button>
        <Button href="/jobs" variant="outline" size="md" className="min-w-[7.5rem] border-[#1e4d7b] bg-white text-[#1e4d7b]">
          Apply Now
        </Button>
      </div>
    </section>
  );
}
