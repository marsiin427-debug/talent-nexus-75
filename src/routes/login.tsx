import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Building2, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const title = "Agency Login — ManpowerX workspace";
const description =
  "Sign in to your ManpowerX agency workspace to publish demands, manage candidates and track applications.";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: brand panel */}
      <aside className="relative hidden flex-col justify-between bg-ink p-10 text-ink-foreground lg:flex">
        <Brand size="md" className="[&>span:last-child]:text-ink-foreground" />
        <div>
          <h2 className="font-display text-3xl font-bold leading-tight">
            Your demands, your candidates,
            <br />
            one workspace.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-foreground/70">
            Upload a demand letter once — ManpowerX extracts the positions, tracks seats and
            deadlines, collects applicants, and publishes it to the public feed when you are ready.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-ink-foreground/80">
            {[
              "Demand and LT tracking with expiry alerts",
              "Candidate pipeline from apply to departure",
              "Documents, medical and visa status in one place",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-ink-foreground/50">
          A product of Marsiin — licensed agencies only.
        </p>
      </aside>

      {/* Right: form */}
      <main className="flex flex-col justify-center px-4 py-12 sm:px-10">
        <div className="mx-auto w-full max-w-sm">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to demands
          </Link>

          <div className="mt-8 lg:hidden">
            <Brand />
          </div>

          <h1 className="mt-6 font-display text-2xl font-bold text-foreground">
            Sign in to your agency
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Use the email your agency admin registered with ManpowerX.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              // UI only — wire to the agency auth endpoint
              toast.info("Agency sign-in is not connected yet", {
                description: "Hook this form up to your authentication backend.",
              });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@youragency.com.np"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  className="text-xs font-medium text-primary hover:underline"
                  onClick={() => toast.info("Contact your agency admin to reset the password.")}
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              <Lock className="size-4" />
              Sign in
            </Button>
          </form>

          <div className="surface-card mt-8 flex items-start gap-3 p-4">
            <Building2 className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              New agency? ManpowerX onboards DoFE-licensed agencies only. Email{" "}
              <a href="mailto:hello@marsiin.com" className="font-semibold text-primary hover:underline">
                hello@marsiin.com
              </a>{" "}
              with your licence number to get access.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
