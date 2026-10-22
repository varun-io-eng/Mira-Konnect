"use client";

import Image from "next/image";
import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import type { BlogResource } from "@/data/blog-resources";
import { YouTubeVideoModal } from "@/components/marketing/blog/youtube-video-modal";
import { cn } from "@/lib/utils";

type BlogResourceCardProps = {
  item: BlogResource;
  featured?: boolean;
};

export function BlogResourceCard({ item, featured }: BlogResourceCardProps) {
  const [videoOpen, setVideoOpen] = useState(false);

  const openVideo = () => setVideoOpen(true);

  return (
    <>
      <article
        className={cn(
          "flex flex-col gap-8 rounded-3xl border border-mk-navy/[0.08] bg-white p-5 shadow-sm sm:p-7 lg:flex-row lg:items-stretch lg:gap-10",
          featured && "ring-1 ring-mk-teal/20 shadow-md shadow-mk-teal/5",
        )}
      >
        <button
          type="button"
          onClick={openVideo}
          className={cn(
            "group relative shrink-0 overflow-hidden rounded-2xl bg-mk-sand/30 text-left shadow-md ring-1 ring-mk-navy/10 transition hover:ring-mk-teal/30",
            "w-full lg:w-[min(52%,560px)]",
          )}
        >
          <div
            className={cn(
              "relative w-full",
              featured ? "min-h-[240px] aspect-[16/10] sm:min-h-[300px]" : "min-h-[220px] aspect-video sm:min-h-[280px]",
            )}
          >
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-mk-navy/55 via-mk-navy/10 to-transparent"
              aria-hidden
            />
            <span
              className="absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#ffd166] text-mk-navy shadow-lg transition group-hover:scale-105"
              aria-hidden
            >
              <Play className="h-6 w-6 fill-mk-navy pl-0.5" />
            </span>
            <span className="absolute bottom-5 left-5 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              Watch on Mira Konnect
            </span>
          </div>
        </button>

        <div className="flex min-w-0 flex-1 flex-col justify-center py-1 lg:py-4">
          {featured ? (
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-mk-muted">
              Latest
            </p>
          ) : null}
          <p className={cn("text-sm font-medium text-mk-teal", featured ? "mt-2" : "mt-0")}>
            {item.audience}
          </p>
          <h2
            className={cn(
              "font-display font-semibold leading-snug text-mk-navy",
              featured ? "mt-3 text-2xl sm:text-3xl" : "mt-2 text-xl sm:text-2xl",
            )}
          >
            <span className="text-mk-muted">{item.number}.</span> {item.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mk-slate">
            <span className="font-semibold text-mk-navy">What to cover:</span>{" "}
            {item.whatToCover}
          </p>
          <p className="mt-4 text-base text-mk-slate">
            <span className="font-semibold text-mk-navy">Reference:</span>{" "}
            <a
              href={item.referenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-mk-teal underline decoration-mk-teal/40 underline-offset-2 hover:decoration-mk-teal"
            >
              {item.referenceLabel}
              <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
            </a>
          </p>
          <p className="mt-3 text-base text-mk-slate">
            <span className="font-semibold text-mk-navy">Video:</span>{" "}
            <button
              type="button"
              onClick={openVideo}
              className="inline-flex items-center gap-1.5 font-medium text-mk-teal underline decoration-mk-teal/40 underline-offset-2 hover:decoration-mk-teal"
            >
              {item.videoLabel}
              <span
                className="inline-flex h-5 items-center rounded bg-red-600 px-1.5 text-[10px] font-bold uppercase tracking-wide text-white no-underline"
                aria-hidden
              >
                Play
              </span>
            </button>
          </p>
        </div>
      </article>

      <YouTubeVideoModal
        open={videoOpen}
        videoId={item.youtubeVideoId}
        title={item.videoLabel}
        onClose={() => setVideoOpen(false)}
      />
    </>
  );
}
