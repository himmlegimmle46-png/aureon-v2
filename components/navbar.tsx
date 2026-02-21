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
      {/* solid bar background */}
      <div className="absolute inset-0 ac-topbar" />

      <div className="relative mx-auto w-full max-w-6xl px-4">
        <div className="h-14 flex items-center justify-between gap-4">
          {/* Left brand (no logo) */}
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="text-sm font-semibold tracking-tight">
              <span className="ac-text-accent">Aureon</span>{" "}
              <span className="text-white/55">V2</span>
            </span>
            <span className="hidden sm:inline text-[11px] text-white/40">
              listings • checkout • delivery
            </span>
          </Link>

          {/* Right nav */}
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
    </header>
  );
}