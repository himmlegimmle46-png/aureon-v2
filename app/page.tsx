"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const STATS = [
  { n: "1", t: "Products sold" },
  { n: "1", t: "Total customers" },
  { n: "1", t: "Reviews received" },
  { n: "5.00", t: "Average rating" },
];

export default function HomePage() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const stats = useMemo(() => STATS, []);

  function goSearch() {
    const query = q.trim();
    if (!query) return router.push("/products");
    router.push(`/products?search=${encodeURIComponent(query)}`);
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      {/* Uses your global aurora background behind this */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
        {/* aurora-ish accent glows */}
        <div className="pointer-events-none absolute -left-40 top-[-160px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(90,240,255,0.18),transparent_62%)] blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-[-120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(170,120,255,0.16),transparent_62%)] blur-3xl" />

        {/* content */}
        <div className="relative px-6 pb-10 pt-12 sm:px-10 sm:pb-12 sm:pt-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/90 shadow-[0_0_0_7px_rgba(90,255,160,0.10)]" />
              Aureon
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white/95 sm:text-6xl">
              Welcome to <span className="ac-text-accent">Aureon</span>
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
              Browse products, checkout with Stripe, and receive delivery steps right after payment.
            </p>

            {/* search (actually routes) */}
            <div className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 shadow-[0_14px_60px_rgba(0,0,0,0.55)]">
              <span className="text-white/55">⌕</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") goSearch();
                }}
                placeholder="Search for products..."
                className="w-full bg-transparent text-sm text-white/85 placeholder:text-white/35 outline-none"
              />
              <button
                type="button"
                onClick={goSearch}
                className="shrink-0 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-white/85 transition hover:bg-white/[0.10]"
              >
                Go
              </button>
            </div>

            {/* CTA */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-white/[0.08] px-6 py-3 text-sm font-semibold text-white/95 shadow-[0_18px_70px_rgba(0,0,0,0.6)] transition hover:bg-white/[0.11] active:translate-y-[1px]"
              >
                View Products <span className="opacity-80">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl border border-white/12 bg-white/[0.035] px-6 py-3 text-sm font-medium text-white/80 transition hover:bg-white/[0.06] active:translate-y-[1px]"
              >
                Contact Support
              </Link>
            </div>
          </div>

          {/* stats */}
          <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.t} className="text-center">
                <div className="text-4xl font-semibold tracking-tight text-white/85">
                  {s.n}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-white/45">
                  {s.t}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </section>
    </div>
  );
}