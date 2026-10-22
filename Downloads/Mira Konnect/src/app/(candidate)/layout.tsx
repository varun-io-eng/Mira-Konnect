import type { Metadata } from "next";
import { CandidatePortalShell } from "@/components/candidate/candidate-portal-shell";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const nav = [
  { href: "/candidate", label: "Overview" },
  { href: "/candidate/profile", label: "Profile" },
  { href: "/candidate/applications", label: "Applications" },
  { href: "/candidate/saved-jobs", label: "Saved jobs" },
  { href: "/jobs", label: "Browse jobs" },
];

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  return <CandidatePortalShell nav={nav}>{children}</CandidatePortalShell>;
}
