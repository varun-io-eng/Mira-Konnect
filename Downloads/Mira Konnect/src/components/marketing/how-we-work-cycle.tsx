import Image from "next/image";
import { cn } from "@/lib/utils";

const CYCLE_IMAGE = "/images/how-we-work/recruitment-cycle-diagram.png";

export function HowWeWorkCycleSection({ className }: { className?: string }) {
  return (
    <section className={cn(className)}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-stretch lg:gap-8 xl:gap-10">
        <div className="flex min-h-0 flex-col lg:h-full lg:justify-center lg:py-1">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-mk-teal">
            Process overview
          </p>
          <h2 className="mt-1.5 font-display text-lg font-semibold uppercase leading-snug text-mk-navy sm:text-xl">
            End-to-end <span className="font-bold">recruitment</span> cycle
          </h2>

          <div className="mt-3 space-y-2.5 text-xs leading-snug text-mk-slate sm:text-sm sm:leading-relaxed">
            <p>
              Six connected stages—job requirements, marketing, sourcing, screening and testing,
              interviews and selection, and candidate onboarding—follow the cycle clockwise around
              one central hub.
            </p>
            <p>
              For employers, that means a defined brief, qualified pipelines, and faster decisions
              without losing rigour. For candidates, it means honest role information, fair process,
              and support from first conversation through joining.
            </p>
            <p>
              Mira Konnect sits at the centre of the diagram: we align timelines, share feedback,
              and protect confidentiality while each coloured stage moves your hire or career
              forward.
            </p>
            <p className="text-mk-navy/80">
              Use the graphic on the right as a map—start at requirements and trace the path to
              onboarding to see where we add value at every turn.
            </p>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[min(660px,96vw)] lg:mx-0 lg:max-w-none lg:justify-self-stretch">
          <Image
            src={CYCLE_IMAGE}
            alt="End-to-end recruitment cycle diagram with six steps around a central hub"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 1024px) 96vw, 56vw"
          />
        </div>
      </div>
    </section>
  );
}
