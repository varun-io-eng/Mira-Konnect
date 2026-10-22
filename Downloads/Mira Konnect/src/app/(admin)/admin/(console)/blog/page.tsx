import Link from "next/link";
import { BlogStatus } from "@prisma/client";
import { createBlogPostAction, publishBlogPostAction } from "@/actions/blog-admin";
import { getCurrentUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Blog" };

const inputClass =
  "mt-1 w-full rounded-lg border border-mk-navy/15 px-3 py-2 text-sm";

export default async function AdminBlogPage() {
  await getCurrentUser();
  const posts = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-2xl font-semibold text-mk-navy">Blog</h1>
        <p className="mt-1 text-sm text-mk-muted">Create and publish articles for the public blog.</p>
      </div>

      <form
        action={async (fd) => {
          await createBlogPostAction(fd);
        }}
        className="max-w-2xl space-y-4 rounded-xl border bg-white p-6"
      >
        <h2 className="font-semibold text-mk-navy">New post</h2>
        <div>
          <label className="text-sm font-medium" htmlFor="title">Title</label>
          <input id="title" name="title" required className={inputClass} />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="excerpt">Excerpt</label>
          <textarea id="excerpt" name="excerpt" rows={2} className={inputClass} />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="content">Content</label>
          <textarea id="content" name="content" rows={8} required className={inputClass} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="publish" />
          Publish immediately
        </label>
        <Button type="submit">Save post</Button>
      </form>

      <div>
        <h2 className="font-semibold text-mk-navy">All posts</h2>
        <ul className="mt-4 space-y-3">
          {posts.map((post) => (
            <li key={post.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border bg-white p-4">
              <div>
                <p className="font-medium">{post.title}</p>
                <p className="text-xs text-mk-muted">
                  {post.status}
                  {post.status === BlogStatus.PUBLISHED ? (
                    <>
                      {" · "}
                      <Link href={`/blog/${post.slug}`} className="text-mk-teal hover:underline">
                        View
                      </Link>
                    </>
                  ) : null}
                </p>
              </div>
              {post.status !== BlogStatus.PUBLISHED ? (
                <form
                  action={async () => {
                    await publishBlogPostAction(post.id);
                  }}
                >
                  <Button type="submit" size="sm" variant="outline">Publish</Button>
                </form>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
