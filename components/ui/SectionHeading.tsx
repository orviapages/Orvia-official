import { cn } from "@/lib/cn";

export function SectionHeading({
  index,
  kicker,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: {
  index?: string;
  kicker?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {(kicker || index) && (
        <div
          className={cn(
            "mb-5 flex items-baseline gap-3",
            align === "center" && "justify-center"
          )}
        >
          {index && (
            <span
              className={cn(
                "font-serif text-sm italic",
                tone === "light" ? "text-paper/50" : "text-graphite/70"
              )}
            >
              {index}
            </span>
          )}
          {kicker && (
            <p className={cn("kicker", tone === "light" && "text-mist")}>{kicker}</p>
          )}
        </div>
      )}
      <h2
        className={cn(
          "text-display-md font-display font-medium",
          tone === "light" ? "text-paper" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed md:text-lg",
            tone === "light" ? "text-mist/80" : "text-graphite"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
