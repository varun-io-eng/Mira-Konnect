"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type HeroScene = {
  src: string;
  alt: string;
  objectPosition?: string;
};

type HeroLivingScenesProps = {
  scenes: HeroScene[];
  intervalMs?: number;
  overlayClassName?: string;
  className?: string;
  priority?: boolean;
  /** Show full frame (home/careers art) vs cinematic crop */
  imageFit?: "cover" | "contain";
  /** Optional MP4 — plays when present (place file in /public/videos/) */
  videoSrc?: string;
  posterSrc?: string;
  /** Slightly lift exposure on photography */
  vibrant?: boolean;
  sizes?: string;
};

export function HeroLivingScenes({
  scenes,
  intervalMs = 7000,
  overlayClassName,
  className,
  priority,
  imageFit = "cover",
  videoSrc,
  posterSrc,
  vibrant = false,
  sizes = "100vw",
}: HeroLivingScenesProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [videoOk, setVideoOk] = useState(false);
  const showFullFrame = imageFit === "contain";

  useEffect(() => {
    if (reduce || scenes.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % scenes.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, reduce, scenes.length]);

  const poster = posterSrc ?? scenes[0]?.src;
  const showVideo = Boolean(videoSrc && !reduce);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden",
        showFullFrame ? "bg-[#071525]" : "bg-mk-navy",
        className,
      )}
    >
      {showVideo ? (
        <video
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-1000",
            showFullFrame ? "object-contain object-center" : "object-cover",
            videoOk ? "opacity-100" : "opacity-0",
          )}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          onLoadedData={(e) => {
            setVideoOk(true);
            void (e.currentTarget as HTMLVideoElement).play().catch(() => setVideoOk(false));
          }}
          onError={() => setVideoOk(false)}
          aria-hidden
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}

      {(!showVideo || !videoOk) && scenes.length > 0 ? (
        <AnimatePresence mode="sync">
          <motion.div
            key={scenes[index].src}
            className={cn(
              "absolute",
              showFullFrame ? "inset-0" : "inset-[-10%] h-[120%] w-[120%]",
            )}
            initial={{ opacity: 0 }}
            animate={
              showFullFrame || reduce
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    scale: [1.05, 1.12, 1.08],
                    x: ["0%", "-2.5%", "0%"],
                    y: ["0%", "-1.2%", "0%"],
                  }
            }
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
              ...(showFullFrame || reduce
                ? {}
                : {
                    scale: { duration: intervalMs / 1000, ease: "easeInOut" },
                    x: { duration: intervalMs / 1000, ease: "easeInOut" },
                    y: { duration: intervalMs / 1000, ease: "easeInOut" },
                  }),
            }}
          >
            <Image
              src={scenes[index].src}
              alt={scenes[index].alt}
              fill
              priority={priority && index === 0}
              className={cn(
                showFullFrame ? "object-contain object-center" : "object-cover",
                vibrant && "brightness-[1.08] saturate-[1.2] contrast-[1.08]",
              )}
              style={{ objectPosition: scenes[index].objectPosition ?? "center" }}
              sizes={sizes}
            />
          </motion.div>
        </AnimatePresence>
      ) : null}

      {overlayClassName ? (
        <div className={cn("absolute inset-0", overlayClassName)} aria-hidden />
      ) : null}
    </div>
  );
}
