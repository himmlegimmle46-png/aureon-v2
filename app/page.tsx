"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function HomePage() {
  const [showSticky, setShowSticky] = useState(false);

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
        }
        .aur-float {
          animation: aurFloat 7.5s ease-in-out infinite;
        }
        @keyframes aurFloat {
          0% { transform: translateY(10px); opacity: .35; }
          50% { transform: translateY(-12px); opacity: .75; }
          100% { transform: translateY(10px); opacity: .35; }
        }

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

        .aur-btn {
          transition: transform 180ms ease;
        }
        .aur-btn:hover {
          transform: translateY(-1px);
        }

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
      `}</style>

      {/* Sticky CTA */}
      <div
        className={[
          "fixed right-4 bottom-4 z-70 transition-all duration-300",
          showSticky ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <Link
          href="/accounts"
          className="aur-btn rounded-2xl border border-white/10 bg-black/45 backdrop-blur-xl px-4 py-2 text-sm text-white"
        >
          Browse Accounts →
        </Link>
      </div>

      <section className="pt-12 sm:pt-16 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="aur-particles">
              {particles.map(([x, y, d], i) => (
                <span
                  key={i}
                  className="aur-float"
                  style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}ms` }}
                />
              ))}
            </div>

            <Image
              src="/ac-logo.png"
              alt="Aureon"
              width={280}
              height={280}
              priority
              className="relative select-none pointer-events-none drop-shadow-[0_0_32px_rgba(140,90,255,0.28)]"
            />
          </div>

          <h1 className="mt-6 text-5xl sm:text-6xl font-semibold tracking-tight aur-title">
            Aureon
          </h1>

          <p className="mt-4 max-w-xl text-sm sm:text-base text-white/70">
            Browse listings, checkout, then follow the delivery instructions.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/accounts" className="aur-btn rounded-xl border border-white/10 bg-white/10 px-6 py-2 text-sm text-white">
              Browse Accounts
            </Link>
            <Link href="/contact" className="aur-btn rounded-xl border border-white/10 bg-black/20 px-6 py-2 text-sm text-white/90">
              Contact
            </Link>
          </div>
        </div>

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