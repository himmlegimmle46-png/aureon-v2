// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <section className="pt-12 sm:pt-16">
        <div className="flex flex-col items-center text-center">
          {/* logo */}
          <div className="relative">
            <div className="absolute -inset-16 rounded-full bg-[radial-gradient(circle,rgba(140,90,255,0.20),transparent_60%)] blur-2xl" />
            <Image
              src="/ac-logo.png"
              alt="Aureon"
              width={170}
              height={170}
              priority
              className="relative select-none pointer-events-none"
            />
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl font-semibold tracking-tight text-white">
            Aureon
          </h1>

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
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Fast checkout</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Digital delivery</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Support ready</span>
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