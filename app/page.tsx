import { Card, Button } from "../components/ui";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
      {children}
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="grid gap-10">
      {/* Hero */}
      <div className="grid gap-4">
        <div className="flex flex-wrap gap-2">
          <Pill>Instant checkout</Pill>
          <Pill>Digital delivery</Pill>
          <Pill>Support via Discord</Pill>
        </div>

        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
          Aureon <span className="text-white/60">V2</span>
        </h1>

        <p className="text-white/70 max-w-2xl leading-relaxed">
          We sell verified Bee Swarm accounts. Purchase through secure checkout, then follow
          delivery steps to receive your account details.
        </p>

        <div className="flex flex-wrap gap-3 pt-1">
          <Button href="/accounts">Browse Accounts</Button>
          <Button href="/terms" variant="ghost">Terms of Service</Button>
        </div>
      </div>

      {/* How it works */}
      <Card className="p-6">
        <div className="grid gap-4">
          <h2 className="text-lg font-semibold">How delivery works</h2>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-white/60">Step 1</div>
              <div className="pt-1 font-medium">Purchase</div>
              <div className="pt-2 text-sm text-white/70">
                Choose an account and complete checkout.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-white/60">Step 2</div>
              <div className="pt-1 font-medium">Open a ticket</div>
              <div className="pt-2 text-sm text-white/70">
                After payment, join the Discord and open a delivery ticket.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-white/60">Step 3</div>
              <div className="pt-1 font-medium">Delivery</div>
              <div className="pt-2 text-sm text-white/70">
                You receive the account details + instructions for secure login.
              </div>
            </div>
          </div>

          <div className="text-xs text-white/50">
            Tip: Add your Discord invite link to the Accounts page + Success page for faster delivery.
          </div>
        </div>
      </Card>

      {/* What you get + rules */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">What you get</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70 list-disc pl-5">
            <li>Account details delivered after purchase verification</li>
            <li>Clear steps to secure the account after delivery</li>
            <li>Support if you run into login issues</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">Rules</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70 list-disc pl-5">
            <li>No chargebacks — contact support first</li>
            <li>Digital sales are typically final once delivery starts</li>
            <li>Purchasing means you agree to the Terms of Service</li>
          </ul>
        </Card>
      </div>

      {/* CTA */}
      <Card className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-white/80 font-medium">Ready to browse accounts?</div>
          <div className="text-sm text-white/60 pt-1">
            View listings and purchase in a few clicks.
          </div>
        </div>
        <Button href="/accounts">Go to Accounts</Button>
      </Card>
    </div>
  );
}