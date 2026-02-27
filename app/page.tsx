import Link from "next/link";
import { Card } from "../components/ui";

const FEATURES = ["Fast checkout", "Simple product pages", "Instant delivery steps"];

const STEPS = [
  { title: "1. Choose product", desc: "Open Products and pick the plan you want." },
  { title: "2. Verify + pay", desc: "Complete verification, then finish checkout in Stripe." },
  { title: "3. Get delivery", desc: "You’ll see delivery details right after checkout." },
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-12">
        <div className="max-w-3xl space-y-5">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">Aureon</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Cleaner storefront. Faster checkout.</h1>
          <p className="text-sm text-white/70 sm:text-base">
            We redesigned the flow to be simpler: verify once, purchase, then get your delivery instructions.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/products"
              className="rounded-xl border border-cyan-300/30 bg-cyan-300/15 px-5 py-2.5 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/20"
            >
              Browse products
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10"
            >
              Contact support
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 pt-3">
            {FEATURES.map((f) => (
              <span key={f} className="rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs text-white/70">
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {STEPS.map((s) => (
          <Card key={s.title} className="p-5">
            <h2 className="text-base font-semibold">{s.title}</h2>
            <p className="pt-2 text-sm text-white/70">{s.desc}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}