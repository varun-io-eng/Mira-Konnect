import Image from "next/image";
import { cn } from "@/lib/utils";

type SnapHandIconProps = {
  className?: string;
};

/** User snap-hand artwork — multiply removes the white matte on light backgrounds */
export function SnapHandIcon({ className }: SnapHandIconProps) {
  return (
    <Image
      src="/images/services/snap-hand.png"
      alt=""
      width={88}
      height={88}
      unoptimized
      className={cn(
        "h-[3.25rem] w-[3.25rem] object-contain object-center mix-blend-multiply sm:h-[3.75rem] sm:w-[3.75rem]",
        className,
      )}
      aria-hidden
      priority={false}
    />
  );
}
