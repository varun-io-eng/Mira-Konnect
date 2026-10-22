import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type BlogPlayButtonProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClass = {
  sm: "h-9 w-9 [&_svg]:h-3.5 [&_svg]:w-3.5",
  md: "h-11 w-11 [&_svg]:h-4 [&_svg]:w-4",
  lg: "h-14 w-14 [&_svg]:h-6 [&_svg]:w-6",
};

export function BlogPlayButton({ className, size = "md" }: BlogPlayButtonProps) {
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-full bg-[#ffd166] text-mk-navy shadow-md",
        sizeClass[size],
        className,
      )}
      aria-hidden
    >
      <Play className="fill-mk-navy pl-0.5" />
    </span>
  );
}
