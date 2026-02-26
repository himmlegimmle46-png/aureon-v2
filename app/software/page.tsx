import Link from "next/link";
import { Card } from "../../components/ui";

export default function SoftwareHubPage() {
  const CARDS = [
    {
      href: "/software/rustcheat",
      title: "Rust",
      desc: "Rust Cheats.",
      meta: "View listings →",
    },
    {
      href: "/software/arcraiderscheat",
      title: "Arc Raiders",
      desc: "Arc Raiders Cheat.",
      meta: "View listings →",
    },
    {
      href: "/software/spoofers",
      title: "HWID Spoofer",
      desc: "HWID spoofer.",
      meta: "View listings →",
    },
  ] as const;

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Software</h1>
        <p className="text-sm text-white/60 pt-1">
          Choose a software category to view available listings.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((c) => (
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