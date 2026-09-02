import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Brand({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "text-lg",
    md: "text-xl sm:text-2xl",
    lg: "text-3xl sm:text-4xl",
  } as const;

  return (
    <Link to="/" className={cn("group inline-flex items-baseline gap-0.5 font-display font-extrabold tracking-tight", sizes[size], className)}>
      <span className="text-primary">Manpower</span>
      <span className="relative text-foreground">
        X
        <span className="absolute -right-1 -top-0.5 h-1.5 w-1.5 rounded-full bg-primary transition-transform group-hover:scale-125" />
      </span>
    </Link>
  );
}
