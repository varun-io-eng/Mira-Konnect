import { DashboardShell } from "@/components/dashboard/dashboard-shell";

const nav = [
  { href: "/admin/publish", label: "Publish job" },
  { href: "/admin", label: "Overview" },
  { href: "/admin/jobs", label: "Manage jobs" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/interviews", label: "Interviews" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/leads", label: "Contact leads" },
  { href: "/admin/requirements", label: "Employer requirements" },
];

export default function AdminConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell title="Mira Konnect admin" nav={nav}>
      {children}
    </DashboardShell>
  );
}
