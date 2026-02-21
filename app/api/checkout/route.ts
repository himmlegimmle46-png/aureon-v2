import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

type CheckoutBody = { priceId?: string };

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CheckoutBody;

    if (!process.env.STRIPE_SECRET_KEY) {
      return Response.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
    }
    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      return Response.json({ error: "Missing NEXT_PUBLIC_SITE_URL" }, { status: 500 });
    }
    if (!body.priceId) {
      return Response.json({ error: "Missing priceId" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: body.priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
    });

    return Response.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Stripe error";
    return Response.json({ error: message }, { status: 500 });
  }
}