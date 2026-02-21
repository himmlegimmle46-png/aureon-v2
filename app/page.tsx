import { Card, Button } from "../components/ui";

export default function HomePage() {
  return (
    <div className="grid gap-10">
      <div className="grid gap-3">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Aureon <span className="text-white/60">V2</span>
        </h1>

        <p className="text-white/70 max-w-2xl">
          Simple checkout. Clean UI. Instant redirects to Stripe Checkout.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button href="/accounts">Browse Accounts</Button>
          <Button href="/terms" variant="ghost">
            Terms of Service
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="text-xs text-white/60">Secure Payments</div>
          <div className="pt-2 text-white/90 text-sm">
            Checkout is hosted by Stripe.
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-xs text-white/60">Fast Deploy</div>
          <div className="pt-2 text-white/90 text-sm">
            Vercel builds and deploys automatically from GitHub.
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-xs text-white/60">Support</div>
          <div className="pt-2 text-white/90 text-sm">
            Purchase → follow delivery instructions after checkout.
          </div>
        </Card>
      </div>
    </div>
  );
}