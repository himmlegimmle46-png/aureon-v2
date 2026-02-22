// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <style>{`
        @keyframes aurShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes aurSheen {
          0%   { transform: translateX(-18%) skewX(-10deg); opacity: 0.0; }
          25%  { opacity: 0.25; }
          50%  { transform: translateX(18%) skewX(-10deg); opacity: 0.0; }
          100% { transform: translateX(18%) skewX(-10deg); opacity: 0.0; }
        }

        /* Option 1: readable animated gradient text */
        .aur-gradient {
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

        /* Option 2: subtle background-reactive blend layer (kept gentle) */
        .aur-titleWrap {
          position: relative;
          display: inline-block;
          isolation: isolate; /* keep blend contained */
        }

        .aur-blend {
          position: absolute;
          inset: 0;
          pointer-events: none;
          mix-blend-mode: screen; /* reacts with background */
          opacity: 0.28;
          filter: blur(0.2px);
          -webkit-text-fill-color: transparent;
          color: transparent;
          background: radial-gradient(circle at 30% 40%,
            rgba(80,200,255,0.55),
            rgba(140,90,255,0.35),
            rgba(255,130,240,0.25)
          );
          -webkit-background-clip: text;
          background-clip: text;
        }

        /* moving sheen that “catches” the background */
        .aur-sheen {
          position: absolute;
          inset: -10% -30%;
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: 0;
          background: linear-gradient(90deg,
            transparent,
            rgba(255,255,255,0.28),
            rgba(140,90,255,0.22),
            transparent
          );
          filter: blur(10px);
          animation: aurSheen 3.8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .aur-gradient { animation: none !important; }
          .aur-sheen { animation: none !important; opacity: 0 !important; }
        }
      `}</style>

      <section className="pt-12 sm:pt-16">
        <div className="flex flex-col items-center text-center">
          {/* Bigger logo + nicer glow */}
          <div className="relative">
            <div className="absolute -inset-20 rounded-full bg-[radial-gradient(circle,rgba(140,90,255,0.22),transparent_60%)] blur-3xl" />
            <div className="absolute -inset-20 rounded-full bg-[radial-gradient(circle,rgba(80,200,255,0.16),transparent_60%)] blur-3xl" />

            <Image
              src="/ac-logo.png"
              alt="Aureon"
              width={240}
              height={240}
              priority
              className="relative select-none pointer-events-none drop-shadow-[0_0_28px_rgba(140,90,255,0.25)]"
            />
          </div>

          {/* Title: Option 1 + Option 2 combined */}
          <div className="aur-titleWrap mt-6">
            {/* Base readable gradient (Option 1) */}
            <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight aur-gradient">
              Aureon
            </h1>

            {/* Blend overlay (Option 2) */}
            <div className="aur-blend text-5xl sm:text-6xl font-semibold tracking-tight">
              Aureon
            </div>

            {/* Sheen pass (Option 2) */}
            <div className="aur-sheen" />
          </div>

          <p className="mt-3 max-w-xl text-sm sm:text-base text-white/70">
            Browse listings, checkout, then follow the delivery instructions.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/accounts"
              className="rounded-xl border border-white/10 bg-white/10 px-6 py-2 text-sm text-white hover:bg-white/15 transition"
            >
              Browse Accounts
            </Link>

            <Link
              href="/contact"
              className="rounded-xl border border-white/10 bg-black/20 px-6 py-2 text-sm text-white/90 hover:bg-white/10 transition"
            >
              Contact
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-white/60">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Fast checkout
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Digital delivery
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Support ready
            </span>
          </div>
        </div>

        {/* compact how-it-works */}
        <div className="mt-10 sm:mt-12 mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
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