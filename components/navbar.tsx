"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms of Service" },
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
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div className="pointer-events-auto mx-auto flex max-w-6xl justify-end px-4 pt-4 overflow-visible">
        <nav className="overflow-visible rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl px-2 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.45)] filter drop-shadow-[0_0_18px_rgba(140,90,255,0.25)]">
          <ul className="flex items-center gap-1 text-sm text-white/80">
            {LINKS.map((l) => {
              const active = l.href === "/products" ? isProductsActive(pathname) : pathname === l.href;

              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={[
                      "rounded-xl px-3 py-2 transition",
                      "hover:bg-white/10",
                      active ? "bg-white/10 text-white" : "text-white/80",
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