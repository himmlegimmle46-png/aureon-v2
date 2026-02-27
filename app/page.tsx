import Link from "next/link";
import { Card } from "../components/ui";

const FEATURES = [
  "Manual verification before checkout",
  "Stripe-powered secure payments",
  "Fast post-checkout delivery instructions",
];

const STEPS = [
  {
    title: "Pick your product",
    desc: "Browse software or account listings and choose the exact plan you want.",
  },
  {
    title: "Verify and pay",
    desc: "Complete verification, then finish payment securely through Stripe.",
  },
  {
    title: "Get your delivery",
    desc: "After checkout, delivery instructions and next steps are shown immediately.",
  },
];

const SUPPORT = [
  {
    title: "Transparent checkout flow",
    desc: "No hidden steps—verify first, purchase second, delivery after.",
  },
  {
    title: "Built for speed",
    desc: "Lightweight pages and calmer visuals for smoother browsing.",
  },
  {
    title: "Direct support",
    desc: "If anything goes wrong, reach out and include what you clicked.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <style>{`
        @keyframes heroFloat {
          0% { transform: translate3d(-10px, 0px, 0) scale(1); }
          100% { transform: translate3d(10px, -8px, 0) scale(1.04); }
        }

        @keyframes heroShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .home-hero-glow {
          animation: heroFloat 7s ease-in-out infinite alternate;
        }

        .home-hero-title {
          background: linear-gradient(90deg, #d8eeff, #bdb8ff, #88d8ff, #d8eeff);
          background-size: 220% 220%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: heroShimmer 8s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .home-hero-glow,
          .home-hero-title {
            animation: none !important;
          }
        }
      `}</style>

      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0b1324] via-[#0a1120] to-[#090d17] p-8 sm:p-12">
        <div className="home-hero-glow pointer-events-none absolute -top-20 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(86,141,255,0.28),transparent_64%)] blur-3xl" />
        <div className="home-hero-glow pointer-events-none absolute -bottom-20 right-0 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(151,102,255,0.25),transparent_66%)] blur-3xl" />

        <div className="relative max-w-3xl space-y-5">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">Aureon</p>
          <h1 className="home-hero-title text-4xl font-semibold tracking-tight sm:text-5xl">
            Better storefront. Smoother checkout. Cleaner delivery flow.
          </h1>
          <p className="text-sm text-white/75 sm:text-base">
            Aureon is built for simple purchasing: choose your product, verify, pay through Stripe, and instantly view
            your delivery instructions.
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

      <section className="grid gap-3 sm:grid-cols-3">
        {SUPPORT.map((x) => (
          <Card key={x.title} className="p-5">
            <h3 className="text-sm font-semibold text-white/95">{x.title}</h3>
            <p className="pt-2 text-sm text-white/65">{x.desc}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}