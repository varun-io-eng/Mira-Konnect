"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import {
  HOME_PROCESS_POSTER,
  HOME_PROCESS_VIDEO_SRC,
} from "@/data/home-recruitment-clips";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Shared block height on md+ — left and video panels match exactly */
const PANEL_HEIGHT = "md:h-[min(52vh,440px)]";

export function HomeProcessVideo() {
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [posterReady, setPosterReady] = useState(true);
  const [loadState, setLoadState] = useState<"idle" | "ready" | "error">("idle");

  const closeModal = useCallback(() => {
    const el = modalVideoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setModalOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const el = modalVideoRef.current;
    const playWhenReady = () => {
      if (!el) return;
      el.muted = false;
      void el.play().catch(() => {
        el.muted = true;
        void el.play().then(() => {
          el.muted = false;
        });
      });
    };

    if (el && el.readyState >= 2) {
      playWhenReady();
    } else {
      el?.addEventListener("canplay", playWhenReady, { once: true });
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      el?.removeEventListener("canplay", playWhenReady);
    };
  }, [modalOpen, closeModal]);

  return (
    <section className="border-b border-mk-navy/10 bg-white px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
      <div
        className={cn(
          "mx-auto flex max-w-7xl flex-col overflow-hidden rounded-2xl shadow-lg shadow-mk-navy/10 ring-1 ring-mk-navy/10 sm:rounded-3xl md:flex-row",
          PANEL_HEIGHT,
        )}
      >
        <div
          className={cn(
            "flex min-h-0 shrink-0 flex-col justify-center bg-mk-navy px-8 py-7 sm:px-10 md:w-[40%] md:overflow-hidden md:py-6 lg:px-12 xl:px-14",
            PANEL_HEIGHT,
          )}
        >
          <Reveal direction="right">
            <h2 className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[2rem]">
              Notice the difference?
            </h2>
            <p className="mt-3 max-w-md text-sm leading-snug text-white/88 sm:text-[0.95rem] lg:mt-4">
              For teams across India, we bring employers and candidates together with
              clarity and care. Discover how {siteConfig.name} hires across industries—in
              about a minute.
            </p>
          </Reveal>
        </div>

        <div
          className={cn(
            "relative min-h-[260px] w-full min-w-0 flex-1 bg-mk-navy sm:min-h-[300px]",
            PANEL_HEIGHT,
          )}
        >
          <Image
            src={HOME_PROCESS_POSTER}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
            onLoad={() => setPosterReady(true)}
            onError={() => setPosterReady(false)}
          />

          <div className="pointer-events-none absolute inset-0 bg-mk-navy/45" aria-hidden />

          <p
            className="pointer-events-none absolute inset-x-4 top-1/2 z-[1] -translate-y-1/2 font-display text-3xl font-semibold leading-none tracking-tight text-white/35 sm:text-4xl lg:text-5xl"
            aria-hidden
          >
            Connecting talent
          </p>

          <button
            type="button"
            onClick={openModal}
            className="absolute inset-0 z-10 flex items-center justify-center"
            aria-label="Play company overview video"
          >
            <span
              className={cn(
                "flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-2 border-white/90 bg-white/10 text-white shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-white/20",
                !posterReady && "opacity-80",
              )}
            >
              <Play className="h-8 w-8 fill-white" aria-hidden />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Company overview video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.button
              type="button"
              className="absolute inset-0 bg-mk-navy/80 backdrop-blur-sm"
              aria-label="Close video"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative z-[1] w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/15 sm:rounded-3xl"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
                aria-label="Close"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>

              <div className="relative aspect-video w-full bg-black">
                <video
                  ref={modalVideoRef}
                  className="absolute inset-0 h-full w-full"
                  src={HOME_PROCESS_VIDEO_SRC}
                  playsInline
                  controls
                  preload="auto"
                  onLoadedData={() => setLoadState("ready")}
                  onError={() => setLoadState("error")}
                  onEnded={closeModal}
                />
                {loadState === "error" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-mk-navy px-6 text-center text-sm text-white">
                    The video could not load. Please close and try again.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
