import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, ShieldCheck, Sparkles, Loader2 } from "lucide-react";
import { DemandCard } from "@/components/demand-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { countries, demands, totalOpenings } from "@/lib/demands";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ManpowerX — Verified Foreign Employment Demands from Nepal" },
      {
        name: "description",
        content:
          "Browse live labour demands published by licensed Nepali manpower agencies. Salary, seats, benefits and deadlines at a glance — apply in under a minute.",
      },
      { property: "og:title", content: "ManpowerX — Verified Foreign Employment Demands" },
      {
        property: "og:description",
        content:
          "Live Gulf and Malaysia job demands from licensed Nepali recruitment agencies. Apply with just your name, phone and address.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const PAGE_SIZE = 6;

const sorts = [
  { key: "recent", label: "Newest" },
  { key: "closing", label: "Closing soon" },
  { key: "josh", label: "Most Josh" },
] as const;

function HomePage() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All");
  const [sort, setSort] = useState<(typeof sorts)[number]["key"]>("recent");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = demands.filter((d) => {
      const matchCountry = country === "All" || d.country === country;
      const matchQuery =
        !q ||
        d.employer_name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.positions.some((p) => p.title.toLowerCase().includes(q));
      return matchCountry && matchQuery;
    });

    return [...list].sort((a, b) => {
      if (sort === "josh") return b.josh_count - a.josh_count;
      if (sort === "closing")
        return (
          new Date(a.application_deadline ?? a.expiry_date).getTime() -
          new Date(b.application_deadline ?? b.expiry_date).getTime()
        );
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [query, country, sort]);

  const shown = filtered.slice(0, visible);
  const totalSeats = demands.reduce((s, d) => s + totalOpenings(d), 0);

  function reset(next: () => void) {
    next();
    setVisible(PAGE_SIZE);
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="hero-mesh border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-3 py-1.5 text-xs font-medium text-accent-foreground shadow-sm">
            <ShieldCheck className="size-3.5 text-primary" />
            Published straight from licensed agency dashboards
          </div>

          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight text-foreground sm:text-5xl">
            Real demands. Real agencies.{" "}
            <span className="text-primary">Your next job abroad.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Every listing below is a labour demand received by a DoFE-licensed Nepali manpower agency —
            with the original demand letter attached and the key details pulled out for you.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
            <div className="relative min-w-0">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => reset(() => setQuery(e.target.value))}
                placeholder="Search job title, country or employer…"
                className="h-13 rounded-2xl border-border bg-card pl-11 text-base shadow-sm"
                aria-label="Search demands"
              />
            </div>
            <Button size="lg" className="h-13 rounded-2xl px-7 text-base">
              <SlidersHorizontal className="size-4" />
              Find jobs
            </Button>
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-3 sm:max-w-xl">
            <HeroStat label="Live demands" value={`${demands.length}`} />
            <HeroStat label="Total seats" value={`${totalSeats.toLocaleString("en-US")}+`} />
            <HeroStat label="Countries" value={`${countries.length - 1}`} />
          </dl>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-[65px] z-30 border-b border-border bg-background/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <div className="no-scrollbar flex min-w-0 flex-1 gap-2 overflow-x-auto">
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => reset(() => setCountry(c))}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                  country === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="hidden shrink-0 items-center gap-1 rounded-full bg-muted p-1 md:flex">
            {sorts.map((s) => (
              <button
                key={s.key}
                onClick={() => reset(() => setSort(s.key))}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                  sort === s.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feed */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-lg font-bold text-foreground sm:text-xl">
            {country === "All" ? "Latest demands" : `Demands in ${country}`}
          </h2>
          <p className="text-sm text-muted-foreground">
            Showing <strong className="text-foreground">{shown.length}</strong> of {filtered.length}
          </p>
        </div>

        {shown.length === 0 ? (
          <div className="surface-card grid place-items-center gap-2 p-14 text-center">
            <Sparkles className="size-6 text-primary" />
            <p className="font-semibold text-foreground">No demands match your search</p>
            <p className="text-sm text-muted-foreground">Try another job title or clear the country filter.</p>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {shown.map((d) => (
              <DemandCard key={d.id} demand={d} />
            ))}
          </div>
        )}

        {visible < filtered.length && (
          <div className="mt-8 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
            >
              <Loader2 className="size-4" />
              Load {Math.min(PAGE_SIZE, filtered.length - visible)} more demands
            </Button>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/80 px-4 py-3 shadow-sm">
      <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="font-display text-xl font-extrabold text-foreground sm:text-2xl">{value}</dd>
    </div>
  );
}
