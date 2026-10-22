"use client";

import { Building2, UserRound } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

function HubNode({
  label,
  children,
  className,
  delay = 0,
  reduce,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      className={cn("relative z-10 flex flex-col items-center gap-3", className)}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md sm:h-16 sm:w-16"
        animate={reduce ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
        {label}
      </span>
    </motion.div>
  );
}

export function WhyKonnectHub() {
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#060d18]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 15% 20%, rgba(26,127,122,0.35), transparent 55%),
            radial-gradient(ellipse 70% 60% at 85% 75%, rgba(224,122,95,0.22), transparent 50%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,209,102,0.12), transparent 60%)
          `,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative aspect-[5/4] min-h-[280px] sm:aspect-[4/3]">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <linearGradient id="mk-hub-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1a7f7a" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#ffd166" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#1a7f7a" stopOpacity="0.2" />
            </linearGradient>
            <filter id="mk-hub-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M 95 150 C 150 95, 250 95, 305 150"
            fill="none"
            stroke="url(#mk-hub-stroke)"
            strokeWidth="1"
            opacity="0.5"
          />
          <path
            d="M 95 150 C 150 205, 250 205, 305 150"
            fill="none"
            stroke="url(#mk-hub-stroke)"
            strokeWidth="1"
            opacity="0.35"
          />
          <path
            d="M 95 150 C 150 95, 250 95, 305 150"
            fill="none"
            stroke="#ffd166"
            strokeWidth="0.5"
            filter="url(#mk-hub-blur)"
            opacity="0.6"
          />
        </svg>

        {!reduce && (
          <motion.div
            className="pointer-events-none absolute left-[22%] top-[46%] h-1.5 w-1.5 rounded-full bg-[#ffd166] shadow-[0_0_12px_#ffd166]"
            animate={{ left: ["22%", "50%", "78%"], top: ["46%", "38%", "46%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <div className="absolute inset-0 flex items-center justify-between px-6 sm:px-10">
          <HubNode label="Employers" delay={0.1} reduce={!!reduce}>
            <Building2 className="h-6 w-6 text-white/80" strokeWidth={1.25} />
          </HubNode>

          <HubNode label="Mira Konnect" delay={0.2} reduce={!!reduce} className="-mt-2">
            <div className="relative">
              <div className="absolute inset-0 scale-150 rounded-full bg-[#ffd166]/25 blur-md" />
              <div className="relative h-9 w-9 rounded-full bg-gradient-to-b from-[#fff8e7] via-[#ffd166] to-[#e07a5f] shadow-lg shadow-[#ffd166]/30" />
            </div>
          </HubNode>

          <HubNode label="Talent" delay={0.3} reduce={!!reduce}>
            <UserRound className="h-6 w-6 text-white/80" strokeWidth={1.25} />
          </HubNode>
        </div>
      </div>

      <p className="relative border-t border-white/10 px-6 py-5 text-center text-sm leading-relaxed text-white/55">
        A curated connection layer—
        <span className="text-white/85"> strategy, screening, and communication</span> in one
        place.
      </p>
    </div>
  );
}
