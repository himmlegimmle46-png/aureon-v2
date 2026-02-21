import { Card, Button } from "../components/ui";

export default function HomePage() {
  return (
    <div className="grid gap-8">
      <div className="grid gap-3">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Aureon <span className="text-white/60">V2</span>
        </h1>
        <p className="text-white/70 max-w-2xl">
          Clean storefront with smooth animations + Stripe Checkout.
        </p>
        <div className="flex gap-3 pt-2">
          <Button href="/accounts">Browse Accounts</Button>
          <Button href="/terms" variant="ghost">
            Terms
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="text-sm text-white/60">Fast</div>
          <div className="pt-2 text-white/90">
            Next.js + Vercel deploy in minutes.
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-sm text-white/60">Clean UI</div>
          <div className="pt-2 text-white/90">
            Modern dark theme + soft glow background.
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-sm text-white/60">Payments</div>
          <div className="pt-2 text-white/90">
            Stripe-hosted checkout (safe + easy).
          </div>
        </Card>
      </div>
    </div>
  );
}