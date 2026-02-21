import Link from "next/link";
import { Card } from "../../components/ui";

function InfoBox({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="font-medium text-white/90">{title}</div>
      <div className="pt-2 text-sm text-white/70 leading-relaxed">{text}</div>
    </div>
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
        <Link href="/accounts/rust" className="block">
          <Card className="p-6 hover:bg-white/5 transition">
            <div className="grid gap-2">
              <div className="text-lg font-semibold">Rust Accounts</div>
              <div className="text-sm text-white/60">Temporary / hours-based listings</div>
              <div className="text-xs text-white/45 pt-1">Steam • multiple options</div>
              <div className="pt-4 text-sm text-white/80 underline underline-offset-4">
                View listings →
              </div>
            </div>
          </Card>
        </Link>

        <Card className="p-6">
          <div className="text-lg font-semibold">How buying works</div>
          <ol className="mt-3 space-y-2 text-sm text-white/70 list-decimal pl-5">
            <li>Open the category</li>
            <li>Select an option</li>
            <li>Purchase and follow delivery steps after checkout</li>
          </ol>
        </Card>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <InfoBox
          title="Delivery"
          text="Delivery instructions are shown after checkout. If you use Discord tickets, the Contact page should include your invite link."
        />
        <InfoBox
          title="Support"
          text="If a listing is out of stock or you hit an error, use the Contact tab and include what you tried and what happened."
        />
      </div>
    </div>
  );
}