import { cn } from "@/lib/cn";

export function Marquee({
  items,
  tone = "dark",
  className,
}: {
  items: string[];
  tone?: "dark" | "light";
  className?: string;
}) {
  // Duplicamos la lista para lograr un loop perfecto con translateX(-50%)
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "marquee-group overflow-hidden border-y",
        tone === "dark" ? "border-mist" : "border-paper/15",
        className
      )}
    >
      <div className="marquee-track flex w-max animate-marquee items-center">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={cn(
              "flex items-center gap-8 whitespace-nowrap px-8 py-5 font-serif text-xl italic md:text-2xl",
              tone === "dark" ? "text-ink" : "text-paper"
            )}
          >
            {item}
            <span aria-hidden="true" className={tone === "dark" ? "text-mist" : "text-paper/30"}>
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
