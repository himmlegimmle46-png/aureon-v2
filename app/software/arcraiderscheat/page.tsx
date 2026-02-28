"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Button } from "../../../components/ui";

type Variant = {
  id: string;
  label: string;
  priceLabel: string;
  priceId: string;
  inStock: boolean;
};

const TOOL_KEY_VARIANTS: Variant[] = [
  { id: "arc-serenity-1", label: "Serenity Cheat 1 day", priceLabel: "$4.00", priceId: "price_1T3vrzISP3QHCCrMvWLlPKkC", inStock: true },
  { id: "arc-serenity-7", label: "Serenity Cheat 7 days", priceLabel: "$20.00", priceId: "price_1T3vsAISP3QHCCrMTE9MiEht", inStock: true },
  { id: "arc-serenity-30", label: "Serenity Cheat 30 days", priceLabel: "$40.00", priceId: "price_1T3vsOISP3QHCCrMC4MLqFWv", inStock: true },
];

type CheckoutResponse = { url?: string; error?: string; codes?: string[]; host?: string; ts?: string };


export default function ArcRaidersPage() {
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function buy(priceId: string, key: string) {
    setError(null);
    setLoadingKey(key);

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const raw = await res.text();
      const data = (() => {
        try {
          return (raw ? JSON.parse(raw) : {}) as CheckoutResponse;
        } catch {
          return {} as CheckoutResponse;
        }
      })();

      if (!res.ok) {
        const codes = data.codes ?? [];
        const msg =
          codes.includes("timeout-or-duplicate")
            ? "Verification expired/already used. Please verify again."
            : data.error || (codes.length ? `Checkout failed: ${codes.join(", ")}` : `Checkout failed (${res.status}).`);

        throw new Error(msg);
      }

      if (!data.url) throw new Error("Checkout failed (missing Stripe URL).");
      window.location.assign(data.url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Checkout failed. Try again.");
      setLoadingKey(null);
    }
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Arc Raiders Cheat</h1>
          <p className="pt-1 text-sm text-white/60">Clean checkout flow</p>
        </div>
        <Link className="text-sm text-white/70 underline underline-offset-4 hover:text-white" href="/software">Back</Link>
      </div>

      {error && <div className="rounded-xl border border-red-500/25 bg-red-500/10 p-3 text-sm text-red-100">{error}</div>}

      <Card className="p-5 space-y-4">
        <div className="text-lg font-semibold">Choose your plan</div>

        <div className="grid gap-2">
          {TOOL_KEY_VARIANTS.map((v) => {
            const key = `arc:${v.id}`;
            const isLoading = loadingKey === key;

            return (
              <div key={v.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-white">{v.label}</div>
                  <div className="text-sm text-white/70">{v.priceLabel}</div>
                </div>
                <Button className="shrink-0" disabled={!v.inStock || !!loadingKey} onClick={() => buy(v.priceId, key)}>
                  {!v.inStock ? "Sold out" : isLoading ? "Loading…" : "Purchase"}
                </Button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}