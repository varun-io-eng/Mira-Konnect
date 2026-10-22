"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { BlogResource } from "@/data/blog-resources";
import type { BlogSectionId } from "@/data/blog-resource-sections";
import { getSectionLabel } from "@/data/blog-resource-sections";
import { BlogPlayButton } from "@/components/marketing/blog/blog-play-button";

type BlogResourceTileProps = {
  item: BlogResource;
  sectionId: BlogSectionId;
  onPlayVideo: (item: BlogResource) => void;
};

export function BlogResourceTile({ item, sectionId, onPlayVideo }: BlogResourceTileProps) {
  const sectionName = getSectionLabel(sectionId);

  return (
    <article
      id={item.slug}
      className="flex w-[min(100%,280px)] shrink-0 scroll-mt-28 flex-col sm:w-[300px]"
    >
      <button
        type="button"
        onClick={() => onPlayVideo(item)}
        className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-mk-sand/40 text-left ring-1 ring-mk-navy/10 transition hover:ring-mk-teal/25"
      >
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="300px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mk-navy/40 via-transparent to-transparent" />
        <BlogPlayButton
          size="sm"
          className="absolute bottom-3 right-3 transition group-hover:scale-105"
        />
      </button>
      <p className="mt-3 text-xs text-mk-muted">
        <span className="font-semibold text-mk-navy">Videos</span>
        <span className="mx-1.5 text-mk-navy/25" aria-hidden>|</span>
        {sectionName}
      </p>
      <h3 className="mt-1.5 line-clamp-3 font-display text-base font-semibold leading-snug text-mk-navy">
        {item.title}
      </h3>
      <a
        href={item.referenceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-mk-teal hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        Reference
        <ExternalLink className="h-3 w-3" aria-hidden />
      </a>
    </article>
  );
}
