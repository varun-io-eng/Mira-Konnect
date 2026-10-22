const insightPhoto = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;

/** Homepage-only insight content — separate references & videos from `/blog` resources */
export type HomeInsightId = "home-resume" | "home-interview" | "home-recruitment";

export type HomeInsightArticle = {
  id: HomeInsightId;
  category: string;
  cardTitle: string;
  readMeta: string;
  imageSrc: string;
  imageAlt: string;
  referenceLabel: string;
  referenceUrl: string;
  videoLabel: string;
  youtubeVideoId: string;
};

export const homeInsightArticles: Record<HomeInsightId, HomeInsightArticle> = {
  "home-resume": {
    id: "home-resume",
    category: "Resume writing",
    cardTitle: "Write a resume recruiters notice",
    readMeta: "Mira Konnect · 4 min read",
    imageSrc: insightPhoto("photo-1554224155-6726b3ff858f"),
    imageAlt: "Professional reviewing and editing a resume at a desk",
    referenceLabel: "Harvard FAS — Create a strong resume",
    referenceUrl: "https://ocs.fas.harvard.edu/resources/create-a-strong-resume/",
    videoLabel: "Create your resume for Google: tips and advice",
    youtubeVideoId: "BYUy1yvjHxE",
  },
  "home-interview": {
    id: "home-interview",
    category: "Interview preparation",
    cardTitle: "Interview prep that builds confidence",
    readMeta: "Mira Konnect · 3 min read",
    imageSrc: insightPhoto("photo-1573497019940-1c28c88b4f3e"),
    imageAlt: "Candidate and interviewer in a focused one-to-one conversation",
    referenceLabel: "Indeed — How to prepare for a job interview",
    referenceUrl:
      "https://www.indeed.com/career-advice/interviewing/how-to-prepare-for-an-interview",
    videoLabel: "Common interview questions and sample answers",
    youtubeVideoId: "1mHjMNZZvFo",
  },
  "home-recruitment": {
    id: "home-recruitment",
    category: "Recruitment process",
    cardTitle: "Recruitment from brief to onboarding",
    readMeta: "Mira Konnect · 5 min read",
    imageSrc: insightPhoto("photo-1522071820081-009f0129c71c"),
    imageAlt: "Hiring team collaborating on recruitment planning",
    referenceLabel: "CIPD — Recruitment factsheet",
    referenceUrl: "https://www.cipd.org/en/knowledge/factsheets/recruitment-factsheet",
    videoLabel: "Full hiring process walkthrough (ATS & onboarding)",
    youtubeVideoId: "-LwFssyL8Ms",
  },
};

export type HomeInsightFeatureTone = "teal" | "plum" | "charcoal";

export type HomeInsightTileConfig = {
  insightId: HomeInsightId;
  variant: "media" | "feature";
  featureTone?: HomeInsightFeatureTone;
  dateBadge: string;
};

/** Three-column masonry — each topic once as media, once as feature */
export const homeInsightsColumns: HomeInsightTileConfig[][] = [
  [
    { insightId: "home-resume", variant: "media", dateBadge: "01" },
    { insightId: "home-interview", variant: "feature", featureTone: "teal", dateBadge: "02" },
  ],
  [
    { insightId: "home-recruitment", variant: "feature", featureTone: "plum", dateBadge: "03" },
    { insightId: "home-interview", variant: "media", dateBadge: "02" },
  ],
  [
    { insightId: "home-recruitment", variant: "media", dateBadge: "03" },
    { insightId: "home-resume", variant: "feature", featureTone: "charcoal", dateBadge: "01" },
  ],
];

export type HomeInsightTile = HomeInsightTileConfig & {
  article: HomeInsightArticle;
};

export function getHomeInsightTiles(): HomeInsightTile[][] {
  return homeInsightsColumns.map((column) =>
    column.map((tile) => ({
      ...tile,
      article: homeInsightArticles[tile.insightId],
    })),
  );
}
