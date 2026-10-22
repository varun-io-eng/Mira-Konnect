import Image from "next/image";

type AboutStoryPhotoProps = {
  src: string;
  alt: string;
};

export function AboutStoryPhoto({ src, alt }: AboutStoryPhotoProps) {
  return (
    <div className="relative min-h-[280px] h-full w-full lg:min-h-[340px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 560px"
      />
    </div>
  );
}
