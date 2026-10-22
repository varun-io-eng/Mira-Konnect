import Link from "next/link";
import { findJobPath } from "@/lib/find-job";
import { cn } from "@/lib/utils";

type HeaderCtaButtonsProps = {
  className?: string;
  stacked?: boolean;
  onNavigate?: () => void;
};

export function HeaderCtaButtons({ className, stacked, onNavigate }: HeaderCtaButtonsProps) {
  return (
    <div
      className={cn(
        stacked ? "flex flex-col gap-2" : "flex items-center gap-2",
        className,
      )}
    >
      <Link
        href="/contact"
        onClick={onNavigate}
        className="rounded-full bg-mk-navy px-4 py-2 text-center text-[12px] font-bold uppercase tracking-wide text-white transition hover:bg-[#0f2744] sm:text-[13px]"
      >
        Hire Talent
      </Link>
      <Link
        href={findJobPath()}
        onClick={onNavigate}
        className="rounded-full bg-mk-navy px-4 py-2 text-center text-[12px] font-bold uppercase tracking-wide text-white transition hover:bg-[#0f2744] sm:text-[13px]"
      >
        Find a Job
      </Link>
    </div>
  );
}
