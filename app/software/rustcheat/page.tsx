"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Button } from "../../../components/ui";
import { Turnstile } from "@marsidev/react-turnstile";

type Variant = {
  id: string;
  label: string;
  priceLabel: string;
  priceId: string; // Stripe price_...
  inStock: boolean;
};

const TOOL_KEY_VARIANTS: Variant[] = [
  {
    id: "Serenity Cheat",
    label: "Serenity Cheat 1 day",
    priceLabel: "$4.99",
    priceId: "price_1T3vrzISP3QHCCrMvWLlPKkC",
    inStock: true,
  },
  {
    id: "Serenity Cheat",
    label: "Serenity Cheat 7 days",
    priceLabel: "$24.99",
    priceId: "price_1T3vsAISP3QHCCrMTE9MiEht",
    inStock: true,
  },
  {
    id: "Serenity Cheat",
    label: "Serenity Cheat 30 days",
    priceLabel: "$49.99",
    priceId: "price_1T3vsOISP3QHCCrMC4MLqFWv",
    inStock: true,
  },
];

export default function ToolKeysPage() {
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Turnstile
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReady, setCaptchaReady] = useState(false);

  async function buy(priceId: string, key: string) {
    setError(null);
    setLoadingKey(key);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ priceId, captchaToken }),
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
          <h1 className="text-2xl font-semibold">Rust Cheats</h1>
          <p className="text-sm text-white/60 pt-1">Licenses • instant delivery</p>
        </div>

        <Link
          className="text-sm text-white/70 hover:text-white underline underline-offset-4"
          href="/software"
        >
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
          <div className="text-lg font-semibold">Available options</div>
          <div className="text-sm text-white/60">Choose an option below.</div>
          <div className="pt-2 text-xs text-white/45">
            Delivery instructions are shown after checkout, make sure to join the discord to see the immediate stock.
          </div>
        </div>

        {/* Turnstile (one time for the whole page) */}
        <div className="mt-4">
          <div className="text-xs text-white/60 pb-2">Verification required to purchase</div>
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={(token) => {
              setCaptchaToken(token);
              setCaptchaReady(true);
            }}
            onExpire={() => {
              setCaptchaToken("");
              setCaptchaReady(false);
            }}
            onError={() => {
              setCaptchaToken("");
              setCaptchaReady(false);
              setError("Captcha failed to load. Please refresh and try again.");
            }}
          />
          {!captchaReady && (
            <div className="pt-2 text-xs text-white/50">
              Complete verification to enable purchases.
            </div>
          )}
        </div>

        <div className="mt-4 grid divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          {TOOL_KEY_VARIANTS.map((v) => {
            const key = `toolkeys:${v.id}`;
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
                  disabled={!v.inStock || isLoading || !captchaReady}
                  onClick={() => buy(v.priceId, key)}
                >
                  {!v.inStock
                    ? "Sold out"
                    : isLoading
                      ? "Loading…"
                      : !captchaReady
                        ? "Verify first"
                        : "Purchase"}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="font-medium text-white/90">Delivery</div>
            <div className="pt-2 text-sm text-white/70">
              After checkout, you’ll see delivery instructions (key / access steps).
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="font-medium text-white/90">Need help?</div>
            <div className="pt-2 text-sm text-white/70">
              If checkout doesn’t redirect, refresh and try again. If it persists, contact support.
            </div>
          </div>
        </div>

        <div className="pt-3 text-xs text-white/45">Delivery instructions are shown after checkout.</div>
      </Card>
    </div>
  );
}