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

const ADDON_VARIANTS: Variant[] = [
  { id: "Serenity Cheat 1", label: "Serenity Cheat 1 day", priceLabel: "$4.00", priceId: "price_1T3vrzISP3QHCCrMvWLlPKkC", inStock: true },
  { id: "Serenity Cheat 7", label: "Serenity Cheat 7 days", priceLabel: "$20.00", priceId: "price_1T3vsAISP3QHCCrMTE9MiEht", inStock: true },
  { id: "Serenity Cheat 30", label: "Serenity Cheat 30 days", priceLabel: "$40.00", priceId: "price_1T3vsOISP3QHCCrMC4MLqFWv", inStock: true },
];

type CheckoutResponse = { url?: string; error?: string; codes?: string[] };

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "0x4AAAAAAChGqqGvElmFs8B-";

export default function AddonsPage() {
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaReady = !!captchaToken;

  async function buy(priceId: string, key: string) {
    setError(null);
    if (!captchaToken) {
      setError("Please complete verification first.");
      return;
    }

    setLoadingKey(key);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ priceId, captchaToken }),
      });

      const data = (await res.json().catch(() => ({}))) as CheckoutResponse;
      if (!res.ok) {
        const msg = data?.error || (data?.codes?.length ? `Checkout failed: ${data.codes.join(", ")}` : "Checkout failed.");
        if (msg.toLowerCase().includes("captcha")) setCaptchaToken(null);
        throw new Error(msg);
      }

      if (!data.url) throw new Error("Checkout failed (missing Stripe URL).");
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
          <h1 className="text-2xl font-semibold">Arc Raiders Cheat</h1>
          <p className="text-sm text-white/60 pt-1">Licenses • instant delivery</p>
        </div>
        <Link className="text-sm text-white/70 hover:text-white underline underline-offset-4" href="/software">Back</Link>
      </div>

      {error && <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-100">{error}</div>}

      <Card className="p-5">
        <div className="grid gap-1">
          <div className="text-lg font-semibold">Available options</div>
          <div className="text-sm text-white/60">Choose an option below.</div>
          <div className="pt-2 text-xs text-white/45">Delivery instructions are shown after checkout.</div>
        </div>

        <div className="mt-4">
          <div className="text-xs text-white/60 pb-2">Verification required to purchase</div>
          <Turnstile
            siteKey={TURNSTILE_SITE_KEY}
            options={{ action: "checkout" }}
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
          {!captchaReady && <div className="pt-2 text-xs text-white/50">Verify first, then the button changes to Purchase.</div>}
        </div>

        <div className="mt-4 grid divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          {ADDON_VARIANTS.map((v) => {
            const key = `addons:${v.id}`;
            const isLoading = loadingKey === key;
            return (
              <div key={v.id} className="flex items-center justify-between gap-4 px-4 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className={"h-2.5 w-2.5 rounded-sm " + (v.inStock ? "bg-emerald-400" : "bg-red-400")} aria-hidden />
                  <div className="min-w-0 text-sm text-white/90 truncate">
                    <span className="font-semibold">{v.priceLabel}</span> <span className="text-white/60">/</span>{" "}
                    <span className="text-white/70">{v.label}</span>
                  </div>
                </div>
                <Button className="shrink-0" disabled={!v.inStock || isLoading || !captchaReady} onClick={() => buy(v.priceId, key)}>
                  {!v.inStock ? "Sold out" : isLoading ? "Loading…" : !captchaReady ? "Verify first" : "Purchase"}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="pt-2 text-xs text-white/50">Once verified, purchase opens Stripe checkout normally.</div>
      </Card>
    </div>
  );
}