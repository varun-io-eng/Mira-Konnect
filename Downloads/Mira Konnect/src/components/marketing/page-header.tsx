import type { ReactNode } from "react";
import {
  PageHeroBanner,
  type PageHeroVisuals,
} from "@/components/marketing/page-hero-banner";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
  bottomFadeClass?: string;
  visualOnly?: boolean;
  compact?: boolean;
  visuals?: PageHeroVisuals;
  children?: ReactNode;
};

/** Top-of-page banner — rotating brand hero visuals */
export function PageHeader({
  title,
  description,
  eyebrow,
  className,
  bottomFadeClass,
  visualOnly,
  compact,
  visuals,
  children,
}: PageHeaderProps) {
  return (
    <PageHeroBanner
      title={title}
      description={description}
      eyebrow={eyebrow}
      visualOnly={visualOnly}
      compact={compact}
      visuals={visuals}
      className={cn(className)}
      bottomFadeClass={bottomFadeClass}
    >
      {children}
    </PageHeroBanner>
  );
}
