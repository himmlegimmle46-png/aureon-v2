import Link from "next/link";
import { Card } from "../../components/ui";

function CategoryCard({
  href,
  title,
  subtitle,
  meta,
}: {
  href: string;
  title: string;
  subtitle: string;
  meta: string;
}) {
  return (
    <Link href={href} className="block">
      <Card className="p-6 hover:bg-white/5 transition">
        <div className="grid gap-2">
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-sm text-white/60">{subtitle}</div>
          <div className="text-xs text-white/45 pt-1">{meta}</div>
          <div className="pt-4 text-sm text-white/80 underline underline-offset-4">
            View listings →
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default function AccountsHubPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Accounts</h1>
        <p className="text-sm text-white/60 pt-1">
          Choose a category to view available listings.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <CategoryCard
          href="/accounts/rust"
          title="Rust Accounts"
          subtitle="Temporary / hours-based listings"
          meta="Steam • multiple options"
        /> 
      </div>
    </div>
  );
}