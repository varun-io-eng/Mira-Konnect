import { cn } from "@/lib/utils";

type SceneProps = { className?: string };

/** Original vector art — welcome / people-first recruitment */
export function SceneAboutWelcome({ className }: SceneProps) {
  return (
    <svg
      viewBox="0 0 640 420"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Team collaborating around a shared hiring plan"
    >
      <defs>
        <linearGradient id="ab-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f2744" />
          <stop offset="55%" stopColor="#1a7f7a" />
          <stop offset="100%" stopColor="#e07a5f" />
        </linearGradient>
        <linearGradient id="ab-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd166" />
          <stop offset="100%" stopColor="#e07a5f" />
        </linearGradient>
      </defs>
      <rect width="640" height="420" fill="url(#ab-sky)" rx="24" />
      <circle cx="520" cy="95" r="48" fill="url(#ab-sun)" opacity="0.9" />
      <path d="M0 320 Q320 260 640 340 L640 420 L0 420 Z" fill="#071525" opacity="0.35" />
      <rect x="80" y="200" width="480" height="120" rx="16" fill="#ffffff" opacity="0.12" />
      <circle cx="180" cy="250" r="36" fill="#ffd166" opacity="0.85" />
      <circle cx="280" cy="235" r="32" fill="#5eead4" opacity="0.75" />
      <circle cx="380" cy="248" r="34" fill="#ffffff" opacity="0.7" />
      <circle cx="480" cy="238" r="30" fill="#e07a5f" opacity="0.8" />
      <path
        d="M140 290 L500 290"
        stroke="#ffd166"
        strokeWidth="3"
        strokeDasharray="8 10"
        opacity="0.7"
      />
      <rect x="220" y="268" width="200" height="44" rx="8" fill="#1a7f7a" opacity="0.5" />
      <text x="320" y="296" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="system-ui">
        Shared hiring goals
      </text>
    </svg>
  );
}

export function SceneOpenCollaboration({ className }: SceneProps) {
  return (
    <svg viewBox="0 0 480 320" className={cn("h-full w-full", className)} aria-hidden>
      <defs>
        <linearGradient id="oc-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8f4f3" />
          <stop offset="100%" stopColor="#fef3e2" />
        </linearGradient>
      </defs>
      <rect width="480" height="320" fill="url(#oc-bg)" rx="20" />
      <rect x="40" y="48" width="400" height="180" rx="12" fill="#fff" stroke="#1a7f7a33" strokeWidth="2" />
      <rect x="70" y="78" width="120" height="8" rx="4" fill="#1a7f7a" opacity="0.4" />
      <rect x="70" y="98" width="200" height="6" rx="3" fill="#071525" opacity="0.15" />
      <circle cx="120" cy="160" r="28" fill="#1a7f7a" opacity="0.25" />
      <circle cx="200" cy="150" r="24" fill="#e07a5f" opacity="0.3" />
      <circle cx="280" cy="165" r="26" fill="#ffd166" opacity="0.35" />
      <path d="M150 200 L330 200" stroke="#1a7f7a" strokeWidth="2" opacity="0.5" />
      <rect x="150" y="210" width="180" height="6" rx="3" fill="#071525" opacity="0.1" />
    </svg>
  );
}

export function SceneBreakoutIdeas({ className }: SceneProps) {
  return (
    <svg viewBox="0 0 480 320" className={cn("h-full w-full", className)} aria-hidden>
      <rect width="480" height="320" fill="#071525" rx="20" />
      <rect x="48" y="56" width="180" height="200" rx="16" fill="#1a7f7a" opacity="0.35" />
      <circle cx="138" cy="120" r="40" fill="#ffd166" opacity="0.5" />
      <rect x="260" y="80" width="160" height="100" rx="12" fill="#ffffff" opacity="0.1" />
      <rect x="280" y="200" width="120" height="56" rx="28" fill="#e07a5f" opacity="0.45" />
      <path d="M228 156 L260 156" stroke="#5eead4" strokeWidth="3" />
    </svg>
  );
}

