"use client";

import Image from "next/image";
import { SiteHeader } from "@/components/marketing/site-header";
import { PageBreadcrumbBar } from "@/components/marketing/page-breadcrumb-bar";

type SubpageHeroProps = {
  title: string;
  image?: string;
  crumbs: { label: string; href?: string }[];
};

const DEFAULT_IMG =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80";

export function SubpageHero({ title, image = DEFAULT_IMG, crumbs }: SubpageHeroProps) {
  return (
    <section className="relative">
      <SiteHeader overlay />
      <div className="relative h-[min(50vh,380px)] overflow-hidden">
        <Image src={image} alt="" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-[#0a1628]/75" />
        <h1 className="relative flex h-full items-center justify-center px-4 text-center font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
      </div>
      <PageBreadcrumbBar items={crumbs} />
    </section>
  );
}
