import { Card, Button } from "../components/ui";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
      {children}
    </span>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="font-medium text-white/90">{q}</div>
      <div className="pt-2 text-sm text-white/70 leading-relaxed">{a}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="grid gap-10">
      {/* Hero */}
      <div className="grid gap-4">
        <div className="flex flex-wrap gap-2">
          <Pill>Fast checkout</Pill>
          <Pill>Digital delivery</Pill>
          <Pill>Support ready</Pill>
        </div>

        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
          Aureon <span className="text-white/60">V2</span>
        </h1>

        <p className="text-white/70 max-w-2xl leading-relaxed">
          Clean storefront for account listings with a simple purchase flow.
          Browse listings, pay, then follow the delivery instructions.
        </p>

        <div className="flex flex-wrap gap-3 pt-1">
          <Button href="/accounts">Browse Accounts</Button>
          <Button href="/contact" variant="ghost">Contact</Button>
        </div>
      </div>

      {/* How it works */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold">How it works</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/60">Step 1</div>
            <div className="pt-1 font-medium">Pick a listing</div>
            <div className="pt-2 text-sm text-white/70">Choose what you want from the category page.</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/60">Step 2</div>
            <div className="pt-1 font-medium">Checkout</div>
            <div className="pt-2 text-sm text-white/70">Complete payment and you’ll be redirected back.</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/60">Step 3</div>
            <div className="pt-1 font-medium">Delivery</div>
            <div className="pt-2 text-sm text-white/70">Follow the delivery instructions shown after checkout.</div>
          </div>
        </div>
      </Card>

      {/* Why us / rules */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">What you can expect</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70 list-disc pl-5">
            <li>Clear, organized listings</li>
            <li>Fast redirect to checkout</li>
            <li>Support if something goes wrong</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">Important</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70 list-disc pl-5">
            <li>Contact support before opening disputes</li>
            <li>Digital delivery means sales may be final once delivery starts</li>
            <li>Using the site means you agree to the Terms</li>
          </ul>
        </Card>
      </div>

      {/* FAQ */}
      <div className="grid gap-4">
        <div>
          <h2 className="text-lg font-semibold">FAQ</h2>
          <p className="text-sm text-white/60 pt-1">Quick answers before you buy.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <FAQItem
            q="How do I receive delivery?"
            a="After checkout, follow the delivery instructions. If your store uses Discord tickets, open a ticket and provide the required info."
          />
          <FAQItem
            q="What if something fails?"
            a="If checkout doesn’t redirect or you hit an error, refresh and try again. If it persists, use the Contact page."
          />
          <FAQItem
            q="Can listings be out of stock?"
            a="Yes. Out-of-stock options are disabled and show 'Sold out'."
          />
          <FAQItem
            q="Where are the rules?"
            a="Everything important is listed on the Terms of Service page."
          />
        </div>
      </div>

      {/* CTA */}
      <Card className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-white/90 font-medium">Ready to view listings?</div>
          <div className="text-sm text-white/60 pt-1">
            Go to Accounts and pick a category.
          </div>
        </div>
        <Button href="/accounts">Go to Accounts</Button>
      </Card>
    </div>
  );
}