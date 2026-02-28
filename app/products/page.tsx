// app/products/page.tsx
import Link from "next/link";

type ProductCard = {
  title: string;
  desc: string;
  bullets?: string[];
  href: string;
};

const CARDS: ProductCard[] = [
  {
    title: "Steam NFA Accounts",
    desc: "Browse available account listings. Join the Discord for FA accounts.",
    bullets: ["Just Rust NFA accounts for now", "More coming soon"],
    href: "/accounts/rust",
  },
  {
    title: "Rust",
    desc: "Rust cheats + scripts.",
    bullets: ["Cheats + Scripts"],
    href: "/products/rust",
  },
  {
    title: "Arc Raiders",
    desc: "Arc Raiders cheats.",
    bullets: ["Cheats"],
    href: "/software/arcraiderscheat",
  },
  {
    title: "HWID Spoofer",
    desc: "Spoofer tools.",
    bullets: ["Spoofers"],
    href: "/software/spoofers",
  },
];

export default function ProductsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10">
      <div className="mb-7">
        <h1 className="text-2xl font-semibold text-white/95">Products</h1>
        <p className="mt-1 text-sm text-white/60">
          Choose a product to view available listings.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className={[
              // card shell (FORCED)
              "group relative block overflow-hidden rounded-2xl",
              "border border-white/10 bg-white/[0.035]",
              "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),0_18px_70px_rgba(0,0,0,0.55)]",
              // hover
              "transition-transform duration-200 ease-out",
              "hover:-translate-y-[2px] hover:border-white/15 hover:bg-white/[0.05]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/30",
            ].join(" ")}
          >
            {/* soft highlight */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div className="absolute -top-24 left-1/2 h-48 w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(90,240,255,0.12),transparent_65%)] blur-2xl" />
              <div className="absolute -bottom-24 left-1/3 h-48 w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(170,120,255,0.10),transparent_65%)] blur-2xl" />
            </div>

            <div className="relative p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-base font-semibold text-white/90">
                    {c.title}
                  </div>

                  <div className="mt-2 text-sm leading-relaxed text-white/60">
                    {c.desc}
                  </div>

                  {c.bullets?.length ? (
                    <div className="mt-4 grid gap-1 text-xs text-white/45">
                      {c.bullets.map((b) => (
                        <div key={b}>{b}</div>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="shrink-0 text-sm font-medium text-white/55 transition-colors group-hover:text-white/80">
                  View listings{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-[2px]">
                    →
                  </span>
                </div>
              </div>

              <div className="mt-5 h-px bg-white/10" />
              <div className="mt-3 text-[11px] tracking-[0.18em] text-white/45">
                AUREON / READY
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}