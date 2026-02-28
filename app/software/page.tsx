import Link from "next/link";
import { Card } from "../../components/ui";

type HubCard = {
  href: string;
  title: string;
  desc: string;
  meta: string;
};

const CARDS: HubCard[] = [
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
    href: "/accounts/rust",
    title: "Rust Accounts",
    desc: "Rust NFA Accounts.",
    meta: "View listings →",
  },
  {
    href: "/software/spoofers",
    title: "HWID Spoofer",
    desc: "HWID spoofer.",
    meta: "View listings →",
  },
];

export default function SoftwareHubPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Software</h1>
        <p className="pt-1 text-sm text-white/60">
          Choose a software category to view available listings.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((c) => (
          <Card
            key={c.href}
            className={[
              "relative overflow-hidden p-0",
              "transition will-change-transform",
              "hover:bg-white/[0.05]",
              "hover:-translate-y-[2px]",
            ].join(" ")}
          >
            {/* Make the LINK the top-level clickable surface */}
            <Link
              href={c.href}
              className={[
                "block p-6",
                "relative z-10",
                "cursor-pointer",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-0",
              ].join(" ")}
            >
              <div className="grid gap-2">
                <div className="text-lg font-semibold text-white/90">{c.title}</div>
                <div className="text-sm text-white/60">{c.desc}</div>

                <div className="pt-4 text-sm text-white/80 underline underline-offset-4">
                  {c.meta}
                </div>
              </div>
            </Link>

            {/* subtle highlight that never blocks clicks */}
            <div
              aria-hidden="true"
              className={[
                "pointer-events-none absolute inset-0 opacity-0",
                "transition-opacity duration-200",
                "group-hover:opacity-100",
                "bg-[radial-gradient(900px_240px_at_20%_0%,rgba(255,255,255,0.08),transparent_55%)]",
              ].join(" ")}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}