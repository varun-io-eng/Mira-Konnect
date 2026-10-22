import { UserStatus } from "@prisma/client";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      role: true,
      candidate: true,
      employer: { include: { company: true } },
      recruiter: true,
    },
  });

  if (!user || user.status !== UserStatus.ACTIVE) return null;
  return user;
}
