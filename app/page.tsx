// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl text-center">
      {/* Intro animation styles (scoped via classnames) */}
      <style>{`
        @keyframes acFadeUp {
          from { opacity: 0; transform: translateY(14px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0);  filter: blur(0); }
        }
        @keyframes acLogoIn {
          0%   { opacity: 0; transform: scale(0.92) translateY(10px); filter: blur(10px); }
          60%  { opacity: 1; transform: scale(1.02) translateY(0);    filter: blur(0); }
          100% { opacity: 1; transform: scale(1) translateY(0);       filter: blur(0); }
        }
        @keyframes acGlowPulse {
          0%, 100% { opacity: .35; transform: scale(1); }
          50%      { opacity: .55; transform: scale(1.03); }
        }

        .ac-anim { opacity: 0; }
        .ac-logo-in {
          animation: acLogoIn 900ms cubic-bezier(.2,.8,.2,1) 80ms forwards;
        }
        .ac-title-in {
          animation: acFadeUp 700ms cubic-bezier(.2,.8,.2,1) 280ms forwards;
        }
        .ac-sub-in {
          animation: acFadeUp 700ms cubic-bezier(.2,.8,.2,1) 420ms forwards;
        }
        .ac-btns-in {
          animation: acFadeUp 700ms cubic-bezier(.2,.8,.2,1) 560ms forwards;
        }

        /* ambient glow behind logo */
        .ac-logo-glow {
          position: absolute;
          inset: -28%;
          border-radius: 9999px;
          background: radial-gradient(circle at 40% 40%, rgba(140,90,255,.28), transparent 55%),
                      radial-gradient(circle at 60% 60%, rgba(80,200,255,.20), transparent 55%);
          filter: blur(18px);
          opacity: 0;
          animation: acFadeUp 700ms cubic-bezier(.2,.8,.2,1) 220ms forwards,
                     acGlowPulse 2600ms ease-in-out 1.1s infinite;
          pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .ac-anim, .ac-logo-glow {
            opacity: 1 !important;
            animation: none !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="pt-12 sm:pt-16 flex flex-col items-center">
        {/* AC LOGO (with soft glow pulse) */}
        <div className="relative w-[220px] sm:w-[280px] mb-6">
          <div className="ac-logo-glow" />
          <Image
            src="/ac-logo.png"
            alt="Aureon Logo"
            width={560}
            height={560}
            priority
            className="ac-anim ac-logo-in w-full h-auto select-none pointer-events-none"
          />
        </div>

        {/* TITLE */}
        <h1 className="ac-anim ac-title-in text-4xl sm:text-5xl font-semibold tracking-tight text-white">
          Aureon
        </h1>

        <p className="ac-anim ac-sub-in mt-3 max-w-2xl text-sm sm:text-base text-white/70">
          Browse listings, checkout, then follow the delivery instructions.
        </p>

        {/* BUTTONS */}
        <div className="ac-anim ac-btns-in mt-6 flex flex-wrap justify-center gap-3">
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
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-12 sm:mt-14 rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-white">How it works</h2>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs text-white/50">Step 1</div>
            <div className="mt-1 font-medium text-white">Pick a listing</div>
            <p className="mt-1 text-sm text-white/65">
              Choose what you want from the Accounts page.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs text-white/50">Step 2</div>
            <div className="mt-1 font-medium text-white">Checkout</div>
            <p className="mt-1 text-sm text-white/65">
              Complete payment and you’ll be redirected back.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs text-white/50">Step 3</div>
            <div className="mt-1 font-medium text-white">Delivery</div>
            <p className="mt-1 text-sm text-white/65">
              Follow the instructions shown after checkout.
            </p>
          </div>
        </div>
      </section>

      <div className="h-12" />
    </div>
  );
}