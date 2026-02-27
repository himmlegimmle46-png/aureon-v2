import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

type CheckoutBody = {
  priceId?: string;
  captchaToken?: string;
  turnstileToken?: string;
};

type TurnstileVerifyResult = {
  ok: boolean;
  errorCodes: string[];
  hostname: string | null;
  challengeTs: string | null;
  action: string | null;
};

function mustGetEnv(name: string) {
  const v = process.env[name]?.trim();
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

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

function requestIp(req: Request) {
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    null
  );
}

async function verifyTurnstile(token: string, ip?: string | null): Promise<TurnstileVerifyResult> {
  const secret = mustGetEnv("TURNSTILE_SECRET_KEY");

  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });

  const data = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    hostname?: string;
    challenge_ts?: string;
    action?: string;
    ["error-codes"]?: string[];
  };

  return {
    ok: !!data.success,
    errorCodes: data["error-codes"] ?? [],
    hostname: data.hostname ?? null,
    challengeTs: data.challenge_ts ?? null,
    action: data.action ?? null,
  };
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

    const captchaToken = (body.captchaToken ?? body.turnstileToken ?? "").trim();
    if (!captchaToken) {
      return Response.json({ error: "Captcha required" }, { status: 400 });
    }

    const ip = requestIp(req);
    const turnstile = await verifyTurnstile(captchaToken, ip);

    if (!turnstile.ok) {
      // Temporary debug logging for captcha diagnostics in production
      console.warn("[checkout][turnstile_failed]", {
        ts,
        host,
        ip,
        origin,
        priceId,
        codes: turnstile.errorCodes,
        turnstileHostname: turnstile.hostname,
        turnstileAction: turnstile.action,
        turnstileChallengeTs: turnstile.challengeTs,
      });

      return Response.json(
        {
          error: "Captcha failed",
          codes: turnstile.errorCodes,
          host,
          ts,
        },
        { status: 400 }
      );
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

    console.error("[checkout][server_error]", {
      ts,
      host,
      message,
    });

    return Response.json({ error: message }, { status: 500 });
  }
}