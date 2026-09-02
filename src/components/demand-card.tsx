import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, Building2, MapPin, Users, FileText } from "lucide-react";
import demandLetter from "@/assets/demand-letter.jpg";
import { JoshButton } from "@/components/josh-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  benefits,
  daysLeft,
  formatDate,
  salaryRange,
  timeAgo,
  totalOpenings,
  type Demand,
} from "@/lib/demands";

export function DemandCard({ demand }: { demand: Demand }) {
  const left = daysLeft(demand.application_deadline ?? demand.expiry_date);
  const urgent = left <= 7;
  const perks = benefits(demand);

  return (
    <article className="surface-card group relative flex flex-col overflow-hidden sm:flex-row">
      {/* Attachment preview — the real demand letter, kept small and controlled */}
      <div className="relative w-full shrink-0 overflow-hidden bg-muted sm:w-44 lg:w-52">
        <img
          src={demandLetter}
          alt={`Demand letter of ${demand.employer_name}`}
          loading="lazy"
          width={900}
          height={1200}
          className="h-40 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 sm:h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-ink/10" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-card/95 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-sm">
          <FileText className="size-3 text-primary" />
          Demand letter
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-medium text-ink-foreground sm:hidden">
          {demand.lt_number}
        </span>
      </div>

      {/* Structured data extracted from the demand record */}
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-accent-foreground">
            <MapPin className="size-3" />
            {demand.country}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
              urgent ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success",
            )}
          >
            <CalendarClock className="size-3" />
            {left > 0 ? `${left} days left` : "Closing"}
          </span>
          <span className="ml-auto text-xs text-muted-foreground">{timeAgo(demand.created_at)}</span>
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-bold text-foreground sm:text-lg">
            {demand.positions.map((p) => p.title).join(" · ")}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-muted-foreground">
            <Building2 className="size-3.5 shrink-0" />
            {demand.employer_name}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Stat label="Salary / month" value={salaryRange(demand)} highlight />
          <Stat label="Openings" value={`${totalOpenings(demand)} seats`} />
          <Stat
            label="Apply before"
            value={formatDate(demand.application_deadline ?? demand.expiry_date)}
            className="col-span-2 sm:col-span-1"
          />
        </div>

        {perks.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {perks.slice(0, 4).map((b) => (
              <span
                key={b}
                className="rounded-md bg-secondary px-2 py-1 text-[11px] font-medium text-secondary-foreground"
              >
                {b}
              </span>
            ))}
            {perks.length > 4 && (
              <span className="rounded-md bg-secondary px-2 py-1 text-[11px] font-medium text-muted-foreground">
                +{perks.length - 4} more
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border pt-3">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="size-3.5" />
            <strong className="font-semibold text-foreground tabular-nums">{demand.applicants_count}</strong>
            applied
          </span>
          <JoshButton count={demand.josh_count} size="sm" />
          <Button asChild size="sm" className="ml-auto">
            <Link to="/apply/$demandId" params={{ demandId: demand.id }}>
              Apply
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

function Stat({
  label,
  value,
  highlight,
  className,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0 rounded-xl bg-muted/70 px-3 py-2", className)}>
      <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p
        className={cn(
          "truncate text-sm font-bold",
          highlight ? "text-primary" : "text-foreground",
        )}
      >
        {value}
      </p>
    </div>
  );
}
