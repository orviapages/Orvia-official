import Image from "next/image";
import { cn } from "@/lib/cn";

export function OwlWatermark({
  tone = "light",
  className,
  position = "right",
}: {
  tone?: "light" | "dark";
  className?: string;
  position?: "right" | "left" | "center";
}) {
  const src =
    tone === "light"
      ? "/logo-owl-white-transparent.png"
      : "/logo-owl-black-transparent.png";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-1/2 -translate-y-1/2 select-none",
        position === "right" && "right-0 translate-x-1/4",
        position === "left" && "left-0 -translate-x-1/4",
        position === "center" && "left-1/2 -translate-x-1/2",
        className
      )}
    >
      <Image
        src={src}
        alt=""
        width={600}
        height={804}
        className="h-[420px] w-auto object-contain opacity-[0.05] md:h-[560px]"
      />
    </div>
  );
}
