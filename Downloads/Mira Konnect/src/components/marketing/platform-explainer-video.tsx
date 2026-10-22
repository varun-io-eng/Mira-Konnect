"use client";

import { useCallback, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import {
  HOME_PROCESS_POSTER,
  HOME_PROCESS_VIDEO_SRC,
} from "@/data/home-recruitment-clips";
import { cn } from "@/lib/utils";

export function PlatformExplainerVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading");

  const startPlayback = useCallback(async () => {
    const el = videoRef.current;
    if (!el) return;
    try {
      el.muted = false;
      await el.play();
      setStarted(true);
      setPlaying(true);
    } catch {
      try {
        el.muted = true;
        await el.play();
        el.muted = false;
        setStarted(true);
        setPlaying(true);
      } catch {
        setLoadState("error");
      }
    }
  }, []);

  return (
    <section className="border-y border-mk-navy/5 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center" direction="up" scale>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-mk-teal">
            Company overview
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-mk-navy sm:text-4xl">
            Who we are and how we hire
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-mk-slate">
            A one-minute walkthrough—our services, industries, process, and what makes Mira Konnect
            different. Best with sound on.
          </p>
        </Reveal>

        <Reveal
          className="relative mt-12 overflow-hidden rounded-3xl bg-mk-navy shadow-2xl shadow-mk-navy/25 ring-1 ring-mk-navy/10"
          direction="up"
          delay={0.15}
        >
          <div className="relative aspect-video w-full bg-mk-navy">
            <video
              ref={videoRef}
              className="absolute inset-0 z-0 h-full w-full object-cover"
              src={HOME_PROCESS_VIDEO_SRC}
              playsInline
              preload="auto"
              poster={HOME_PROCESS_POSTER}
              controls
              onLoadedMetadata={() => setLoadState("ready")}
              onCanPlay={() => setLoadState("ready")}
              onError={() => setLoadState("error")}
              onPlay={() => {
                setStarted(true);
                setPlaying(true);
              }}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            />

            {!started && !playing && loadState !== "error" && (
              <button
                type="button"
                onClick={() => void startPlayback()}
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition hover:bg-black/30"
                aria-label="Play company overview video"
              >
                <span
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-full bg-white text-mk-teal shadow-lg ring-4 ring-white/30",
                    loadState === "loading" && "opacity-80",
                  )}
                >
                  <Play className="h-7 w-7 fill-mk-teal" aria-hidden />
                </span>
              </button>
            )}

            {loadState === "error" && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-mk-navy/90 px-6 text-center text-sm text-white">
                <p className="font-semibold">Video could not load</p>
                <p className="text-white/75">
                  Use the browser controls below or refresh the page. If this continues, run{" "}
                  <code className="text-[#99f6e4]">npm run video:home</code> to rebuild the file.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
