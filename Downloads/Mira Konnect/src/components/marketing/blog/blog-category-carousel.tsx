"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogResource } from "@/data/blog-resources";
import type { BlogSectionId } from "@/data/blog-resource-sections";
import { BlogResourceTile } from "@/components/marketing/blog/blog-resource-tile";
import { cn } from "@/lib/utils";

type BlogCategoryCarouselProps = {
  title: string;
  sectionId: BlogSectionId;
  items: BlogResource[];
  onPlayVideo: (item: BlogResource) => void;
};

export function BlogCategoryCarousel({
  title,
  sectionId,
  items,
  onPlayVideo,
}: BlogCategoryCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateScrollState() {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [items.length]);

  function scrollByDir(dir: -1 | 1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
    window.setTimeout(updateScrollState, 350);
  }

  return (
    <section className="relative">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold text-mk-navy sm:text-[1.65rem]">
          {title}
        </h2>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            aria-label={`Scroll ${title} left`}
            disabled={!canScrollLeft}
            onClick={() => scrollByDir(-1)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border border-mk-navy/15 bg-white text-mk-navy shadow-sm transition",
              canScrollLeft ? "hover:border-mk-teal/40 hover:text-mk-teal" : "opacity-40",
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label={`Scroll ${title} right`}
            disabled={!canScrollRight}
            onClick={() => scrollByDir(1)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border border-mk-navy/15 bg-white text-mk-navy shadow-sm transition",
              canScrollRight ? "hover:border-mk-teal/40 hover:text-mk-teal" : "opacity-40",
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={updateScrollState}
        className="flex gap-5 overflow-x-auto pb-2 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <BlogResourceTile
            key={item.slug}
            item={item}
            sectionId={sectionId}
            onPlayVideo={onPlayVideo}
          />
        ))}
      </div>
    </section>
  );
}
