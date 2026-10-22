/**
 * Homepage process reel — six clips (see public/videos/home-process-manifest.json for timings).
 */

export type HomeProcessClip = {
  order: number;
  label: string;
  summary: string;
  videoSrc: string;
  voiceSrc: string;
};

export const HOME_PROCESS_VIDEO_SRC = "/videos/mira-konnect-home-process.mp4";
export const HOME_PROCESS_POSTER = "/videos/home-process-poster.jpg";

export const homeProcessClips: HomeProcessClip[] = [
  {
    order: 1,
    label: "Who we are",
    summary: "Your recruitment partner across India—integrity, clarity, and the right fit.",
    videoSrc: "/videos/gemini_generated_video_052ca996.mp4",
    voiceSrc: "/videos/vo/01-who-we-are.mp3",
  },
  {
    order: 2,
    label: "What we do",
    summary: "End-to-end hiring support for employers and candidates, from brief to onboarding.",
    videoSrc: "/videos/gemini_generated_video_cbdf9ea3.mp4",
    voiceSrc: "/videos/vo/02-services.mp3",
  },
  {
    order: 3,
    label: "Industries",
    summary: "Ten sectors—from pharma and IT to hospitality, FMCG, and more.",
    videoSrc: "/videos/gemini_generated_video_c50a35e8.mp4",
    voiceSrc: "/videos/vo/03-industries.mp3",
  },
  {
    order: 4,
    label: "Our process",
    summary: "A structured cycle that keeps every stakeholder informed and every hire on track.",
    videoSrc: "/videos/gemini_generated_video_cc97d36a.mp4",
    voiceSrc: "/videos/vo/04-process.mp3",
  },
  {
    order: 5,
    label: "People first",
    summary: "Human, confidential recruitment—expert review and honest communication.",
    videoSrc: "/videos/gemini_generated_video_ddaa48a6.mp4",
    voiceSrc: "/videos/vo/05-people-first.mp3",
  },
  {
    order: 6,
    label: "Start with us",
    summary: "Tagline, brand, and your next step at mirakonnect.com.",
    videoSrc: "/videos/gemini_generated_video_8300e526.mp4",
    voiceSrc: "/videos/vo/06-cta.mp3",
  },
];
