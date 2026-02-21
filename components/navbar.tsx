"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/accounts", label: "Accounts" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms of Service" },
];

function cn(...s: Array<string | false | undefined>) {
  return s.filter(Boolean).join(" ");
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* top haze */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/85 via-black/35 to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-4">
        <div className="rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_18px_60px_rgba(0,0,0,0.55)]">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            {/* Brand */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative h-9 w-9 rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <div className="absolute inset-0 ac-logo-orb" />
                <div className="relative grid h-full w-full place-items-center font-semibold text-sm">
                  <span className="text-white/90">A</span>
                </div>
              </div>

              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight">
                  <span className="ac-text-accent">Aureon</span>{" "}
                  <span className="text-white/55">V2</span>
                </div>
                <div className="text-[11px] text-white/45">
                  Listings • Checkout • Delivery
                </div>
              </div>
            </Link>

            {/* Nav */}
            <nav className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
              {links.map((l) => {
                const active =
                  pathname === l.href ||
                  (l.href !== "/" && pathname.startsWith(l.href));

                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "relative rounded-lg px-3 py-2 text-sm transition",
                      "text-white/70 hover:text-white",
                      active && "text-white"
                    )}
                  >
                    {/* active glow */}
                    {active && (
                      <span className="absolute inset-0 -z-10 rounded-lg ac-nav-active" />
                    )}
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}