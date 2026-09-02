import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Music2, ShieldCheck } from "lucide-react";
import { Brand } from "@/components/brand";

const socials = [
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "TikTok", href: "https://tiktok.com", Icon: Music2 },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-ink text-ink-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="min-w-0">
            <Brand size="md" className="[&>span:last-child]:text-ink-foreground" />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-foreground/70">
              Verified foreign employment demands from licensed Nepali recruitment agencies — published
              directly from the agency dashboard, so what you read is what was received.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink-foreground/15 px-3 py-1.5 text-xs text-ink-foreground/80">
              <ShieldCheck className="size-3.5 text-primary" />
              Agencies verified with DoFE licence
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-foreground/60">
              Company
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-ink-foreground/80 transition-colors hover:text-primary">
                  About ManpowerX
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-ink-foreground/80 transition-colors hover:text-primary">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-ink-foreground/80 transition-colors hover:text-primary">
                  Agency Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-foreground/60">
              Follow
            </h3>
            <div className="mt-4 flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-xl border border-ink-foreground/15 text-ink-foreground/80 transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-ink-foreground/10 pt-6 text-xs text-ink-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ManpowerX. All rights reserved.</p>
          <p>
            A product of <span className="font-semibold text-ink-foreground">Marsiin</span> — log on to{" "}
            <a
              href="https://www.marsiin.com"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              www.marsiin.com
            </a>{" "}
            to know more
          </p>
        </div>
      </div>
    </footer>
  );
}
