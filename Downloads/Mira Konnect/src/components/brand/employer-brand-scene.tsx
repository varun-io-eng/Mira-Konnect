"use client";

import { motion, useReducedMotion } from "framer-motion";

export function EmployerBrandScene() {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 480 560"
      className="h-full w-full"
      role="img"
      aria-label="Mira Konnect — employer and talent partnership"
    >
      <defs>
        <linearGradient id="mk-e-bg" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#0f2744" />
          <stop offset="60%" stopColor="#1a3a5c" />
          <stop offset="100%" stopColor="#146560" />
        </linearGradient>
        <linearGradient id="mk-e-bar" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#1a7f7a" />
          <stop offset="0.5" stopColor="#ffd166" />
          <stop offset="1" stopColor="#e07a5f" />
        </linearGradient>
        <linearGradient id="mk-e-glass" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      <rect width="480" height="560" fill="url(#mk-e-bg)" />

      <ellipse cx="380" cy="100" rx="120" ry="80" fill="#ffd166" opacity="0.08" />
      <ellipse cx="80" cy="480" rx="100" ry="60" fill="#1a7f7a" opacity="0.15" />

      <rect x="48" y="72" width="384" height="168" rx="18" fill="url(#mk-e-glass)" stroke="#fff" strokeOpacity="0.1" />

      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(72 ${108 + i * 34})`}>
          <rect width={200 + i * 40} height="10" rx="5" fill="#fff" opacity={0.06 + i * 0.02} />
          {!reduce && (
            <motion.rect
              width={60 + i * 35}
              height="10"
              rx="5"
              fill="url(#mk-e-bar)"
              opacity="0.75"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.55 }}
              style={{ transformOrigin: "left center" }}
            />
          )}
        </g>
      ))}

      <circle cx="360" cy="156" r="52" fill="#ffffff" opacity="0.06" />
      <circle cx="360" cy="156" r="36" fill="#1a7f7a" opacity="0.35" />
      <path
        d="M360 128 v56 M332 156 h56"
        stroke="#ffd166"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.75"
      />

      <g transform="translate(64 280)">
        <rect width="352" height="100" rx="16" fill="url(#mk-e-glass)" stroke="#fff" strokeOpacity="0.08" />
        <circle cx="72" cy="50" r="24" fill="#c4b5fd" opacity="0.85" />
        <circle cx="176" cy="50" r="28" fill="#2dd4bf" opacity="0.8" />
        <circle cx="280" cy="50" r="24" fill="#fcd34d" opacity="0.85" />
        <path
          d="M96 50 H152 M200 50 H256"
          stroke="#ffd166"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          opacity="0.55"
        />
      </g>

      <path
        d="M200 400 Q240 360 280 400 Q240 440 200 400"
        fill="none"
        stroke="#ffd166"
        strokeWidth="2"
        opacity="0.4"
      />
      <circle cx="200" cy="400" r="10" fill="#99f6e4" opacity="0.6" />
      <circle cx="280" cy="400" r="10" fill="#fde68a" opacity="0.6" />

      <path d="M0 500 Q240 540 480 500 L480 560 L0 560 Z" fill="#071525" opacity="0.4" />
    </svg>
  );
}
