import { getCurrentUser } from "@/lib/auth/get-user";
import { submitHiringRequirementAction } from "@/actions/hiring";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Hiring requirements" };

const inputClass = "mt-1 w-full rounded-lg border border-mk-navy/15 px-3 py-2 text-sm";

export default async function EmployerRequirementsPage() {
  const user = await getCurrentUser();
  const list = user?.employer
    ? await prisma.hiringRequirement.findMany({
        where: { employerId: user.employer.id },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl font-semibold text-mk-navy">Hiring requirements</h1>
        <form
          action={async (fd) => {
            await submitHiringRequirementAction(fd);
          }}
          className="mt-6 max-w-lg space-y-4 rounded-2xl border border-mk-navy/10 bg-white p-6"
        >
          <div>
            <label className="text-sm font-medium" htmlFor="title">Role / mandate title</label>
            <input id="title" name="title" required className={inputClass} />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="description">Description</label>
            <textarea id="description" name="description" required rows={4} className={inputClass} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium" htmlFor="industry">Industry</label>
              <input id="industry" name="industry" className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="location">Location</label>
              <input id="location" name="location" className={inputClass} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium" htmlFor="positions">Positions</label>
              <input id="positions" name="positions" type="number" min={1} defaultValue={1} className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="expectedTimeline">Timeline</label>
              <input id="expectedTimeline" name="expectedTimeline" className={inputClass} />
            </div>
          </div>
          <Button type="submit">Submit requirement</Button>
        </form>
      </div>
      <div>
        <h2 className="font-semibold text-mk-navy">Your submissions</h2>
        <ul className="mt-4 space-y-2">
          {list.map((r) => (
            <li key={r.id} className="rounded-lg border border-mk-navy/10 bg-white px-4 py-3 text-sm">
              <span className="font-medium">{r.title}</span>
              <span className="ml-2 text-mk-muted">· {r.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