export function SceneToolsAndDelivery({ className }: SceneProps) {
  return (
    <svg viewBox="0 0 480 320" className={cn("h-full w-full", className)} aria-hidden>
      <rect width="480" height="320" fill="#f4f7f9" rx="20" />
      <rect x="60" y="50" width="360" height="220" rx="14" fill="#0f2744" />
      <rect x="90" y="80" width="140" height="90" rx="8" fill="#1a7f7a" opacity="0.6" />
      <rect x="250" y="80" width="140" height="40" rx="6" fill="#ffd166" opacity="0.7" />
      <rect x="250" y="130" width="140" height="40" rx="6" fill="#ffffff" opacity="0.2" />
      <circle cx="160" cy="210" r="8" fill="#5eead4" />
      <circle cx="200" cy="210" r="8" fill="#5eead4" />
      <circle cx="240" cy="210" r="8" fill="#5eead4" />
    </svg>
  );
}

export function SceneInclusiveWorkplace({ className }: SceneProps) {
  return (
    <svg
      viewBox="0 0 640 420"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Inclusive team discussion in a bright workspace"
    >
      <defs>
        <linearGradient id="iv-horizon" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#1a7f7a" />
          <stop offset="50%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#ffd166" />
        </linearGradient>
      </defs>
      <rect width="640" height="420" fill="#f8fafc" rx="24" />
      <rect x="0" y="300" width="640" height="120" fill="url(#iv-horizon)" opacity="0.25" />
      <rect x="72" y="72" width="496" height="260" rx="20" fill="#fff" stroke="#1a7f7a22" strokeWidth="2" />
      <circle cx="200" cy="180" r="40" fill="#1a7f7a" opacity="0.3" />
      <circle cx="320" cy="165" r="44" fill="#e07a5f" opacity="0.28" />
      <circle cx="440" cy="185" r="38" fill="#071525" opacity="0.2" />
      <rect x="160" y="240" width="320" height="12" rx="6" fill="#1a7f7a" opacity="0.2" />
      <rect x="200" y="268" width="240" height="8" rx="4" fill="#071525" opacity="0.08" />
    </svg>
  );
}

const industryAccent: Record<string, string> = {
  "pharmaceuticals-lifesciences": "#5eead4",
  "manufacturing-engineering": "#94a3b8",
  hospitality: "#e07a5f",
  it: "#38bdf8",
  "gems-jewellery": "#fbbf24",
  textiles: "#c084fc",
  "banking-insurance": "#1a7f7a",
  edtech: "#f472b6",
  "digital-marketing": "#fb923c",
  fmcg: "#4ade80",
};

export function SceneIndustryFocus({ slug, className }: { slug: string; className?: string }) {
  const accent = industryAccent[slug] ?? "#1a7f7a";
  return (
    <svg
      viewBox="0 0 720 400"
      className={cn("h-full w-full", className)}
      role="img"
      aria-hidden
    >
      <defs>
        <linearGradient id={`ig-${slug}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#071525" />
          <stop offset="100%" stopColor={accent} />
        </linearGradient>
      </defs>
      <rect width="720" height="400" fill={`url(#ig-${slug})`} rx="24" opacity="0.95" />
      <circle cx="120" cy="100" r="60" fill="#fff" opacity="0.08" />
      <circle cx="600" cy="320" r="90" fill="#ffd166" opacity="0.12" />
      <path
        d="M80 280 L360 120 L640 280 L640 360 L80 360 Z"
        fill="#ffffff"
        opacity="0.1"
      />
      <rect x="200" y="160" width="320" height="120" rx="16" fill="#ffffff" opacity="0.15" />
      <rect x="240" y="200" width="240" height="12" rx="6" fill={accent} opacity="0.8" />
      <rect x="260" y="228" width="200" height="8" rx="4" fill="#fff" opacity="0.35" />
    </svg>
  );
}
