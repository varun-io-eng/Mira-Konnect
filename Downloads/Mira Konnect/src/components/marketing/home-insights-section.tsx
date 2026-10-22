"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowDownRight, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { HomeInsightArticle } from "@/data/home-insights";
import { getHomeInsightTiles, type HomeInsightTile } from "@/data/home-insights";
import { BlogPlayButton } from "@/components/marketing/blog/blog-play-button";
import { YouTubeVideoModal } from "@/components/marketing/blog/youtube-video-modal";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const featureToneClass: Record<NonNullable<HomeInsightTile["featureTone"]>, string> = {
  teal: "bg-[#1e4d47] text-white",
  plum: "bg-[#3d2a4f] text-white",
  charcoal: "bg-[#2a2d32] text-white",
};

function MediaInsightCard({
  tile,
  onPlayVideo,
}: {
  tile: HomeInsightTile;
  onPlayVideo: () => void;
}) {
  const { article, dateBadge } = tile;

  return (
    <article className="flex flex-col overflow-hidden rounded-[1.25rem] bg-white shadow-md ring-1 ring-mk-navy/[0.06]">
      <button
        type="button"
        onClick={onPlayVideo}
        className="group relative aspect-[4/3] w-full bg-mk-sand/30 text-left sm:aspect-[5/4]"
        aria-label={`Play video: ${article.videoLabel}`}
      >
        <Image
          src={article.imageSrc}
          alt={article.imageAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span
          className="absolute bottom-4 right-4 flex min-w-[3.25rem] flex-col items-center justify-center rounded-md bg-[#ffd166] px-2 py-1.5 text-center text-mk-navy shadow-lg"
          aria-hidden
        >
          <span className="text-[10px] font-bold uppercase leading-none tracking-wide">Guide</span>
          <span className="font-display text-sm font-bold leading-tight">{dateBadge}</span>
        </span>
        <span className="absolute bottom-4 left-4">
          <BlogPlayButton
            size="md"
            className="shadow-lg transition group-hover:scale-105"
          />
        </span>
      </button>
      <div className="p-5 sm:p-6">
        <p className="text-sm font-medium text-mk-teal">
          <span className="text-mk-muted">Category :</span> {article.category}
        </p>
        <h3 className="mt-2 line-clamp-2 font-display text-lg font-semibold leading-snug text-mk-navy">
          {article.cardTitle}
        </h3>
        <a
          href={article.referenceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-mk-navy transition hover:text-mk-teal"
        >
          Read more
          <ArrowDownRight className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </article>
  );
}

function FeatureInsightCard({ tile }: { tile: HomeInsightTile }) {
  const { article, featureTone = "teal" } = tile;
  const tone = featureToneClass[featureTone];

  return (
    <article
      className={cn(
        "flex min-h-[14rem] flex-col justify-between rounded-[1.25rem] p-6 shadow-md sm:min-h-[16rem] sm:p-7",
        tone,
      )}
    >
      <div>
        <p className="text-sm font-medium text-white/80">{article.category}</p>
        <h3 className="mt-3 line-clamp-3 font-display text-xl font-semibold leading-snug sm:text-2xl">
          {article.cardTitle}
        </h3>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4">
        <p className="text-xs text-white/65">{article.readMeta}</p>
        <a
          href={article.referenceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-white/90 underline-offset-2 hover:text-[#ffd166] hover:underline"
        >
          Reference
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </article>
  );
}

export function HomeInsightsSection() {
  const reduce = useReducedMotion();
  const columns = getHomeInsightTiles();
  const [activeVideo, setActiveVideo] = useState<HomeInsightArticle | null>(null);

  useEffect(() => {
    if (!activeVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeVideo]);

  return (
    <section
      className="border-t border-mk-navy/5 bg-white py-16 lg:py-24"
      aria-labelledby="home-insights-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-mk-teal">
            Talent sourcing & recruitment
          </p>
          <h2
            id="home-insights-heading"
            className="mt-3 font-display text-3xl font-semibold text-mk-navy sm:text-4xl"
          >
            Latest insights
          </h2>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-6"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease, delay: 0.05 }}
        >
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-6 md:gap-5 lg:gap-6">
              {column.map((tile) => {
                const key = `${tile.insightId}-${tile.variant}-${tile.featureTone ?? ""}`;
                if (tile.variant === "media") {
                  return (
                    <MediaInsightCard
                      key={key}
                      tile={tile}
                      onPlayVideo={() => setActiveVideo(tile.article)}
                    />
                  );
                }
                return <FeatureInsightCard key={key} tile={tile} />;
              })}
            </div>
          ))}
        </motion.div>
      </div>

      <YouTubeVideoModal
        open={activeVideo != null}
        videoId={activeVideo?.youtubeVideoId ?? ""}
        title={activeVideo?.videoLabel ?? ""}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
}
