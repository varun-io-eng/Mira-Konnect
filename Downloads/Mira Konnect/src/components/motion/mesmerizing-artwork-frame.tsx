"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type MesmerizingArtworkFrameProps = {
  src: string;
  alt: string;
  direction?: "left" | "right";
  className?: string;
};

const particles = [
  { top: "12%", left: "8%", size: 6, delay: 0 },
  { top: "22%", left: "88%", size: 4, delay: 0.4 },
  { top: "70%", left: "6%", size: 5, delay: 0.8 },
  { top: "78%", left: "92%", size: 4, delay: 1.2 },
  { top: "45%", left: "95%", size: 3, delay: 0.6 },
  { top: "8%", left: "55%", size: 3, delay: 1 },
];

function FloatingParticles({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <>
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute rounded-full bg-mk-teal/80 shadow-[0_0_12px_rgba(26,127,122,0.6)]"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.25, 0.9, 0.25],
            scale: [1, 1.35, 1],
          }}
          transition={{
            duration: 3.5 + i * 0.3,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

export function MesmerizingArtworkFrame({
  src,
  alt,
  direction = "left",
  className,
}: MesmerizingArtworkFrameProps) {
  const reduce = useReducedMotion();
  const x = direction === "left" ? -36 : 36;

  return (
    <motion.div
      className={cn("relative [perspective:1200px]", className)}
      initial={reduce ? false : { opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <FloatingParticles active={!reduce} />

      {!reduce && (
        <>
          <motion.div
            className="pointer-events-none absolute -left-8 top-1/4 h-28 w-28 rounded-full bg-violet-400/25 blur-3xl"
            animate={{ x: [0, 12, 0], y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -right-6 bottom-1/4 h-32 w-32 rounded-full bg-mk-teal/30 blur-3xl"
            animate={{ x: [0, -10, 0], y: [0, 12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.div
            className="pointer-events-none absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 rounded-full bg-[#ffd166]/30 blur-2xl"
            animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </>
      )}

      <motion.div
        className="relative"
        whileHover={
          reduce
            ? undefined
            : {
                rotateY: direction === "left" ? 4 : -4,
                rotateX: -3,
                scale: 1.02,
              }
        }
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative overflow-hidden rounded-3xl p-[2px]">
          {!reduce && (
            <motion.div
              className="absolute left-1/2 top-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,#1a7f7a,#ffd166,#e07a5f,#6366f1,#1a7f7a)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          )}
          {reduce && (
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-mk-teal to-mk-navy" />
          )}

          <div className="relative z-10 overflow-hidden rounded-[22px] bg-gradient-to-br from-slate-50 via-white to-violet-50/60 shadow-2xl shadow-mk-navy/15">
            <motion.div
              className="relative aspect-video w-full min-h-[200px] sm:min-h-[240px]"
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain object-center p-3 sm:p-5"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              initial={{ x: "-120%" }}
              whileInView={{ x: "220%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 0.35, ease: "easeInOut" }}
            />

            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgb(15 39 68 / 0.12) 1px, transparent 0)",
                backgroundSize: "22px 22px",
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
