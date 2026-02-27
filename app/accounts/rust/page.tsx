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

// Uses your env var if present; falls back to your key.
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "0x4AAAAAAChGqqGvElmFs8B-";

const RUST_VARIANTS: Variant[] = [
  {
    id: "0-1500",
    label: "Rust  NFA accounts with 0–1500 hours",
    priceLabel: "$2.00",
    priceId: "price_1T3wS5ISP3QHCCrM9Mhuiwau",
    inStock: true,
  },
];

export default function RustAccountsPage() {
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Turnstile
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaReady = !!captchaToken;

  async function buy(priceId: string, key: string) {
    setError(null);

    // Don’t even call the API without a token
    if (!captchaToken) {
      setError("Please complete the captcha first.");
      return;
    }

    setLoadingKey(key);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ priceId, captchaToken }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
        codes?: string[];
      };

      if (!res.ok) {
        const codes = data?.codes ?? [];
        const msg =
          codes.includes("timeout-or-duplicate")
            ? "Verification expired or already used. Please verify again."
            : data?.error ||
              (codes.length ? `Checkout failed: ${codes.join(", ")}` : "Checkout failed.");

        if (msg.toLowerCase().includes("captcha") || codes.length) {
          setCaptchaToken(null);
        }

        throw new Error(msg);
      }

      if (!data.url) throw new Error("Checkout failed.");

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
        <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-100">{error}</div>
      )}

      <Card className="p-5">
        <div className="grid gap-1">
          <div className="text-lg font-semibold">Rust NFA Account</div>
          <div className="text-sm text-white/60">Choose an option below.</div>
          <div className="pt-2 text-xs text-white/45">OS: All • Game client: Steam</div>
        </div>

        {/* Turnstile */}
        <div className="mt-4">
          <div className="text-xs text-white/60 pb-2">Verification required to purchase</div>

          <Turnstile
            siteKey={TURNSTILE_SITE_KEY}
            onSuccess={(token) => {
              setCaptchaToken(token);
              setError(null);
            }}
            onExpire={() => setCaptchaToken(null)}
            onError={() => {
              setCaptchaToken(null);
              setError("Captcha failed to load. Disable adblock/shields and refresh.");
            }}
          />

          {!captchaReady && (
            <div className="pt-2 text-xs text-white/50">Complete verification to enable purchases.</div>
          )}
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
                  disabled={!v.inStock || isLoading || !captchaReady}
                  onClick={() => buy(v.priceId, key)}
                >
                  {!v.inStock ? "Sold out" : isLoading ? "Loading…" : !captchaReady ? "Verify first" : "Purchase"}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-5 grid gap-3">
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
                Out-of-stock options are not always disabled. Join the discord to make sure they are in stock before
                purchasing.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="font-medium text-white/90">FAQ: Checkout not redirecting?</div>
              <div className="pt-2 text-sm text-white/70">
                Refresh and try again. If it persists, contact support and include the option you clicked.
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 text-xs text-white/45">Delivery instructions are shown after checkout.</div>
      </Card>
    </div>
  );
}