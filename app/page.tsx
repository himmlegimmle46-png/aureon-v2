"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function HomePage() {
  // Scroll reveal
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("is-in");
        }
      },
      { threshold: 0.12 }
    );

    els.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <style>{`
        @keyframes aurShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .aur-title {
          background-image: linear-gradient(
            90deg,
            rgba(90,220,255,0.95),
            rgba(140,90,255,0.95),
            rgba(255,130,240,0.85)
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: aurShift 6.5s ease-in-out infinite;
          text-shadow: 0 0 18px rgba(140,90,255,0.14);
        }

        .aur-btn { transition: transform 180ms ease, filter 180ms ease; }
        .aur-btn:hover { transform: translateY(-1px); filter: brightness(1.06); }

        .aur-reveal {
          opacity: 0;
          transform: translateY(10px);
          filter: blur(6px);
          transition: 650ms ease;
        }
        .aur-reveal.is-in {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        .ac-divider {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.10),
            rgba(140,90,255,0.18),
            rgba(90,220,255,0.14),
            rgba(255,255,255,0.10),
            transparent
          );
        }
      `}</style>

      <section className="pt-10 sm:pt-14 relative z-10">
        {/* HERO PANEL */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl px-6 sm:px-10 py-12 sm:py-14">
          {/* Spotlight glows */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(140,90,255,0.18),transparent_65%)] blur-3xl" />
          <div className="pointer-events-none absolute -top-28 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(90,220,255,0.12),transparent_68%)] blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_0%,rgba(255,255,255,0.06),transparent_55%)]" />

          <div className="relative flex flex-col items-center text-center">
            <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight aur-title">Aureon</h1>

            <p className="mt-4 max-w-xl text-sm sm:text-base text-white/70">
              Browse listings, checkout, then follow the delivery instructions.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/products"
                className="aur-btn rounded-xl border border-white/10 bg-white/10 px-6 py-2 text-sm text-white"
              >
                Browse Products
              </Link>

              <Link
                href="/contact"
                className="aur-btn rounded-xl border border-white/10 bg-black/20 px-6 py-2 text-sm text-white/90"
              >
                Contact
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 text-xs text-white/55">
              {["Instant delivery flow", "Secure checkout", "Clear instructions"].map((t) => (
                <div key={t} className="rounded-full border border-white/10 bg-black/20 px-4 py-2">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 sm:my-14 ac-divider" />

        {/* HOW IT WORKS */}
        <div
          data-reveal
          className="aur-reveal mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-7"
        >
          <h2 className="text-base sm:text-lg font-semibold text-white text-center">
            How it works
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { step: "Step 1", title: "Pick a product", desc: "Choose what you want from Products." },
              { step: "Step 2", title: "Checkout", desc: "Complete payment and you’ll be redirected back." },
              { step: "Step 3", title: "Delivery", desc: "Follow the instructions shown after checkout." },
            ].map((x) => (
              <div key={x.title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-white/50">{x.step}</div>
                <div className="mt-1 font-medium text-white">{x.title}</div>
                <p className="mt-1 text-sm text-white/65">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-14" />
      </section>
    </div>
  );
}