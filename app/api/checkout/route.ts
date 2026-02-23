import Stripe from "stripe";

export const runtime = "nodejs";

type CheckoutBody = { priceId?: string };

// This is exactly what Stripe shows in their guide
const MANAGED_PAYMENTS_STRIPE_VERSION =
  "2025-03-31.basil; managed_payments_preview=v1";

// Extend the session params to include the preview field (types may not know it yet)
type ManagedPaymentsParams = Stripe.Checkout.SessionCreateParams & {
  managed_payments: { enabled: boolean };
};

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");

  // IMPORTANT:
  // Put the preview flag in apiVersion so Stripe sends the right Stripe-Version header.
  // We cast through unknown because Stripe's TS types won't include preview variants.
  return new Stripe(key, {
    apiVersion: MANAGED_PAYMENTS_STRIPE_VERSION as unknown as Stripe.LatestApiVersion,
  });
}

function getOrigin(req: Request) {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    const clean = fromEnv.replace(/\/+$/, "");
    if (!/^https?:\/\//i.test(clean)) {
      throw new Error('NEXT_PUBLIC_SITE_URL must start with "https://"');
    }
    return clean;
  }

  const proto = req.headers.get("x-forwarded-proto") || "https";
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (!host) throw new Error("Cannot determine request host for redirect URLs");
  return `${proto}://${host}`;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CheckoutBody;

    const origin = getOrigin(req);

    const priceId = body.priceId?.trim();
    if (!priceId) {
      return Response.json({ error: "Missing priceId" }, { status: 400 });
    }
    if (!priceId.startsWith("price_")) {
      return Response.json({ error: "Invalid priceId" }, { status: 400 });
    }

    const stripe = getStripe();

    const sessionParams: ManagedPaymentsParams = {
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/checkout/success`,
      cancel_url: `${origin}/checkout/cancel`,

      // ✅ Managed Payments (what the Stripe setup page wants)
      managed_payments: { enabled: true },

      // automatic_tax: { enabled: true }, // optional later
    };

    // No second argument here (this fixes your runtime error)
    const session = await stripe.checkout.sessions.create(
      sessionParams as unknown as Stripe.Checkout.SessionCreateParams
    );

    return Response.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Stripe error";
    return Response.json({ error: message }, { status: 500 });
  }
}