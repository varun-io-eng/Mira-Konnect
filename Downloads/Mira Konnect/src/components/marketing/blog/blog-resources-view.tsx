"use client";

import { useEffect, useState } from "react";
import type { BlogResource } from "@/data/blog-resources";
import {
  blogResourceSections,
  getFeaturedBlogResource,
  getSectionResources,
} from "@/data/blog-resource-sections";
import { BlogCategoryCarousel } from "@/components/marketing/blog/blog-category-carousel";
import { BlogFeaturedLatest } from "@/components/marketing/blog/blog-featured-latest";
import { YouTubeVideoModal } from "@/components/marketing/blog/youtube-video-modal";

export function BlogResourcesView() {
  const featured = getFeaturedBlogResource();
  const [activeVideo, setActiveVideo] = useState<BlogResource | null>(null);

  useEffect(() => {
    if (!activeVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeVideo]);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <BlogFeaturedLatest item={featured} onPlayVideo={() => setActiveVideo(featured)} />

          <div className="mt-14 space-y-14 lg:mt-16 lg:space-y-16">
            {blogResourceSections.map((section) => (
              <BlogCategoryCarousel
                key={section.id}
                title={section.title}
                sectionId={section.id}
                items={getSectionResources(section)}
                onPlayVideo={setActiveVideo}
              />
            ))}
          </div>
        </div>
      </div>

      <YouTubeVideoModal
        open={activeVideo != null}
        videoId={activeVideo?.youtubeVideoId ?? ""}
        title={activeVideo?.videoLabel ?? ""}
        onClose={() => setActiveVideo(null)}
      />
    </>
  );
}
