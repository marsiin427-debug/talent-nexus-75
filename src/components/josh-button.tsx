import { useState } from "react";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * "Josh" (जोश) reaction — intentionally NOT a like/heart.
 * Users tap it to show energy/interest for a demand; count is shown publicly.
 */
export function JoshButton({
  count,
  size = "md",
  className,
}: {
  count: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const [active, setActive] = useState(false);
  const total = count + (active ? 1 : 0);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label="Give Josh to this demand"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setActive((v) => !v);
      }}
      className={cn(
        "group inline-flex shrink-0 items-center gap-1.5 rounded-full border font-semibold transition-all active:scale-95",
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
        active
          ? "border-primary bg-primary-soft text-primary"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary",
        className,
      )}
    >
      <Flame
        className={cn(
          size === "sm" ? "size-3.5" : "size-4",
          "transition-transform group-hover:scale-110",
          active && "fill-primary",
        )}
      />
      <span className="tabular-nums">{total}</span>
      <span className="sr-only sm:not-sr-only">Josh</span>
    </button>
  );
}
