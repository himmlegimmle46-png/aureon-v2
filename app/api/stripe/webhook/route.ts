import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import type { Prisma } from "@prisma/client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET" },
      { status: 500 }
    );
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "unknown";
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (session.payment_status !== "paid") {
    return NextResponse.json({ received: true });
  }

  const sessionId = session.id;
  const orderId = session.payment_intent?.toString() ?? sessionId;

  const customerEmail =
    session.customer_details?.email ?? session.customer_email ?? "";

  if (!customerEmail) {
    return NextResponse.json(
      { error: "No customer email on session" },
      { status: 400 }
    );
  }

  // Idempotency: if already delivered for this session, do nothing
  const existing = await prisma.delivery.findUnique({ where: { sessionId } });
  if (existing) {
    return NextResponse.json({ delivered: true });
  }

  // Determine what was purchased (assumes 1 item checkout)
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
    limit: 10,
  });

  const priceId = lineItems.data[0]?.price?.id;
  if (!priceId) {
    return NextResponse.json({ error: "No priceId found" }, { status: 400 });
  }

  // Fetch the Stripe Price and expand its Product so we can read Product metadata.sku
  const price = await stripe.prices.retrieve(priceId, { expand: ["product"] });

  const stripeProduct = price.product;
if (!stripeProduct || typeof stripeProduct === "string") {
  return NextResponse.json(
    { error: "Missing expanded Stripe product" },
    { status: 400 }
  );
}

// ✅ Narrow Product vs DeletedProduct
if ("deleted" in stripeProduct && stripeProduct.deleted) {
  return NextResponse.json(
    { error: "Stripe product is deleted" },
    { status: 400 }
  );
}

// Now TS knows it's a real Stripe.Product
const sku = stripeProduct.metadata?.sku?.trim();
if (!sku) {
  return NextResponse.json(
    { error: "Missing Product metadata: sku" },
    { status: 400 }
  );
}

const productName = stripeProduct.name?.trim() || sku;

  // Ensure product exists in our DB
  const product = await prisma.product.upsert({
    where: { sku },
    update: { name: productName },
    create: { sku, name: productName },
  });

  // Claim stock + create delivery atomically
  let deliveredKey = "";
  let outOfStock = false;
  let fulfillmentFailed = false;

  try {
    const delivery = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const item = await tx.stockItem.findFirst({
        where: { productId: product.id, claimedAt: null },
        orderBy: { createdAt: "asc" },
      });

      if (!item) throw new Error("OUT_OF_STOCK");

      const now = new Date();

      const claimed = await tx.stockItem.update({
        where: { id: item.id },
        data: { claimedAt: now, orderId, sessionId },
      });

      return tx.delivery.create({
        data: {
          productId: product.id,
          orderId,
          sessionId,
          customerEmail,
          deliveredKey: claimed.key,
        },
      });
    });

    deliveredKey = delivery.deliveredKey;
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    if (message === "OUT_OF_STOCK") outOfStock = true;
    else fulfillmentFailed = true;
  }

  if (outOfStock) {
    return NextResponse.json({ error: "Out of stock" }, { status: 409 });
  }
  if (fulfillmentFailed) {
    return NextResponse.json({ error: "Fulfillment failed" }, { status: 500 });
  }

  // Email the key (optional but recommended)
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.FULFILL_FROM_EMAIL;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (resendKey && from && siteUrl) {
    const resend = new Resend(resendKey);

    const successUrl = `${siteUrl.replace(/\/+$/, "")}/success?session_id=${encodeURIComponent(
      sessionId
    )}`;

    await resend.emails.send({
      from,
      to: customerEmail,
      subject: "Your purchase is ready",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Thanks for your purchase</h2>
          <p><strong>Your key:</strong></p>
          <pre style="padding:12px;background:#111;color:#0f0;border-radius:8px;">${escapeHtml(
            deliveredKey
          )}</pre>
          <p>You can also view it here: <a href="${successUrl}">${successUrl}</a></p>
        </div>
      `,
    });
  }

  return NextResponse.json({ delivered: true });
}

function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}