"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function HomePage() {
  const [showSticky, setShowSticky] = useState(false);

  // Particle positions (stable, no random jitter)
  const particles = useMemo(
    () => [
      [12, 20, 0],
      [18, 64, 220],
      [26, 38, 480],
      [32, 78, 120],
      [44, 24, 360],
      [52, 58, 90],
      [62, 30, 520],
      [70, 72, 260],
      [78, 42, 610],
      [84, 18, 140],
      [22, 82, 330],
      [40, 12, 570],
      [60, 86, 190],
      [88, 62, 420],
    ],
    []
  );

  // Mouse-reactive glow (FULL viewport, never clipped)
  useEffect(() => {
    const root = document.documentElement;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      root.style.setProperty("--mx", `${x}%`);
      root.style.setProperty("--my", `${y}%`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Scroll reveal for sections
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

  // Sticky CTA
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .aur-float, .aur-pulse, .aur-title, .aur-reveal, .aur-sheen { animation: none !important; }
          .aur-reveal { transform: none !important; filter: none !important; opacity: 1 !important; }
        }

        /* FULL-VIEWPORT mouse glow (not clipped by max-w container) */
        .aur-heroGlow {
          position: fixed;
          inset: -140px; /* allow blur to extend beyond edges */
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(640px 520px at var(--mx, 55%) var(--my, 45%),
              rgba(140,90,255,0.20),
              transparent 62%),
            radial-gradient(640px 520px at calc(var(--mx, 55%) + 12%) calc(var(--my, 45%) + 12%),
              rgba(80,200,255,0.14),
              transparent 65%);
          filter: blur(26px);
          opacity: 0.9;
        }

        /* Floating particles behind logo (subtle) */
        .aur-particles {
          position: absolute;
          inset: -90px;
          pointer-events: none;
          overflow: hidden;
          border-radius: 9999px;
          opacity: 0.75;
        }
        .aur-particles span {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.45);
          filter: drop-shadow(0 0 10px rgba(140,90,255,0.25));
          opacity: 0.7;
        }
        .aur-float { animation: aurFloat 7.5s ease-in-out infinite; }
        @keyframes aurFloat {
          0% { transform: translateY(10px); opacity: .35; }
          50% { transform: translateY(-12px); opacity: .75; }
          100% { transform: translateY(10px); opacity: .35; }
        }

        /* Gradient title + subtle sheen */
        @keyframes aurShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .aur-titleWrap { position: relative; display: inline-block; isolation: isolate; }
        .aur-title {
          background-image: linear-gradient(90deg,
            rgba(90, 220, 255, 0.95),
            rgba(140, 90, 255, 0.95),
            rgba(255, 130, 240, 0.85)
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: aurShift 6.5s ease-in-out infinite;
          text-shadow: 0 0 22px rgba(140, 90, 255, 0.16);
        }
        .aur-sheen {
          position: absolute;
          inset: -10% -30%;
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: 0;
          background: linear-gradient(90deg,
            transparent,
            rgba(255,255,255,0.26),
            rgba(140,90,255,0.22),
            transparent
          );
          filter: blur(10px);
          animation: aurSheen 3.9s ease-in-out infinite;
        }
        @keyframes aurSheen {
          0%   { transform: translateX(-18%) skewX(-10deg); opacity: 0; }
          22%  { opacity: 0.22; }
          48%  { transform: translateX(18%) skewX(-10deg); opacity: 0; }
          100% { transform: translateX(18%) skewX(-10deg); opacity: 0; }
        }

        /* Live status dots */
        .aur-dot {
          width: 7px;
          height: 7px;
          border-radius: 9999px;
          background: rgba(160,120,255,0.95);
          box-shadow: 0 0 14px rgba(140,90,255,0.35);
        }
        .aur-pulse { animation: aurPulse 1.8s ease-in-out infinite; }
        @keyframes aurPulse {
          0%,100% { transform: scale(1); opacity: .65; }
          50% { transform: scale(1.18); opacity: 1; }
        }
        .aur-delay-250 { animation-delay: 250ms; }
        .aur-delay-450 { animation-delay: 450ms; }

        /* Buttons: hover glow + lift */
        .aur-btn {
          position: relative;
          overflow: hidden;
          transform: translateY(0);
          transition: transform 180ms ease, background-color 180ms ease, border-color 180ms ease;
        }
        .aur-btn::before {
          content: "";
          position: absolute;
          inset: -2px;
          opacity: 0;
          transition: opacity 180ms ease;
          background: radial-gradient(circle at 30% 30%,
            rgba(80,200,255,0.20),
            rgba(140,90,255,0.20),
            transparent 60%
          );
          filter: blur(10px);
          pointer-events: none;
        }
        .aur-btn:hover { transform: translateY(-1px); }
        .aur-btn:hover::before { opacity: 1; }

        /* Scroll reveal */
        .aur-reveal {
          opacity: 0;
          transform: translateY(10px);
          filter: blur(6px);
          transition:
            opacity 650ms cubic-bezier(.2,.8,.2,1),
            transform 650ms cubic-bezier(.2,.8,.2,1),
            filter 650ms cubic-bezier(.2,.8,.2,1);
        }
        .aur-reveal.is-in {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
      `}</style>

      {/* Full viewport glow layer */}
      <div aria-hidden className="aur-heroGlow" />

      {/* Sticky CTA */}
      <div
        className={[
          "fixed right-4 bottom-4 z-70 transition-all duration-300",
          showSticky ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <Link
          href="/accounts"
          className="aur-btn rounded-2xl border border-white/10 bg-black/45 backdrop-blur-xl px-4 py-2 text-sm text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] hover:bg-white/10"
        >
          Browse Accounts →
        </Link>
      </div>

      {/* HERO */}
      <section className="pt-12 sm:pt-16 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="relative">
            <div className="aur-particles">
              {particles.map(([x, y, d], i) => (
                <span
                  key={i}
                  className="aur-float"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    animationDelay: `${d}ms`,
                  }}
                />
              ))}
            </div>

            <div className="absolute -inset-24 rounded-full bg-[radial-gradient(circle,rgba(140,90,255,0.22),transparent_60%)] blur-3xl" />
            <div className="absolute -inset-24 rounded-full bg-[radial-gradient(circle,rgba(80,200,255,0.16),transparent_60%)] blur-3xl" />

            <Image
              src="/ac-logo.png"
              alt="Aureon"
              width={280}
              height={280}
              priority
              className="relative select-none pointer-events-none drop-shadow-[0_0_32px_rgba(140,90,255,0.28)]"
            />
          </div>

          {/* Title */}
          <div className="aur-titleWrap mt-6">
            <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight aur-title">
              Aureon
            </h1>
            <div className="aur-sheen" />
          </div>

          {/* Live status row */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-white/60">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className="aur-dot aur-pulse" /> Secure checkout
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className="aur-dot aur-pulse aur-delay-250" /> Digital delivery
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className="aur-dot aur-pulse aur-delay-450" /> Support ready
            </span>
          </div>

          <p className="mt-4 max-w-xl text-sm sm:text-base text-white/70">
            Browse listings, checkout, then follow the delivery instructions.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/accounts"
              className="aur-btn rounded-xl border border-white/10 bg-white/10 px-6 py-2 text-sm text-white hover:bg-white/15"
            >
              Browse Accounts
            </Link>
            <Link
              href="/contact"
              className="aur-btn rounded-xl border border-white/10 bg-black/20 px-6 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* How it works (scroll reveal) */}
        <div
          data-reveal
          className="aur-reveal mt-10 sm:mt-12 mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6"
        >
          <h2 className="text-base sm:text-lg font-semibold text-white text-center">
            How it works
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { step: "Step 1", title: "Pick a listing", desc: "Choose what you want from Accounts." },
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

        <div className="h-12" />
      </section>
    </div>
  );
}