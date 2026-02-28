import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { Resend } from "resend";
import { getPrisma } from "@/lib/prisma";
import { createDeliveryToken } from "@/lib/delivery-access";
import { revealStockSecret } from "@/lib/stock-secrets";

export const runtime = "nodejs";

type Tx = Parameters<Parameters<ReturnType<typeof getPrisma>["$transaction"]>[0]>[0];

export async function POST(req: Request) {
  const prisma = getPrisma();
  const stripe = getStripe();

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET" }, { status: 500 });
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

  const customerEmail = session.customer_details?.email ?? session.customer_email ?? "";

  if (!customerEmail) {
    return NextResponse.json({ error: "No customer email on session" }, { status: 400 });
  }

  const existing = await prisma.delivery.findUnique({ where: { sessionId } });
  if (existing) {
    return NextResponse.json({ delivered: true });
  }

  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 2 });
  const firstItem = lineItems.data[0];

  if (!firstItem?.price?.id) {
    return NextResponse.json({ error: "No priceId found" }, { status: 400 });
  }

  if (lineItems.data.length > 1 || (firstItem.quantity ?? 1) !== 1) {
    return NextResponse.json(
      { error: "Only one unit per checkout session is supported" },
      { status: 400 }
    );
  }

  const price = await stripe.prices.retrieve(firstItem.price.id, { expand: ["product"] });

  const stripeProduct = price.product;
  if (!stripeProduct || typeof stripeProduct === "string") {
    return NextResponse.json({ error: "Missing expanded Stripe product" }, { status: 400 });
  }

  if ("deleted" in stripeProduct && stripeProduct.deleted) {
    return NextResponse.json({ error: "Stripe product is deleted" }, { status: 400 });
  }

  const sku = stripeProduct.metadata?.sku?.trim();
  if (!sku) {
    return NextResponse.json({ error: "Missing Product metadata: sku" }, { status: 400 });
  }

  const productName = stripeProduct.name?.trim() || sku;
  const instructions = stripeProduct.metadata?.instructions?.trim() || "";

  const product = await prisma.product.upsert({
    where: { sku },
    update: { name: productName },
    create: { sku, name: productName },
  });

  let deliveredSecret = "";
  let outOfStock = false;
  let fulfillmentFailed = false;

  try {
    const delivery = await prisma.$transaction(async (tx: Tx) => {
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

      const revealed = revealStockSecret(claimed.key);

      return tx.delivery.create({
        data: {
          productId: product.id,
          orderId,
          sessionId,
          customerEmail,
          deliveredKey: revealed,
        },
      });
    });

    deliveredSecret = delivery.deliveredKey;
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

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.FULFILL_FROM_EMAIL || process.env.RESEND_FROM_EMAIL;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (resendKey && from && siteUrl) {
    const resend = new Resend(resendKey);

    const deliveryToken = createDeliveryToken(sessionId, customerEmail);
    const successUrl = `${siteUrl.replace(/\/+$/, "")}/checkout/success?session_id=${encodeURIComponent(
      sessionId
    )}&t=${encodeURIComponent(deliveryToken)}`;

    const instructionsBlock = instructions
      ? `<p><strong>How to use it:</strong></p><pre style="padding:12px;background:#1f1f1f;color:#fff;border-radius:8px;white-space:pre-wrap;">${escapeHtml(
          instructions
        )}</pre>`
      : "";

    await resend.emails.send({
      from,
      to: customerEmail,
      subject: "Your purchase is ready",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Thanks for your purchase</h2>
          <p><strong>Your key / account info:</strong></p>
          <pre style="padding:12px;background:#111;color:#0f0;border-radius:8px;white-space:pre-wrap;">${escapeHtml(
            deliveredSecret
          )}</pre>
          ${instructionsBlock}
          <p>Open your secure delivery page here: <a href="${successUrl}">${successUrl}</a></p>
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