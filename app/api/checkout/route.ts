import Stripe from "stripe";

type CheckoutBody = {
  priceId?: string;
  // Optional: only required if you wired Turnstile on the client already
  captchaToken?: string;
};

function mustGetEnv(name: string) {
  const v = process.env[name]?.trim();
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

function getOrigin() {
  const fromEnv = mustGetEnv("NEXT_PUBLIC_SITE_URL");
  const clean = fromEnv.replace(/\/+$/, "");
  if (!/^https?:\/\//i.test(clean)) {
    throw new Error('NEXT_PUBLIC_SITE_URL must start with "https://"');
  }
  return clean;
}

function getStripe() {
  const key = mustGetEnv("STRIPE_SECRET_KEY");

  // Cloudflare Workers runtime: use fetch-based HTTP client
  return new Stripe(key, {
    apiVersion: "2024-06-20" as Stripe.LatestApiVersion,
    httpClient: Stripe.createFetchHttpClient(),
  });
}

async function verifyTurnstile(token: string) {
  const secret = mustGetEnv("TURNSTILE_SECRET_KEY");

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
  });

  const data = (await res.json()) as { success?: boolean };
  return !!data.success;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CheckoutBody;

    const origin = getOrigin();

    const priceId = body.priceId?.trim();
    if (!priceId) return Response.json({ error: "Missing priceId" }, { status: 400 });
    if (!priceId.startsWith("price_")) {
      return Response.json({ error: "Invalid priceId" }, { status: 400 });
    }

    // ✅ Captcha: enforce ONLY if client sends a token.
    // If you haven't added Turnstile to the client yet, checkout still works.
    if (body.captchaToken) {
      const ok = await verifyTurnstile(body.captchaToken);
      if (!ok) return Response.json({ error: "Captcha failed" }, { status: 400 });
    }

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/checkout/success`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    return Response.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Stripe error";
    return Response.json({ error: message }, { status: 500 });
  }
}