import Link from "next/link";
import { Card } from "../../../components/ui";

export default function RustProductsPage() {
  const ITEMS = [
    {
      href: "/software/rustcheat",
      title: "Rust Cheat",
      desc: "Rust product listings (preset).",
      meta: "View listings →",
    },
    {
      href: "/software/scripts",
      title: "Rust Scripts",
      desc: "Recoil scripts / patterns (preset).",
      meta: "View listings →",
    },
  ] as const;

  return (
    <div className="grid gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Rust</h1>
          <p className="text-sm text-white/60 pt-1">Choose a Rust category to view listings.</p>
        </div>

        <Link
          href="/products"
          className="text-sm text-white/70 hover:text-white underline underline-offset-4"
        >
          Back
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {ITEMS.map((c) => (
          <Link key={c.href} href={c.href} className="block">
            <Card className="p-6 hover:bg-white/5 transition">
              <div className="grid gap-2">
                <div className="text-lg font-semibold">{c.title}</div>
                <div className="text-sm text-white/60">{c.desc}</div>
                <div className="pt-4 text-sm text-white/80 underline underline-offset-4">
                  {c.meta}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}