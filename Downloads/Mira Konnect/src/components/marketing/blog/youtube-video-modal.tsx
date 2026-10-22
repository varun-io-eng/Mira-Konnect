"use client";

import { useCallback, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type YouTubeVideoModalProps = {
  open: boolean;
  videoId: string;
  title: string;
  onClose: () => void;
};

export function YouTubeVideoModal({
  open,
  videoId,
  title,
  onClose,
}: YouTubeVideoModalProps) {
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onKeyDown]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-mk-navy/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close video"
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10",
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-mk-navy px-4 py-3">
          <p className="line-clamp-2 text-sm font-medium text-white">{title}</p>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full p-2 text-white/90 transition hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="relative aspect-video w-full bg-black">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
