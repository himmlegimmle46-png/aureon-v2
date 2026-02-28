"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="ac-topbar fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold tracking-[0.18em] text-white/80 hover:bg-white/[0.07] transition"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/90 shadow-[0_0_0_7px_rgba(90,255,160,0.10)]" />
          AUREON
        </Link>

        <nav className="rounded-2xl border border-white/10 bg-white/[0.04] p-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]">
          <div className="flex items-center gap-1">
            {LINKS.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={[
                    "rounded-xl px-3 py-2 text-sm transition",
                    active
                      ? "bg-white/[0.10] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.10)]"
                      : "text-white/70 hover:bg-white/[0.06] hover:text-white/90",
                  ].join(" ")}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}