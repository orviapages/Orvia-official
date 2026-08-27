import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  disabled?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-charcoal border border-ink disabled:opacity-40",
  secondary:
    "bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper disabled:opacity-40",
  ghost:
    "bg-transparent text-ink border border-transparent hover:border-mist disabled:opacity-40",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-none px-6 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300 ease-editorial disabled:cursor-not-allowed";

export function Button({
  variant = "primary",
  className,
  children,
  href,
  type = "button",
  onClick,
  disabled,
}: BaseProps) {
  const classes = cn(base, variantClasses[variant], className);

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
