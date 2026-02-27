import Stripe from "stripe";

let stripeSingleton: Stripe | null = null;

export function getStripe(): Stripe {
  if (stripeSingleton) return stripeSingleton;

  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");

  stripeSingleton = new Stripe(key, {
    apiVersion: "2024-06-20" as Stripe.LatestApiVersion,
  });

  return stripeSingleton;
}
