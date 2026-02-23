import Link from "next/link";
import { Card } from "../../components/ui";

export default function SoftwareHubPage() {
  // ✅ EASY EDIT (change text/labels/paths later if you want)
  const CARDS = [
    {
      href: "/software/tool-keys",
      title: "Tool Keys",
      desc: "Keys, licenses, and access options",
      meta: "Instant delivery • multiple options",
    },
    {
      href: "/software/macros",
      title: "Macros / Utilities",
      desc: "Automation tools and extras",
      meta: "Windows • setup guide included",
    },
  ] as const;

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Software’s</h1>
        <p className="text-sm text-white/60 pt-1">
          Choose a category to view available software listings.
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