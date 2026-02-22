// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* HERO */}
      <section className="pt-8 sm:pt-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          <span>Fast checkout</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span>Digital delivery</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span>Support ready</span>
        </div>

        <div className="mt-5">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
            Aureon V2
          </h1>

          <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/70">
            Browse listings, checkout, then follow the delivery instructions. Simple and clean.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/accounts"
              className="rounded-xl border border-white/10 bg-white/10 px-5 py-2 text-sm text-white hover:bg-white/15 transition"
            >
              Browse Accounts
            </Link>

            <Link
              href="/contact"
              className="rounded-xl border border-white/10 bg-black/20 px-5 py-2 text-sm text-white/90 hover:bg-white/10 transition"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-10 sm:mt-12 rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
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

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="font-medium text-white">Support</div>
            <p className="mt-1 text-sm text-white/65">
              If something fails (redirect / error), refresh and try again. If it persists, use Contact.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="font-medium text-white">Terms</div>
            <p className="mt-1 text-sm text-white/65">
              Using the site means you agree to the Terms of Service.
            </p>
            <Link
              className="mt-2 inline-block text-sm text-white/80 underline underline-offset-4"
              href="/terms"
            >
              View Terms
            </Link>
          </div>
        </div>
      </section>

      <div className="h-10 sm:h-14" />
    </div>
  );
}