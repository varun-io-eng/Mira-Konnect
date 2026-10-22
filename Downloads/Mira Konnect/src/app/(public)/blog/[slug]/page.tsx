import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogStatus } from "@prisma/client";
import { prisma } from "@/lib/db";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blog.findUnique({ where: { slug } });
  if (!post || post.status !== BlogStatus.PUBLISHED) return { title: "Article" };
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blog.findUnique({ where: { slug } });
  if (!post || post.status !== BlogStatus.PUBLISHED) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <nav className="text-sm text-mk-muted">
        <Link href="/blog" className="hover:text-mk-teal">Resources</Link>
        <span className="mx-2">/</span>
        <span>{post.title}</span>
      </nav>
      <h1 className="mt-6 font-display text-3xl font-semibold text-mk-navy">
        {post.title}
      </h1>
      <div className="prose prose-mk mt-8 max-w-none text-mk-slate whitespace-pre-wrap">
        {post.content}
      </div>
    </article>
  );
}
