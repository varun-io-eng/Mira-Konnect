"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { BlogResource } from "@/data/blog-resources";
import { BlogPlayButton } from "@/components/marketing/blog/blog-play-button";

type BlogFeaturedLatestProps = {
  item: BlogResource;
  onPlayVideo: () => void;
};

export function BlogFeaturedLatest({ item, onPlayVideo }: BlogFeaturedLatestProps) {
  return (
    <section className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
      <button
        type="button"
        onClick={onPlayVideo}
        className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-mk-sand/30 text-left shadow-lg ring-1 ring-mk-navy/10 transition hover:ring-mk-teal/25"
      >
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 560px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mk-navy/50 via-mk-navy/10 to-transparent" />
        <BlogPlayButton
          size="lg"
          className="absolute bottom-5 right-5 transition group-hover:scale-105"
        />
      </button>

      <div className="flex flex-col justify-center lg:py-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-mk-muted">Latest</p>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-mk-navy sm:text-3xl lg:text-[2rem]">
          {item.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-mk-slate">{item.whatToCover}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onPlayVideo}
            className="inline-flex items-center gap-2 rounded-full bg-mk-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-mk-navy/90"
          >
            Watch video
          </button>
          <a
            href={item.referenceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-mk-teal hover:underline"
          >
            {item.referenceLabel}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
