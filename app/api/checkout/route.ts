import Stripe from "stripe";

export const runtime = "nodejs";

type CheckoutBody = { priceId?: string };

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
  return new Stripe(key);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CheckoutBody;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl) {
      return Response.json({ error: "Missing NEXT_PUBLIC_SITE_URL" }, { status: 500 });
    }
    if (!body.priceId) {
      return Response.json({ error: "Missing priceId" }, { status: 400 });
    }

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: body.priceId, quantity: 1 }],
      success_url: `${siteUrl}/checkout/success`,
      cancel_url: `${siteUrl}/checkout/cancel`,
    });

    return Response.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Stripe error";
    return Response.json({ error: message }, { status: 500 });
  }
}