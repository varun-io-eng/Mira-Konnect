export type HowWeWorkStep = {
  num: string;
  title: string;
  body: string;
  accent: string;
};

/** Six-stage cycle (reference: hub-and-spoke recruitment flow) */
export const howWeWorkSteps: HowWeWorkStep[] = [
  {
    num: "01",
    title: "Job requirements",
    body:
      "We capture the role brief, skills, culture, and timelines—whether you are hiring or exploring your next move.",
    accent: "#F5B800",
  },
  {
    num: "02",
    title: "Job marketing",
    body:
      "Openings are positioned clearly across channels so the right audience sees accurate, compelling role information.",
    accent: "#F28C28",
  },
  {
    num: "03",
    title: "Sourcing",
    body:
      "Recruiters activate networks and databases to build a qualified pipeline aligned to your mandate.",
    accent: "#E84C8A",
  },
  {
    num: "04",
    title: "Screening & testing",
    body:
      "Profiles are reviewed with structured checks—experience, fit, and confidentiality—before you invest interview time.",
    accent: "#5B6B7C",
  },
  {
    num: "05",
    title: "Interviews & selection",
    body:
      "We coordinate interviews, feedback, and shortlists so decisions stay timely and transparent for everyone.",
    accent: "#3D7DD6",
  },
  {
    num: "06",
    title: "Candidate onboarding",
    body:
      "From offer through joining, we support documentation, negotiation where needed, and a smooth start date.",
    accent: "#2ECAD4",
  },
];
