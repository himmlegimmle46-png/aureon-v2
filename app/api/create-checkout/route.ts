import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

type CheckoutBody = {
  priceId?: string;
};

function getOrigin(req: Request) {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const clean = (fromEnv || new URL(req.url).origin).replace(/\/+$/, "");
  if (!/^https?:\/\//i.test(clean)) {
    throw new Error('NEXT_PUBLIC_SITE_URL must start with "http://" or "https://"');
  }
  return clean;
}

function requestHost(req: Request) {
  return req.headers.get("x-forwarded-host") || req.headers.get("host") || "unknown";
}

export async function POST(req: Request) {
  const ts = new Date().toISOString();
  const host = requestHost(req);

  try {
    const body = (await req.json()) as CheckoutBody;
    const origin = getOrigin(req);

    const priceId = body.priceId?.trim();
    if (!priceId) return Response.json({ error: "Missing priceId" }, { status: 400 });
    if (!priceId.startsWith("price_")) {
      return Response.json({ error: "Invalid priceId" }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_creation: "always",
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    return Response.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout error";

    console.error("[create-checkout][server_error]", {
      ts,
      host,
      message,
    });

    return Response.json({ error: message }, { status: 500 });
  }
}