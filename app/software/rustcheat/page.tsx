"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Button } from "../../../components/ui";
import { Turnstile } from "@marsidev/react-turnstile";

type Variant = {
  id: string;
  label: string;
  priceLabel: string;
  priceId: string;
  inStock: boolean;
};

const TOOL_KEY_VARIANTS: Variant[] = [
  {
    id: "rust-serenity-1",
    label: "Serenity Cheat 1 day",
    priceLabel: "$4.99",
    priceId: "price_1T3vrzISP3QHCCrMvWLlPKkC",
    inStock: true,
  },
  {
    id: "rust-serenity-7",
    label: "Serenity Cheat 7 days",
    priceLabel: "$24.99",
    priceId: "price_1T3vsAISP3QHCCrMTE9MiEht",
    inStock: true,
  },
  {
    id: "rust-serenity-30",
    label: "Serenity Cheat 30 days",
    priceLabel: "$49.99",
    priceId: "price_1T3vsOISP3QHCCrMC4MLqFWv",
    inStock: true,
  },
];

type CheckoutResponse = { url?: string; error?: string; codes?: string[] };

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "0x4AAAAAAChGqqGvElmFs8B-";

export default function ToolKeysPage() {
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [verifiedAt, setVerifiedAt] = useState<number | null>(null);
  const [turnstileRenderKey, setTurnstileRenderKey] = useState(0);
  const captchaReady = !!captchaToken;

  function resetVerification(message?: string) {
    setCaptchaToken(null);
    setVerifiedAt(null);
    setTurnstileRenderKey((v) => v + 1);
    if (message) setError(message);
  }

  async function buy(priceId: string, key: string) {
    setError(null);

    if (loadingKey) return;

    if (!captchaToken || !verifiedAt) {
      setError("Please complete verification first.");
      return;
    }

    if (Date.now() - verifiedAt > 4 * 60 * 1000) {
      resetVerification("Verification expired. Please verify again.");
      return;
    }

    const token = captchaToken;
    setLoadingKey(key);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ priceId, captchaToken: token }),
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
        const codes = data?.codes ?? [];
        const msg =
          codes.includes("timeout-or-duplicate")
            ? "Verification expired or already used. Please verify again."
            : data?.error ||
              (codes.length ? `Checkout failed: ${codes.join(", ")}` : raw || `Checkout failed (${res.status}).`);
        resetVerification();
        throw new Error(msg);
      }

      if (!data.url) {
        resetVerification();
        throw new Error("Checkout failed (missing Stripe URL).");
      }

      window.location.assign(data.url);
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
          <h1 className="text-2xl font-semibold">Rust Cheat</h1>
          <p className="pt-1 text-sm text-white/60">Licenses</p>
        </div>
        <Link className="text-sm text-white/70 underline underline-offset-4 hover:text-white" href="/software">
          Back
        </Link>
      </div>

      {error && <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-100">{error}</div>}

      <Card className="p-5">
        <div className="text-lg font-semibold">Select a plan</div>

        <div className="mt-4">
          <div className="pb-2 text-xs text-white/60">Verification required</div>
          <Turnstile
            key={turnstileRenderKey}
            siteKey={TURNSTILE_SITE_KEY}
            options={{ action: "checkout" }}
            onSuccess={(token) => {
              setCaptchaToken(token);
              setVerifiedAt(Date.now());
              setError(null);
            }}
            onExpire={() => resetVerification()}
            onError={() => resetVerification("Captcha failed to load. Disable adblock/shields and refresh.")}
          />
        </div>

        <div className="mt-4 grid gap-2">
          {TOOL_KEY_VARIANTS.map((v) => {
            const key = `toolkeys:${v.id}`;
            const isLoading = loadingKey === key;

            return (
              <div key={v.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-white">{v.label}</div>
                  <div className="text-sm text-white/70">{v.priceLabel}</div>
                </div>

                <div className="ml-3 flex items-center gap-3">
                  <span className={"text-xs " + (v.inStock ? "text-emerald-300" : "text-red-300")}>{v.inStock ? "In stock" : "Sold out"}</span>
                  <Button className="shrink-0" disabled={!v.inStock || !!loadingKey || !captchaReady} onClick={() => buy(v.priceId, key)}>
                    {!v.inStock ? "Sold out" : isLoading ? "Loading…" : !captchaReady ? "Verify first" : "Purchase"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}