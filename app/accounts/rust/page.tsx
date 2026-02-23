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

const RUST_VARIANTS: Variant[] = [
  {
    id: "0-100",
    label: "Rust account with 0–100 hours",
    priceLabel: "$2.00",
    priceId: "price_1T3wS5ISP3QHCCrM9Mhuiwau",
    inStock: true,
  },
  {
    id: "100-500",
    label: "Rust account with 100–500 hours",
    priceLabel: "$2.25",
    priceId: "price_1T3wSMISP3QHCCrMAul3oNVM",
    inStock: true,
  },
  {
    id: "500-1000",
    label: "Rust account with 500–1000 hours",
    priceLabel: "$2.50",
    priceId: "price_1T3wSgISP3QHCCrMZTDBRBm4",
    inStock: true,
  },
  {
    id: "1000-1500",
    label: "Rust account with 1000–1500 hours",
    priceLabel: "$2.75",
    priceId: "price_1T3wSxISP3QHCCrMuQzCQrN6",
    inStock: true,
  },
];

export default function RustAccountsPage() {
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function buy(priceId: string, key: string) {
    setError(null);
    setLoadingKey(key);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout failed.");

      window.location.href = data.url;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Checkout failed. Try again.";
      setError(msg);
      setLoadingKey(null);
    }
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Rust Accounts</h1>
          <p className="text-sm text-white/60 pt-1">Steam • hours-based options</p>
        </div>

        <Link className="text-sm text-white/70 hover:text-white underline underline-offset-4" href="/accounts">
          Back
        </Link>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-100">
          {error}
        </div>
      )}

      <Card className="p-5">
        <div className="grid gap-1">
          <div className="text-lg font-semibold">Rust NFA Account</div>
          <div className="text-sm text-white/60">Choose an option below.</div>
          <div className="pt-2 text-xs text-white/45">OS: All • Game client: Steam</div>
        </div>

        <div className="mt-4 grid divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          {RUST_VARIANTS.map((v) => {
            const key = `rust:${v.id}`;
            const isLoading = loadingKey === key;

            return (
              <div key={v.id} className="flex items-center justify-between gap-4 px-4 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={"h-2.5 w-2.5 rounded-sm " + (v.inStock ? "bg-emerald-400" : "bg-red-400")}
                    aria-hidden
                  />
                  <div className="min-w-0 text-sm text-white/90 truncate">
                    <span className="font-semibold">{v.priceLabel}</span>{" "}
                    <span className="text-white/60">/</span>{" "}
                    <span className="text-white/70">{v.label}</span>
                  </div>
                </div>

                <Button
                  className="shrink-0"
                  disabled={!v.inStock || isLoading}
                  onClick={() => buy(v.priceId, key)}
                >
                  {!v.inStock ? "Sold out" : isLoading ? "Loading…" : "Purchase"}
                </Button>
              </div>
            );
          })}
        </div>
        
        <Card className="p-6">
  <h2 className="text-lg font-semibold">What you get</h2>
  <ul className="mt-3 space-y-2 text-sm text-white/70 list-disc pl-5">
    <li>One selected option based on your purchase</li>
    <li>Delivery instructions after checkout</li>
    <li>Support if you run into issues</li>
  </ul>
</Card>

<div className="grid gap-3 sm:grid-cols-2">
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <div className="font-medium text-white/90">FAQ: Out of stock?</div>
    <div className="pt-2 text-sm text-white/70">
      Out-of-stock options are not always disabled. Join the discord to make sure they are in stock before purchasing.
    </div>
  </div>

  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <div className="font-medium text-white/90">FAQ: Checkout not redirecting?</div>
    <div className="pt-2 text-sm text-white/70">
      Refresh and try again. If it persists, contact support and include the option you clicked.
    </div>
  </div>
</div>

        <div className="pt-3 text-xs text-white/45">
          Delivery instructions are shown after checkout.
        </div>
      </Card>
    </div>
  );
}