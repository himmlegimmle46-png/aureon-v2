import Stripe from "stripe";

export const runtime = "nodejs";

type CheckoutBody = {
  priceId?: string;
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

  // Node runtime (best compatibility)
  return new Stripe(key, {
    apiVersion: "2024-06-20" as Stripe.LatestApiVersion,
  });
}

async function verifyTurnstile(token: string) {
  const secret = mustGetEnv("TURNSTILE_SECRET_KEY");

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
  });

  const data = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    ["error-codes"]?: string[];
  };

  return {
    ok: !!data.success,
    errorCodes: data["error-codes"] ?? [],
  };
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

    // ✅ Captcha REQUIRED
    const captchaToken = body.captchaToken?.trim();
    if (!captchaToken) {
      return Response.json({ error: "Captcha required" }, { status: 400 });
    }

    const turnstile = await verifyTurnstile(captchaToken);
    if (!turnstile.ok) {
      return Response.json({ error: "Captcha failed" }, { status: 400 });
    }

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],

      // ✅ Make sure email exists for fulfillment email
      customer_creation: "always",

      // ✅ Critical: include the checkout session id so /success can look up the delivered key
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    return Response.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Stripe error";
    return Response.json({ error: message }, { status: 500 });
  }
}