import { Card } from "../../components/ui";

function Row({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="text-white/60 text-sm">{label}</div>
      <div className="text-sm text-white">{value}</div>
    </div>
  );

  if (!href) return content;

  return (
    <a
      href={href}
      target="_blank"
      className="block hover:bg-white/5 rounded-xl px-3 -mx-3 transition"
    >
      {content}
    </a>
  );
}

export default function ContactPage() {
  return (
    <div className="grid gap-5">
      <div>
        <h1 className="text-2xl font-semibold">Contact</h1>
        <p className="text-sm text-white/60 pt-1">
          Questions about orders, delivery, or support.
        </p>
      </div>

      <Card className="p-6 grid gap-2">
        {/* ✏️ EDIT THESE VALUES */}
        <Row label="Email" value="your@email.com" href="mailto:your@email.com" />

        <Row
          label="Discord Server"
          value="Join Server"
          href="https://discord.gg/YOURINVITE"
        />

        <Row label="Discord Username" value="@yourusername" />

        <div className="pt-4 text-xs text-white/50">
          Fastest support is usually through Discord tickets after purchase.
        </div>
      </Card>
    </div>
  );
}