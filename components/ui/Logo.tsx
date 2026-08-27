import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function OwlMark({
  tone = "dark",
  size = 32,
  className,
}: {
  tone?: "dark" | "light";
  size?: number;
  className?: string;
}) {
  const src =
    tone === "dark"
      ? "/logo-owl-black-transparent.png"
      : "/logo-owl-white-transparent.png";

  return (
    <Image
      src={src}
      alt="Isotipo de ORVIA"
      width={size}
      height={Math.round(size * 1.34)}
      className={cn("h-auto w-auto object-contain", className)}
      style={{ height: size }}
      priority
    />
  );
}

export function Wordmark({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight",
        tone === "dark" ? "text-ink" : "text-paper",
        className
      )}
      aria-label="ORVIA — Inicio"
    >
      <OwlMark tone={tone} size={26} />
      <span>ORVIA</span>
    </Link>
  );
}
