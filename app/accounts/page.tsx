"use client";

import { useState } from "react";
import { Card, Button } from "../../components/ui";

type Variant = {
  id: string;
  label: string;       // like "Rust account with 0-100 hours"
  priceLabel: string;  // "$1.50"
  priceId: string;     // Stripe price_...
  inStock: boolean;
};

type ListingGroup = {
  id: string;
  title: string;       // "Rust Temporary Account"
  subtitle?: string;   // "Account For Game Accounts"
  meta?: string;       // "Game client: Steam"
  ratingText?: string; // "4.8 / 751+"
  variants: Variant[];
};

const GROUPS: ListingGroup[] = [
  {
    id: "rust-temp",
    title: "Rust Temporary Account",
    subtitle: "Account For Game Accounts",
    ratingText: "4.8 / 751+",
    meta: "Game client: Steam",
    variants: [
      {
        id: "0-100",
        label: "Rust account with 0–100 hours",
        priceLabel: "$2",
        priceId: "price_1T3JTsID1mWgKrR7M2xp4FW6",
        inStock: true,
      },
      {
        id: "100-500",
        label: "Rust account with 100–500 hours",
        priceLabel: "$2.25",
        priceId: "price_1T3Je3ID1mWgKrR7yit7LBcQ",
        inStock: true,
      },
      {
        id: "500-1000",
        label: "Rust account with 500–1000 hours",
        priceLabel: "$2.50",
        priceId: "price_1T3JeYID1mWgKrR7Efip4pIQ",
        inStock: false,
      },
      {
        id: "1000-1500",
        label: "Rust account with 1000–1500 hours",
        priceLabel: "$2.75",
        priceId: "price_1T3JgBID1mWgKrR7Rh5J83NR",
        inStock: false,
      },
    ],
  },

  // Example: your Bee Swarm group
  {
    id: "bss-accounts",
    title: "Bee Swarm Accounts",
    subtitle: "Verified accounts + delivery via Discord ticket",
    meta: "Platform: Roblox",
    variants: [
      {
        id: "blue-hive-50",
        label: "Blue Hive (Lvl 12) • Diamond Mask • Porcelain dipper",
        priceLabel: "$50",
        priceId: "price_1T3GOVID1mWgKrR7wgxlK3Np",
        inStock: true,
      },
    ],
  },
];

export default function AccountsPage() {
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
      <div>
        <h1 className="text-2xl font-semibold">Accounts</h1>
        <p className="text-sm text-white/60 pt-1">
          Choose a category, then pick an option to purchase.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-100">
          {error}
        </div>
      )}

      <div className="grid gap-4">
        {GROUPS.map((g) => (
          <Card key={g.id} className="p-5">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="grid gap-1">
                <div className="text-lg font-semibold">{g.title}</div>
                {g.subtitle && <div className="text-sm text-white/60">{g.subtitle}</div>}
                <div className="flex flex-wrap gap-3 pt-1 text-xs text-white/50">
                  {g.ratingText && <span>Reviews: {g.ratingText}</span>}
                  {g.meta && <span>{g.meta}</span>}
                </div>
              </div>
            </div>

            {/* Variants list */}
            <div className="mt-4 grid divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              {g.variants.map((v) => {
                const key = `${g.id}:${v.id}`;
                const disabled = !v.inStock || loadingKey === key;

                return (
                  <div
                    key={v.id}
                    className="flex items-center justify-between gap-4 px-4 py-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* stock dot */}
                      <span
                        className={
                          "h-2.5 w-2.5 rounded-sm " +
                          (v.inStock ? "bg-emerald-400" : "bg-red-400")
                        }
                        aria-hidden
                      />
                      <div className="min-w-0">
                        <div className="text-sm text-white/90 truncate">
                          <span className="font-semibold">{v.priceLabel}</span>{" "}
                          <span className="text-white/70">/</span>{" "}
                          <span className="text-white/70">{v.label}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="shrink-0"
                      disabled={!v.inStock || loadingKey === key}
                      onClick={() => buy(v.priceId, key)}
                    >
                      {!v.inStock ? "Sold out" : loadingKey === key ? "Loading…" : "Purchase"}
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 text-xs text-white/45">
              Delivery instructions are shown after checkout.
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}