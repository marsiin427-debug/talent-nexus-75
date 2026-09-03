import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  CalendarClock,
  CheckCircle2,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import demandLetter from "@/assets/demand-letter.jpg";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  benefits,
  formatDate,
  getDemand,
  salaryRange,
  totalOpenings,
  type Demand,
} from "@/lib/demands";

export const Route = createFileRoute("/apply/$demandId")({
  loader: ({ params }) => {
    const demand = getDemand(params.demandId);
    if (!demand) throw notFound();
    return { demand };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Demand unavailable — ManpowerX" }, { name: "robots", content: "noindex" }],
      };
    }
    const { demand } = loaderData;
    const title = `Apply — ${demand.positions.map((p) => p.title).join(", ")} in ${demand.country}`;
    const description = `${demand.employer_name} is hiring ${totalOpenings(demand)} workers for ${demand.country}. Salary ${salaryRange(demand)}. Apply with your name, phone and address.`;
    return {
      meta: [
        { title: `${title} | ManpowerX` },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ApplyPage,
});

function ApplyPage() {
  const { demand } = Route.useLoaderData();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only — wire to POST /api/public/demands/:id/apply
    setSubmitted(true);
    toast.success("Application sent", {
      description: `${demand.employer_name} — the agency will call you on ${form.phone}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to demands
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
          <DemandSummary demand={demand} />

          <section className="surface-card h-fit p-5 sm:p-6">
            {submitted ? (
              <div className="py-6 text-center">
                <div className="mx-auto grid size-14 place-items-center rounded-full bg-success/10">
                  <CheckCircle2 className="size-7 text-success" />
                </div>
                <h1 className="mt-4 font-display text-xl font-bold text-foreground">
                  Application received
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  {demand.agency.name} has your details. They will contact you on{" "}
                  <strong className="text-foreground">{form.phone}</strong>. Keep your WhatsApp
                  active.
                </p>
                <Button asChild className="mt-6">
                  <Link to="/">Browse more demands</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <h1 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                    Apply for this demand
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Three details only. The agency will call you for documents and the interview.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    required
                    autoComplete="name"
                    placeholder="e.g. Ram Bahadur Thapa"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="98XXXXXXXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                  <p className="flex items-start gap-1.5 rounded-lg bg-primary-soft px-3 py-2 text-xs font-medium text-accent-foreground">
                    <Phone className="mt-0.5 size-3.5 shrink-0" />
                    Use your WhatsApp number so the agency can reach you faster
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    required
                    rows={3}
                    placeholder="Ward, municipality, district"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Submit application
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  By applying you agree to share these details with {demand.agency.name}. ManpowerX
                  never charges candidates.
                </p>
              </form>
            )}
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function DemandSummary({ demand }: { demand: Demand }) {
  const perks = benefits(demand);

  return (
    <section className="surface-card overflow-hidden">
      <div className="relative">
        <img
          src={demandLetter}
          alt={`Demand letter of ${demand.employer_name}`}
          width={900}
          height={1200}
          className="h-52 w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <span className="rounded-full bg-card/95 px-2.5 py-1 text-[11px] font-semibold text-foreground">
            LT {demand.lt_number}
          </span>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div>
          <h2 className="font-display text-lg font-bold text-foreground sm:text-xl">
            {demand.positions.map((p) => p.title).join(" · ")}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Building2 className="size-3.5" />
            {demand.employer_name}
            <span className="mx-1">•</span>
            <MapPin className="size-3.5" />
            {demand.country}
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/70 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Position</th>
                <th className="px-3 py-2 font-medium">Seats</th>
                <th className="px-3 py-2 text-right font-medium">Salary / month</th>
              </tr>
            </thead>
            <tbody>
              {demand.positions.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-foreground">{p.title}</td>
                  <td className="px-3 py-2 tabular-nums text-muted-foreground">
                    {p.openings_male + p.openings_female}
                  </td>
                  <td className="px-3 py-2 text-right font-semibold tabular-nums text-primary">
                    {p.salary_currency} {p.salary_amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {perks.length > 0 && (
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Facilities
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {perks.map((b) => (
                <span
                  key={b}
                  className="rounded-md bg-secondary px-2 py-1 text-[11px] font-medium text-secondary-foreground"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 text-sm">
          <Meta
            icon={<CalendarClock className="size-3.5" />}
            label="Apply before"
            value={formatDate(demand.application_deadline ?? demand.expiry_date)}
          />
          <Meta
            icon={<Users className="size-3.5" />}
            label="Applicants"
            value={`${demand.applicants_count} applied`}
          />
        </div>

        <div className="rounded-xl border border-border bg-muted/50 p-4">
          <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" />
            Licensed agency
          </p>
          <p className="mt-2 font-semibold text-foreground">{demand.agency.name}</p>
          <p className="text-sm text-muted-foreground">{demand.agency.business_address}</p>
          <p className="text-sm text-muted-foreground">
            <a href={`tel:${demand.agency.phone}`} className="font-medium text-primary hover:underline">
              {demand.agency.phone}
            </a>
            <span className="mx-2">•</span>
            DoFE {demand.agency.dofe_license_number}
          </p>
        </div>
      </div>
    </section>
  );
}

function Meta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/70 px-3 py-2">
      <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="truncate text-sm font-bold text-foreground">{value}</p>
    </div>
  );
}
