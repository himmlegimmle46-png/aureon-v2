import Stripe from "stripe";

export const runtime = "nodejs";

type CheckoutBody = { priceId?: string };

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");

  // Normal Stripe client (no Managed Payments preview)
  return new Stripe(key, {
    apiVersion: "2026-01-28.clover",
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

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/checkout/success`,
      cancel_url: `${origin}/checkout/cancel`,

      // If you want Stripe to collect customer email automatically:
      // customer_email: body.email,

      // Taxes (leave off unless you actually want Stripe Tax):
      // automatic_tax: { enabled: true },
    });

    return Response.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Stripe error";
    return Response.json({ error: message }, { status: 500 });
  }
}