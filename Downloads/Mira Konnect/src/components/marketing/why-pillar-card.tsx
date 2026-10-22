"use client";

import Image from "next/image";
import type { WhyReason } from "@/data/why-mira-konnect";

export function WhyPillarCard({ item }: { item: WhyReason }) {
  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-mk-navy/10 bg-white shadow-[0_8px_30px_rgba(15,39,68,0.06)] transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full shrink-0 bg-mk-navy">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-cover"
          style={{ objectPosition: item.objectPosition ?? "center" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-mk-navy/50 via-transparent to-transparent"
          aria-hidden
        />
        <span
          className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-mk-navy shadow-sm"
        >
          {item.difference}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center gap-2 text-mk-teal">
          <item.icon className="h-4 w-4 shrink-0" aria-hidden />
          <h3 className="font-display text-base font-semibold leading-snug text-mk-navy sm:text-lg">
            {item.title}
          </h3>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-mk-slate">{item.body}</p>
      </div>
    </article>
  );
}
