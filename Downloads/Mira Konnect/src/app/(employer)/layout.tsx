import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const nav = [
  { href: "/employer", label: "Overview" },
  { href: "/employer/requirements", label: "Hiring requirements" },
  { href: "/employer/applications", label: "Applications" },
];

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell title="Employer portal" nav={nav}>
      {children}
    </DashboardShell>
  );
}
