"use client";

import { motion, useReducedMotion } from "framer-motion";

export function CandidateBrandScene() {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 480 560"
      className="h-full w-full"
      role="img"
      aria-label="Mira Konnect — candidate and career partner connection"
    >
      <defs>
        <linearGradient id="mk-c-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a1628" />
          <stop offset="45%" stopColor="#153552" />
          <stop offset="100%" stopColor="#1a7f7a" />
        </linearGradient>
        <radialGradient id="mk-c-sun" cx="50%" cy="22%" r="45%">
          <stop stopColor="#fff8e7" />
          <stop offset="0.4" stopColor="#ffd166" />
          <stop offset="1" stopColor="#f77f00" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mk-c-glass" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      <rect width="480" height="560" fill="url(#mk-c-bg)" />
      <ellipse cx="240" cy="120" rx="200" ry="140" fill="url(#mk-c-sun)" opacity="0.85" />

      <circle cx="90" cy="180" r="3" fill="#ffd166" opacity="0.5" />
      <circle cx="400" cy="220" r="2" fill="#99f6e4" opacity="0.6" />
      <circle cx="350" cy="420" r="4" fill="#ffd166" opacity="0.35" />

      <path
        d="M100 280 Q240 200 380 280 Q420 360 240 420 Q60 360 100 280"
        fill="none"
        stroke="#ffd166"
        strokeWidth="1.5"
        opacity="0.35"
      />
      <path
        d="M120 300 Q240 240 360 300"
        fill="none"
        stroke="#99f6e4"
        strokeWidth="2"
        strokeDasharray="6 8"
        opacity="0.5"
      />

      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={140 + i * 65}
          cy={268 - Math.sin(i) * 8}
          r="5"
          fill="#fff8e7"
          opacity={0.35 + i * 0.1}
        />
      ))}

      <g transform="translate(88 248)">
        <rect width="120" height="160" rx="20" fill="url(#mk-c-glass)" stroke="#ffffff" strokeOpacity="0.15" />
        <circle cx="60" cy="48" r="26" fill="#a5b4fc" opacity="0.9" />
        <ellipse cx="60" cy="38" rx="16" ry="14" fill="#6366f1" opacity="0.35" />
        <rect x="36" y="88" width="48" height="6" rx="3" fill="#fff" opacity="0.2" />
        <rect x="30" y="102" width="60" height="5" rx="2.5" fill="#fff" opacity="0.12" />
      </g>

      <g transform="translate(272 232)">
        <rect width="120" height="176" rx="20" fill="url(#mk-c-glass)" stroke="#ffffff" strokeOpacity="0.18" />
        <circle cx="60" cy="48" r="26" fill="#5eead4" opacity="0.85" />
        <ellipse cx="60" cy="38" rx="16" ry="14" fill="#1a7f7a" opacity="0.45" />
        <rect x="28" y="88" width="64" height="6" rx="3" fill="#fff" opacity="0.2" />
        <rect x="24" y="102" width="72" height="5" rx="2.5" fill="#fff" opacity="0.12" />
        <circle cx="60" cy="130" r="14" fill="#ffd166" opacity="0.25" />
      </g>

      {!reduce && (
        <motion.circle
          cx="240"
          cy="270"
          r="8"
          fill="#ffd166"
          animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}

      <path
        d="M0 480 Q240 520 480 480 L480 560 L0 560 Z"
        fill="#0f2744"
        opacity="0.35"
      />
    </svg>
  );
}
