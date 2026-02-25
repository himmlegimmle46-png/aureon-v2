import Link from "next/link";
import { Card } from "../../components/ui";

export default function ProductsPage() {
  const ITEMS = [
    {
      href: "/accounts",
      title: "Steam NFA Accounts",
      desc: "Browse available account listings, join the discord for FA accounts",
      meta: "Just Rust NFA accounts for now, more coming soon",
    },
    {
      href: "/products/rust",
      title: "Rust",
      desc: "Rust Cheats",
      meta: "Cheats + Scripts",
    },
    {
      href: "/software/arcraiderscheat",
      title: "Arc Raiders",
      desc: "Arc Raiders Cheats",
      meta: "Cheats",
    },
    {
      href: "/software/spoofers",
      title: "HWID Spoofer",
      desc: "HWID spoofer to evade bans",
      meta: "Spoofers",
    },
  ] as const;

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Products</h1>
        <p className="text-sm text-white/60 pt-1">
          Choose a product to view available listings.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {ITEMS.map((c) => (
          <Link key={c.href} href={c.href} className="block">
            <Card className="p-6 hover:bg-white/5 transition">
              <div className="grid gap-2">
                <div className="text-lg font-semibold">{c.title}</div>
                <div className="text-sm text-white/60">{c.desc}</div>
                <div className="text-xs text-white/45 pt-1">{c.meta}</div>
                <div className="pt-4 text-sm text-white/80 underline underline-offset-4">
                  View listings →
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}