import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const title = "Terms & Conditions — ManpowerX";
const description =
  "The rules for using ManpowerX: how demands are published by licensed agencies, how candidate details are shared, and what ManpowerX is not responsible for.";

export const Route = createFileRoute("/terms")({
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
  component: TermsPage,
});

const sections = [
  {
    heading: "1. What ManpowerX is",
    body: "ManpowerX is a publishing platform used by licensed Nepali recruitment agencies. Each demand on this site is uploaded by the agency that received it. ManpowerX is not a recruitment agency and does not hire, place, or process any worker itself.",
  },
  {
    heading: "2. Accuracy of demands",
    body: "Salary, seats, facilities, deadlines and interview details are entered by the publishing agency from the demand letter they hold. Agencies are responsible for keeping their listings accurate and for closing a demand once it is filled or expired.",
  },
  {
    heading: "3. No fee to candidates",
    body: "Applying through ManpowerX is free. ManpowerX never asks a candidate for payment. Any service charge collected by an agency must follow the limits set by the Department of Foreign Employment. Report demands for money in advance of an offer.",
  },
  {
    heading: "4. Your details",
    body: "When you apply, your name, phone number and address are sent to the publishing agency so they can contact you about that demand. They are stored against that agency's candidate records and are not sold or shared with unrelated third parties.",
  },
  {
    heading: "5. Contact by WhatsApp and phone",
    body: "By submitting an application you agree to be contacted by the agency on the phone number you provide, including on WhatsApp, about that demand and the documents required for it.",
  },
  {
    heading: "6. Agency accounts",
    body: "Agency workspaces are for authorised staff of a licensed agency. You are responsible for activity under your account. Publishing false demands, expired letters, or listings for an agency you do not represent will result in removal from the platform.",
  },
  {
    heading: "7. Limitation of liability",
    body: "ManpowerX provides this feed as-is. We are not liable for hiring decisions, contract terms, wages, working conditions, or any dispute between a candidate, an agency and a foreign employer.",
  },
  {
    heading: "8. Changes",
    body: "These terms may be updated as the platform grows. Continued use of ManpowerX after an update means you accept the revised terms.",
  },
];

function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Legal</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated {new Date().getFullYear()}. Please read these before applying or publishing a
          demand.
        </p>

        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-lg font-bold text-foreground">{s.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
