import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, FileCheck2, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

const title = "About ManpowerX — Verified demands from licensed Nepali agencies";
const description =
  "ManpowerX publishes foreign employment demands straight from the dashboards of DoFE-licensed Nepali recruitment agencies, so workers see exactly what the agency received.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  {
    Icon: ShieldCheck,
    title: "Only licensed agencies",
    body: "Every publisher on ManpowerX is a recruitment agency with a valid DoFE licence number recorded in their profile.",
  },
  {
    Icon: FileCheck2,
    title: "The real demand letter",
    body: "Cards show the actual demand attachment the agency received — position, seats, salary and facilities are read from that record, not rewritten by a marketer.",
  },
  {
    Icon: Users,
    title: "Applying costs nothing",
    body: "Name, phone and address is all a candidate submits. No fees, no logins, no middlemen between the worker and the agency.",
  },
  {
    Icon: HeartHandshake,
    title: "Built for the agency, too",
    body: "ManpowerX is a SaaS platform: agencies manage demands, candidates and documents inside their own workspace, and publishing to this feed is one switch.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">About us</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
          Foreign employment, without the guesswork
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Thousands of Nepali workers leave every week, and most of them decide based on a photo
          forwarded through Viber. ManpowerX puts those demands where they belong — in one public
          feed, published by the licensed agency that holds the letter, with the salary, seats,
          facilities and deadline stated up front.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {pillars.map(({ Icon, title: t, body }) => (
            <article key={t} className="surface-card p-5">
              <div className="grid size-10 place-items-center rounded-xl bg-primary-soft">
                <Icon className="size-5 text-primary" />
              </div>
              <h2 className="mt-4 font-display text-lg font-bold text-foreground">{t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>

        <section className="surface-card mt-10 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
              <Building2 className="size-5 text-primary" />
              Run a recruitment agency?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage demands, candidates and documents in one workspace — and publish to this feed
              in a click.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link to="/login">Agency Login</Link>
          </Button>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
