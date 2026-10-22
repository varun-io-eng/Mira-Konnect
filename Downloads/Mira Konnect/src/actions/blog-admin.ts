"use server";

import { BlogStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/get-user";
import { isAdminRole } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db";

export type ActionResult = { ok: true } | { ok: false; error: string };

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export async function createBlogPostAction(formData: FormData): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user || !isAdminRole(user.role.name)) {
    return { ok: false, error: "Forbidden" };
  }

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const publish = formData.get("publish") === "on";

  if (!title || !content) {
    return { ok: false, error: "Title and content are required" };
  }

  let slug = slugify(title);
  const taken = await prisma.blog.findUnique({ where: { slug } });
  if (taken) slug = `${slug}-${Date.now().toString(36)}`;

  await prisma.blog.create({
    data: {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      status: publish ? BlogStatus.PUBLISHED : BlogStatus.DRAFT,
      publishedAt: publish ? new Date() : null,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { ok: true };
}

export async function publishBlogPostAction(postId: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user || !isAdminRole(user.role.name)) {
    return { ok: false, error: "Forbidden" };
  }

  await prisma.blog.update({
    where: { id: postId },
    data: { status: BlogStatus.PUBLISHED, publishedAt: new Date() },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { ok: true };
}
