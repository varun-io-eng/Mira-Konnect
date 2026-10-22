import { prisma } from "@/lib/db";

export const metadata = { title: "Contact leads" };

export default async function AdminLeadsPage() {
  const leads = await prisma.contactLead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-mk-navy">Contact leads</h1>
      <ul className="mt-6 space-y-4">
        {leads.map((lead) => (
          <li key={lead.id} className="rounded-xl border bg-white p-4 text-sm">
            <p className="font-semibold text-mk-navy">{lead.name} · {lead.email}</p>
            {lead.subject ? <p className="text-mk-muted">{lead.subject}</p> : null}
            <p className="mt-2 whitespace-pre-wrap text-mk-slate">{lead.message}</p>
            <p className="mt-2 text-xs text-mk-muted">{lead.status} · {lead.createdAt.toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
