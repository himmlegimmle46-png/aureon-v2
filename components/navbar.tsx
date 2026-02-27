"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms" },
];

function isProductsActive(pathname: string) {
  return (
    pathname === "/products" ||
    pathname.startsWith("/products/") ||
    pathname === "/accounts" ||
    pathname.startsWith("/accounts/") ||
    pathname === "/software" ||
    pathname.startsWith("/software/")
  );
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-4">
        <Link
          href="/"
          className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm font-semibold tracking-wide text-white backdrop-blur"
        >
          AUREON
        </Link>

        <nav className="rounded-2xl border border-white/10 bg-black/40 p-1.5 backdrop-blur-md">
          <ul className="flex items-center gap-1 text-sm">
            {LINKS.map((l) => {
              const active = l.href === "/products" ? isProductsActive(pathname) : pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={[
                      "block rounded-xl px-3 py-2 transition",
                      active
                        ? "bg-white/15 text-white"
                        : "text-white/75 hover:bg-white/10 hover:text-white",
                    ].join(" ")}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}