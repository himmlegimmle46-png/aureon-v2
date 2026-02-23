import Link from "next/link";
import { Card } from "../../components/ui";

export default function SoftwareHubPage() {
  // ✅ EASY EDIT (change text/labels/paths later)
  const CARDS = [
    {
      href: "/software/rustcheat",
      title: "Rust Cheats",
      desc: "Keys, licenses, and access options",
      meta: "Instant delivery • multiple options",
    },
    {
      href: "/software/scripts",
      title: "Rust Recoil Scripts",
      desc: "Rust Scripts",
      meta: "Windows • setup guide included",
    },
    {
      href: "/software/spoofers",
      title: "Spoofers",
      desc: "Spoofing / bypass software",
      meta: "Popular options • instant delivery",
    },
    {
      href: "/software/arcraiderscheat",
      title: "Arc Raiders Cheat",
      desc: "Arc Raiders Cheats",
      meta: "Instant delivery • simple checkout",
    },
  ] as const;

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Software’s</h1>
        <p className="text-sm text-white/60 pt-1">
          Choose a category to view available software listings. Join the discord to see the immediate stock updates and new releases.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((c) => (
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