"use client";

import { useState } from "react";
import { Card, Button } from "../../components/ui";

type Product = {
  id: string;
  name: string;
  priceLabel: string;
  priceId: string; // Stripe Price ID
  description: string;
};

const PRODUCTS: Product[] = [
  {
    id: "bss-blue-hive",
    name: "Bee Swarm Simulator account (Blue Hive)",
    priceLabel: "$60",
    priceId: "price_1T3GOVID1mWgKrR7wgxlK3Np",
    description:
      "Blue hive BSS account. After purchase, you’ll receive delivery instructions (Discord ticket, etc).",
  },
];

export default function AccountsPage() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function buy(priceId: string, productId: string) {
    setError(null);
    setLoadingId(productId);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Failed to start checkout.");
      }

      window.location.href = data.url;
    } catch (e: unknown) {
  const message = e instanceof Error ? e.message : "Checkout failed.";
  setError(message);
  setLoadingId(null);
    }
  }

  return (
    <div className="grid gap-5">
      <div>
        <h1 className="text-2xl font-semibold">Accounts</h1>
        <p className="text-white/60 text-sm pt-1">
          Click buy to go to Stripe Checkout.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRODUCTS.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-white/60 pt-1">{p.description}</div>
              </div>
              <div className="text-sm text-white/70">{p.priceLabel}</div>
            </div>

            <div className="pt-4">
              <Button
                onClick={() => buy(p.priceId, p.id)}
                disabled={loadingId === p.id}
                className="w-full"
              >
                {loadingId === p.id ? "Redirecting…" : "Buy"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}